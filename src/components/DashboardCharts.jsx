import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff6b6b', '#1dd1a1'];

export default function DashboardCharts({ products, receipts }) {
  // 1. Sales over the last 30 days
  const salesData = useMemo(() => {
    const data = [];
    const now = new Date();
    // Initialize last 30 days
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });
      data.push({ date: dateString, rawDate: d.toISOString().split('T')[0], revenue: 0, orders: 0 });
    }

    // Populate with receipt data
    receipts.forEach(r => {
      const rDate = new Date(r.createdAt);
      const dateString = rDate.toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });
      const dayData = data.find(d => d.date === dateString);
      if (dayData) {
        dayData.revenue += r.totalAmount;
        dayData.orders += 1;
      }
    });

    return data;
  }, [receipts]);

  // 2. Inventory by Category
  const inventoryData = useMemo(() => {
    const categoryCount = {};
    products.forEach(p => {
      const cat = p.category || 'Uncategorized';
      if (!categoryCount[cat]) categoryCount[cat] = 0;
      categoryCount[cat] += p.quantity;
    });

    return Object.keys(categoryCount).map(key => ({
      name: key,
      quantity: categoryCount[key]
    })).sort((a, b) => b.quantity - a.quantity);
  }, [products]);

  // 3. Top Selling Products (from receipts)
  const topProductsData = useMemo(() => {
    const prodSales = {};
    receipts.forEach(r => {
      // Limit to last 30 days for relevance
      const isRecent = (new Date() - new Date(r.createdAt)) / (1000 * 60 * 60 * 24) <= 30;
      if (!isRecent) return;

      r.products.forEach(p => {
        if (!prodSales[p.name]) prodSales[p.name] = 0;
        prodSales[p.name] += p.quantity;
      });
    });

    return Object.keys(prodSales)
      .map(key => ({ name: key, sales: prodSales[key] }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5); // Top 5
  }, [receipts]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '32px' }}>
      
      {/* Top Row: Sales & Revenue over Time */}
      <div style={{ background: 'var(--bg-elevated)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700' }}>Revenue Trend (Last 30 Days)</h3>
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={v => `Rs.${v}`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <RechartsTooltip 
                contentStyle={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text)' }}
                formatter={(value, name) => [name === 'revenue' ? `Rs. ${value.toLocaleString()}` : value, name === 'revenue' ? 'Revenue' : 'Orders']}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Inventory by Category */}
        <div style={{ background: 'var(--bg-elevated)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700' }}>Inventory by Category</h3>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="quantity">
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  formatter={(value) => [`${value} items in stock`, 'Quantity']}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div style={{ background: 'var(--bg-elevated)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700' }}>Top Selling Products (Last 30 Days)</h3>
          <div style={{ width: '100%', height: '250px' }}>
            {topProductsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductsData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                  <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11, width: 100 }} width={120} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    contentStyle={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="sales" fill="var(--success)" radius={[0, 4, 4, 0]} name="Units Sold" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                No recent sales data
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

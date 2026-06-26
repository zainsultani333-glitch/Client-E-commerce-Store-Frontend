import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#c9a84c', '#e8c96e', '#8884d8', '#a855f7', '#ec4899', '#3b82f6', '#14b8a6'];

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
      <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #c9a84c, #e8c96e)' }} />
        <h3 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>Revenue Trend <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)', marginLeft: '8px' }}>(Last 30 Days)</span></h3>
        <div style={{ width: '100%', height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#c9a84c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: "'Poppins', sans-serif" }} tickLine={false} axisLine={false} dy={10} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: "'Poppins', sans-serif" }} tickLine={false} axisLine={false} tickFormatter={v => `Rs.${v >= 1000 ? (v/1000).toFixed(1)+'k' : v}`} dx={-10} />
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <RechartsTooltip 
                contentStyle={{ background: 'rgba(20, 20, 23, 0.9)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', padding: '12px 16px', fontFamily: "'Poppins', sans-serif" }}
                itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}
                labelStyle={{ color: '#a8a89e', fontSize: '12px', marginBottom: '4px' }}
                formatter={(value, name) => [name === 'revenue' ? `Rs. ${value.toLocaleString()}` : value, name === 'revenue' ? 'Revenue' : 'Orders']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#c9a84c" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Inventory by Category */}
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #a855f7, #ec4899)' }} />
          <h3 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>Inventory by Category</h3>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="quantity" stroke="none">
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ background: 'rgba(20, 20, 23, 0.9)', border: '1px solid var(--border)', borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', fontFamily: "'Poppins', sans-serif" }}
                  itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}
                  formatter={(value) => [`${value} items`, 'Stock']}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: "'Poppins', sans-serif", paddingTop: '20px' }} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #3b82f6, #14b8a6)' }} />
          <h3 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>Top Selling Products <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)', marginLeft: '8px' }}>(Last 30 Days)</span></h3>
          <div style={{ width: '100%', height: '280px' }}>
            {topProductsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductsData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: "'Poppins', sans-serif" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontFamily: "'Poppins', sans-serif" }} width={110} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                    contentStyle={{ background: 'rgba(20, 20, 23, 0.9)', border: '1px solid var(--border)', borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', fontFamily: "'Poppins', sans-serif" }}
                    itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}
                    labelStyle={{ color: '#a8a89e', fontSize: '12px', marginBottom: '4px' }}
                  />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[0, 6, 6, 0]} name="Units Sold" barSize={24}>
                    {topProductsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#colorBar${index})`} />
                    ))}
                  </Bar>
                  <defs>
                    {topProductsData.map((entry, index) => (
                      <linearGradient key={`grad-${index}`} id={`colorBar${index}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    ))}
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '14px', fontStyle: 'italic' }}>
                No recent sales data to display.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

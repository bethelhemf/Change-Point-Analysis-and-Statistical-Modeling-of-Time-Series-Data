import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, Calendar, TrendingUp, Filter, Info, ShieldAlert } from 'lucide-react';

const Dashboard = () => {
    const [data, setData] = useState({ prices: [], events: [], change_points: [] });
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('2000-01-01');
    const [endDate, setEndDate] = useState('2022-12-31');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchData = useCallback(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/api/data?start=${startDate}&end=${endDate}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, [startDate, endDate]);

    useEffect(() => { fetchData(); }, [fetchData]);

    // Calculate some "Drill-down" metrics
    const avgPrice = data.prices.length > 0
        ? (data.prices.reduce((acc, curr) => acc + curr.Price, 0) / data.prices.length).toFixed(2)
        : 0;

    return (
        <div style={{ padding: '30px', backgroundColor: '#f1f5f9', minHeight: '100vh', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>

            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ margin: 0, color: '#0f172a', fontSize: '28px' }}>Birhan Energies | <span style={{ fontWeight: 300 }}>Oil Intelligence</span></h1>
                    <p style={{ color: '#64748b', margin: '5px 0' }}>Structural Break & Geopolitical Risk Analysis</p>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>System Status</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>● Live API Connected</span>
                </div>
            </div>

            {/* Control Panel */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', backgroundColor: '#1e293b', color: '#fff', padding: '20px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Filter size={18} />
                    <span style={{ fontWeight: 600 }}>Time Horizon:</span>
                </div>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
                <button onClick={fetchData} style={buttonStyle}>Execute Analysis</button>
                <button onClick={() => window.print()} style={{ ...buttonStyle, backgroundColor: '#64748b', marginLeft: '10px' }}>Print Report</button>
            </div>

            {/* Key Metrics Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginBottom: '30px' }}>
                <MetricCard icon={<Activity color="#3b82f6" />} title="Avg. Period Price" value={`$${avgPrice}`} color="#3b82f6" />
                <MetricCard icon={<TrendingUp color="#ef4444" />} title="Historical Peak" value="$143.95" color="#ef4444" />
                <MetricCard icon={<Calendar color="#10b981" />} title="Events Monitored" value={data.events.length} color="#10b981" />
                <MetricCard icon={<ShieldAlert color="#f59e0b" />} title="Regime Shifts" value={data.change_points.length} color="#f59e0b" />
            </div>

            {/* Main Analysis Chart */}
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ margin: 0 }}>Price Volatility & Regime Detection</h3>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Detected structural breaks indicated by dashed markers</p>
                </div>
                <div style={{ height: '400px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.prices}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="Date" hide />
                            <YAxis domain={['auto', 'auto']} stroke="#94a3b8" fontSize={12} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="Price" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />

                            {/* Change Point Mapping */}
                            {data.change_points.map((cp, i) => (
                                <ReferenceLine key={i} x={cp.date} stroke="#ef4444" strokeDasharray="8 8" label={{ value: 'Regime Change', fill: '#ef4444', fontSize: 10, position: 'insideTopLeft' }} />
                            ))}

                            {/* Clicked Event Highlight */}
                            {selectedEvent && (
                                <ReferenceLine x={selectedEvent} stroke="#f59e0b" strokeWidth={3} />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Intelligence Feed - The Interactive Part */}
            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '16px' }}>
                <h3 style={{ marginBottom: '20px' }}><Info size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} />Geopolitical Event Correlation Feed</h3>
                <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '15px' }}>
                    {data.events.map((ev, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedEvent(ev.Date)}
                            style={{ ...eventCardStyle, borderColor: selectedEvent === ev.Date ? '#f59e0b' : '#3b82f6', transform: selectedEvent === ev.Date ? 'scale(1.05)' : 'scale(1)' }}
                        >
                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>{ev.Date}</span>
                            <h4 style={{ margin: '8px 0', fontSize: '15px' }}>{ev.Event}</h4>
                            <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>{ev.Description}</p>
                            <div style={{ marginTop: '10px', fontSize: '10px', color: '#3b82f6', fontWeight: 'bold' }}>CLICK TO HIGHLIGHT ON CHART</div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

// Helper Components & Styles
const MetricCard = ({ icon, title, value, color }) => (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderBottom: `4px solid ${color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            {icon} <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>{title}</span>
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{value}</div>
    </div>
);

const inputStyle = { padding: '8px', borderRadius: '6px', border: 'none', outline: 'none', color: '#333' };
const buttonStyle = { backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' };
const eventCardStyle = { minWidth: '260px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', borderLeft: '5px solid', cursor: 'pointer', transition: 'all 0.3s ease' };

export default Dashboard;
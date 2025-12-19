'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartProps {
  data: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass" style={{ padding: '1.5rem', border: '1px solid var(--card-border)', background: 'hsla(222, 47%, 15%, 0.8)', minWidth: '260px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        <p style={{ color: 'white', fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Day {label} Forecast</p>
        <p style={{ color: 'var(--secondary)', fontSize: '0.8rem', marginBottom: '1.25rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Distribution Probabilities</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', marginBottom: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: entry.color, boxShadow: `0 0 10px ${entry.color}` }}></div>
            <span style={{ color: 'var(--secondary)', flex: 1, fontWeight: 600 }}>{entry.name}:</span>
            <span style={{ color: 'white', fontWeight: 900 }}>{(entry.value * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrajectoryChart({ data }: ChartProps) {
  const lastStep = data[data.length - 1];
  const states = ['Low', 'Medium', 'High', 'Addiction'];
  const likeliestState = states.reduce((a, b) => lastStep[a] > lastStep[b] ? a : b);

  return (
    <div style={{ width: '100%', height: 450, padding: '20px 0' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ padding: '10px 20px', borderRadius: '100px', background: 'hsla(210, 40%, 98%, 0.05)', border: '1px solid var(--card-border)', fontSize: '0.95rem', boxShadow: 'var(--card-shadow)' }}>
          <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>Projected Core Baseline: </span>
          <span style={{ color: 'var(--primary)', fontWeight: 900, textTransform: 'uppercase' }}>{likeliestState} USAGE</span>
        </div>
      </div>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(150, 80%, 50%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(150, 80%, 50%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(180, 100%, 45%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(180, 100%, 45%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(40, 95%, 60%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(40, 95%, 60%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAddict" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(0, 85%, 60%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(0, 85%, 60%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsla(210, 20%, 100%, 0.05)" vertical={false} />
          <XAxis 
            dataKey="step" 
            stroke="var(--secondary)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="var(--secondary)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`}
            dx={-10}
            label={{ value: 'PROBABILITY', angle: -90, position: 'insideLeft', style: { fill: 'var(--secondary)', fontSize: '10px', letterSpacing: '0.1em' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            align="right"
            height={40}
            iconType="circle"
            formatter={(value) => <span style={{ color: 'var(--foreground)', fontSize: '0.8rem', fontWeight: 500 }}>{value}</span>}
          />
          <Area 
            type="monotone" 
            dataKey="Low" 
            name="Low Usage Probability"
            stroke="hsl(150, 80%, 50%)" 
            strokeWidth={3}
            fillOpacity={0.1} 
            fill="url(#colorLow)" 
            activeDot={{ r: 6, stroke: 'var(--background)', strokeWidth: 2 }}
          />
          <Area 
            type="monotone" 
            dataKey="Medium" 
            name="Medium Usage Probability"
            stroke="hsl(180, 100%, 45%)" 
            strokeWidth={3}
            fillOpacity={0.1} 
            fill="url(#colorMed)" 
            activeDot={{ r: 6, stroke: 'var(--background)', strokeWidth: 2 }}
          />
          <Area 
            type="monotone" 
            dataKey="High" 
            name="High Usage Probability"
            stroke="hsl(40, 95%, 60%)" 
            strokeWidth={3}
            fillOpacity={0.1} 
            fill="url(#colorHigh)" 
            activeDot={{ r: 6, stroke: 'var(--background)', strokeWidth: 2 }}
          />
          <Area 
            type="monotone" 
            dataKey="Addiction" 
            name="Addiction Risk Probability"
            stroke="hsl(0, 85%, 60%)" 
            strokeWidth={4}
            fillOpacity={0.2} 
            fill="url(#colorAddict)" 
            activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

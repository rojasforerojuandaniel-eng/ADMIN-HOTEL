'use client';

import { motion } from 'framer-motion';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Activity } from 'lucide-react';

// ============================================
// MOCK DATA PARA EL GRÁFICO
// ============================================

const chartData = [
  { day: 'Lun', ingresos: 8500000, entropia: 15, reservas: 6 },
  { day: 'Mar', ingresos: 11200000, entropia: 12, reservas: 9 },
  { day: 'Mié', ingresos: 9800000, entropia: 18, reservas: 7 },
  { day: 'Jue', ingresos: 15600000, entropia: 10, reservas: 12 },
  { day: 'Vie', ingresos: 18200000, entropia: 8, reservas: 15 },
  { day: 'Sáb', ingresos: 24500000, entropia: 5, reservas: 22 },
  { day: 'Dom', ingresos: 21000000, entropia: 6, reservas: 19 },
];

// ============================================
// TOOLTIP PERSONALIZADO
// ============================================

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-2xl">
        <p className="text-sm font-semibold text-foreground mb-3">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-8 mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground">{entry.name}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {entry.name === 'Ingresos' 
                ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(entry.value)
                : entry.value
              }
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// ============================================
// REVENUE CHART COMPONENT
// ============================================

export function RevenueChart() {
  const totalRevenue = chartData.reduce((acc, curr) => acc + curr.ingresos, 0);
  const avgEntropy = Math.round(chartData.reduce((acc, curr) => acc + curr.entropia, 0) / chartData.length);
  const totalReservations = chartData.reduce((acc, curr) => acc + curr.reservas, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="bg-card/50 border-border/50 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Ingresos vs Entropía Operativa
          </CardTitle>
          <Badge variant="outline" className="text-xs text-violet-400 border-violet-500/30">
            <Activity className="w-3 h-3 mr-1" />
            Tiempo Real
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Resumen de Métricas */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Ingresos</p>
              <p className="text-lg font-semibold text-cyan-400">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Entropía Promedio</p>
              <p className="text-lg font-semibold text-violet-400">{avgEntropy}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Reservas</p>
              <p className="text-lg font-semibold text-emerald-400">{totalReservations}</p>
            </div>
          </div>

          {/* Gráfico */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="ingresos"
                  stroke="hsl(180, 100%, 50%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(180, 100%, 50%)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(180, 100%, 50%)', strokeWidth: 2 }}
                  name="Ingresos"
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="entropia"
                  stroke="hsl(280, 100%, 60%)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'hsl(280, 100%, 60%)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(280, 100%, 60%)', strokeWidth: 2 }}
                  name="Entropía"
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Nota de Entropía */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-400" />
              <span className="text-xs text-muted-foreground">Entropía Operativa: Medida del caos en el sistema</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs text-muted-foreground">Ingresos: Métrica financiera del hotel</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity, Shield, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNexusStore, useCurrentBranch, useOccupancyRate, useActiveReservations } from '@/lib/nexus-store';
import { HealthScore } from './health-score';
import { RevenueChart } from './revenue-chart';

// ============================================
// ANIMACIONES
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// ============================================
// KPI CARD
// ============================================

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  color: string;
  delay: number;
}

function KPICard({ title, value, change, icon: Icon, color, delay }: KPICardProps) {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      <Card className="relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300 bg-card/50 border-border/50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 rounded-xl bg-${color}-500/10 ${color === 'emerald' ? 'text-emerald-400' : color === 'violet' ? 'text-violet-400' : color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}`}>
              <Icon className="w-5 h-5" />
            </div>
            <Badge variant="outline" className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? '+' : ''}{change}%
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
            <p className={`text-3xl font-bold ${color === 'emerald' ? 'text-emerald-400' : color === 'violet' ? 'text-violet-400' : color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}`}>
              {value}
            </p>
          </div>
        </CardContent>
        <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </Card>
    </motion.div>
  );
}

// ============================================
// GLOBAL COMMAND CENTER
// ============================================

export function GlobalCommandCenter() {
  const updateTime = useNexusStore((state) => state.updateTime);
  const metrics = useNexusStore((state) => state.metrics);
  const currentBranch = useCurrentBranch();
  const occupancyRate = useOccupancyRate();
  const activeReservations = useActiveReservations();

  // KPIs
  const revpar = metrics.find((m) => m.type === 'revpar')?.value || 0;
  const occupancy = Math.round(occupancyRate);
  const revenue = metrics.find((m) => m.type === 'revenue')?.value || 0;
  const satisfaction = metrics.find((m) => m.type === 'satisfaction')?.value || 0;

  const revparChange = metrics.find((m) => m.type === 'revpar')?.change || 0;
  const occupancyChange = metrics.find((m) => m.type === 'occupancy')?.change || 0;
  const revenueChange = metrics.find((m) => m.type === 'revenue')?.change || 0;
  const satisfactionChange = metrics.find((m) => m.type === 'satisfaction')?.change || 0;

  // Formato de moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gradient bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Global Command Center
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Dashboard Holístico & Homeostasis • {currentBranch.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-500/30">
            <Zap className="w-3 h-3 mr-1.5" />
            LIVE
          </Badge>
          <Badge variant="outline" className="text-xs text-violet-400 border-violet-500/30">
            <Shield className="w-3 h-3 mr-1.5" />
            HOMEOSTASIS
          </Badge>
        </div>
      </div>

      {/* KPIs Superiores */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KPICard
          title="RevPAR Predictivo"
          value={formatCurrency(revpar)}
          change={revparChange}
          icon={TrendingUp}
          color="emerald"
          delay={0}
        />
        <KPICard
          title="Tasa de Ocupación"
          value={`${occupancy}%`}
          change={occupancyChange}
          icon={Users}
          color="violet"
          delay={0.1}
        />
        <KPICard
          title="Ingresos Hoy"
          value={formatCurrency(revenue)}
          change={revenueChange}
          icon={DollarSign}
          color="cyan"
          delay={0.2}
        />
        <KPICard
          title="Satisfacción"
          value={`${satisfaction}%`}
          change={satisfactionChange}
          icon={Activity}
          color="amber"
          delay={0.3}
        />
      </motion.div>

      {/* Health Score y Gráfico Principal */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Health Score */}
        <HealthScore />

        {/* Gráfico Principal */}
        <RevenueChart />
      </div>

      {/* Alertas y Notificaciones */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-6"
      >
        {/* Alertas Activas */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Alertas Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-400">Aire Acondicionado Fallando</p>
                  <p className="text-xs text-muted-foreground mt-1">Habitación 302 • Reportado por IoT</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <div className="w-2 h-2 rounded-full bg-rose-400 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-rose-400">Huésped VIP Reporta Ruido</p>
                  <p className="text-xs text-muted-foreground mt-1">Habitación 201 • Prioridad Alta</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen del Sistema */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              Resumen del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Reservas Activas</p>
                <p className="text-2xl font-bold text-cyan-400">{activeReservations.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Habitaciones Libres</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {useNexusStore.getState().rooms.filter((r) => r.status === 'available').length}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">En Limpieza</p>
                <p className="text-2xl font-bold text-violet-400">
                  {useNexusStore.getState().rooms.filter((r) => r.status === 'cleaning').length}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">En Mantenimiento</p>
                <p className="text-2xl font-bold text-rose-400">
                  {useNexusStore.getState().rooms.filter((r) => r.status === 'maintenance').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, Activity, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface HealthScoreProps {
  className?: string;
}

// ============================================
// ANILLO DE PROGRESO
// ============================================

interface ProgressRingProps {
  value: number;
  size: number;
  strokeWidth: number;
  color: string;
  label: string;
  sublabel?: string;
}

function ProgressRing({ value, size, strokeWidth, color, label, sublabel }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const colorClasses = {
    emerald: 'stroke-emerald-400',
    violet: 'stroke-violet-400',
    cyan: 'stroke-cyan-400',
    amber: 'stroke-amber-400',
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className={`transform -rotate-90 ${colorClasses[color as keyof typeof colorClasses]}`}>
        <circle
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="opacity-20"
        />
        <motion.circle
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="drop-shadow-lg"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-bold text-white">{Math.round(value)}</p>
        <p className="text-xs text-muted-foreground block mt-1">{label}</p>
        {sublabel && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{sublabel}</p>
        )}
      </div>
    </div>
  );
}

// ============================================
// HEALTH SCORE COMPONENT
// ============================================

export function HealthScore({ className }: HealthScoreProps) {
  const healthScore = 87;
  const financialScore = 92;
  const operationalScore = 84;
  const guestSatisfaction = 94;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'emerald';
    if (score >= 75) return 'violet';
    if (score >= 60) return 'amber';
    return 'rose';
  };

  return (
    <Card className={`bg-card/50 border-border/50 ${className}`}>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          Health Score (Homeostasis)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          {/* Score Principal */}
          <ProgressRing
            value={healthScore}
            size={120}
            strokeWidth={12}
            color={getScoreColor(healthScore)}
            label="Health"
            sublabel="Sistema"
          />

          {/* Métricas Secundarias */}
          <div className="flex-1 space-y-4">
            {/* Financiero */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Financiero</span>
                <span className="font-medium text-emerald-400">{financialScore}%</span>
              </div>
              <Progress value={financialScore} className="h-1.5" />
            </div>

            {/* Operativo */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Operativo</span>
                <span className="font-medium text-violet-400">{operationalScore}%</span>
              </div>
              <Progress value={operationalScore} className="h-1.5" />
            </div>

            {/* Satisfacción */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Satisfacción</span>
                <span className="font-medium text-cyan-400">{guestSatisfaction}%</span>
              </div>
              <Progress value={guestSatisfaction} className="h-1.5" />
            </div>

            {/* Homeostasis */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Homeostasis</span>
                <span className="font-medium text-amber-400">{healthScore}%</span>
              </div>
              <Progress value={healthScore} className="h-1.5" />
            </div>
          </div>
        </div>

        {/* Indicadores de Estado */}
        <div className="mt-6 pt-6 border-t border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-muted-foreground">Sistema Estable</span>
            </div>
            <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/30">
              <Activity className="w-3 h-3 mr-1" />
              Homeostasis Activa
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

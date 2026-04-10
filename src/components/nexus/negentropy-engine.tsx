'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Zap, AlertCircle, CheckCircle, Clock, Bot, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNexusStore, useUnresolvedEntropy } from '@/lib/nexus-store';

// ============================================
// TIPOS
// ============================================

interface EntropyItemProps {
  item: any;
  onResolve: (id: string) => void;
}

// ============================================
// ENTROPY ITEM
// ============================================

function EntropyItem({ item, onResolve }: EntropyItemProps) {
  const [isResolving, setIsResolving] = useState(false);
  const [progress, setProgress] = useState(0);

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'text-emerald-400',
      medium: 'text-amber-400',
      high: 'text-rose-400',
      urgent: 'text-rose-500',
    };
    return colors[severity as keyof typeof colors] || 'text-gray-400';
  };

  const getSeverityBg = (severity: string) => {
    const colors = {
      low: 'bg-emerald-500/10 border-emerald-500/20',
      medium: 'bg-amber-500/10 border-amber-500/20',
      high: 'bg-rose-500/10 border-rose-500/20',
      urgent: 'bg-rose-500/20 border-rose-500/40',
    };
    return colors[severity as keyof typeof colors] || 'bg-gray-500/10 border-gray-500/20';
  };

  const getIcon = (type: string) => {
    const icons = {
      maintenance: AlertCircle,
      complaint: AlertCircle,
      overbooking: AlertCircle,
      cleaning_delay: Clock,
    };
    return icons[type as keyof typeof icons] || AlertCircle;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      maintenance: 'Mantenimiento',
      complaint: 'Queja',
      overbooking: 'Overbooking',
      cleaning_delay: 'Atraso Limpieza',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const handleResolve = async () => {
    setIsResolving(true);
    
    // Simular proceso de IA
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    onResolve(item.id);
    setIsResolving(false);
    setProgress(0);
  };

  const Icon = getIcon(item.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg border ${getSeverityBg(item.severity)} relative overflow-hidden`}
    >
      {isResolving && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center space-y-3">
            <Bot className="w-8 h-8 text-cyan-400 animate-pulse mx-auto" />
            <p className="text-sm font-medium text-foreground">IA Auto-Resolviendo...</p>
            <Progress value={progress} className="w-48 h-1.5" />
          </div>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${getSeverityColor(item.severity)} bg-opacity-10`}>
            <Icon className={`w-4 h-4 ${getSeverityColor(item.severity)}`} />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`text-xs ${getSeverityColor(item.severity)} border-current/20`}>
                {getTypeLabel(item.type)}
              </Badge>
              {item.room && (
                <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-500/30">
                  {item.room}
                </Badge>
              )}
            </div>

            <p className="text-sm font-medium text-foreground">{item.description}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{new Intl.RelativeTimeFormat('es-CO', { numeric: 'auto' }).format(
                  Math.floor((new Date().getTime() - new Date(item.timestamp).getTime()) / 60000),
                  'minute'
                )}</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span className={`capitalize ${getSeverityColor(item.severity)}`}>
                  {item.severity === 'urgent' ? 'Urgente' : 
                   item.severity === 'high' ? 'Alta' :
                   item.severity === 'medium' ? 'Media' : 'Baja'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleResolve}
          disabled={isResolving}
          className="shrink-0 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white border-0"
          size="sm"
        >
          {isResolving ? (
            <Bot className="w-4 h-4 mr-2 animate-pulse" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          Auto-Resolver
        </Button>
      </div>
    </motion.div>
  );
}

// ============================================
// MOTOR DE NEGENTROPÍA
// ============================================

export function NegentropyEngine() {
  const entropyItems = useUnresolvedEntropy();
  const resolveEntropyItem = useNexusStore((state) => state.resolveEntropyItem);

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-400" />
            Motor de Negentropía
          </CardTitle>
          <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/30">
            <Sparkles className="w-3 h-3 mr-1" />
            IA Auto-Resolver
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Feed de Fricción</p>
              <p className="text-xs text-muted-foreground mt-1">
                La entropía es el caos. La IA lo resuelve automáticamente.
              </p>
            </div>
            <Badge variant="outline" className="text-xs text-rose-400 border-rose-500/30">
              {entropyItems.length} Pendientes
            </Badge>
          </div>

          {/* Feed de Entropía */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {entropyItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
                  <p className="text-sm font-medium text-foreground">¡Sistema en Homeostasis!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No hay problemas de entropía pendientes
                  </p>
                </motion.div>
              ) : (
                entropyItems.map((item) => (
                  <EntropyItem
                    key={item.id}
                    item={item}
                    onResolve={resolveEntropyItem}
                  />
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Estadísticas de Negentropía */}
          <div className="pt-6 border-t border-border/30">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">94%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Resueltos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">2.3s</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Tiempo Promedio</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-violet-400">0</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Errores</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Target, Network, Activity, ArrowUp, ArrowDown, LayoutGrid, Sprout, Layers, GitBranch, RefreshCw, BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// ============================================
// PRINCIPIOS DE TEORÍA DE SISTEMAS
// ============================================

const principles = [
  {
    id: 'holistic',
    name: 'Holismo',
    icon: Target,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10 border-cyan-500/20',
    description: 'El sistema es más que la suma de sus partes',
    application: 'RHYNODE NEXUS integra todas las áreas del hotel en una sola plataforma: reservas, habitaciones, huéspedes, pagos y mantenimiento forman un TODO integrado.',
  },
  {
    id: 'synergy',
    name: 'Sinergia',
    icon: Network,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    description: 'Los componentes trabajando juntos crean un efecto mayor',
    application: 'La IA de Negentropía combina datos de IoT, quejas de huéspedes y disponibilidad de habitaciones para resolver problemas automáticamente, superando la capacidad humana.',
  },
  {
    id: 'homeostasis',
    name: 'Homeostasis',
    icon: Activity,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10 border-violet-500/20',
    description: 'Tendencia a mantener el equilibrio interno',
    application: 'El Health Score monitorea constantemente métricas financieras, operativas y de satisfacción. Cuando detecta desequilibrios (entropía), activa procesos automáticos de corrección.',
  },
  {
    id: 'entropy',
    name: 'Entropía',
    icon: ArrowUp,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10 border-rose-500/20',
    description: 'Tendencia natural al desorden',
    application: 'RHYNODE NEXUS identifica automáticamente puntos de fricción: retrasos en limpieza, quejas de huéspedes, overbooking. Cada incidente aumenta la entropía del sistema.',
  },
  {
    id: 'negentropy',
    name: 'Negentropía',
    icon: ArrowDown,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
    description: 'Proceso ordenador que contrarresta la entropía',
    application: 'El Motor de Negentropía usa IA para reasignar habitaciones, enviar SMS automáticos de disculpa, generar tickets de mantenimiento y restaurar el orden.',
  },
  {
    id: 'equifinality',
    name: 'Equifinalidad',
    icon: RefreshCw,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
    description: 'Múltiples caminos para alcanzar el mismo objetivo',
    application: 'El Omni-Channel Inbox demuestra que una reserva puede llegar vía Booking.com, Airbnb, Web, WhatsApp o Teléfono. Todos terminan en el mismo resultado: una reserva confirmada.',
  },
  {
    id: 'hierarchy',
    name: 'Jerarquía',
    icon: Layers,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20',
    description: 'Estructura de niveles y sub-sistemas',
    application: 'RHYNODE NEXUS tiene 4 niveles: Hotel (nivel 1) → Pisos (nivel 2) → Habitaciones (nivel 3) → Amenidades (nivel 4). Cada nivel tiene roles específicos.',
  },
  {
    id: 'organicity',
    name: 'Organicidad',
    icon: Sprout,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/20',
    description: 'Los sistemas crecen y se adaptan como organismos',
    application: 'El Control IoT de Habitaciones muestra biometría en tiempo real: temperatura, luces, DND. Las habitaciones "respiran" y se adaptan al huésped.',
  },
  {
    id: 'multifinality',
    name: 'Multifinalidad',
    icon: GitBranch,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10 border-indigo-500/20',
    description: 'Un mismo input puede generar múltiples outputs',
    application: 'Una sola reserva genera múltiples outputs: confirmación al huésped, bloqueo de habitación, notificación al personal, actualización de ocupación, cálculo de ingresos.',
  },
  {
    id: 'adaptability',
    name: 'Adaptabilidad',
    icon: RefreshCw,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10 border-teal-500/20',
    description: 'Capacidad de ajustarse al entorno',
    application: 'RHYNODE NEXUS aprende de patrones: si hay más reservas en temporada alta, ajusta tarifas automáticamente. Se adapta al comportamiento de los huéspedes.',
  },
];

// ============================================
// PRINCIPLE CARD
// ============================================

interface PrincipleCardProps {
  principle: typeof principles[0];
  index: number;
}

function PrincipleCard({ principle, index }: PrincipleCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = principle.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className={`p-4 rounded-xl border cursor-pointer ${principle.bgColor} space-y-3 transition-all duration-300`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${principle.color} bg-opacity-10`}>
                <Icon className={`w-5 h-5 ${principle.color}`} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{principle.name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {principle.description}
                </p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${principle.color} bg-opacity-10`}>
              <Icon className={`w-6 h-6 ${principle.color}`} />
            </div>
            <div>
              <DialogTitle className={`text-2xl ${principle.color}`}>
                {principle.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Principio de Teoría de Sistemas
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Descripción */}
          <div className={`p-4 rounded-lg ${principle.bgColor}`}>
            <p className="text-sm font-medium text-foreground">
              {principle.description}
            </p>
          </div>

          {/* Aplicación en RHYNODE NEXUS */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Aplicación en RHYNODE NEXUS
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {principle.application}
            </p>
          </div>

          {/* Ejemplo Práctico */}
          <div className="pt-4 border-t border-border/30">
            <Badge variant="outline" className={`text-xs ${principle.color} border-current/20`}>
              Ejemplo Práctico
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Este principio se aplica diariamente en el sistema, permitiendo que RHYNODE NEXUS funcione de manera eficiente y adaptativa.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// TEORÍA DE SISTEMAS ACADÉMICA
// ============================================

export function SystemsTheory() {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-400" />
            Teoría de Sistemas
          </CardTitle>
          <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-500/30">
            Panel Académico
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Los 10 Principios</p>
              <p className="text-xs text-muted-foreground mt-1">
                RHYNODE NEXUS es la aplicación magistral de la Teoría General de Sistemas
              </p>
            </div>
            <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/30">
              10 Principios
            </Badge>
          </div>

          {/* Grid de Principios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {principles.map((principle, index) => (
              <PrincipleCard
                key={principle.id}
                principle={principle}
                index={index}
              />
            ))}
          </div>

          {/* Resumen */}
          <div className="pt-6 border-t border-border/30">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">100%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                  Implementado
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-violet-400">10</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                  Principios
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">∞</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                  Adaptabilidad
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

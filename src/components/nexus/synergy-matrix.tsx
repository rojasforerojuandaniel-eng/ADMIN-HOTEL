'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock, MapPin, User, CreditCard, Bed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNexusStore } from '@/lib/nexus-store';

// ============================================
// UTILIDADES
// ============================================

const getDaysInMonth = () => 30;
const getChannelIcon = (channel: string) => {
  const icons: Record<string, React.ReactNode> = {
    booking: '🏨',
    airbnb: '🏠',
    web: '🌐',
    whatsapp: '💬',
    phone: '📞',
  };
  return icons[channel] || '📋';
};

const getChannelColor = (channel: string) => {
  const colors: Record<string, string> = {
    booking: 'bg-blue-500',
    airbnb: 'bg-rose-500',
    web: 'bg-cyan-500',
    whatsapp: 'bg-emerald-500',
    phone: 'bg-amber-500',
  };
  return colors[channel] || 'bg-gray-500';
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    confirmed: 'bg-blue-500',
    pending: 'bg-amber-500',
    checked_in: 'bg-emerald-500',
    checked_out: 'bg-gray-500',
    cancelled: 'bg-rose-500',
  };
  return colors[status] || 'bg-gray-500';
};

const getStatusBadge = (status: string) => {
  const badges: Record<string, { label: string; color: string }> = {
    confirmed: { label: 'Confirmada', color: 'text-blue-400' },
    pending: { label: 'Pendiente', color: 'text-amber-400' },
    checked_in: { label: 'Check-in', color: 'text-emerald-400' },
    checked_out: { label: 'Check-out', color: 'text-gray-400' },
    cancelled: { label: 'Cancelada', color: 'text-rose-400' },
  };
  return badges[status] || { label: status, color: 'text-gray-400' };
};

// ============================================
// RESERVATION BLOCK (Tooltip)
// ============================================

interface ReservationBlockProps {
  reservation: any;
  left: number;
  width: number;
}

function ReservationBlock({ reservation, left, width }: ReservationBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const statusBadge = getStatusBadge(reservation.status);

  return (
    <TooltipProvider>
      <Tooltip open={isHovered}>
        <TooltipTrigger asChild>
          <motion.div
            className={`absolute top-1 bottom-1 rounded-md px-2 py-1 text-xs font-medium cursor-pointer border border-white/10 ${getStatusColor(reservation.status)} bg-opacity-20 hover:bg-opacity-30 transition-all`}
            style={{ left, width }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-1.5">
              <span>{getChannelIcon(reservation.channel)}</span>
              <span className="truncate">{reservation.guest.name.split(' ')[0]}</span>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-card/95 backdrop-blur-sm border border-border/50 p-4 shadow-2xl max-w-xs">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{reservation.guest.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{reservation.code}</p>
              </div>
              <Badge className={statusBadge.color}>{statusBadge.label}</Badge>
            </div>

            {/* Detalles */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Bed className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Habitación:</span>
                <span className="font-medium text-foreground">{reservation.room}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Fechas:</span>
                <span className="font-medium text-foreground">
                  {new Date(reservation.checkIn).toLocaleDateString()} - {new Date(reservation.checkOut).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Piso:</span>
                <span className="font-medium text-foreground">{reservation.floor}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">{String(getChannelIcon(reservation.channel))}</span>
                <span className="font-medium text-foreground capitalize">{reservation.channel}</span>
              </div>
            </div>

            {/* Pago */}
            <div className="flex items-center justify-between pt-2 border-t border-border/30">
              <div className="flex items-center gap-2 text-xs">
                <CreditCard className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Total:</span>
              </div>
              <span className="font-bold text-cyan-400">
                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(reservation.total)}
              </span>
            </div>

            {/* VIP Badge */}
            {reservation.guest.vip && (
              <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                <Badge className="text-xs text-violet-400 bg-violet-500/10 border-violet-500/30">
                  <User className="w-3 h-3 mr-1" />
                  VIP
                </Badge>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ============================================
// MATRIZ DE SINERGIA (Gantt Chart)
// ============================================

export function SynergyMatrix() {
  const rooms = useNexusStore((state) => state.rooms);
  const reservations = useNexusStore((state) => state.reservations);
  const daysInMonth = getDaysInMonth();

  // Agrupar habitaciones por piso
  const roomsByFloor = rooms.reduce((acc, room) => {
    if (!acc[room.floor]) {
      acc[room.floor] = [];
    }
    acc[room.floor].push(room);
    return acc;
  }, {} as Record<number, typeof rooms>);

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            Matriz de Sinergia (Gantt Chart)
          </CardTitle>
          <Badge variant="outline" className="text-xs text-violet-400 border-violet-500/30">
            Jerarquía Habitacional
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Header con días del mes */}
          <div className="flex">
            <div className="w-32 flex-shrink-0" />
            <div className="flex-1 grid grid-cols-30 gap-0.5">
              {Array.from({ length: daysInMonth }, (_, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] text-muted-foreground">{i + 1}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calendario por piso */}
          {Object.entries(roomsByFloor)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([floor, floorRooms]) => (
              <div key={floor} className="space-y-2">
                {/* Label del piso */}
                <div className="flex items-center gap-2">
                  <div className="w-32 flex-shrink-0">
                    <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-500/30">
                      Piso {floor}
                    </Badge>
                  </div>
                  <div className="flex-1 border-t border-border/30" />
                </div>

                {/* Habitaciones del piso */}
                <div className="space-y-1">
                  {floorRooms.map((room) => {
                    // Encontrar reservas para esta habitación
                    const roomReservations = reservations.filter((r) => r.room === room.number);

                    return (
                      <div key={room.id} className="flex items-center gap-2">
                        {/* Número de habitación */}
                        <div className="w-32 flex-shrink-0 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            room.status === 'available' ? 'bg-emerald-400' :
                            room.status === 'occupied' ? 'bg-cyan-400' :
                            room.status === 'cleaning' ? 'bg-amber-400' :
                            room.status === 'maintenance' ? 'bg-rose-400' :
                            'bg-gray-400'
                          }`} />
                          <span className="text-xs font-medium text-foreground">{room.number}</span>
                        </div>

                        {/* Timeline */}
                        <div className="flex-1 relative h-8 bg-card/30 rounded-md border border-border/30 overflow-hidden">
                          {/* Líneas de día */}
                          <div className="absolute inset-0 grid grid-cols-30 gap-0.5">
                            {Array.from({ length: daysInMonth }, (_, i) => (
                              <div key={i} className="border-r border-border/10" />
                            ))}
                          </div>

                          {/* Reservas */}
                          <AnimatePresence>
                            {roomReservations.map((reservation) => {
                              const startDay = reservation.checkIn.getDate();
                              const endDay = reservation.checkOut.getDate();
                              const days = endDay - startDay;
                              const left = ((startDay - 1) / daysInMonth) * 100;
                              const width = (days / daysInMonth) * 100;

                              return (
                                <motion.div
                                  key={reservation.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ReservationBlock
                                    reservation={reservation}
                                    left={left}
                                    width={width}
                                  />
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>

        {/* Leyenda */}
        <div className="flex items-center justify-center gap-6 pt-6 border-t border-border/30 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span className="text-xs text-muted-foreground">Confirmada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-500" />
            <span className="text-xs text-muted-foreground">Pendiente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Check-in</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-violet-500" />
            <span className="text-xs text-muted-foreground">VIP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

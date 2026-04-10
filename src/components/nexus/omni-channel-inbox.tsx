'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, Phone, MessageCircle, Home, Building2, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNexusStore } from '@/lib/nexus-store';

// ============================================
// UTILIDADES
// ============================================

const getChannelIcon = (channel: string) => {
  const icons = {
    booking: <Building2 className="w-4 h-4" />,
    airbnb: <Home className="w-4 h-4" />,
    web: <Globe className="w-4 h-4" />,
    whatsapp: <MessageCircle className="w-4 h-4" />,
    phone: <Phone className="w-4 h-4" />,
  };
  return icons[channel as keyof typeof icons] || <Globe className="w-4 h-4" />;
};

const getChannelColor = (channel: string) => {
  const colors = {
    booking: 'bg-blue-500',
    airbnb: 'bg-rose-500',
    web: 'bg-cyan-500',
    whatsapp: 'bg-emerald-500',
    phone: 'bg-amber-500',
  };
  return colors[channel as keyof typeof colors] || 'bg-gray-500';
};

const getChannelName = (channel: string) => {
  const names = {
    booking: 'Booking.com',
    airbnb: 'Airbnb',
    web: 'Web Propia',
    whatsapp: 'WhatsApp IA',
    phone: 'Teléfono',
  };
  return names[channel as keyof typeof names] || channel;
};

const getStatusColor = (status: string) => {
  const colors = {
    confirmed: 'text-blue-400',
    pending: 'text-amber-400',
    checked_in: 'text-emerald-400',
    checked_out: 'text-gray-400',
    cancelled: 'text-rose-400',
  };
  return colors[status as keyof typeof colors] || 'text-gray-400';
};

const getStatusLabel = (status: string) => {
  const labels = {
    confirmed: 'Confirmada',
    pending: 'Pendiente',
    checked_in: 'Check-in',
    checked_out: 'Check-out',
    cancelled: 'Cancelada',
  };
  return labels[status as keyof typeof labels] || status;
};

// ============================================
// OMNI-CHANNEL INBOX
// ============================================

export function OmniChannelInbox() {
  const reservations = useNexusStore((state) => state.reservations);
  const updateReservationStatus = useNexusStore((state) => state.updateReservationStatus);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterChannel, setFilterChannel] = useState('all');

  // Filtrado
  const filteredReservations = reservations.filter((res) => {
    const matchesSearch = searchTerm === '' ||
      res.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.room.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || res.status === filterStatus;
    const matchesChannel = filterChannel === 'all' || res.channel === filterChannel;

    return matchesSearch && matchesStatus && matchesChannel;
  });

  const handleApproveAll = () => {
    filteredReservations
      .filter((r) => r.status === 'pending')
      .forEach((r) => updateReservationStatus(r.id, 'confirmed'));
  };

  const handleRejectAll = () => {
    filteredReservations
      .filter((r) => r.status === 'pending')
      .forEach((r) => updateReservationStatus(r.id, 'cancelled'));
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Omni-Channel Inbox
          </CardTitle>
          <Badge variant="outline" className="text-xs text-violet-400 border-violet-500/30">
            Equifinalidad
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Bandeja de Entrada Unificada</p>
              <p className="text-xs text-muted-foreground mt-1">
                Múltiples canales, mismo objetivo: Reservas
              </p>
            </div>
            <Badge variant="outline" className="text-xs text-amber-400 border-amber-500/30">
              {filteredReservations.filter((r) => r.status === 'pending').length} Pendientes
            </Badge>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar huésped, código o habitación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="confirmed">Confirmada</SelectItem>
                <SelectItem value="checked_in">Check-in</SelectItem>
                <SelectItem value="checked_out">Check-out</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterChannel} onValueChange={setFilterChannel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los canales</SelectItem>
                <SelectItem value="booking">Booking.com</SelectItem>
                <SelectItem value="airbnb">Airbnb</SelectItem>
                <SelectItem value="web">Web Propia</SelectItem>
                <SelectItem value="whatsapp">WhatsApp IA</SelectItem>
                <SelectItem value="phone">Teléfono</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botones de Acción */}
          {filteredReservations.some((r) => r.status === 'pending') && (
            <div className="flex gap-2">
              <Button
                onClick={handleApproveAll}
                variant="outline"
                size="sm"
                className="text-xs text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
              >
                <CheckCircle className="w-3 h-3 mr-2" />
                Aprobar Todas
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                size="sm"
                className="text-xs text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
              >
                <XCircle className="w-3 h-3 mr-2" />
                Rechazar Todas
              </Button>
            </div>
          )}

          {/* Tabla de Reservas */}
          <div className="space-y-2">
            {filteredReservations.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">No hay reservas</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {searchTerm || filterStatus !== 'all' || filterChannel !== 'all'
                    ? 'Ajusta los filtros para ver más resultados'
                    : 'No hay reservas disponibles'}
                </p>
              </div>
            ) : (
              filteredReservations.map((reservation) => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border/30 hover:border-cyan-500/30 transition-colors bg-card/30"
                >
                  {/* Canal */}
                  <div className={`p-2 rounded-lg ${getChannelColor(reservation.channel)} bg-opacity-10 shrink-0`}>
                    <div className={`${getChannelColor(reservation.channel).replace('bg-', 'text-')}`}>
                      {getChannelIcon(reservation.channel)}
                    </div>
                  </div>

                  {/* Huésped y Código */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">
                        {reservation.guest.name}
                      </p>
                      {reservation.guest.vip && (
                        <Badge variant="outline" className="text-[10px] text-violet-400 border-violet-500/30">
                          VIP
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{reservation.code}</p>
                  </div>

                  {/* Habitación y Fechas */}
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{reservation.room}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {reservation.checkIn.getDate()}/{reservation.checkIn.getMonth() + 1} - {reservation.checkOut.getDate()}/{reservation.checkOut.getMonth() + 1}
                    </p>
                  </div>

                  {/* Valor */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-cyan-400">
                      {formatCurrency(reservation.total, reservation.currency)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {reservation.currency}
                    </p>
                  </div>

                  {/* Estado */}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getStatusColor(reservation.status)} border-current/20`}>
                      {getStatusLabel(reservation.status)}
                    </Badge>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Resumen de Canales */}
          <div className="pt-6 border-t border-border/30">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {reservations.filter((r) => r.channel === 'booking').length}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Booking</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-rose-400">
                  {reservations.filter((r) => r.channel === 'airbnb').length}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Airbnb</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">
                  {reservations.filter((r) => r.channel === 'web').length}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Web Propia</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">
                  {reservations.filter((r) => r.channel === 'whatsapp').length}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">WhatsApp</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">
                  {reservations.filter((r) => r.channel === 'phone').length}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Teléfono</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bed, Thermometer, Lightbulb, Moon, Wrench, User, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useNexusStore } from '@/lib/nexus-store';

// ============================================
// ROOM CARD
// ============================================

interface RoomCardProps {
  room: any;
}

function RoomCard({ room }: RoomCardProps) {
  const toggleLights = useNexusStore((state) => state.toggleRoomLights);
  const toggleDND = useNexusStore((state) => state.toggleRoomDND);
  const updateTemperature = useNexusStore((state) => state.updateRoomTemperature);
  const requestCleaning = useNexusStore((state) => state.updateRoomStatus);

  const getStatusColor = (status: string) => {
    const colors = {
      available: 'text-emerald-400',
      occupied: 'text-cyan-400',
      cleaning: 'text-amber-400',
      maintenance: 'text-rose-400',
      dnd: 'text-violet-400',
    };
    return colors[status as keyof typeof colors] || 'text-gray-400';
  };

  const getStatusBg = (status: string) => {
    const colors = {
      available: 'bg-emerald-500/10 border-emerald-500/20',
      occupied: 'bg-cyan-500/10 border-cyan-500/20',
      cleaning: 'bg-amber-500/10 border-amber-500/20',
      maintenance: 'bg-rose-500/10 border-rose-500/20',
      dnd: 'bg-violet-500/10 border-violet-500/20',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/10 border-gray-500/20';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      available: 'Disponible',
      occupied: 'Ocupada',
      cleaning: 'Limpieza',
      maintenance: 'Mantenimiento',
      dnd: 'No Molestar',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 18) return 'text-blue-400';
    if (temp < 22) return 'text-cyan-400';
    if (temp < 24) return 'text-emerald-400';
    if (temp < 26) return 'text-amber-400';
    return 'text-rose-400';
  };

  const handleToggleLights = () => {
    toggleLights(room.id);
  };

  const handleToggleDND = () => {
    toggleDND(room.id);
  };

  const handleRequestCleaning = () => {
    requestCleaning(room.id, 'cleaning');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className={`p-4 rounded-xl border ${getStatusBg(room.status)} space-y-3`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${getStatusColor(room.status)} bg-opacity-10`}>
            <Bed className={`w-4 h-4 ${getStatusColor(room.status)}`} />
          </div>
          <div>
            <p className="font-semibold text-foreground">{room.number}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {room.type.replace('_', ' ')}
            </p>
          </div>
        </div>
        <Badge variant="outline" className={`text-xs ${getStatusColor(room.status)} border-current/20`}>
          {getStatusLabel(room.status)}
        </Badge>
      </div>

      {/* Biometría IoT */}
      <div className="space-y-2">
        {/* Temperatura */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Temperatura</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${getTemperatureColor(room.temperature)}`}>
              {room.temperature}°C
            </span>
            <div className="w-16">
              <Progress value={(room.temperature / 30) * 100} className="h-1" />
            </div>
          </div>
        </div>

        {/* Luces */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className={`w-3 h-3 ${room.lights ? 'text-amber-400' : 'text-gray-400'}`} />
            <span className="text-xs text-muted-foreground">Luces</span>
          </div>
          <Switch
            checked={room.lights}
            onCheckedChange={handleToggleLights}
            className="data-[state=checked]:bg-cyan-500"
          />
        </div>

        {/* DND */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className={`w-3 h-3 ${room.dnd ? 'text-violet-400' : 'text-gray-400'}`} />
            <span className="text-xs text-muted-foreground">No Molestar</span>
          </div>
          <Switch
            checked={room.dnd}
            onCheckedChange={handleToggleDND}
            className="data-[state=checked]:bg-violet-500"
          />
        </div>
      </div>

      {/* Huésped VIP */}
      {room.guest && room.guest.vip && (
        <div className="flex items-center gap-2 pt-2 border-t border-border/30">
          <Shield className="w-3 h-3 text-violet-400" />
          <span className="text-xs font-medium text-violet-400">Huésped VIP</span>
        </div>
      )}

      {/* Botón de Limpieza */}
      {room.status === 'available' && (
        <Button
          onClick={handleRequestCleaning}
          variant="outline"
          size="sm"
          className="w-full text-xs text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
        >
          Solicitar Limpieza Express
        </Button>
      )}
    </motion.div>
  );
}

// ============================================
// CONTROL IOT DE HABITACIONES
// ============================================

export function IoTControl() {
  const rooms = useNexusStore((state) => state.rooms);

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
            <Shield className="w-4 h-4 text-cyan-400" />
            Control IoT de Habitaciones
          </CardTitle>
          <Badge variant="outline" className="text-xs text-violet-400 border-violet-500/30">
            Organicidad
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Biometría Habitacional</p>
              <p className="text-xs text-muted-foreground mt-1">
                Control en tiempo real de temperatura, luces y estado
              </p>
            </div>
            <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/30">
              {rooms.filter((r) => r.status === 'available').length} Disponibles
            </Badge>
          </div>

          {/* Grid de habitaciones por piso */}
          {Object.entries(roomsByFloor)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([floor, floorRooms]) => (
              <div key={floor} className="space-y-3">
                {/* Label del piso */}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-500/30">
                    Piso {floor}
                  </Badge>
                  <div className="flex-1 h-px bg-border/30" />
                </div>

                {/* Habitaciones del piso */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {floorRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              </div>
            ))}

          {/* Resumen IoT */}
          <div className="pt-6 border-t border-border/30">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">
                  {rooms.filter((r) => r.status === 'available').length}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Disponibles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">
                  {rooms.filter((r) => r.status === 'occupied').length}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Ocupadas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">
                  {rooms.filter((r) => r.status === 'cleaning').length}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">En Limpieza</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-violet-400">
                  {rooms.filter((r) => r.dnd).length}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">DND Activo</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

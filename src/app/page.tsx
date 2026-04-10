'use client';

import { useState, useEffect } from 'react';
import { Hotel, Bed, Calendar, TrendingUp, Activity, BookOpen, Bell, Settings, Search, Zap, AlertTriangle, Building2, Plus, Shield, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data inline
const branches = [
  { id: 'bog', name: 'Rhynode Bogotá', rooms: 45 },
  { id: 'gir', name: 'Rhynode Girardot', rooms: 28 },
];

const metrics = [
  { id: 'm1', name: 'RevPAR', value: '$285,000', change: '+7.5%' },
  { id: 'm2', name: 'Ocupación', value: '78%', change: '+8.3%' },
  { id: 'm3', name: 'Ingresos Hoy', value: '$12.4M', change: '+11.2%' },
  { id: 'm4', name: 'Reservas', value: '8', change: '+33%' },
];

const rooms = [
  { id: 'r1', number: '101', type: 'Sencilla', floor: 1, status: 'available', price: 180000 },
  { id: 'r2', number: '102', type: 'Sencilla', floor: 1, status: 'occupied', price: 180000, guest: 'Carlos Mendoza' },
  { id: 'r3', number: '103', type: 'Doble', floor: 1, status: 'cleaning', price: 280000 },
  { id: 'r4', number: '201', type: 'Suite Jr', floor: 2, status: 'occupied', price: 450000, guest: 'María López' },
  { id: 'r5', number: '202', type: 'Suite Jr', floor: 2, status: 'available', price: 450000 },
  { id: 'r6', number: '203', type: 'Suite', floor: 2, status: 'maintenance', price: 650000 },
  { id: 'r7', number: '301', type: 'Presidencial', floor: 3, status: 'occupied', price: 1200000, guest: 'Roberto Vargas' },
  { id: 'r8', number: '302', type: 'Presidencial', floor: 3, status: 'available', price: 1200000 },
];

const reservations = [
  { id: 'res1', code: 'RHN-2024-0847', guest: 'Carlos Mendoza', room: '102', checkIn: '2024-12-20', status: 'checked_in', total: 565320 },
  { id: 'res2', code: 'RHN-2024-0852', guest: 'María López', room: '201', checkIn: '2024-12-21', status: 'checked_in', total: 1878600 },
  { id: 'res3', code: 'RHN-2024-0863', guest: 'Andrés Torres', room: '204', checkIn: '2024-12-22', status: 'confirmed', total: 1517600 },
  { id: 'res4', code: 'RHN-2024-0871', guest: 'Roberto Vargas', room: '301', checkIn: '2024-12-22', status: 'checked_in', total: 6486800 },
  { id: 'res5', code: 'RHN-2024-0878', guest: 'Laura Gómez', room: '303', checkIn: '2024-12-23', status: 'pending', total: 1402000 },
];

const entropyItems = [
  { id: 'e1', desc: 'Fuga de agua en baño habitación 203', severity: 'high', time: '10:30' },
  { id: 'e2', desc: 'Limpieza habitación 103 atrasada 45 min', severity: 'medium', time: '10:15' },
  { id: 'e3', desc: 'Check-out tardío solicitado hab. 201', severity: 'low', time: '10:00' },
];

const negentropyItems = [
  { id: 'n1', desc: 'Reasignar huésped hab. 205 a 202', status: 'completed', time: '10:35' },
  { id: 'n2', desc: 'Priorizar limpieza hab. 103', status: 'executing', time: '10:20' },
];

const statusColors: Record<string, string> = {
  available: 'bg-emerald-500/20 text-emerald-400',
  occupied: 'bg-sky-500/20 text-sky-400',
  cleaning: 'bg-amber-500/20 text-amber-400',
  maintenance: 'bg-rose-500/20 text-rose-400',
};

const statusLabels: Record<string, string> = {
  available: 'Disponible',
  occupied: 'Ocupada',
  cleaning: 'Limpieza',
  maintenance: 'Mantenimiento',
};

const reservationColors: Record<string, string> = {
  checked_in: 'bg-emerald-500/20 text-emerald-400',
  confirmed: 'bg-sky-500/20 text-sky-400',
  pending: 'bg-amber-500/20 text-amber-400',
};

export default function RhynodePMS() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [branch, setBranch] = useState('bog');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Hotel className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg">Rhynode</span>
              <Badge variant="outline" className="text-[10px]">PMS</Badge>
            </div>
            
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-[180px] h-8 bg-muted/50">
                <Building2 className="w-3 h-3 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {branches.map(b => (
                  <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 max-w-sm mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-9 h-8 bg-muted/50" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono mr-2">
              {time.toLocaleTimeString('es-CO')}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-medium text-white ml-2">JD</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-muted/30 border p-1">
            <TabsTrigger value="dashboard"><TrendingUp className="w-4 h-4 mr-2" />Dashboard</TabsTrigger>
            <TabsTrigger value="calendar"><Calendar className="w-4 h-4 mr-2" />Calendario</TabsTrigger>
            <TabsTrigger value="rooms"><Bed className="w-4 h-4 mr-2" />Habitaciones</TabsTrigger>
            <TabsTrigger value="reservations"><BookOpen className="w-4 h-4 mr-2" />Reservas</TabsTrigger>
            <TabsTrigger value="system"><Activity className="w-4 h-4 mr-2" />Sistema</TabsTrigger>
            <TabsTrigger value="theory"><Target className="w-4 h-4 mr-2" />Teoría</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map(m => (
                <Card key={m.id} className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{m.name}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-semibold">{m.value}</span>
                      <span className="text-xs text-emerald-500">{m.change}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    Health Score (Homeostasis)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-8">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-28 h-28 -rotate-90">
                        <circle cx="56" cy="56" r="48" fill="none" stroke="oklch(0.2 0.01 270)" strokeWidth="10" />
                        <circle cx="56" cy="56" r="48" fill="none" stroke="oklch(0.7 0.15 160)" strokeWidth="10" strokeDasharray="262 262" strokeLinecap="round" />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-2xl font-bold">87</span>
                        <span className="text-xs block text-muted-foreground">Health</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[['Financiero', 92], ['Operativo', 84], ['Ocupación', 78], ['Satisfacción', 94]].map(([l, v]) => (
                        <div key={l}>
                          <div className="flex justify-between text-sm"><span className="text-muted-foreground">{l}</span><span>{v}%</span></div>
                          <Progress value={v} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Bell className="w-4 h-4" />Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[180px]">
                    <div className="space-y-2">
                      <div className="p-2 rounded border-l-2 border-rose-500 bg-rose-500/5 text-sm">
                        <p className="font-medium">Overbooking Detectado</p>
                        <p className="text-xs text-muted-foreground">Habitación 205</p>
                      </div>
                      <div className="p-2 rounded border-l-2 border-emerald-500 bg-emerald-500/5 text-sm">
                        <p className="font-medium">Auto-Resolución OK</p>
                        <p className="text-xs text-muted-foreground">Mantenimiento 203</p>
                      </div>
                      <div className="p-2 rounded border-l-2 border-sky-500 bg-sky-500/5 text-sm">
                        <p className="font-medium">Nueva Reserva</p>
                        <p className="text-xs text-muted-foreground">RHN-2024-0899</p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Calendar */}
          <TabsContent value="calendar">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Calendario Gantt</CardTitle>
                <CardDescription>Vista de ocupación por habitación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="min-w-[600px]">
                    <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-1 mb-2">
                      <div className="text-xs text-muted-foreground p-2">Hab.</div>
                      {Array.from({ length: 7 }).map((_, i) => {
                        const d = new Date();
                        d.setDate(d.getDate() + i);
                        return <div key={i} className="text-center p-2 text-xs"><span className="text-muted-foreground">{d.toLocaleDateString('es-CO', { weekday: 'short' })}</span> <span className="block font-medium">{d.getDate()}</span></div>;
                      })}
                    </div>
                    {rooms.slice(0, 6).map(r => (
                      <div key={r.id} className="grid grid-cols-[60px_repeat(7,1fr)] gap-1 mb-1">
                        <div className="p-2 text-sm font-medium bg-muted/30 rounded">{r.number}</div>
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div key={i} className="h-8 border border-border/30 rounded bg-muted/10" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms */}
          <TabsContent value="rooms" className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-emerald-500/20 text-emerald-400">Disponibles: {rooms.filter(r => r.status === 'available').length}</Badge>
              <Badge className="bg-sky-500/20 text-sky-400">Ocupadas: {rooms.filter(r => r.status === 'occupied').length}</Badge>
              <Badge className="bg-amber-500/20 text-amber-400">Limpieza: {rooms.filter(r => r.status === 'cleaning').length}</Badge>
              <Badge className="bg-rose-500/20 text-rose-400">Mantenimiento: {rooms.filter(r => r.status === 'maintenance').length}</Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rooms.map(r => (
                <Card key={r.id} className={`border-l-2 ${r.status === 'available' ? 'border-l-emerald-500' : r.status === 'occupied' ? 'border-l-sky-500' : r.status === 'cleaning' ? 'border-l-amber-500' : 'border-l-rose-500'} bg-card/50`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{r.number}</span>
                      <Badge variant="outline" className={`text-xs ${statusColors[r.status]}`}>{statusLabels[r.status]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.type} • Piso {r.floor}</p>
                    <p className="font-medium mt-2">${r.price.toLocaleString('es-CO')}/noche</p>
                    {r.guest && <p className="text-xs text-muted-foreground mt-1">👤 {r.guest}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reservations */}
          <TabsContent value="reservations">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Reservas</CardTitle>
                    <CardDescription>Múltiples orígenes (Equifinalidad)</CardDescription>
                  </div>
                  <Button size="sm"><Plus className="w-4 h-4 mr-1" />Nueva</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-3 text-xs uppercase text-muted-foreground">Código</th>
                        <th className="text-left p-3 text-xs uppercase text-muted-foreground">Huésped</th>
                        <th className="text-left p-3 text-xs uppercase text-muted-foreground">Hab.</th>
                        <th className="text-left p-3 text-xs uppercase text-muted-foreground">Estado</th>
                        <th className="text-right p-3 text-xs uppercase text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map(r => (
                        <tr key={r.id} className="border-b border-border/30 hover:bg-muted/20">
                          <td className="p-3 font-mono">{r.code}</td>
                          <td className="p-3">{r.guest}</td>
                          <td className="p-3">{r.room}</td>
                          <td className="p-3"><Badge variant="outline" className={reservationColors[r.status]}>{r.status.replace('_', ' ')}</Badge></td>
                          <td className="p-3 text-right font-medium">${r.total.toLocaleString('es-CO')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-rose-500" />Puntos de Entropía</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {entropyItems.map(e => (
                      <div key={e.id} className="p-3 rounded bg-rose-500/5 border border-rose-500/20">
                        <div className="flex justify-between mb-1">
                          <Badge variant="outline" className="text-xs text-rose-400">{e.severity}</Badge>
                          <span className="text-xs text-muted-foreground">{e.time}</span>
                        </div>
                        <p className="text-sm">{e.desc}</p>
                        <Button size="sm" className="h-6 text-xs mt-2 bg-emerald-600 hover:bg-emerald-700"><Zap className="w-3 h-3 mr-1" />Auto-Resolver</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-500" />Acciones de Negentropía</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {negentropyItems.map(n => (
                      <div key={n.id} className="p-3 rounded bg-emerald-500/5 border border-emerald-500/20">
                        <div className="flex justify-between mb-1">
                          <Badge variant="outline" className="text-xs text-emerald-400">{n.status}</Badge>
                          <span className="text-xs text-muted-foreground">{n.time}</span>
                        </div>
                        <p className="text-sm">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Theory */}
          <TabsContent value="theory" className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Teoría de Sistemas</h1>
              <p className="text-muted-foreground">10 principios aplicados a la gestión hotelera</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ['HOLÍSTICO', 'Visión Completa', 'Dashboard con métricas interconectadas'],
                ['SINERGIA', 'Partes Interconectadas', 'El sistema es más que la suma'],
                ['HOMEOSTASIS', 'Equilibrio Dinámico', 'Health Score mide estabilidad'],
                ['ENTROPÍA', 'Medición del Caos', 'Detección de friction points'],
                ['NEGENTROPÍA', 'Orden desde el Caos', 'Acciones auto-correctivas'],
                ['JERARQUÍA', 'Estructura en Niveles', 'Gestión multi-sede'],
              ].map(([p, t, d]) => (
                <Card key={p} className="bg-card/50 border-border/50 hover:border-emerald-500/30 transition-colors">
                  <CardHeader className="pb-2">
                    <span className="text-xs font-mono text-muted-foreground">{p}</span>
                    <CardTitle className="text-lg">{t}</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{d}</p></CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ============================================
// RHYNODE NEXUS - ESTADO GLOBAL (SIN PERSIST)
// ============================================

import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

// ============================================
// TIPOS
// ============================================

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  vip: boolean;
  preferences: string[];
}

export interface Reservation {
  id: string;
  code: string;
  guest: Guest;
  room: string;
  floor: number;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'checked_in' | 'checked_out' | 'cancelled';
  channel: 'booking' | 'airbnb' | 'web' | 'whatsapp' | 'phone';
  total: number;
  currency: 'COP' | 'USD';
  paid: number;
  origin?: string;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  type: 'SINGLE' | 'DOUBLE' | 'SUITE' | 'SUITE_JR' | 'PRESIDENTIAL';
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'dnd';
  temperature: number;
  lights: boolean;
  dnd: boolean;
  guest?: Guest;
  price: number;
}

export interface EntropyItem {
  id: string;
  type: 'maintenance' | 'complaint' | 'overbooking' | 'cleaning_delay';
  room?: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'urgent';
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  timestamp: string;
}

export interface SystemMetric {
  id: string;
  type: 'revpar' | 'occupancy' | 'revenue' | 'reservations' | 'satisfaction';
  value: number;
  change: number;
  timestamp: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  rooms: number;
}

// ============================================
// STORE PRINCIPAL
// ============================================

interface NexusStore {
  currentBranch: string;
  activeTab: string;
  time: string;
  branches: Branch[];
  rooms: Room[];
  reservations: Reservation[];
  entropyItems: EntropyItem[];
  metrics: SystemMetric[];
  setCurrentBranch: (branchId: string) => void;
  setActiveTab: (tab: string) => void;
  updateTime: () => void;
  addReservation: (reservation: Reservation) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  updateRoomStatus: (id: string, status: Room['status']) => void;
  toggleRoomLights: (id: string) => void;
  toggleRoomDND: (id: string) => void;
  updateRoomTemperature: (id: string, temp: number) => void;
  addEntropyItem: (item: Omit<EntropyItem, 'id' | 'resolved' | 'timestamp'>) => void;
  resolveEntropyItem: (id: string) => void;
  updateMetrics: () => void;
}

// ============================================
// DATOS MOCK (TIMESTAMPS ESTÁTICOS PARA EVITAR HYDRATION MISMATCH)
// ============================================

const mockBranches: Branch[] = [
  { id: 'bog', name: 'Rhynode Hotel Bogotá', location: 'Zona T, Bogotá', rooms: 45 },
  { id: 'gir', name: 'Rhynode Resort Girardot', location: 'Río Magdalena, Girardot', rooms: 28 },
];

const mockGuests: Guest[] = [
  { id: 'g1', name: 'Carlos Mendoza', email: 'carlos.m@email.com', phone: '+57 300 123 4567', vip: false, preferences: ['Ala alta', 'Sin ruido'] },
  { id: 'g2', name: 'María López', email: 'maria.l@email.com', phone: '+57 310 234 5678', vip: true, preferences: ['Clima frío', 'Toallas extras'] },
  { id: 'g3', name: 'Andrés Torres', email: 'andres.t@email.com', phone: '+57 320 345 6789', vip: false, preferences: ['Cerca del ascensor'] },
  { id: 'g4', name: 'Roberto Vargas', email: 'roberto.v@email.com', phone: '+57 300 456 7890', vip: true, preferences: ['Servicio VIP', 'Champagne'] },
  { id: 'g5', name: 'Laura Gómez', email: 'laura.g@email.com', phone: '+57 310 567 8901', vip: false, preferences: ['Vista ciudad'] },
];

const mockRooms: Room[] = [
  { id: 'r1', number: '101', floor: 1, type: 'SINGLE', status: 'available', temperature: 22, lights: false, dnd: false, price: 180000 },
  { id: 'r2', number: '102', floor: 1, type: 'SINGLE', status: 'occupied', temperature: 21, lights: true, dnd: true, guest: mockGuests[0], price: 180000 },
  { id: 'r3', number: '103', floor: 1, type: 'DOUBLE', status: 'cleaning', temperature: 20, lights: true, dnd: false, price: 280000 },
  { id: 'r4', number: '104', floor: 1, type: 'DOUBLE', status: 'available', temperature: 22, lights: false, dnd: false, price: 280000 },
  { id: 'r5', number: '201', floor: 2, type: 'SUITE_JR', status: 'occupied', temperature: 22, lights: false, dnd: false, guest: mockGuests[1], price: 450000 },
  { id: 'r6', number: '202', floor: 2, type: 'SUITE_JR', status: 'available', temperature: 23, lights: false, dnd: false, price: 450000 },
  { id: 'r7', number: '203', floor: 2, type: 'SUITE', status: 'maintenance', temperature: 19, lights: false, dnd: false, price: 650000 },
  { id: 'r8', number: '204', floor: 2, type: 'SUITE', status: 'available', temperature: 22, lights: false, dnd: false, price: 650000 },
  { id: 'r9', number: '301', floor: 3, type: 'PRESIDENTIAL', status: 'occupied', temperature: 20, lights: true, dnd: true, guest: mockGuests[3], price: 1200000 },
  { id: 'r10', number: '302', floor: 3, type: 'PRESIDENTIAL', status: 'available', temperature: 22, lights: false, dnd: false, price: 1200000 },
  { id: 'r11', number: '303', floor: 3, type: 'PRESIDENTIAL', status: 'available', temperature: 22, lights: false, dnd: false, price: 1200000 },
  { id: 'r12', number: '304', floor: 3, type: 'PRESIDENTIAL', status: 'available', temperature: 22, lights: false, dnd: false, price: 1200000 },
];

const mockReservations: Reservation[] = [
  { id: 'res1', code: 'RHN-2024-0847', guest: mockGuests[0], room: '102', floor: 1, checkIn: '2024-12-20', checkOut: '2024-12-23', status: 'checked_in', channel: 'web', total: 565320, paid: 565320, currency: 'COP' },
  { id: 'res2', code: 'RHN-2024-0852', guest: mockGuests[1], room: '201', floor: 2, checkIn: '2024-12-21', checkOut: '2024-12-25', status: 'checked_in', channel: 'booking', total: 1878600, paid: 1878600, currency: 'COP' },
  { id: 'res3', code: 'RHN-2024-0863', guest: mockGuests[2], room: '204', floor: 2, checkIn: '2024-12-22', checkOut: '2024-12-26', status: 'confirmed', channel: 'airbnb', total: 1517600, paid: 0, currency: 'COP' },
  { id: 'res4', code: 'RHN-2024-0871', guest: mockGuests[3], room: '301', floor: 3, checkIn: '2024-12-22', checkOut: '2024-12-28', status: 'checked_in', channel: 'whatsapp', total: 6486800, paid: 6486800, currency: 'COP' },
  { id: 'res5', code: 'RHN-2024-0878', guest: mockGuests[4], room: '303', floor: 3, checkIn: '2024-12-23', checkOut: '2024-12-27', status: 'pending', channel: 'phone', total: 1402000, paid: 0, currency: 'COP' },
];

// Timestamps estáticos — NO usar new Date() aquí para evitar hydration mismatch
const mockEntropy: EntropyItem[] = [
  { id: 'e1', type: 'maintenance', room: '302', description: 'Aire Acondicionado fallando (Reportado por IoT)', severity: 'high', resolved: false, timestamp: '2024-12-22T14:00:00.000Z' },
  { id: 'e2', type: 'cleaning_delay', room: '103', description: 'Limpieza habitación 103 atrasada 45 min', severity: 'medium', resolved: false, timestamp: '2024-12-22T12:00:00.000Z' },
  { id: 'e3', type: 'complaint', room: '201', description: 'Huésped VIP reporta ruido excesivo', severity: 'high', resolved: false, timestamp: '2024-12-22T13:00:00.000Z' },
];

const mockMetrics: SystemMetric[] = [
  { id: 'm1', type: 'revpar', value: 285000, change: 7.5, timestamp: '2024-12-22T15:00:00.000Z' },
  { id: 'm2', type: 'occupancy', value: 78, change: 8.3, timestamp: '2024-12-22T15:00:00.000Z' },
  { id: 'm3', type: 'revenue', value: 12400000, change: 11.2, timestamp: '2024-12-22T15:00:00.000Z' },
  { id: 'm4', type: 'reservations', value: 8, change: 33, timestamp: '2024-12-22T15:00:00.000Z' },
  { id: 'm5', type: 'satisfaction', value: 94, change: 2.1, timestamp: '2024-12-22T15:00:00.000Z' },
];

// ============================================
// STORE (SIN PERSIST - SIN PROBLEMAS SSR)
// ============================================

export const useNexusStore = create<NexusStore>()((set) => ({
  currentBranch: 'bog',
  activeTab: 'dashboard',
  time: '', // Se inicializa en el cliente via updateTime()
  branches: mockBranches,
  rooms: mockRooms,
  reservations: mockReservations,
  entropyItems: mockEntropy,
  metrics: mockMetrics,

  setCurrentBranch: (branchId) => set({ currentBranch: branchId }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  updateTime: () => set({ time: new Date().toISOString() }),

  addReservation: (reservation) => set((state) => ({
    reservations: [...state.reservations, reservation],
  })),

  updateReservationStatus: (id, status) => set((state) => ({
    reservations: state.reservations.map((r) => r.id === id ? { ...r, status } : r),
  })),

  updateRoomStatus: (id, status) => set((state) => ({
    rooms: state.rooms.map((r) => r.id === id ? { ...r, status } : r),
  })),

  toggleRoomLights: (id) => set((state) => ({
    rooms: state.rooms.map((r) => r.id === id ? { ...r, lights: !r.lights } : r),
  })),

  toggleRoomDND: (id) => set((state) => ({
    rooms: state.rooms.map((r) => r.id === id ? { ...r, dnd: !r.dnd } : r),
  })),

  updateRoomTemperature: (id, temp) => set((state) => ({
    rooms: state.rooms.map((r) => r.id === id ? { ...r, temperature: temp } : r),
  })),

  addEntropyItem: (item) => set((state) => ({
    entropyItems: [...state.entropyItems, { ...item, id: `e${Date.now()}`, resolved: false, timestamp: new Date().toISOString() }],
  })),

  resolveEntropyItem: (id) => set((state) => ({
    entropyItems: state.entropyItems.map((e) => e.id === id ? { ...e, resolved: true, resolvedBy: 'AI Auto-Resolver', resolvedAt: new Date().toISOString() } : e),
  })),

  updateMetrics: () => set((state) => ({
    metrics: state.metrics.map((m) => ({ ...m, value: m.value * (1 + Math.random() * 0.02 - 0.01) })),
  })),
}));

// ============================================
// SELECTORES (con useShallow para evitar re-renders infinitos)
// ============================================

export const useCurrentBranch = () => useNexusStore((state) => {
  const branch = state.branches.find((b) => b.id === state.currentBranch);
  return branch || state.branches[0];
});

// Primitivo — no necesita shallow
export const useOccupancyRate = () => useNexusStore((state) => {
  const occupied = state.rooms.filter((r) => r.status === 'occupied').length;
  return (occupied / state.rooms.length) * 100;
});

// Array — usar useShallow para shallow comparison
export const useActiveReservations = () =>
  useNexusStore(useShallow((state) =>
    state.reservations.filter((r) => r.status === 'confirmed' || r.status === 'checked_in')
  ));

export const useUnresolvedEntropy = () =>
  useNexusStore(useShallow((state) =>
    state.entropyItems.filter((e) => !e.resolved)
  ));

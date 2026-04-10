// ============================================
// RHYNODE PMS - TYPES & INTERFACES
// Teoría de Sistemas Aplicada
// ============================================

// Estados de habitación (Estado orgánico)
export type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'reserved';

// Estados de reserva
export type ReservationStatus = 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show';

// Origen de reserva (EQUIFINALIDAD)
export type BookingSource = 'direct_web' | 'booking_com' | 'airbnb' | 'expedia' | 'mercadopago' | 'phone' | 'walk_in';

// Tipo de habitación
export type RoomType = 'single' | 'double' | 'suite' | 'junior_suite' | 'presidential' | 'family';

// Tipos de notificación
export type NotificationType = 'entropy' | 'negentropy' | 'info' | 'warning' | 'success';

// ============================================
// INTERFACES
// ============================================

export interface HotelBranch {
  id: string;
  name: string;
  location: string;
  code: string;
  rooms: number;
  isActive: boolean;
}

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  floor: number;
  status: RoomStatus;
  basePrice: number;
  capacity: number;
  amenities: string[];
  currentGuest?: string;
  cleaningDue?: Date;
  maintenanceNotes?: string;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: 'CC' | 'CE' | 'PP' | 'TI';
  documentNumber: string;
  nationality: string;
  vip: boolean;
  totalStays: number;
  totalSpent: number;
}

export interface Reservation {
  id: string;
  code: string;
  guest: Guest;
  roomId: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  guests: number;
  status: ReservationStatus;
  source: BookingSource;
  roomRate: number;
  extras: number;
  discount: number;
  taxes: number;
  total: number;
  paid: boolean;
  notes?: string;
  createdAt: Date;
}

export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
}

export interface HealthScore {
  overall: number;
  financial: number;
  operational: number;
  occupancy: number;
  satisfaction: number;
  lastUpdated: Date;
}

export interface EntropyMetric {
  id: string;
  type: 'overbooking' | 'late_checkout' | 'cleaning_delay' | 'maintenance' | 'payment_issue' | 'no_show';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  roomNumber?: string;
  reservationCode?: string;
  timestamp: Date;
  autoResolvable: boolean;
  resolved: boolean;
}

export interface NegentropyAction {
  id: string;
  type: 'room_reassignment' | 'cleaning_priority' | 'maintenance_escalation' | 'guest_compensation' | 'price_adjustment';
  description: string;
  triggeredBy: string;
  timestamp: Date;
  status: 'pending' | 'executing' | 'completed';
  impact: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionable: boolean;
  actionLabel?: string;
  actionData?: any;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
  rooms: number;
  avgRate: number;
}

export interface EntropyHistory {
  date: string;
  entropy: number;
  negentropy: number;
  balance: number;
}

// ============================================
// LABELS & CONSTANTS
// ============================================

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  single: 'Sencilla',
  double: 'Doble',
  suite: 'Suite',
  junior_suite: 'Suite Junior',
  presidential: 'Presidencial',
  family: 'Familiar',
};

export const ROOM_STATUS_LABELS: Record<RoomStatus, string> = {
  available: 'Disponible',
  occupied: 'Ocupada',
  cleaning: 'En Limpieza',
  maintenance: 'Mantenimiento',
  reserved: 'Reservada',
};

export const BOOKING_SOURCE_LABELS: Record<BookingSource, string> = {
  direct_web: 'Web Directa',
  booking_com: 'Booking.com',
  airbnb: 'Airbnb',
  expedia: 'Expedia',
  mercadopago: 'Mercado Pago',
  phone: 'Teléfono',
  walk_in: 'Walk-in',
};

export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  checked_in: 'Check-in',
  checked_out: 'Check-out',
  cancelled: 'Cancelada',
  no_show: 'No Show',
};

export const ENTROPY_TYPE_LABELS: Record<string, string> = {
  overbooking: 'Overbooking',
  late_checkout: 'Check-out Tardío',
  cleaning_delay: 'Limpieza Atrasada',
  maintenance: 'Mantenimiento Urgente',
  payment_issue: 'Problema de Pago',
  no_show: 'No Show',
};

// ============================================
// COLORS
// ============================================

export const ROOM_STATUS_COLORS: Record<RoomStatus, string> = {
  available: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  occupied: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  cleaning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  maintenance: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  reserved: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

export const BOOKING_SOURCE_COLORS: Record<BookingSource, string> = {
  direct_web: 'bg-emerald-500/20 text-emerald-400',
  booking_com: 'bg-blue-500/20 text-blue-400',
  airbnb: 'bg-rose-500/20 text-rose-400',
  expedia: 'bg-amber-500/20 text-amber-400',
  mercadopago: 'bg-sky-500/20 text-sky-400',
  phone: 'bg-violet-500/20 text-violet-400',
  walk_in: 'bg-gray-500/20 text-gray-400',
};

export const SEVERITY_COLORS: Record<string, string> = {
  low: 'text-sky-400',
  medium: 'text-amber-400',
  high: 'text-orange-400',
  critical: 'text-rose-400',
};

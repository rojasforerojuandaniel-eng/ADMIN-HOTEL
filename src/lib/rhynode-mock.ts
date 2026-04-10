// ============================================
// RHYNODE PMS - MOCK DATA
// Datos realistas para demostración
// ============================================

import { 
  HotelBranch, Room, Guest, Reservation, 
  SystemMetric, HealthScore, EntropyMetric, 
  NegentropyAction, Notification, DailyRevenue,
  EntropyHistory
} from './rhynode-data';

// ============================================
// SUCURSALES (JERARQUÍA - SMC)
// ============================================

export const hotelBranches: HotelBranch[] = [
  { id: 'bog-001', name: 'Rhynode Hotel Bogotá', location: 'Bogotá, Colombia', code: 'RHN-BOG', rooms: 45, isActive: true },
  { id: 'gir-001', name: 'Rhynode Hotel Girardot', location: 'Girardot, Colombia', code: 'RHN-GIR', rooms: 28, isActive: true },
  { id: 'med-001', name: 'Rhynode Hotel Medellín', location: 'Medellín, Colombia', code: 'RHN-MED', rooms: 52, isActive: false },
];

// ============================================
// HABITACIONES
// ============================================

export const rooms: Room[] = [
  // Piso 1
  { id: 'r101', number: '101', type: 'single', floor: 1, status: 'available', basePrice: 180000, capacity: 1, amenities: ['WiFi', 'TV', 'AC', 'Baño Privado'] },
  { id: 'r102', number: '102', type: 'single', floor: 1, status: 'occupied', basePrice: 180000, capacity: 1, amenities: ['WiFi', 'TV', 'AC', 'Baño Privado'], currentGuest: 'Carlos Mendoza' },
  { id: 'r103', number: '103', type: 'double', floor: 1, status: 'cleaning', basePrice: 280000, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Caja Fuerte'] },
  { id: 'r104', number: '104', type: 'double', floor: 1, status: 'available', basePrice: 280000, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Caja Fuerte'] },
  { id: 'r105', number: '105', type: 'double', floor: 1, status: 'reserved', basePrice: 280000, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Balcón'] },
  
  // Piso 2
  { id: 'r201', number: '201', type: 'junior_suite', floor: 2, status: 'occupied', basePrice: 450000, capacity: 2, amenities: ['WiFi', 'Smart TV', 'AC', 'Minibar', 'Sala', 'Balcón'], currentGuest: 'María Fernanda López' },
  { id: 'r202', number: '202', type: 'junior_suite', floor: 2, status: 'available', basePrice: 450000, capacity: 2, amenities: ['WiFi', 'Smart TV', 'AC', 'Minibar', 'Sala', 'Balcón'] },
  { id: 'r203', number: '203', type: 'suite', floor: 2, status: 'maintenance', basePrice: 650000, capacity: 3, amenities: ['WiFi', 'Smart TV', 'AC', 'Minibar', 'Jacuzzi', 'Sala', 'Comedor'], maintenanceNotes: 'Fuga en tubería del baño' },
  { id: 'r204', number: '204', type: 'suite', floor: 2, status: 'occupied', basePrice: 650000, capacity: 3, amenities: ['WiFi', 'Smart TV', 'AC', 'Minibar', 'Jacuzzi', 'Sala', 'Comedor'], currentGuest: 'Andrés Felipe Torres' },
  { id: 'r205', number: '205', type: 'family', floor: 2, status: 'cleaning', basePrice: 380000, capacity: 4, amenities: ['WiFi', 'Smart TV', 'AC', 'Minibar', '2 Baños', 'Sala'] },
  
  // Piso 3
  { id: 'r301', number: '301', type: 'presidential', floor: 3, status: 'occupied', basePrice: 1200000, capacity: 4, amenities: ['WiFi', 'Smart TV 65"', 'AC', 'Minibar Premium', 'Jacuzzi', 'Sauna', 'Terraza', 'Mayordomo'], currentGuest: 'Roberto Carlos Vargas' },
  { id: 'r302', number: '302', type: 'presidential', floor: 3, status: 'available', basePrice: 1200000, capacity: 4, amenities: ['WiFi', 'Smart TV 65"', 'AC', 'Minibar Premium', 'Jacuzzi', 'Sauna', 'Terraza', 'Mayordomo'] },
  { id: 'r303', number: '303', type: 'suite', floor: 3, status: 'occupied', basePrice: 650000, capacity: 3, amenities: ['WiFi', 'Smart TV', 'AC', 'Minibar', 'Jacuzzi', 'Sala'], currentGuest: 'Laura Valentina Gómez' },
  { id: 'r304', number: '304', type: 'junior_suite', floor: 3, status: 'available', basePrice: 450000, capacity: 2, amenities: ['WiFi', 'Smart TV', 'AC', 'Minibar', 'Sala', 'Balcón'] },
  { id: 'r305', number: '305', type: 'double', floor: 3, status: 'reserved', basePrice: 280000, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Vista Panorámica'] },
];

// ============================================
// HUÉSPEDES
// ============================================

export const guests: Guest[] = [
  { id: 'g001', firstName: 'Carlos', lastName: 'Mendoza Ruiz', email: 'carlos.mendoza@email.com', phone: '+57 310 123 4567', documentType: 'CC', documentNumber: '1023456789', nationality: 'Colombiana', vip: false, totalStays: 3, totalSpent: 2450000 },
  { id: 'g002', firstName: 'María Fernanda', lastName: 'López García', email: 'mafe.lopez@empresa.co', phone: '+57 315 234 5678', documentType: 'CC', documentNumber: '1034567890', nationality: 'Colombiana', vip: true, totalStays: 12, totalSpent: 18750000 },
  { id: 'g003', firstName: 'Andrés Felipe', lastName: 'Torres', email: 'andres.torres@gmail.com', phone: '+57 320 345 6789', documentType: 'CC', documentNumber: '1045678901', nationality: 'Colombiana', vip: true, totalStays: 8, totalSpent: 12300000 },
  { id: 'g004', firstName: 'Roberto Carlos', lastName: 'Vargas', email: 'rc.vargas@executive.com', phone: '+57 318 456 7890', documentType: 'PP', documentNumber: 'AB123456', nationality: 'Colombiana', vip: true, totalStays: 5, totalSpent: 15600000 },
  { id: 'g005', firstName: 'Laura Valentina', lastName: 'Gómez', email: 'laura.gomez@outlook.com', phone: '+57 312 567 8901', documentType: 'CC', documentNumber: '1056789012', nationality: 'Colombiana', vip: false, totalStays: 2, totalSpent: 1950000 },
  { id: 'g006', firstName: 'Santiago', lastName: 'Rodríguez', email: 'santiago.r@icloud.com', phone: '+57 311 678 9012', documentType: 'CC', documentNumber: '1067890123', nationality: 'Colombiana', vip: false, totalStays: 1, totalSpent: 890000 },
  { id: 'g007', firstName: 'Isabella', lastName: 'Martínez', email: 'isa.martinez@gmail.com', phone: '+57 319 789 0123', documentType: 'CC', documentNumber: '1078901234', nationality: 'Colombiana', vip: false, totalStays: 4, totalSpent: 4200000 },
  { id: 'g008', firstName: 'Juan José', lastName: 'Hernández', email: 'jj.hernandez@correo.co', phone: '+57 313 890 1234', documentType: 'CC', documentNumber: '1089012345', nationality: 'Colombiana', vip: false, totalStays: 2, totalSpent: 1560000 },
];

// ============================================
// RESERVAS
// ============================================

const today = new Date();

export const reservations: Reservation[] = [
  {
    id: 'res001',
    code: 'RHN-2024-0847',
    guest: guests[0],
    roomId: 'r102',
    roomNumber: '102',
    checkIn: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
    checkOut: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
    nights: 3,
    guests: 1,
    status: 'checked_in',
    source: 'direct_web',
    roomRate: 180000,
    extras: 45000,
    discount: 0,
    taxes: 40320,
    total: 565320,
    paid: true,
    createdAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'res002',
    code: 'RHN-2024-0852',
    guest: guests[1],
    roomId: 'r201',
    roomNumber: '201',
    checkIn: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
    checkOut: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
    nights: 4,
    guests: 2,
    status: 'checked_in',
    source: 'booking_com',
    roomRate: 450000,
    extras: 120000,
    discount: 45000,
    taxes: 93600,
    total: 1878600,
    paid: true,
    createdAt: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'res003',
    code: 'RHN-2024-0863',
    guest: guests[2],
    roomId: 'r204',
    roomNumber: '204',
    checkIn: new Date(today.getTime()),
    checkOut: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    nights: 2,
    guests: 2,
    status: 'checked_in',
    source: 'airbnb',
    roomRate: 650000,
    extras: 85000,
    discount: 0,
    taxes: 132600,
    total: 1517600,
    paid: true,
    createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'res004',
    code: 'RHN-2024-0871',
    guest: guests[3],
    roomId: 'r301',
    roomNumber: '301',
    checkIn: new Date(today.getTime()),
    checkOut: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
    nights: 5,
    guests: 3,
    status: 'checked_in',
    source: 'direct_web',
    roomRate: 1200000,
    extras: 350000,
    discount: 120000,
    taxes: 256800,
    total: 6486800,
    paid: true,
    createdAt: new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'res005',
    code: 'RHN-2024-0878',
    guest: guests[4],
    roomId: 'r303',
    roomNumber: '303',
    checkIn: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
    checkOut: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
    nights: 2,
    guests: 2,
    status: 'confirmed',
    source: 'mercadopago',
    roomRate: 650000,
    extras: 0,
    discount: 65000,
    taxes: 117000,
    total: 1402000,
    paid: false,
    notes: 'Solicita habitación en piso alto',
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'res006',
    code: 'RHN-2024-0885',
    guest: guests[5],
    roomId: 'r105',
    roomNumber: '105',
    checkIn: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    checkOut: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000),
    nights: 2,
    guests: 2,
    status: 'confirmed',
    source: 'phone',
    roomRate: 280000,
    extras: 0,
    discount: 0,
    taxes: 50400,
    total: 610400,
    paid: true,
    createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'res007',
    code: 'RHN-2024-0892',
    guest: guests[6],
    roomId: 'r305',
    roomNumber: '305',
    checkIn: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
    checkOut: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000),
    nights: 3,
    guests: 2,
    status: 'pending',
    source: 'expedia',
    roomRate: 280000,
    extras: 0,
    discount: 28000,
    taxes: 50400,
    total: 862400,
    paid: false,
    createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'res008',
    code: 'RHN-2024-0899',
    guest: guests[7],
    roomId: 'r101',
    roomNumber: '101',
    checkIn: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
    checkOut: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
    nights: 2,
    guests: 1,
    status: 'pending',
    source: 'direct_web',
    roomRate: 180000,
    extras: 0,
    discount: 0,
    taxes: 32400,
    total: 392400,
    paid: false,
    createdAt: new Date(),
  },
];

// ============================================
// MÉTRICAS DEL SISTEMA
// ============================================

export const systemMetrics: SystemMetric[] = [
  { id: 'm1', name: 'RevPAR', value: 285000, previousValue: 265000, change: 20000, changePercent: 7.5, trend: 'up' },
  { id: 'm2', name: 'ADR', value: 380000, previousValue: 365000, change: 15000, changePercent: 4.1, trend: 'up' },
  { id: 'm3', name: 'Ocupación', value: 78, previousValue: 72, change: 6, changePercent: 8.3, trend: 'up' },
  { id: 'm4', name: 'Ingresos Hoy', value: 12450000, previousValue: 11200000, change: 1250000, changePercent: 11.2, trend: 'up' },
  { id: 'm5', name: 'Reservas Hoy', value: 8, previousValue: 6, change: 2, changePercent: 33.3, trend: 'up' },
  { id: 'm6', name: 'Cancelaciones', value: 2, previousValue: 4, change: -2, changePercent: -50, trend: 'down' },
];

// ============================================
// HEALTH SCORE (HOMEOSTASIS)
// ============================================

export const healthScore: HealthScore = {
  overall: 87,
  financial: 92,
  operational: 84,
  occupancy: 78,
  satisfaction: 94,
  lastUpdated: new Date(),
};

// ============================================
// ENTROPÍA (Friction Points)
// ============================================

export const entropyMetrics: EntropyMetric[] = [
  { id: 'e1', type: 'maintenance', description: 'Fuga de agua en baño de habitación 203', severity: 'high', roomNumber: '203', timestamp: new Date(today.getTime() - 2 * 60 * 60 * 1000), autoResolvable: true, resolved: false },
  { id: 'e2', type: 'cleaning_delay', description: 'Limpieza de habitación 103 atrasada 45 min', severity: 'medium', roomNumber: '103', timestamp: new Date(today.getTime() - 45 * 60 * 1000), autoResolvable: true, resolved: false },
  { id: 'e3', type: 'late_checkout', description: 'Check-out tardío solicitado en habitación 201', severity: 'low', roomNumber: '201', timestamp: new Date(today.getTime() - 30 * 60 * 1000), autoResolvable: true, resolved: false },
  { id: 'e4', type: 'overbooking', description: 'Doble reserva detectada para habitación 205', severity: 'critical', roomNumber: '205', timestamp: new Date(today.getTime() - 15 * 60 * 1000), autoResolvable: true, resolved: false },
  { id: 'e5', type: 'payment_issue', description: 'Pago pendiente de verificación - Reserva RHN-2024-0892', severity: 'medium', reservationCode: 'RHN-2024-0892', timestamp: new Date(today.getTime() - 60 * 60 * 1000), autoResolvable: false, resolved: false },
];

// ============================================
// NEGENTROPÍA (Auto-Resolution Actions)
// ============================================

export const negentropyActions: NegentropyAction[] = [
  { id: 'n1', type: 'room_reassignment', description: 'Reasignar huésped de hab. 205 a 202 por conflicto', triggeredBy: 'Sistema Automático', timestamp: new Date(), status: 'pending', impact: 'Resuelve overbooking' },
  { id: 'n2', type: 'cleaning_priority', description: 'Priorizar limpieza de hab. 103 para check-in 2pm', triggeredBy: 'Motor de Decisión', timestamp: new Date(), status: 'executing', impact: 'Evita retraso en check-in' },
  { id: 'n3', type: 'maintenance_escalation', description: 'Escalar reparación tubería hab. 203 a urgente', triggeredBy: 'IA Predictiva', timestamp: new Date(), status: 'completed', impact: 'Previene daño mayor' },
];

// ============================================
// NOTIFICACIONES
// ============================================

export const notifications: Notification[] = [
  { id: 'notif1', type: 'entropy', title: 'Overbooking Detectado', message: 'Conflicto en habitación 205. Se requiere acción inmediata.', timestamp: new Date(today.getTime() - 15 * 60 * 1000), read: false, actionable: true, actionLabel: 'Resolver Ahora', actionData: { roomNumber: '205' } },
  { id: 'notif2', type: 'negentropy', title: 'Auto-Resolución Ejecutada', message: 'Mantenimiento de hab. 203 escalado correctamente.', timestamp: new Date(today.getTime() - 45 * 60 * 1000), read: false, actionable: false },
  { id: 'notif3', type: 'info', title: 'Nueva Reserva', message: 'Reserva RHN-2024-0899 creada vía Web Directa.', timestamp: new Date(today.getTime() - 2 * 60 * 60 * 1000), read: true, actionable: false },
  { id: 'notif4', type: 'warning', title: 'Check-in Próximo', message: '3 check-ins programados en las próximas 2 horas.', timestamp: new Date(today.getTime() - 3 * 60 * 60 * 1000), read: true, actionable: false },
  { id: 'notif5', type: 'success', title: 'Meta Alcanzada', message: 'Ocupación superó el 75% objetivo del mes.', timestamp: new Date(today.getTime() - 5 * 60 * 60 * 1000), read: true, actionable: false },
];

// ============================================
// HISTORIAL DE INGRESOS
// ============================================

export const dailyRevenue: DailyRevenue[] = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(today.getTime() - (13 - i) * 24 * 60 * 60 * 1000);
  const rooms = Math.floor(Math.random() * 10) + 20;
  const avgRate = Math.floor(Math.random() * 80000) + 320000;
  return {
    date: date.toISOString().split('T')[0],
    revenue: rooms * avgRate,
    rooms,
    avgRate,
  };
});

// ============================================
// HISTORIAL DE ENTROPÍA
// ============================================

export const entropyHistory: EntropyHistory[] = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(today.getTime() - (13 - i) * 24 * 60 * 60 * 1000);
  const entropy = Math.floor(Math.random() * 30) + 10;
  const negentropy = Math.floor(Math.random() * 25) + 15;
  return {
    date: date.toISOString().split('T')[0],
    entropy,
    negentropy,
    balance: negentropy - entropy,
  };
});

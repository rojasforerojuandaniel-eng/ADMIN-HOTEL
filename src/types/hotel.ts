// Tipos para el Sistema de Reservas Hoteleras
// Basado en Teoría de Sistemas

// ============================================
// INPUTS - Entradas del Sistema
// ============================================

export interface InputHuesped {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  documento?: string;
  tipoDocumento?: 'DNI' | 'Pasaporte' | 'CE';
  nacionalidad?: string;
  fechaNacimiento?: Date;
  direccion?: string;
  preferencias?: PreferenciasHuesped;
  vip?: boolean;
  notas?: string;
}

export interface PreferenciasHuesped {
  tipoHabitacion?: TipoHabitacion;
  piso?: string;
  vista?: string;
  camaExtra?: boolean;
  sinFumar?: boolean;
  accesibilidad?: boolean;
  amenities?: string[];
}

export interface InputReserva {
  huesped: InputHuesped;
  habitacionId: string;
  fechaInicio: Date;
  fechaFin: Date;
  numHuespedes: number;
  origen?: OrigenReserva;
  notas?: string;
}

export interface InputHabitacion {
  numero: string;
  tipo: TipoHabitacion;
  capacidad: number;
  precioBase: number;
  descripcion?: string;
  pisoId: string;
  amenidades?: string[];
}

// ============================================
// OUTPUTS - Salidas del Sistema
// ============================================

export interface OutputReserva {
  codigo: string;
  huesped: Huesped;
  habitacion: Habitacion;
  fechaInicio: Date;
  fechaFin: Date;
  precioTotal: number;
  estado: EstadoReserva;
  mensajeConfirmacion: string;
}

export interface OutputDisponibilidad {
  habitacionesDisponibles: Habitacion[];
  fechasNoDisponibles: Date[];
  sugerenciasAlternativas: Habitacion[];
}

export interface OutputMetricas {
  ocupacion: number;
  ingresos: number;
  reservasHoy: number;
  checkinsPendientes: number;
  checkoutsPendientes: number;
  habitacionesDisponibles: number;
  habitacionesOcupadas: number;
  tasaOcupacion: number;
  tarifaPromedio: number;
  revpar: number;
}

// ============================================
// ENTIDADES - Modelos del Sistema
// ============================================

export interface Hotel {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  estrellas: number;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Piso {
  id: string;
  numero: number;
  nombre?: string;
  hotelId: string;
}

export interface Habitacion {
  id: string;
  numero: string;
  tipo: TipoHabitacion;
  capacidad: number;
  precioBase: number;
  estado: EstadoHabitacion;
  descripcion?: string;
  hotelId: string;
  pisoId: string;
  amenidades?: Amenidad[];
  imagenes?: ImagenHabitacion[];
  piso?: Piso;
}

export interface Amenidad {
  id: string;
  nombre: string;
  descripcion?: string;
}

export interface ImagenHabitacion {
  id: string;
  url: string;
  descripcion?: string;
  principal: boolean;
}

export interface Huesped {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  documento?: string;
  tipoDocumento?: string;
  nacionalidad?: string;
  vip: boolean;
  preferencias?: string;
  hotelId: string;
  reservas?: Reserva[];
}

export interface Reserva {
  id: string;
  codigo: string;
  fechaInicio: Date;
  fechaFin: Date;
  numHuespedes: number;
  estado: EstadoReserva;
  precioTotal: number;
  descuento: number;
  impuestos: number;
  totalPagar: number;
  notas?: string;
  origen: OrigenReserva;
  hotelId: string;
  huespedId: string;
  habitacionId: string;
  huesped?: Huesped;
  habitacion?: Habitacion;
  pagos?: Pago[];
  serviciosExtra?: ServicioExtra[];
  checkinReal?: Date;
  checkoutReal?: Date;
  createdAt: Date;
}

export interface Pago {
  id: string;
  monto: number;
  metodo: MetodoPago;
  estado: EstadoPago;
  referencia?: string;
  fechaPago: Date;
}

export interface ServicioExtra {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
  fecha: Date;
}

export interface Tarifa {
  id: string;
  nombre: string;
  tipoHabitacion: TipoHabitacion;
  precio: number;
  multiplicador: number;
  fechaInicio: Date;
  fechaFin: Date;
  activa: boolean;
}

export interface Mantenimiento {
  id: string;
  tipo: TipoMantenimiento;
  descripcion: string;
  estado: EstadoMantenimiento;
  prioridad: Prioridad;
  fechaProgramada: Date;
  habitacionId: string;
}

export interface Notificacion {
  id: string;
  tipo: TipoNotificacion;
  titulo: string;
  mensaje: string;
  leida: boolean;
  prioridad: Prioridad;
  createdAt: Date;
}

// ============================================
// ENUMS - Estados y Tipos
// ============================================

export type TipoHabitacion = 
  | 'SIMPLE'
  | 'DOBLE'
  | 'SUITE'
  | 'SUITE_JUNIOR'
  | 'SUITE_PRESIDENCIAL'
  | 'FAMILIAR'
  | 'MATRIMONIAL';

export type EstadoHabitacion = 
  | 'DISPONIBLE'
  | 'OCUPADA'
  | 'MANTENIMIENTO'
  | 'LIMPIEZA'
  | 'FUERA_DE_SERVICIO'
  | 'RESERVADA';

export type EstadoReserva = 
  | 'PENDIENTE'
  | 'CONFIRMADA'
  | 'CHECKIN'
  | 'CHECKOUT'
  | 'CANCELADA'
  | 'NO_SHOW'
  | 'MODIFICADA';

export type OrigenReserva = 
  | 'WEB'
  | 'TELEFONO'
  | 'PRESENCIAL'
  | 'APP'
  | 'AGENCIA'
  | 'OTRO';

export type MetodoPago = 
  | 'EFECTIVO'
  | 'TARJETA_CREDITO'
  | 'TARJETA_DEBITO'
  | 'TRANSFERENCIA'
  | 'PAYPAL'
  | 'DEPOSITO'
  | 'MIXTO';

export type EstadoPago = 
  | 'PENDIENTE'
  | 'PROCESANDO'
  | 'COMPLETADO'
  | 'RECHAZADO'
  | 'REEMBOLSADO'
  | 'CANCELADO';

export type TipoMantenimiento = 
  | 'PREVENTIVO'
  | 'CORRECTIVO'
  | 'LIMPIEZA'
  | 'REPARACION'
  | 'RENOVACION'
  | 'INSPECCION';

export type EstadoMantenimiento = 
  | 'PROGRAMADO'
  | 'EN_PROCESO'
  | 'COMPLETADO'
  | 'CANCELADO'
  | 'POSTPUESTO';

export type Prioridad = 
  | 'BAJA'
  | 'MEDIA'
  | 'ALTA'
  | 'URGENTE';

export type TipoMetrica = 
  | 'OCUPACION'
  | 'INGRESOS'
  | 'RESERVAS'
  | 'CANCELACIONES'
  | 'SATISFACCION'
  | 'TIEMPO_ESTANCIA'
  | 'TARIFA_PROMEDIO'
  | 'REVPAR';

export type TipoNotificacion = 
  | 'SISTEMA'
  | 'RESERVA'
  | 'PAGO'
  | 'MANTENIMIENTO'
  | 'ALERTA'
  | 'RECORDATORIO';

// ============================================
// UTILIDADES
// ============================================

export interface RespuestaAPI<T> {
  exito: boolean;
  datos?: T;
  error?: string;
  mensaje?: string;
}

export interface FiltrosBusqueda {
  fechaInicio?: Date;
  fechaFin?: Date;
  tipoHabitacion?: TipoHabitacion;
  capacidad?: number;
  precioMin?: number;
  precioMax?: number;
  amenidades?: string[];
}

export interface Paginacion {
  pagina: number;
  porPagina: number;
  total?: number;
}

// Labels para UI
export const TIPO_HABITACION_LABELS: Record<TipoHabitacion, string> = {
  SIMPLE: 'Habitación Simple',
  DOBLE: 'Habitación Doble',
  SUITE: 'Suite',
  SUITE_JUNIOR: 'Suite Junior',
  SUITE_PRESIDENCIAL: 'Suite Presidencial',
  FAMILIAR: 'Habitación Familiar',
  MATRIMONIAL: 'Habitación Matrimonial',
};

export const ESTADO_HABITACION_LABELS: Record<EstadoHabitacion, string> = {
  DISPONIBLE: 'Disponible',
  OCUPADA: 'Ocupada',
  MANTENIMIENTO: 'En Mantenimiento',
  LIMPIEZA: 'En Limpieza',
  FUERA_DE_SERVICIO: 'Fuera de Servicio',
  RESERVADA: 'Reservada',
};

export const ESTADO_RESERVA_LABELS: Record<EstadoReserva, string> = {
  PENDIENTE: 'Pendiente',
  CONFIRMADA: 'Confirmada',
  CHECKIN: 'Check-in Realizado',
  CHECKOUT: 'Check-out Realizado',
  CANCELADA: 'Cancelada',
  NO_SHOW: 'No Presentado',
  MODIFICADA: 'Modificada',
};

export const ORIGEN_RESERVA_LABELS: Record<OrigenReserva, string> = {
  WEB: 'Sitio Web',
  TELEFONO: 'Teléfono',
  PRESENCIAL: 'Presencial',
  APP: 'Aplicación Móvil',
  AGENCIA: 'Agencia de Viajes',
  OTRO: 'Otro',
};

export const METODO_PAGO_LABELS: Record<MetodoPago, string> = {
  EFECTIVO: 'Efectivo',
  TARJETA_CREDITO: 'Tarjeta de Crédito',
  TARJETA_DEBITO: 'Tarjeta de Débito',
  TRANSFERENCIA: 'Transferencia',
  PAYPAL: 'PayPal',
  DEPOSITO: 'Depósito Bancario',
  MIXTO: 'Pago Mixto',
};

// Colores para estados
export const ESTADO_HABITACION_COLORES: Record<EstadoHabitacion, string> = {
  DISPONIBLE: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  OCUPADA: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  MANTENIMIENTO: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  LIMPIEZA: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
  FUERA_DE_SERVICIO: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  RESERVADA: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
};

export const ESTADO_RESERVA_COLORES: Record<EstadoReserva, string> = {
  PENDIENTE: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  CONFIRMADA: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  CHECKIN: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
  CHECKOUT: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  CANCELADA: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  NO_SHOW: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  MODIFICADA: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
};

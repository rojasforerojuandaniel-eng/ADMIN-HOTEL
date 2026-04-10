// Labels y colores para UI

export const TIPO_HABITACION_LABELS: Record<string, string> = {
  SIMPLE: 'Habitación Simple',
  DOBLE: 'Habitación Doble',
  SUITE: 'Suite',
  SUITE_JUNIOR: 'Suite Junior',
  SUITE_PRESIDENCIAL: 'Suite Presidencial',
  FAMILIAR: 'Habitación Familiar',
  MATRIMONIAL: 'Habitación Matrimonial',
};

export const ESTADO_HABITACION_LABELS: Record<string, string> = {
  DISPONIBLE: 'Disponible',
  OCUPADA: 'Ocupada',
  MANTENIMIENTO: 'En Mantenimiento',
  LIMPIEZA: 'En Limpieza',
  FUERA_DE_SERVICIO: 'Fuera de Servicio',
  RESERVADA: 'Reservada',
};

export const ESTADO_RESERVA_LABELS: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  CONFIRMADA: 'Confirmada',
  CHECKIN: 'Check-in Realizado',
  CHECKOUT: 'Check-out Realizado',
  CANCELADA: 'Cancelada',
  NO_SHOW: 'No Presentado',
  MODIFICADA: 'Modificada',
};

export const ORIGEN_RESERVA_LABELS: Record<string, string> = {
  WEB: 'Sitio Web',
  TELEFONO: 'Teléfono',
  PRESENCIAL: 'Presencial',
  APP: 'Aplicación Móvil',
  AGENCIA: 'Agencia de Viajes',
  OTRO: 'Otro',
};

export const ESTADO_HABITACION_COLORES: Record<string, string> = {
  DISPONIBLE: 'bg-emerald-100 text-emerald-800',
  OCUPADA: 'bg-rose-100 text-rose-800',
  MANTENIMIENTO: 'bg-amber-100 text-amber-800',
  LIMPIEZA: 'bg-sky-100 text-sky-800',
  FUERA_DE_SERVICIO: 'bg-gray-100 text-gray-800',
  RESERVADA: 'bg-violet-100 text-violet-800',
};

export const ESTADO_RESERVA_COLORES: Record<string, string> = {
  PENDIENTE: 'bg-amber-100 text-amber-800',
  CONFIRMADA: 'bg-emerald-100 text-emerald-800',
  CHECKIN: 'bg-sky-100 text-sky-800',
  CHECKOUT: 'bg-gray-100 text-gray-800',
  CANCELADA: 'bg-rose-100 text-rose-800',
  NO_SHOW: 'bg-red-100 text-red-800',
  MODIFICADA: 'bg-violet-100 text-violet-800',
};

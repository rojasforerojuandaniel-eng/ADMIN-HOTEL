// Tipos locales para componentes

export interface DashboardData {
  hotel: { id: string; nombre: string; estrellas: number };
  metricas: {
    totalHabitaciones: number;
    habitacionesDisponibles: number;
    habitacionesOcupadas: number;
    habitacionesMantenimiento: number;
    habitacionesLimpieza: number;
    tasaOcupacion: number;
    ingresosMes: number;
    tarifaPromedio: number;
    revpar: number;
    reservasHoy: number;
    checkinsPendientes: number;
    checkoutsPendientes: number;
    huespedesVIP: number;
  };
  distribucion: {
    habitacionesPorTipo: Record<string, number>;
    habitacionesPorEstado: Record<string, number>;
    reservasPorOrigen: Record<string, number>;
    pisos: number;
  };
  sistema: {
    nivelEntropia: number;
    entropiaIndicadores: {
      habitacionesFueraServicio: number;
      mantenimientosPendientes: number;
      reservasSinConfirmar: number;
      notificacionesNoLeidas: number;
    };
    negentropiaAcciones: {
      limpiezasProgramadas: number;
      mantenimientosCompletados: number;
      pagosCompletados: number;
    };
    estadoSistema: string;
  };
  detalles: {
    habitaciones: any[];
    reservasRecientes: any[];
    notificaciones: any[];
    mantenimientosPendientes: any[];
  };
}

export interface Habitacion {
  id: string;
  numero: string;
  tipo: string;
  capacidad: number;
  precioBase: number;
  estado: string;
  descripcion?: string;
  piso?: { numero: number; nombre?: string };
  amenidades?: { id: string; nombre: string }[];
}

export interface Reserva {
  id: string;
  codigo: string;
  fechaInicio: string;
  fechaFin: string;
  numHuespedes: number;
  estado: string;
  precioTotal: number;
  totalPagar: number;
  origen: string;
  huesped?: { id: string; nombre: string; apellido: string; email: string };
  habitacion?: { id: string; numero: string; tipo: string };
}

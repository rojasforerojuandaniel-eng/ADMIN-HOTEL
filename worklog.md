# Sistema de Reservas Hoteleras - Teoría de Sistemas

## Análisis del Proyecto

### Fecha: 2024
### Proyecto: Sistema de Reservas Hoteleras con Enfoque de Teoría de Sistemas

---

## 1. ENFOQUE HOLÍSTICO (Visión Completa del Sistema)

El sistema de reservas hoteleras se concibe como un TODO integrado donde cada componente afecta y es afectado por los demás.

**Componentes del Sistema:**
```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA HOTELERO                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Huéspedes │  │Habitac.  │  │ Reservas │  │ Pagos    │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │             │             │          │
│       └─────────────┴──────┬──────┴─────────────┘          │
│                            ▼                                │
│                   ┌──────────────┐                         │
│                   │  Dashboard   │                         │
│                   │  Central     │                         │
│                   └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. IDENTIFICACIÓN DE INPUTS, PROCESOS Y OUTPUTS

### ENTRADAS (INPUTS)

| Categoría | Input | Descripción | Tipo |
|-----------|-------|-------------|------|
| **Huésped** | Datos personales | Nombre, email, teléfono, documento | Texto |
| **Huésped** | Preferencias | Tipo habitación, amenities | Selección |
| **Reserva** | Fechas | Check-in, Check-out | Fecha |
| **Reserva** | Cantidad | Número de huéspedes | Numérico |
| **Reserva** | Solicitudes especiales | Necesidades específicas | Texto |
| **Pago** | Método de pago | Tarjeta, efectivo, transferencia | Selección |
| **Pago** | Datos de pago | Información de tarjeta | Encriptado |
| **Sistema** | Disponibilidad | Estado de habitaciones | Booleano |
| **Sistema** | Tarifas | Precios por temporada | Numérico |

### PROCESOS (TRANSFORMACIÓN/TRABAJO)

| Proceso | Descripción | Inputs que consume | Outputs que genera |
|---------|-------------|-------------------|-------------------|
| **Validación** | Verificar datos del huésped | Datos personales | Huésped validado |
| **Consulta disponibilidad** | Buscar habitaciones libres | Fechas, tipo | Lista habitaciones |
| **Cálculo tarifas** | Determinar precio total | Fechas, habitación, temporada | Precio total |
| **Asignación** | Asignar habitación específica | Reserva, disponibilidad | Habitación asignada |
| **Confirmación** | Generar comprobante | Reserva confirmada | Código reserva |
| **Notificación** | Enviar confirmaciones | Email, datos | Email enviado |
| **Actualización** | Modificar estados | Reserva, habitación | Estados actualizados |
| **Cancelación** | Procesar cancelaciones | Reserva, política | Reembolso, liberación |

### SALIDAS (OUTPUTS)

| Categoría | Output | Destino | Formato |
|-----------|--------|---------|---------|
| **Reserva** | Confirmación de reserva | Huésped | PDF/Email |
| **Reserva** | Código de reserva | Huésped | Texto |
| **Sistema** | Disponibilidad actualizada | Base de datos | Registro |
| **Reportes** | Ocupación hotel | Gerencia | Dashboard |
| **Reportes** | Ingresos | Administración | Gráficos |
| **Reportes** | Estadísticas | Dirección | KPIs |
| **Habitación** | Estado actualizado | Ama de llaves | Sistema |
| **Facturación** | Factura | Huésped/Contabilidad | PDF |

---

## 3. APLICACIÓN DE LOS PRINCIPIOS

### SINERGIA
- El sistema completo funciona mejor que la suma de partes
- Ejemplo: Reservas + Habitaciones + Pagos = Experiencia completa
- Implementación: Módulos interconectados que comparten datos

### HOMEOSTASIS
- Equilibrio dinámimo del sistema
- Ejemplo: Balance entre reservas y disponibilidad
- Implementación: Alertas automáticas, auto-regulación de tarifas

### ENTROPÍA
- Tendencia natural al desorden
- Ejemplo: Habitaciones desordenadas, datos obsoletos
- Implementación: Procesos de limpieza, mantenimiento preventivo

### NEGENTROPÍA
- Información que contrarresta la entropía
- Ejemplo: Actualizaciones automáticas, validaciones
- Implementación: Notificaciones, reportes, auditorías

### EQUIFINALIDAD
- Múltiples caminos al mismo resultado
- Ejemplo: Reservar por web, teléfono, presencial
- Implementación: Múltiples canales de reserva

### JERARQUÍA
- Niveles de organización del sistema
- Ejemplo: Hotel → Pisos → Habitaciones → Amenities
- Implementación: Estructura de datos jerárquica

### ORGANICIDAD
- El sistema como organismo vivo
- Ejemplo: Adaptación a temporadas, crecimiento
- Implementación: Módulos flexibles y escalables

### MULTIFINALIDAD
- Un sistema con múltiples objetivos
- Ejemplo: Maximizar ocupación + satisfacción + ingresos
- Implementación: KPIs múltiples, objetivos paralelos

### ADAPTABILIDAD
- Capacidad de ajustarse al cambio
- Ejemplo: Ajuste de tarifas según demanda
- Implementación: Algoritmos dinámicos, configuración flexible

---

## 4. DIAGRAMA DE FLUJO DEL SISTEMA

```
┌────────────────────────────────────────────────────────────────────────┐
│                          FLUJO DE RESERVA                              │
└────────────────────────────────────────────────────────────────────────┘

ENTRADAS                    PROCESOS                      SALIDAS
─────────                   ─────────                     ────────

┌──────────┐               ┌──────────────┐              ┌──────────┐
│ Huésped  │──────────────▶│  1. Validar  │─────────────▶│ Registro │
│ datos    │               │    datos     │              │ creado   │
└──────────┘               └──────┬───────┘              └──────────┘
                                  │
┌──────────┐               ┌──────▼───────┐              ┌──────────┐
│ Fechas   │──────────────▶│ 2. Verificar │─────────────▶│ Habita-  │
│ reserva  │               │disponibilidad│              │ ciones   │
└──────────┘               └──────┬───────┘              │ libres   │
                                  │                      └──────────┘
┌──────────┐               ┌──────▼───────┐              
│ Tipo hab.│──────────────▶│3. Calcular   │              ┌──────────┐
│ preferida│               │   precio     │─────────────▶│ Cotiza-  │
└──────────┘               └──────┬───────┘              │ ción     │
                                  │                      └──────────┘
┌──────────┐               ┌──────▼───────┐              
│ Método   │──────────────▶│ 4. Procesar  │              ┌──────────┐
│ de pago  │               │    pago      │─────────────▶│ Pago     │
└──────────┘               └──────┬───────┘              │confirmado│
                                  │                      └──────────┘
                           ┌──────▼───────┐              
                           │ 5. Confirmar │              ┌──────────┐
                           │   reserva    │─────────────▶│ Código   │
                           └──────┬───────┘              │ reserva  │
                                  │                      └──────────┘
                           ┌──────▼───────┐              
                           │6. Notificar  │              ┌──────────┐
                           │   email      │─────────────▶│ Email    │
                           └──────────────┘              │ enviado  │
                                                         └──────────┘
```

---

## 5. ESTRUCTURA DE DATOS

### Modelo Entidad-Relación

```
HUÉSPED (1) ──────────(N) RESERVA (N)──────────(1) HABITACIÓN
    │                        │                       │
    │                        │                       │
    ▼                        ▼                       ▼
- id                    - id                    - id
- nombre                - codigo                - numero
- email                 - fecha_inicio          - tipo
- telefono              - fecha_fin             - capacidad
- documento             - estado                - precio_base
- preferencias          - total                 - amenidades
- historial             - huesped_id            - estado
                        - habitacion_id         - piso
                        - pagos                 - caracteristicas
```

---

## 6. IMPLEMENTACIÓN COMPLETADA

---
Task ID: 1-10
Agent: Main Developer
Task: Sistema de Reservas Hoteleras con Teoría de Sistemas

Work Log:
- [Task 1] Documentación completa de Teoría de Sistemas aplicada al hotel
- [Task 2] Esquema Prisma completo con 15+ modelos (Hotel, Piso, Habitación, Amenidades, Huésped, Reserva, Pago, ServicioExtra, Tarifa, Mantenimiento, Notificación, Métricas, Historial)
- [Task 3-a] API Routes: /api/seed, /api/dashboard, /api/habitaciones, /api/reservas, /api/huespedes
- [Task 3-b] Componentes UI: Dashboard, Cards, Tabs, Dialogs, Forms, Badges, Progress
- [Task 4] Dashboard holístico con KPIs en tiempo real
- [Task 5] Módulo de habitaciones con visualización jerárquica por pisos
- [Task 6] Sistema de reservas con múltiples orígenes (Equifinalidad)
- [Task 7] Gestión de huéspedes con historial
- [Task 8] Métricas de Homeostasis (tasa ocupación) y Entropía (indicadores de desorden)
- [Task 9] Sistema de notificaciones y alertas automáticas (Negentropía)
- [Task 10] Flujos de reserva adaptables con cambio de estados

Stage Summary:
- Aplicación completa de sistema de reservas hoteleras
- 5 tabs funcionales: Dashboard, Habitaciones, Reservas, Sistema, Teoría
- Base de datos SQLite con Prisma ORM
- Interfaz responsive con shadcn/ui
- Aplicación práctica de 10 principios de Teoría de Sistemas
- Seed automático con datos de ejemplo (11 habitaciones, 4 huéspedes, tarifas)

Archivos Creados:
- prisma/schema.prisma (esquema completo)
- src/types/hotel.ts (tipos TypeScript)
- src/app/api/seed/route.ts (inicialización)
- src/app/api/dashboard/route.ts (métricas)
- src/app/api/habitaciones/route.ts (CRUD habitaciones)
- src/app/api/reservas/route.ts (CRUD reservas)
- src/app/api/huespedes/route.ts (CRUD huéspedes)
- src/app/page.tsx (interfaz principal)
- src/app/globals.css (estilos personalizados)

---

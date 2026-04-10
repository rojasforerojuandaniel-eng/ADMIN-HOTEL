'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  Bed,
  BookOpen,
  Activity,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Zap,
  Globe,
  Building2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Componentes de NEXUS
import { GlobalCommandCenter } from '@/components/nexus/global-command-center';
import { SynergyMatrix } from '@/components/nexus/synergy-matrix';
import { NegentropyEngine } from '@/components/nexus/negentropy-engine';
import { IoTControl } from '@/components/nexus/iot-control';
import { OmniChannelInbox } from '@/components/nexus/omni-channel-inbox';
import { SystemsTheory } from '@/components/nexus/systems-theory';

// Store
import { useNexusStore, useCurrentBranch } from '@/lib/nexus-store';

// ============================================
// ANIMACIONES
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// ============================================
// LOADING SKELETON
// ============================================

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            RHYNODE NEXUS
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Inicializando sistema...</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// RHYNODE NEXUS - MAIN PAGE
// ============================================

export default function RhynodeNexus() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');

  const updateTime = useNexusStore((state) => state.updateTime);
  const activeTab = useNexusStore((state) => state.activeTab);
  const setActiveTab = useNexusStore((state) => state.setActiveTab);
  const currentBranch = useNexusStore((state) => state.currentBranch);
  const setCurrentBranch = useNexusStore((state) => state.setCurrentBranch);
  const branches = useNexusStore((state) => state.branches);

  // Solo ejecutar en el cliente
  useEffect(() => {
    setMounted(true);
    updateTime();
    const t = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      updateTime();
    }, 1000);
    return () => clearInterval(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Loading skeleton durante SSR y primer render
  if (!mounted) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo y Navegación */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  RHYNODE NEXUS
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Sistema SaaS de Gestión Hotelera
                </p>
              </div>
            </div>

            {/* Branch Selector */}
            <Select value={currentBranch} onValueChange={setCurrentBranch}>
              <SelectTrigger className="w-[220px] h-8 bg-muted/50 border-border/30">
                <SelectValue placeholder="Seleccionar sucursal" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3 h-3 text-cyan-400" />
                      <span>{branch.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buscador y Notificaciones */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-9 w-64 h-9 bg-muted/50 border-border/30 focus:border-cyan-500/50 focus:ring-cyan-500/20"
              />
            </div>

            <Button variant="ghost" size="sm" className="relative h-9 w-9">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px] bg-rose-500">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="sm" className="h-9 w-9">
              <Settings className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar y Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 border-r border-border/50 bg-background/80 backdrop-blur-sm sticky top-16 h-[calc(100vh-4rem)] overflow-hidden`}>
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeTab === 'dashboard' ? 'bg-cyan-500/10 text-cyan-400' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard className="w-4 h-4 mr-3" />
              Global Command Center
            </Button>

            <Button
              variant={activeTab === 'synergy' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeTab === 'synergy' ? 'bg-violet-500/10 text-violet-400' : ''}`}
              onClick={() => setActiveTab('synergy')}
            >
              <Calendar className="w-4 h-4 mr-3" />
              Matriz de Sinergia
            </Button>

            <Button
              variant={activeTab === 'negentropy' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeTab === 'negentropy' ? 'bg-rose-500/10 text-rose-400' : ''}`}
              onClick={() => setActiveTab('negentropy')}
            >
              <Activity className="w-4 h-4 mr-3" />
              Motor de Negentropía
            </Button>

            <Button
              variant={activeTab === 'iot' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeTab === 'iot' ? 'bg-emerald-500/10 text-emerald-400' : ''}`}
              onClick={() => setActiveTab('iot')}
            >
              <Shield className="w-4 h-4 mr-3" />
              Control IoT
            </Button>

            <Button
              variant={activeTab === 'inbox' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeTab === 'inbox' ? 'bg-blue-500/10 text-blue-400' : ''}`}
              onClick={() => setActiveTab('inbox')}
            >
              <Globe className="w-4 h-4 mr-3" />
              Omni-Channel Inbox
            </Button>

            <Button
              variant={activeTab === 'theory' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeTab === 'theory' ? 'bg-amber-500/10 text-amber-400' : ''}`}
              onClick={() => setActiveTab('theory')}
            >
              <BookOpen className="w-4 h-4 mr-3" />
              Teoría de Sistemas
            </Button>
          </nav>

          {/* Toggle Sidebar */}
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Contraer
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Expandir
                </>
              )}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlobalCommandCenter />
              </motion.div>
            )}

            {activeTab === 'synergy' && (
              <motion.div
                key="synergy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SynergyMatrix />
              </motion.div>
            )}

            {activeTab === 'negentropy' && (
              <motion.div
                key="negentropy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <NegentropyEngine />
              </motion.div>
            )}

            {activeTab === 'iot' && (
              <motion.div
                key="iot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <IoTControl />
              </motion.div>
            )}

            {activeTab === 'inbox' && (
              <motion.div
                key="inbox"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <OmniChannelInbox />
              </motion.div>
            )}

            {activeTab === 'theory' && (
              <motion.div
                key="theory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SystemsTheory />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© 2026 RHYNODE NEXUS</span>
            <span>•</span>
            <span>Teoría de Sistemas aplicada</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span suppressHydrationWarning>{time}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar }            from './components/layout/Sidebar'
import { TopBar }             from './components/layout/TopBar'
import { Home }               from './pages/Home'
import { VideosPage }         from './pages/VideosPage'
import { PromptsPage }        from './pages/PromptsPage'
import { LibraryPage }        from './pages/LibraryPage'
import { WebsPage }           from './pages/WebsPage'
import { SkillsPage }         from './pages/SkillsPage'
import { NoticiasPage }       from './pages/NoticiasPage'
import { ChollosPage }        from './pages/ChollosPage'
import { ContactoPage }       from './pages/ContactoPage'
import { AppRequestsPage }    from './pages/AppRequestsPage'
import { SettingsPage }       from './pages/SettingsPage'
import { SupportPage }        from './pages/SupportPage'
import { StudioPage }         from './pages/StudioPage'
import { PerfilPage }         from './pages/PerfilPage'
import { NotificacionesPage } from './pages/NotificacionesPage'
import { AdminPage }          from './pages/AdminPage'
import { DetailPage }         from './pages/DetailPage'

/**
 * AppShell — Shell único con Sidebar/TopBar estáticos.
 * Sólo el área de contenido (motion.div) se anima en cada cambio de ruta.
 */
function AppShell() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex-1 min-w-0 flex flex-col overflow-hidden">
        <TopBar />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 0.8 }}
            className="flex-1 flex flex-col"
          >
            <Routes location={location}>
              {/* — Navegación principal — */}
              <Route path="/"              element={<Home />} />
              <Route path="/videos"        element={<VideosPage />} />
              <Route path="/prompts"       element={<PromptsPage />} />
              <Route path="/herramientas"  element={<LibraryPage />} />
              <Route path="/webs"          element={<WebsPage />} />
              <Route path="/skills"        element={<SkillsPage />} />
              <Route path="/noticias"      element={<NoticiasPage />} />
              <Route path="/chollos"       element={<ChollosPage />} />
              <Route path="/contacto"      element={<ContactoPage />} />
              <Route path="/requests"      element={<AppRequestsPage />} />

              {/* — Rutas legacy (backward compat) — */}
              <Route path="/video"         element={<VideosPage />} />
              <Route path="/library"       element={<LibraryPage />} />

              {/* — Sistema — */}
              <Route path="/settings"       element={<SettingsPage />} />
              <Route path="/support"        element={<SupportPage />} />
              <Route path="/studio"         element={<StudioPage />} />
              <Route path="/perfil"         element={<PerfilPage />} />
              <Route path="/notificaciones" element={<NotificacionesPage />} />
              <Route path="/admin"          element={<AdminPage />} />

              {/* — Detalle universal — */}
              <Route path="/item/:id"      element={<DetailPage />} />
              <Route path="/:type/:id"     element={<DetailPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

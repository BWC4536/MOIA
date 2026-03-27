import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home }               from './pages/Home'
import { VideoPage }          from './pages/VideoPage'
import { PromptsPage }        from './pages/PromptsPage'
import { NoticiasPage }       from './pages/NoticiasPage'
import { AppRequestsPage }    from './pages/AppRequestsPage'
import { SettingsPage }       from './pages/SettingsPage'
import { SupportPage }        from './pages/SupportPage'
import { LibraryPage }        from './pages/LibraryPage'
import { StudioPage }         from './pages/StudioPage'
import { PerfilPage }         from './pages/PerfilPage'
import { NotificacionesPage } from './pages/NotificacionesPage'
import { AdminPage }          from './pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/video"          element={<VideoPage />} />
        <Route path="/prompts"        element={<PromptsPage />} />
        <Route path="/noticias"       element={<NoticiasPage />} />
        <Route path="/requests"       element={<AppRequestsPage />} />
        <Route path="/settings"       element={<SettingsPage />} />
        <Route path="/support"        element={<SupportPage />} />
        <Route path="/library"        element={<LibraryPage />} />
        <Route path="/studio"         element={<StudioPage />} />
        <Route path="/perfil"         element={<PerfilPage />} />
        <Route path="/notificaciones" element={<NotificacionesPage />} />
        <Route path="/admin"          element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

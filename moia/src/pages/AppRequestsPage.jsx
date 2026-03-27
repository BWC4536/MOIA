import { Layers } from 'lucide-react'
import { Sidebar } from '../components/layout/Sidebar'
import { TopBar } from '../components/layout/TopBar'
import { PlaceholderPage } from './PlaceholderPage'

export function AppRequestsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 flex items-center justify-center">
          <PlaceholderPage title="App Requests" icon={Layers} />
        </main>
      </div>
    </div>
  )
}

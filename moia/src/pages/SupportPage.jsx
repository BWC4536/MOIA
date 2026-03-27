import { HelpCircle } from 'lucide-react'
import { Sidebar } from '../components/layout/Sidebar'
import { TopBar } from '../components/layout/TopBar'
import { PlaceholderPage } from './PlaceholderPage'

export function SupportPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 flex items-center justify-center">
          <PlaceholderPage title="Support" icon={HelpCircle} />
        </main>
      </div>
    </div>
  )
}

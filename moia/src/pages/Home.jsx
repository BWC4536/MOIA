import { useState } from 'react'
import { Sidebar }            from '../components/layout/Sidebar'
import { TopBar }             from '../components/layout/TopBar'
import { Footer }             from '../components/layout/Footer'
import { Hero }               from '../components/sections/Hero'
import { FilterPills }        from '../components/ui/FilterPills'
import { FeaturedProjects }   from '../components/sections/FeaturedProjects'
import { AIWebsitesBento }    from '../components/sections/AIWebsitesBento'
import { NewsFeed }           from '../components/sections/NewsFeed'
import { PromptsGallery }     from '../components/sections/PromptsGallery'
import { CommunityRequests }  from '../components/sections/CommunityRequests'

export function Home() {
  const [activeFilter, setActiveFilter] = useState('Todas')

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 flex-1 min-w-0 flex flex-col">
        <TopBar />

        <main className="flex-1">
          <Hero />

          <FilterPills active={activeFilter} onChange={setActiveFilter} />

          <div className="px-12 py-12 space-y-24">
            <FeaturedProjects  etiquetaFilter={activeFilter} />
            <AIWebsitesBento   etiquetaFilter={activeFilter} />
            <NewsFeed          etiquetaFilter={activeFilter} />
            <PromptsGallery    etiquetaFilter={activeFilter} />
            <CommunityRequests />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

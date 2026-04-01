import { useState } from 'react'
import { Footer }             from '../components/layout/Footer'
import { Hero }               from '../components/sections/Hero'
import { FilterPills }        from '../components/ui/FilterPills'
import { ToolsSection }       from '../components/sections/ToolsSection'
import { AIWebsitesBento }    from '../components/sections/AIWebsitesBento'
import { NewsFeed }           from '../components/sections/NewsFeed'
import { PromptsGallery }     from '../components/sections/PromptsGallery'
import { ChallengesSection }  from '../components/sections/ChallengesSection'
import { CommunityRequests }  from '../components/sections/CommunityRequests'

export function Home() {
  const [activeFilter, setActiveFilter] = useState('Todas')

  return (
    <>
      <main className="flex-1">
        <Hero />
        <FilterPills active={activeFilter} onChange={setActiveFilter} />
        <div className="px-4 py-6 md:px-12 md:py-12 space-y-24">
          <ToolsSection       etiquetaFilter={activeFilter} />
          <AIWebsitesBento    etiquetaFilter={activeFilter} />
          <NewsFeed           etiquetaFilter={activeFilter} />
          <ChallengesSection  etiquetaFilter={activeFilter} />
          <PromptsGallery     etiquetaFilter={activeFilter} />
          <CommunityRequests />
        </div>
      </main>
      <Footer />
    </>
  )
}

import { RequestForm } from '../forms/RequestForm'

export function CommunityRequests() {
  return (
    <section className="mt-16 pb-8">
      <div className="bg-surface-container rounded-2xl p-12 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 blur-[100px]
                        -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-white mb-4">
              IDEAS DE LA COMUNIDAD
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              ¿Tienes una herramienta en mente que no existe? Cuéntanos y ayúdanos a priorizar
              el próximo desarrollo del Intelligence Hub.
            </p>
          </div>
          <RequestForm />
        </div>
      </div>
    </section>
  )
}

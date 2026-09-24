import { createFileRoute } from '@tanstack/react-router'
import officers from '@/data/officers'
import codex from '@/data/codex'
import { SiteNav } from '@/components/SiteNav'
import { OfficerCard } from '@/components/OfficerCard'
import { Reveal } from '@/components/Reveal'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const [general, ...rest] = officers

  return (
    <div id="top" className="bg-void">
      <SiteNav />
      <Hero />
      <ArchiveIntro />

      <section id="command" className="relative px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Personnel Files"
            title="High Command"
            description="The officers whose seals authorize every muster, march, and requisition entered into the Castle Dour archive."
          />

          <div className="mt-16 grid gap-8">
            <Reveal>
              <OfficerCard {...general} />
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {rest.map((officer, i) => (
                <Reveal
                  key={officer.id}
                  delay={i * 120}
                  className={i === 1 ? 'md:mt-10' : ''}
                >
                  <OfficerCard {...officer} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CodexSection />
      <EnlistSection />
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden border-b border-leather/40">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/.netlify/images?url=/img/archive-hero.png&w=1920&fm=webp')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/70" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40 sm:px-8 sm:pb-28">
        <div className="animate-fade-up flex items-center gap-4 text-brass">
          <img
            src="/.netlify/images?url=/img/legion-crest.png&w=64&fm=webp"
            alt=""
            className="h-10 w-10 object-contain candle-flicker"
          />
          <p className="font-display text-xs sm:text-sm tracking-[0.4em] uppercase">
            Keizaal Online &middot; Castle Dour, Solitude
          </p>
        </div>

        <h1
          className="animate-fade-up font-display-deco mt-6 text-5xl leading-[0.95] text-parchment sm:text-7xl lg:text-8xl"
          style={{ animationDelay: '150ms' }}
        >
          The XIII
          <br />
          <span className="text-crimson-bright">Legion</span>
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-xl font-body text-lg text-parchment-dim leading-relaxed"
          style={{ animationDelay: '300ms' }}
        >
          Garrisoned within Castle Dour, the Thirteenth keeps the Emperor's
          peace across Haafingar and stands as archivist to the Legion's own
          history — every muster, march, and casualty entered by candlelight.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-5"
          style={{ animationDelay: '450ms' }}
        >
          <a
            href="#enlist"
            className="wax-seal h-16 w-16 shrink-0 hover:scale-105 transition-transform"
            aria-hidden="true"
          >
            <span className="font-display text-[0.6rem] font-bold uppercase text-parchment/90">
              Enlist
            </span>
          </a>
          <a
            href="#command"
            className="font-display text-xs tracking-[0.25em] uppercase text-parchment-dim border-b border-brass-dim pb-1 hover:text-brass hover:border-brass transition-colors"
          >
            Meet High Command &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}

function ArchiveIntro() {
  return (
    <section id="archive" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <Reveal>
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            Entry No. 013 &mdash; Castle Dour Archive
          </p>
          <h2 className="font-display-deco mt-4 text-4xl text-parchment sm:text-5xl">
            Kept Under Stone
          </h2>
          <div className="mt-8 space-y-5 text-parchment-dim leading-loose">
            <p>
              Before the Reachmen were pushed from the Karth valley, before the
              civil war split the holds, the Thirteenth was assigned a duty
              most legions consider beneath them: to remember. Every treaty,
              every troop rotation, every soldier lost to frostbite or a
              bandit's arrow is transcribed into the ledgers beneath Castle
              Dour.
            </p>
            <p>
              What began as a records posting became a philosophy. The
              Thirteenth holds Haafingar not only with spears but with
              paperwork &mdash; supply lines that never run dry, reinforcements
              that arrive because someone tracked the timing, and a chain of
              command that has never once lost a soldier's file.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="parchment-card rounded-sm p-8 sm:p-10">
            <div className="divider-ornate mb-6">
              <span className="h-1.5 w-1.5 rotate-45 bg-brass-dim" />
            </div>
            <dl className="space-y-6">
              <div>
                <dt className="font-display text-xs tracking-[0.25em] text-brass uppercase">
                  Garrison
                </dt>
                <dd className="mt-1 text-parchment-dim">
                  Castle Dour, Solitude &mdash; seat of Haafingar's Imperial command
                </dd>
              </div>
              <div>
                <dt className="font-display text-xs tracking-[0.25em] text-brass uppercase">
                  Founded
                </dt>
                <dd className="mt-1 text-parchment-dim">4E 167, under General Ferrenza's predecessor</dd>
              </div>
              <div>
                <dt className="font-display text-xs tracking-[0.25em] text-brass uppercase">
                  Charge
                </dt>
                <dd className="mt-1 text-parchment-dim">
                  Defense of Haafingar; custodianship of the Legion's written
                  history in Skyrim
                </dd>
              </div>
              <div>
                <dt className="font-display text-xs tracking-[0.25em] text-brass uppercase">
                  Motto
                </dt>
                <dd className="mt-1 italic text-parchment-dim">
                  "Scriptum manet." &mdash; The record remains.
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CodexSection() {
  return (
    <section id="codex" className="relative bg-ink/40 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Standing Orders"
          title="The Codex"
          description="Four tenets, copied into every recruit's induction ledger and renewed each year before the Dragonfire."
        />

        <div className="mt-16 space-y-0">
          {codex.map((tenet, i) => (
            <Reveal key={tenet.numeral} delay={i * 100}>
              <div
                className={`flex flex-col sm:flex-row gap-6 sm:gap-10 border-t border-leather/50 py-10 ${
                  i % 2 === 1 ? 'sm:flex-row-reverse sm:text-right' : ''
                }`}
              >
                <span className="font-display-deco text-5xl text-crimson-bright/80 sm:text-6xl">
                  {tenet.numeral}
                </span>
                <div className="max-w-2xl">
                  <h3 className="font-display text-xl text-parchment sm:text-2xl">
                    {tenet.title}
                  </h3>
                  <p className="mt-3 text-parchment-dim leading-relaxed">{tenet.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-leather/50" />
        </div>
      </div>
    </section>
  )
}

function EnlistSection() {
  return (
    <section id="enlist" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            Petition for Enlistment
          </p>
          <h2 className="font-display-deco mt-4 text-4xl text-parchment sm:text-6xl">
            Take the Oath
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-parchment-dim leading-relaxed">
            Recruits are received at the Castle Dour gatehouse or through the
            recruiting officers of Keizaal Online. Bring your character's
            record of service, or a willingness to start one &mdash; the
            archive has room for another name.
          </p>

          <div className="mt-12 inline-flex flex-col items-center gap-4">
            <div className="wax-seal h-24 w-24">
              <span className="font-display text-lg font-bold text-parchment/90">
                XIII
              </span>
            </div>
            <p className="font-display text-xs tracking-[0.2em] uppercase text-muted">
              Speak with a recruiting officer in-character, or reach the XIII
              Legion's staff on the Keizaal Online community server
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-leather/50 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <img
            src="/.netlify/images?url=/img/legion-crest.png&w=56&fm=webp"
            alt="XIII Legion crest"
            className="h-7 w-7 object-contain opacity-80"
          />
          <p className="font-display text-xs tracking-[0.2em] uppercase text-muted">
            XIII Legion &middot; Castle Dour Archive
          </p>
        </div>
        <p className="text-xs text-muted">
          A player faction of Keizaal Online. Unaffiliated with Bethesda
          Softworks or ZeniMax Media.
        </p>
      </div>
    </footer>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <Reveal>
      <div className="max-w-2xl">
        <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">{eyebrow}</p>
        <h2 className="font-display-deco mt-4 text-4xl text-parchment sm:text-5xl">{title}</h2>
        <p className="mt-5 text-parchment-dim leading-relaxed">{description}</p>
      </div>
    </Reveal>
  )
}

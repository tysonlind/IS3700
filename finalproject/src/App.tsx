import { 
  useMemo,  
  useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion'
import Logo from './assets/imgs/BrieflyLogo.png'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <Divider />
      <Logos />
      <Divider />
      <Features />
      <Divider />
      <HowItWorks />
      <Divider />
      <Security />
      <CTA />
      <Footer />
    </div>
  )
}

function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1])
  const bgColor = useTransform(bgOpacity, (o) => `rgba(255, 255, 255, ${o})`)
  const borderColor = useTransform(borderOpacity, (o) => `rgba(226, 232, 240, ${o})`)
  /*
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 4))
    return () => unsub()
  }, [scrollY])
   */
  return (
    <motion.div className="sticky top-0 z-40 backdrop-blur" style={{ backgroundColor: bgColor }}>
      <motion.div className="border-b" style={{ borderColor }}>
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} style={{ width: 30 }} />
            <span className="font-bold tracking-tight">Briefly.AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-slate-600">Features</a>
            <a href="#how" className="hover:text-slate-600">How it works</a>
            <a href="#security" className="hover:text-slate-600">Security</a>
            <a href="#cta" className="hover:text-slate-600">Pricing</a>
            <a href="#cta" className="px-3 py-1.5 rounded-xl bg-slate-900 text-white">Try Free</a>
          </nav>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Hero() {
  const title = 'Briefly.AI'
  const letters = useMemo(() => title.split(''), [title])
  const sectRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: sectRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 40])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98])
  const INTRO_DURATION = 1.1
  const STAGGER = 0.06
  const totalIntro = INTRO_DURATION + (letters.length - 1) * STAGGER + 0.15
  return (
    <section ref={sectRef} className="relative">
      <div className="mx-auto max-w-6xl px-4 pt-16">
        <h1 className="text-center font-semibold text-6xl md:text-8xl lg:text-9xl">
          <span className="sr-only">Briefly.AI</span>
          <span className="inline-block leading-[1.28] pb-16 overflow-visible">
            <AnimatePresence>
              <motion.span
                aria-hidden
                className="relative inline-flex select-none [transform-style:preserve-3d] overflow-visible squeeze-bounce"
                style={{ ['--intro-ms' as any]: `${Math.round(totalIntro * 1000)}ms` }}
                initial="hidden"
                animate="visible"
              >
                <motion.span
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-slate-900"
                  initial={{ opacity: 0, x: 0, scaleY: 1 }}
                  animate={{ opacity: [0, 1, 1, 0], x: [-40, -40, -20, -20], y: [-80], scaleY: [1, 1, 0.96, 1] }}
                  transition={{ delay: totalIntro, duration: 1.1, ease: 'easeInOut', times: [0, 0.12, 0.86, 1] }}
                >l</motion.span>
                {letters.map((ch, i) => (
                  <motion.span
                    key={`${ch}-${i}`}
                    className="inline-block will-change-transform ai-gradient origin-bottom"
                    variants={letterVariants}
                    transition={letterTransition(i)}
                  >
                    {ch === ' ' ? '\u00a0' : ch}
                  </motion.span>
                ))}
                <motion.span
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-900"
                  initial={{ opacity: 0, x: 0, scaleY: 1 }}
                  animate={{ opacity: [0, 1, 1, 0], x: [40, 40, 20, 20], y: [-80], scaleY: [1, 1, 0.96, 1] }}
                  transition={{ delay: totalIntro, duration: 1.1, ease: 'easeInOut', times: [0, 0.12, 0.86, 1] }}
                >l</motion.span>
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="mt-6 text-lg text-slate-600">
            Summarize legal contracts and highlight clauses that are malicious, risky, or dangerous. Never be caught unaware by terms of service or privacy policies again.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#cta" className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-medium">Start free trial</a>
            <a href="#how" className="px-5 py-3 rounded-2xl border border-slate-200">See how it works</a>
          </div>
          <div className="mt-6 text-xs text-slate-500">No credit card required · SOC2-ready workflow</div>
        </div>
        <motion.div className="relative" style={{ y, scale }}>
          <Reveal y={24}>
            <div className="rounded-3xl border border-slate-100 shadow-xl p-4 md:p-6 bg-white">
              <div className="text-sm text-slate-500 mb-3">Contract summary</div>
              <div className="space-y-3">
                <Chip label="Auto-renewal" tone="warn" />
                <Chip label="Unilateral termination" tone="warn" />
                <Chip label="Excessive liability cap" tone="risk" />
                <Chip label="Confidentiality exceptions" tone="info" />
                <Chip label="Governing law: CA" tone="ok" />
              </div>
              <div className="mt-6 text-sm leading-6 text-slate-600">
                Briefly explains each clause in plain English and suggests safe remediations. Export a redlined draft or share a link.
              </div>
            </div>
          </Reveal>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden>
        <div className="mx-auto max-w-6xl h-[400px] blur-3xl bg-gradient-to-b from-indigo-50 via-purple-50 to-transparent" />
      </div>
    </section>
  )
}

function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  )
}

const letterVariants = {
  hidden: { opacity: 0, rotateX: -90, y: -40 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: [-40, 0, -3, 0, -1, 0],
    scaleY: [1, 1, 0.988, 1.01, 0.998, 1],
  },
}

function letterTransition(i: number) {
  const base = 0.06
  return {
    duration: 1.1,
    delay: i * base,
    times: [0, 0.62, 0.78, 0.9, 0.96, 1],
    ease: [
      [0.2, 0.6, 0.0, 1.0],
      [0.2, 0.6, 0.0, 1.0],
      [0.17, 0.88, 0.32, 1.27],
      [0.2, 0.6, 0.0, 1.0],
      [0.17, 0.88, 0.32, 1.27],
    ],
  } as any
}
function Logos() {
  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-sm text-slate-500 mb-6">
          Trusted by legal, finance, and procurement teams
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center opacity-70">
          {Array.from({ length: 10 }).map((_, i) => (
            <LogoGhost key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoGhost() {
  return (
    <div className="h-8 bg-gradient-to-br from-white to-slate-100 rounded-xl border border-slate-200" />
  )
}

function Reveal({
  children,
  y = 16,
  delay = 0,
}: {
  children: React.ReactNode
  y?: number
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function Features() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-6xl px-4 space-y-20">
        <Feature
          eyebrow="Clause detection"
          title="Surface risky terms instantly"
          copy="We flag auto-renewals, one-sided indemnities, non-mutual termination, choice of law mismatches, and more. Customize rules to match your risk profile."
          imgPosition="right"
          rowText={{
            one: {
              label: 'Auto-Renewal',
              value: '12 months, 60-day notice',
              tone: 'warn',
            },
            two: {
              label: 'Liability Cap',
              value: '2x fees',
              tone: 'risk',
            },
            three: {
              label: 'Indemnity',
              value: 'One-sided',
              tone: 'risk',
            },
            four: {
              label: 'Arbitration',
              value: 'Signing away right to pursue legal action',
              tone: 'rights',
            },
          }}
        />
        <Feature
          eyebrow="Plain-language summaries"
          title="Explain complex contracts in seconds"
          copy="Briefly converts dense legal into digestible summaries with links back to the original clauses — great for terms of service and privacy policies."
          imgPosition="left"
          rowText={{
            one: {
              label: 'Data Sharing with Third Parties',
              value:
                'Allows your personal data to be sold or shared with advertisers or partners',
              tone: 'info',
            },
            two: {
              label: 'Unilateral Policy Changes',
              value:
                'Lets the company change terms at any time without notifying you',
              tone: 'info',
            },
            three: {
              label: 'Arbitration Requirement',
              value:
                'Forces disputes into private arbitration instead of court',
              tone: 'info',
            },
            four: {
              label: 'Broad Data Retention',
              value:
                'Company keeps your data indefinitely, even after account deletion',
              tone: 'info',
            },
          }}
          buttonText={{
            one: 'Get More Info',
            two: 'See next'
          }}
        />
      </div>
    </section>
  )
}

type RowInfo = {
  label: string
  value: string
  tone?: 'ok' | 'info' | 'warn' | 'risk' | 'rights'
}
type RowText = {
  one?: RowInfo
  two?: RowInfo
  three?: RowInfo
  four?: RowInfo
}
type ButtonText = {
  one?: string
  two?: string
}

function Feature({
  eyebrow,
  title,
  copy,
  imgPosition = 'right',
  rowText,
  buttonText
}: {
  eyebrow: string
  title: string
  copy: string
  imgPosition?: 'left' | 'right'
  rowText?: RowText
  buttonText?: ButtonText
}) {
  const r1 = rowText?.one ?? { label: 'Auto-renewal', value: '12 months, 60-day notice', tone: 'warn' as const }
  const r2 = rowText?.two ?? { label: 'Liability cap', value: '2× fees', tone: 'risk' as const }
  const r3 = rowText?.three ?? { label: 'Indemnity', value: 'One-sided', tone: 'risk' as const }
  const r4 = rowText?.four ?? { label: 'Termination', value: 'For convenience (vendor only)', tone: 'warn' as const }

  const graphic = (
    <Reveal>
      <div className="rounded-3xl border border-slate-100 shadow-xl p-6 bg-white">
        <div className="text-xs text-slate-500 mb-2">AI findings</div>
        <div className="space-y-3">
          <Row label={r1.label} value={r1.value} tone={r1.tone} />
          <Row label={r2.label} value={r2.value} tone={r2.tone} />
          <Row label={r3.label} value={r3.value} tone={r3.tone} />
          <Row label={r4.label} value={r4.value} tone={r4.tone} />
        </div>
        <div className="mt-5 flex gap-2">
          <button className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-sm">{buttonText?.one ? buttonText.one : 'Download'}</button>
          <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-sm">{buttonText?.two ? buttonText.two : 'Copy summary'}</button>
        </div>
      </div>
    </Reveal>
  )

  return (
    <div
      className={`grid md:grid-cols-2 items-center gap-10 ${
        imgPosition === 'left' ? 'md:[&>div:first-child]:order-2' : ''
      }`}
    >
      <div>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
          <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{title}</h3>
          <p className="mt-3 text-slate-600 leading-7">{copy}</p>
        </Reveal>
      </div>
      <div>{graphic}</div>
    </div>
  )
}

function Row({
  label,
  value,
  tone = 'info',
}: {
  label: string
  value: string
  tone?: 'ok' | 'info' | 'warn' | 'risk' | 'rights'
}) {
  const toneMap: Record<string, string> = {
    ok: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    info: 'bg-slate-50 text-slate-700 border-slate-100',
    warn: 'bg-amber-50 text-amber-800 border-amber-100',
    risk: 'bg-rose-50 text-rose-700 border-rose-100',
    rights: 'bg-purple-50 text-purple-700 border-purple-100',
  }
  return (
    <div className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${toneMap[tone]}`}>
      <span className="font-medium">{label}</span>
      <span className="text-sm opacity-80">{value}</span>
    </div>
  )
}

function Chip({
  label,
  tone = 'info',
}: {
  label: string
  tone?: 'ok' | 'info' | 'warn' | 'risk'
}) {
  const toneMap: Record<string, string> = {
    ok: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    info: 'bg-slate-50 text-slate-700 border-slate-100',
    warn: 'bg-amber-50 text-amber-800 border-amber-100',
    risk: 'bg-rose-50 text-rose-700 border-rose-100',
  }
  return (
    <span className={`inline-block text-xs px-3 py-1.5 rounded-full border ${toneMap[tone]}`}>{label}</span>
  )
}

function HowItWorks() {
  return (
    <section id="how" className="py-20 bg-slate-50/60 border-y border-slate-100">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="mt-2 text-slate-600">Three steps to safer contracts.</p>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <Step n={1} title="Upload" desc="Drop a PDF or DOCX. We never train on your data by default." />
          <Step n={2} title="Review" desc="Briefly highlights risky clauses and explains them in plain English." />
          <Step n={3} title="Redline" desc="Insert safer language with one click and export a tracked-changes DOCX." />
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <Reveal>
      <div className="rounded-3xl border border-slate-100 bg-white p-6">
        <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">{n}</div>
        <h4 className="mt-4 font-semibold">{title}</h4>
        <p className="mt-1 text-sm text-slate-600 leading-6">{desc}</p>
      </div>
    </Reveal>
  )
}

function Security() {
  return (
    <section id="security" className="py-20">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">Security & privacy by default</h2>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>• Data residency controls & object-level encryption</li>
              <li>• SSO/SAML, SCIM, RBAC, audit logs</li>
              <li>• Optional zero-retention inference — bring your own key</li>
              <li>• SOC 2 controls in process</li>
            </ul>
          </Reveal>
        </div>
        <Reveal>
          <div className="rounded-3xl border border-slate-100 shadow-xl p-6 bg-white">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Badge label="SSO/SAML" />
              <Badge label="RBAC" />
              <Badge label="Audit Trail" />
              <Badge label="Encryption" />
            </div>
            <p className="mt-5 text-slate-600 text-sm">
              Granular retention policies and secure export destinations (Drive, Box, S3).
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Badge({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center font-medium">{label}</div>
  )
}

function CTA() {
  return (
    <section id="cta" className="py-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <Reveal y={20}>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Review contracts 5× faster</h2>
          <p className="mt-3 text-slate-300">Start free. Cancel anytime.</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#" className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium">Start free trial</a>
            <a href="#" className="px-5 py-3 rounded-2xl border border-white/20">Book a demo</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 text-sm text-slate-500">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={Logo} style={{ width: 30 }} />
          <span className="font-semibold text-slate-700">Briefly.AI</span>
        </div>
        <div className="flex gap-6">
          <a href="#features" className="hover:text-slate-700">Features</a>
          <a href="#how" className="hover:text-slate-700">How it works</a>
          <a href="#security" className="hover:text-slate-700">Security</a>
          <a href="#" className="hover:text-slate-700">Terms</a>
          <a href="#" className="hover:text-slate-700">Privacy</a>
        </div>
        <div>© {new Date().getFullYear()} Briefly.AI</div>
      </div>
    </footer>
  )
}

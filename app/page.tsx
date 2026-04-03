import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SnippetGenerator from '@/components/SnippetGenerator';
import BeforeAfter from '@/components/BeforeAfter';
import PricingCard from '@/components/PricingCard';
import WaitlistForm from '@/components/WaitlistForm';

const steps = [
  {
    num: 1,
    icon: '🔗',
    title: 'Point your agents subdomain',
    body: 'Add one CNAME record to your DNS: agents.yourdomain.com → api.somready.com. Takes 30 seconds.',
  },
  {
    num: 2,
    icon: '📄',
    title: 'Add two lines to robots.txt',
    body: 'Paste your generated snippet. AI agents that visit your site will now discover your SOM endpoint automatically.',
  },
  {
    num: 3,
    icon: '📊',
    title: 'See your agent traffic',
    body: 'Your dashboard shows which agents are reading your content, how often, what pages, and whether your content is being cited downstream.',
  },
];

const features = [
  {
    icon: '⚡',
    title: 'SOM Serving',
    desc: 'Instant structured representations for any URL. AI agents get clean, typed JSON instead of raw HTML.',
  },
  {
    icon: '📈',
    title: 'Agent Analytics',
    desc: 'See which AI agents visit your site, what pages they read, and how frequently. Finally understand your non-human traffic.',
  },
  {
    icon: '🔗',
    title: 'Attribution Tracking',
    desc: 'Know when your content is cited or summarized by AI systems. Attribution is the foundation of publisher economics in the agentic web.',
  },
  {
    icon: '📋',
    title: 'robots.txt Generator',
    desc: 'Your custom snippet, ready to copy. Includes CNAME record, SOM endpoint, and freshness rules tuned for your content type.',
  },
  {
    icon: '💾',
    title: 'Smart Caching',
    desc: 'Cache rules by content type: news freshens every 15 minutes, docs every 6 hours, marketing pages daily. Your settings, automatically applied.',
  },
  {
    icon: '🌐',
    title: 'Open Standard',
    desc: 'Built on the Semantic Object Model (SOM/1.0) — an Apache 2.0 open standard. No lock-in. No proprietary format.',
  },
];

const tiers = [
  {
    name: 'Free',
    price: '$0',
    subtitle: 'For personal sites and experiments',
    features: ['100 SOM requests/month', '1 domain', 'Community support', 'robots.txt generator'],
    cta: 'Get started free',
  },
  {
    name: 'Starter',
    price: '$29',
    subtitle: 'For active blogs and small publishers',
    features: ['5,000 SOM requests/month', '3 domains', 'Agent analytics dashboard', 'Email support'],
    cta: 'Start free trial',
  },
  {
    name: 'Growth',
    price: '$99',
    subtitle: 'For established content sites',
    features: ['50,000 SOM requests/month', '10 domains', 'Attribution tracking', 'Smart caching rules', 'Priority support'],
    cta: 'Start free trial',
    highlighted: true,
    badge: 'Most popular',
  },
  {
    name: 'Pro',
    price: '$299',
    subtitle: 'For media companies and agencies',
    features: ['Unlimited SOM requests', 'Unlimited domains', 'Custom caching rules', 'SLA', 'API access', 'Dedicated support'],
    cta: 'Start free trial',
    purple: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <a
            href="https://somspec.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-accent-light text-accent-dark text-xs font-medium px-3 py-1.5 rounded-full mb-6 hover:bg-[#bae6fd] transition-colors"
          >
            Built on the SOM open standard &middot; somspec.org &#8599;
          </a>

          <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-tight">
            Make your website readable by every AI agent.
          </h1>

          <p className="text-xl text-text-muted max-w-2xl mx-auto mt-4">
            AI agents crawl your site daily and pay 10&ndash;100&times; more than they should, because they&apos;re reading raw HTML. Add two lines to robots.txt. Get instant SOM serving and full visibility into your agent traffic.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-8">
            <div>
              <span className="text-2xl font-bold text-accent">17&times;</span>
              <span className="text-sm text-text-muted ml-1.5">fewer tokens on average</span>
            </div>
            <span className="text-text-faint hidden md:inline">&middot;</span>
            <div>
              <span className="text-2xl font-bold text-accent">5 min</span>
              <span className="text-sm text-text-muted ml-1.5">setup</span>
            </div>
            <span className="text-text-faint hidden md:inline">&middot;</span>
            <div>
              <span className="text-2xl font-bold text-accent">0</span>
              <span className="text-sm text-text-muted ml-1.5">code changes required</span>
            </div>
          </div>

          <div className="mt-10">
            <SnippetGenerator />
          </div>

          <p className="mt-6 text-sm text-text-faint">
            Free forever for 100 requests/month. No credit card required.
          </p>
        </div>
      </section>

      {/* Before/After */}
      <BeforeAfter />

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-text-primary">Up and running in 5 minutes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative bg-white border border-border rounded-xl p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-white text-sm font-semibold mb-4">
                  {step.num}
                </span>
                <div className="text-2xl mb-2">{step.icon}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-text-primary">Everything publishers need</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-border rounded-xl p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-base font-semibold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="font-display text-3xl md:text-4xl text-text-primary">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-text-muted">Start free. Scale as your agent traffic grows.</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="text-sm text-text-muted">Monthly</span>
            <div className="relative w-11 h-6 bg-surface2 rounded-full cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm border border-border transition-transform" />
            </div>
            <span className="text-sm text-text-muted">Annual</span>
            <span className="text-xs bg-accent-light text-accent-dark font-medium px-2 py-0.5 rounded-full">Save 20%</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <PricingCard key={tier.name} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-text-primary">Join the private beta</h2>
          <p className="mt-4 text-lg text-text-muted">
            We&apos;re onboarding publishers in batches to ensure quality. Enter your email and domain to get early access.
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
          <p className="mt-4 text-xs text-text-faint">
            No spam. No sharing. Just an email when your access is ready.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Nav() {
  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-accent-light text-accent-dark text-sm text-center py-2 px-4">
        <span className="inline-block w-2 h-2 rounded-full bg-green mr-2 pulse-dot" />
        Private Beta — Be among the first publishers to go agent-ready.{' '}
        <a href="#waitlist" className="font-semibold underline underline-offset-2">
          Join the waitlist &rarr;
        </a>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green pulse-dot" />
              <span className="text-lg font-semibold text-text-primary">somready</span>
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm text-text-muted">
              <a href="#how-it-works" className="hover:text-text-primary transition-colors">How it works</a>
              <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
              <a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm text-text-muted hover:text-text-primary transition-colors">
              Sign in
            </a>
            <a
              href="#waitlist"
              className="text-sm font-medium bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get started free &rarr;
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

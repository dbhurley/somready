export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green pulse-dot" />
            <span className="text-lg font-semibold text-text-primary">somready</span>
          </div>
          <p className="text-text-muted text-sm">Agent-ready publishing infrastructure</p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
            <a href="#how-it-works" className="hover:text-text-primary transition-colors">How it works</a>
            <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
            <a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a>
            <a href="https://somspec.org" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">somspec.org</a>
            <a href="https://webtaskbench.com" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">webtaskbench.com</a>
          </div>

          <p className="text-text-faint text-xs">
            Built on SOM — an open standard &middot; Apache 2.0
          </p>

          <div className="flex items-center gap-4 text-text-faint text-xs">
            <span>&copy; 2026 SOM Ready. All rights reserved.</span>
            <a
              href="https://github.com/dbhurley/somready"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
  purple?: boolean;
}

export default function PricingCard({ name, price, subtitle, features, highlighted, badge, cta, purple }: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 bg-white ${
        highlighted
          ? 'border-accent border-2 shadow-md'
          : 'border-border'
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
          {badge}
        </span>
      )}

      <div className="mb-6">
        <h3 className={`text-lg font-semibold ${purple ? 'text-purple' : 'text-text-primary'}`}>{name}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-text-primary">{price}</span>
          <span className="text-text-muted text-sm">/month</span>
        </div>
        <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
      </div>

      <ul className="flex-1 space-y-3 mb-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-text-primary">
            <span className="text-green mt-0.5 flex-shrink-0">&check;</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#waitlist"
        className={`block text-center py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
          highlighted
            ? 'bg-accent hover:bg-accent-dark text-white'
            : 'bg-surface hover:bg-surface2 text-text-primary border border-border'
        }`}
      >
        {cta}
      </a>
    </div>
  );
}

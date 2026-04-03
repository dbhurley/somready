'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, domain }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-light border border-green rounded-xl p-6 text-center">
        <p className="text-text-primary font-semibold">You&apos;re on the list!</p>
        <p className="text-sm text-text-muted mt-1">We&apos;ll be in touch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        required
        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
      />
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="yourdomain.com"
        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? 'Joining...' : 'Join waitlist →'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

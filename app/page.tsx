'use client';

import BrowserControl from './components/BrowserControl';

export default function Home() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <BrowserControl />
      </div>
    </div>
  );
}


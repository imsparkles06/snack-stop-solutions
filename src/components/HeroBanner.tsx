import { Sparkles } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-8 text-center mb-8 animate-fade-in">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-10 top-10 text-6xl">🍜</div>
        <div className="absolute right-10 top-16 text-5xl">🍪</div>
        <div className="absolute bottom-10 left-20 text-4xl">🥔</div>
        <div className="absolute bottom-8 right-16 text-5xl">🌶️</div>
      </div>

      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Late Night Cravings?
        </div>
        <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">
          <span className="text-gradient">The Snack Stop</span>
        </h1>
        <p className="mb-2 text-lg text-foreground font-medium">Room 502</p>
        <p className="text-muted-foreground max-w-md mx-auto">
          Midnight munchies delivered right to your hostel room. 
          Fresh snacks, fast delivery, no judgment. 🌙
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            ⏰ 5 PM – 1 AM
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            🏠 Began Hostel Only
          </span>
        </div>
      </div>
    </section>
  );
}

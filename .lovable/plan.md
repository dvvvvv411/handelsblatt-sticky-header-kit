

## Linke Spalte der Auth-Seite spektakularer gestalten

### Konzept
Die linke Branding-Spalte bekommt mehr Tiefe und Professionalitat: ausfuhrlicherer Text, animierte SVG-Vektorgrafiken (Kreise/Linien als dekorative Elemente), Trust Badges und subtile CSS-Animationen. Alles bleibt serios und dunkel, aber deutlich eindrucksvoller.

### Anderungen in `src/pages/Auth.tsx`

**Dekorative SVG-Elemente (inline):**
- Animierte Kreisringe (stroke-dasharray Animation) in indigo/violet Tonen, halbtransparent, absolute positioniert
- Dezente Gitterlinien/Dots-Pattern als SVG im Hintergrund
- Floating gradient Orbs (2-3 Stuck, langsam pulsend via CSS animation)

**Ausführlicherer Content-Block (Mitte):**
- Grossere Headline: "Dein Content-Hub fur maximale Reichweite."
- Subtitle/Beschreibung: 2-3 Satze uber die Plattform-Vorteile
- 3 Feature-Punkte mit kleinen Icons (CheckCircle aus lucide): "Artikel erstellen & veroffentlichen", "Echtzeit-Statistiken & Analytics", "CTA-Cards fur mehr Conversions"

**Trust Badges (unten, uber Copyright):**
- Horizontale Reihe mit 3 Badges: "256-Bit SSL", "DSGVO-konform", "99.9% Uptime"
- Kleine Icons (Shield, Lock, Zap aus lucide), text-slate-500, dezent aber vertrauensbildend

**Animationen (CSS, im Tailwind-Stil):**
- Floating Orbs: `animate-pulse` mit unterschiedlichen `animation-delay`
- SVG-Kreisringe: Langsame Rotation via `animate-spin` mit `duration-[20s]`
- Feature-Liste: Subtle staggered fade-in (optional, via Tailwind animate-fade-in mit delays)

**Kein neuer Tailwind-Config-Eintrag notig** - nutzt bestehende Animationen + inline styles fur die langsamen Animationen.

### Ergebnis
Die linke Spalte wirkt wie eine moderne SaaS-Landing-Page: professionell, vertrauenswurdig und visuell beeindruckend, ohne kitschig zu werden.


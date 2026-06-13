# Font Pairing Catalogue

This catalogue details 8 named typographic pairings designed to cover various visual archetypes, emotional registers, and performance profiles.

---

## PAIRING 1: SOVEREIGN

* **Display**: Editorial New (serif, Pangram Pangram)
* **Body**: Inter Variable (sans)
* **Utility**: Geist (sans)
* **Archetype**: Prestige B2B, luxury tech, high-end SaaS
* **Register**: Authority, restraint, earned trust
* **Real-world use**: Many Site of the Day (SOTD) agency sites, Linear-adjacent products

```css
@font-face {
  font-family: 'Editorial New';
  src: url('/fonts/EditorialNew-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Editorial New';
  src: url('/fonts/EditorialNew-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Editorial New';
  src: url('/fonts/EditorialNew-Ultrabold.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

/* Override COS font tokens for Sovereign projects */
[data-pairing="sovereign"] {
  --font-display: 'Editorial New', Georgia, serif;
  --font-body: 'Inter Variable', system-ui, sans-serif;
  --font-utility: 'Geist', sans-serif;
  --tracking-hero: -0.04em;
  --leading-display: 0.92;
}
```

### Headline Example
* **Font**: Editorial New Ultrabold
* **Size**: `var(--text-hero)`
* **Tracking**: `var(--tracking-hero)`
* **Leading**: `var(--leading-hero)`
* **Output**: "Design that earns its price."

---

## PAIRING 2: INDUSTRIAL

* **Display**: Neue Haas Grotesk Display (sans, ultra-tight)
* **Body**: Neue Haas Grotesk Text
* **Utility**: Neue Haas Grotesk (same family, weight variation)
* **Archetype**: Architecture, industrial design, engineering studios
* **Register**: Precision, function, confident neutrality
* **Real-world use**: RXK Studio aesthetic, Rothko-adjacent sites

```css
@font-face {
  font-family: 'Neue Haas Grotesk';
  src: url('/fonts/NeueHaasGroteskDisplay-95Black.woff2') format('woff2');
  font-weight: 900;
  font-display: swap;
}
@font-face {
  font-family: 'Neue Haas Grotesk';
  src: url('/fonts/NeueHaasGroteskText-65Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}

[data-pairing="industrial"] {
  --font-display: 'Neue Haas Grotesk', 'Helvetica Neue', sans-serif;
  --font-body: 'Neue Haas Grotesk', 'Helvetica Neue', sans-serif;
  --tracking-hero: -0.06em;
  --leading-display: 0.86;
}
```

### Headline Example
* **Font**: Neue Haas Grotesk Display Black
* **Size**: `var(--text-2xl)`
* **Tracking**: `var(--tracking-hero)`
* **Leading**: `var(--leading-display)`
* **Output**: "Constructed with absolute intent."

---

## PAIRING 3: MONOSPACE CONFIDENCE

* **Display**: JetBrains Mono Variable (weight 800)
* **Body**: JetBrains Mono Variable (weight 400)
* **Archetype**: Developer tools, infrastructure, creative developer portfolios
* **Register**: Technical authority, Aristide Benoist energy
* **Real-world use**: Aristide Benoist portfolios (monospace as the sole typeface)

```css
@font-face {
  font-family: 'JetBrains Mono Variable';
  src: url('/fonts/JetBrainsMono[wght].woff2') format('woff2 supports variations'),
       url('/fonts/JetBrainsMono[wght].woff2') format('woff2');
  font-weight: 100 800;
  font-display: swap;
}

[data-pairing="mono-confidence"] {
  --font-display: 'JetBrains Mono Variable', monospace;
  --font-body: 'JetBrains Mono Variable', monospace;
  --tracking-hero: -0.02em;
  --leading-display: 0.95;
  --leading-normal: 1.6;
}
```

### Headline Example
* **Font**: JetBrains Mono Variable Bold
* **Size**: `var(--text-xl)`
* **Tracking**: `var(--tracking-hero)`
* **Leading**: `var(--leading-display)`
* **Output**: "const structure = true"

---

## PAIRING 4: EDITORIAL

* **Display**: Canela (serif, Commercial Type)
* **Body**: Freight Text Pro (serif body)
* **Utility**: Söhne (sans, Klim Type)
* **Archetype**: Culture, publishing, fashion, luxury editorial
* **Register**: Refinement, cultural authority, New Yorker energy

```css
[data-pairing="editorial"] {
  --font-display: 'Canela', 'Freight Display Pro', Georgia, serif;
  --font-body: 'Freight Text Pro', Georgia, serif;
  --font-utility: 'Söhne', 'Helvetica Neue', sans-serif;
  --tracking-hero: -0.03em;
  --leading-display: 0.9;
  --leading-normal: 1.65;
}
```

---

## PAIRING 5: KINETIC

* **Display**: Aktiv Grotesk Extended (wide, bold)
* **Body**: DM Sans Variable
* **Archetype**: Sports, fitness, energy, motion-forward brands
* **Register**: Speed, power, forward momentum

```css
[data-pairing="kinetic"] {
  --font-display: 'Aktiv Grotesk Extended', 'Barlow Condensed', sans-serif;
  --font-body: 'DM Sans Variable', system-ui, sans-serif;
  --tracking-hero: -0.01em;
  --leading-display: 0.88;
}
```

---

## PAIRING 6: BAUHAUS MINIMAL

* **Display**: PP Mori (geometric sans, Pangram Pangram)
* **Body**: Inter Variable
* **Archetype**: Product startups, minimal SaaS, clean tech
* **Register**: Clarity, modernity, quiet confidence (Thomas Aufresne energy)

```css
[data-pairing="bauhaus"] {
  --font-display: 'PP Mori', 'Circular', 'Futura', sans-serif;
  --font-body: 'Inter Variable', system-ui, sans-serif;
  --tracking-hero: -0.04em;
  --leading-display: 0.93;
}
```

---

## PAIRING 7: CULTURAL

* **Display**: Garamond Premier Pro (classic serif)
* **Body**: Söhne (Klim Type)
* **Archetype**: Art institutions, architecture, cultural organizations
* **Register**: Heritage, permanence, analogue warmth

```css
[data-pairing="cultural"] {
  --font-display: 'Garamond Premier Pro', 'EB Garamond', Georgia, serif;
  --font-body: 'Söhne', 'Helvetica Neue', sans-serif;
  --tracking-hero: -0.02em;
  --leading-display: 0.96;
  --leading-normal: 1.7;
}
```

---

## PAIRING 8: PSYCHEDELIC TECHNICAL

* **Display**: ABC Diatype (Dinamo type foundry)
* **Body**: ABC Diatype Mono
* **Archetype**: Creative labs, experimental studios, AI/tech with personality
* **Register**: Eccentric precision, future-facing, technically playful

```css
[data-pairing="psychedelic-technical"] {
  --font-display: 'ABC Diatype', 'Helvetica Neue', sans-serif;
  --font-body: 'ABC Diatype Mono', monospace;
  --tracking-hero: -0.03em;
  --leading-display: 0.91;
}
```

---

## Benchmark Traceability

### Buttermax
- [DIRECT] Buttermax: Suisse Intl typography variables: Font Pairing Catalogue: Load Suisse fonts for all display headers.

### Active Theory
- [DIRECT] Active Theory: NB Architekt monospace pairings: Font Pairing Catalogue: Load monospace styles for all secondary tags.

### Bureau Borsche
- [SECONDARY] Bureau Borsche: Serif heading pairings: Font Pairing Catalogue: Select high-contrast display serif typography for editorial titles.

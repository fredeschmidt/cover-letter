# AU-rejsen — UX-/frontend-demo (`/au-demo`)

En *thinking prototype* der binder hele studierejsen på Aarhus Universitet
sammen i én personlig portal: fra studieinteresse, gennem ansøgning, til
optagelse. Bygget som UX-/frontend-case til Frederikke Schmidts portfolio.

- **Rute:** `/au-demo`
- **Persona:** "Astrid" (18, 3.g'er, kernemålgruppen)
- **Scope-disclaimer (bevidst):** *Fokus er UX — ikke visuelt design.* Står i
  "Om demoen"-boksen øverst på siden og er en del af casen, ikke en mangel.

---

## Faser

Hele oplevelsen drejer om én `activePhase` (`JourneyPhaseId`). Brugeren skifter
fase via sidemenuen, og alt indhold filtreres og omtones efter den valgte fase:

| `JourneyPhaseId` | Menu-label  | `programsTitle`      | tone        | h1-hilsen                 | Hvad fasen viser |
|------------------|-------------|----------------------|-------------|---------------------------|------------------|
| `interested`     | Interesse   | "Dine ansøgninger"   | `default`   | "Velkommen Astrid"        | Søgefelt + hovedområde-chips, kladder med fremdrift-pips, akut frist-countdown, åbent hus m.m. |
| `applied`        | Ansøgning   | "Sendte ansøgninger" | `submitted` | "Velkommen tilbage, Astrid" | Afsendte ansøgninger (grøn check), uploadede dokumenter, "Mens du venter" (SU + info samlet) |
| `accepted`       | Optagelse   | "Optaget på"         | `accepted`  | "Tillykke Astrid"         | "Tillykke!"-hero med uddannelsen + CTA til MitStudie |

Fase-konfigurationen ligger i `phaseConfigs` i [`data.ts`](./data.ts).

---

## Dataflow

Alt indhold er statisk mock-data — ingen backend.

```
data.ts (statiske arrays, alle tagget med phaseId)
        │
        ▼
useState(activePhase)            ← starter på "interested"
        │
        ├─ savedPrograms     ─┐
        ├─ draftApplications  │
        ├─ phaseActivities    ├─ .filter(x => x.phaseId === activePhase)
        ├─ uploadedDocuments  │
        └─ suItems           ─┘
        │
        ├─ phaseConfigs[activePhase] → programsTitle + tone (titel/ikon/varianter)
        │
        ▼
Sektioner renderes (tomme lister skjules).
Undtagelse: i "applied" slås SU + info sammen i "Mens du venter".
```

`SavedProgramsList` skifter visuel variant ud fra `tone`: `default` → kladde-rækker
med fremdrift-pips, `submitted` → afsendt-rækker med grøn check, `accepted` →
én stor hero (ikke en liste).

---

## Hvordan fase-skift virker

- `PhaseSideNav` kalder `setActivePhase` når en fase klikkes.
- Fase-blokken er wrappet i `AnimatePresence mode="wait"` med `key={activePhase}`,
  så hele blokken re-mounter ved skift. Skiftet bliver dermed en synlig
  fade/slide-transition i stedet for et abrupt swap.

---

## Filstruktur

```
app/au-demo/
├── page.tsx                     Server component: metadata + rendrer <AuDemoClient/>
├── data.ts                      Types + statiske mock-data (alle phaseId-taggede)
├── theme.ts                     Pure utils/konstanter (ingen JSX): daysUntil,
│                                auDemoTheme (scoped farve-palette), IconComponent-type
├── README.md                    Denne fil
└── components/
    ├── au-demo-client.tsx       Root: state, layout, fase-skift-animation. Eneste "use client".
    ├── shared.tsx               Delte primitiver: Row (inert klikbar række),
    │                            StatusIcon (done/urgent/none), RowTitle,
    │                            SectionHeading, RowChevron
    ├── phase-side-nav.tsx       Sidemenu med de tre faser
    ├── study-search-bar.tsx     Søgefelt + hovedområde-chips (kun i "interested")
    ├── saved-programs-list.tsx  Uddannelseslisten + dens fase-varianter (kladde/afsendt/optaget)
    ├── activities-list.tsx      "Hvad kan du gøre nu?" — eksporterer også ActivityRow
    ├── documents-list.tsx       "Uploadet dokumenter"
    └── su-list.tsx              SU-liste + "Mens du venter" (genbruger ActivityRow)
```

**`"use client"`-regel:** kun `components/au-demo-client.tsx` bærer direktivet.
Den er client-entry; alle øvrige komponenter importeres ind i dens modul-graf og
arver automatisk client-kontekst (også dem med `onClick`/`onSubmit`/framer-motion).
Tilføj derfor ikke `"use client"` til de øvrige filer.

---

## Bevidste prototype-genveje (IKKE bugs)

- **Inaktive links:** klikbare rækker er `<a href="#">` med `e.preventDefault()`
  (centraliseret i `Row` i `shared.tsx`; chips/søgefelt-knapper bruger samme
  `preventDefault`). Der er ingen reel navigation — demoen viser flow og
  hierarki, ikke fungerende destinationer.
- **Fast "i dag":** `demoToday = "2026-03-08"` i `data.ts` er hardcoded i stedet
  for `Date.now()`, så frist-countdowns er stabile og marts-fristen altid føles
  akut, uanset hvornår demoen åbnes.
- **Ikke-funktionelt søgefelt:** søgning og hovedområde-chips er affordances, der
  ikke filtrerer noget.
- **Ingen tests:** bevidst — det er en visuel UX-case, ikke et produkt.

---

## Kør lokalt

```bash
npm run dev     # åbn http://localhost:3000/au-demo
npm run build   # produktions-build
npm run lint    # lint
```

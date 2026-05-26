# Kontekst til Claude Code

Denne fil indeholder kontekst om hvem jeg er, hvad jeg sigter efter, og hvordan dette projekt passer ind i den større jobsøgningskontekst. Den bruges af Claude Code til at give relevant hjælp på tværs af sessioner.

Kontaktoplysninger findes på [linkedin.com/in/frederikkeschmidt](https://linkedin.com/in/frederikkeschmidt/).

---

## Om Frederikke Schmidt

**Nuværende rolle:** Teknisk projektleder for frontend, TV2 Østjylland (feb 2025-). Leder et lille frontend-team, bindeled mellem journalister og udviklere.

**Faglig baggrund:**
- BA i Web Development + udveksling på Hawaii Pacific University + Multimediedesign på KEA
- 7+ års erfaring som bindeled mellem teknik og forretning
- Frontend-stack: HTML/CSS/JS, Umbraco/C#, Next.js, React, Tailwind
- Tidligere arbejdspladser: Cabana, Nodes, Illumi, Vertica, TV2 Østjylland

**AI-kompetencer (positionering):**
- Bygger Claude Code skills, MCP-servere, agent-workflows
- Praktisk erfaring med Claude API, prompt engineering, agentisk AI
- Forstår planner agents, build agents, compliance agents — ikke "bare bruger ChatGPT"

**Egne produkter:**
- Monimo (2026): AI-drevet personlig økonomi-app, Next.js + Drizzle
- Jobsøgningsapp (2026): personligt værktøj
- Budget-grisen (MCP-projekt)

**Unik positionering:** Hands-on teknisk baggrund + 7 års projektledelse + dyb AI-forståelse + kommunikationsstyrke + produktsans. Specialisten der oversætter mellem teknik og forretning — ikke en koder, ikke en ren PM.

---

## Karriere-retning (pr. 2026-05-21)

**Primær drøm:** Teknisk projektleder / digital projektleder / koordinator / produktejer / bindeled. Specialist-rolle som oversætter mellem teknik og forretning.

**Sekundær drøm:** AI frontend-udvikler. Stadig levende, men sekundær — et stærkt koordinator-match vægter højere end et middelmådigt AI frontend-match. Perfekt fit = rollen rummer BÅDE koordinator-håndværket OG AI-vinklen.

**Historik på retning:** AI Project Manager → AI frontend-udvikler → teknisk projektleder/koordinator (nuværende).

**Why:** Gennem rollen som teknisk projektleder på TV2 Østjylland har jeg fundet ud af, at det er specialist-bindeleds-rollen der giver energi, ikke selv at sidde og kode.

### Drømmerollen — konkret

**Titler der matcher:** teknisk projektleder, digital projektleder, koordinator, produktejer, bindeled.

**Kerneopgaver:**
- Styre roadmap og prioritering (det rigtige arbejde)
- Facilitere møder mellem udviklere, brugere, ledelse
- Oversætte begge veje: teknik → ikke-tekniske, forretning → udvikler-opgaver
- Strukturere processer, dokumentation, governance
- Sætte retning og tage ejerskab (ikke ticket-reaktiv)
- Sikre brugeroplevelsen
- Præge AI-retning i teamet, hjælpe kollegaer i gang med AI, bygge automations

### Domænepræference (prioriteret)

1. **Allerhelst:** Et produkt jeg er med til at forme, tæt på både udvikling og brugere
2. **OK alternativ:** IT-system / service der vedligeholdes og videreudvikles, jeg koordinerer
3. **Også OK:** Drift, governance, administrator-roller (M365, Salesforce mv.) — hvis koordinator-håndværket er kernen

### Drømme-rammer (hard filters)

- **Specialist-rolle** — ikke delt med mange kollegaer i samme funktion
- **In-house, IKKE bureau, ingen ekstern kundekontakt** — konsulenthuse er fra
- **Lille passioneret team** — ejerskab, præge retning, tæt på beslutninger
- **God kemi** — interesserede, hyggelige kollegaer
- **Fleksible mødetider**
- **Geografi:** I eller nord for Aarhus, uden lang transport
- **Frokostordning**
- **Dansk som arbejdssprog**
- **Fysisk tilstedeværelse** med hjemmearbejde en sjælden gang — IKKE hybrid-first/remote-first

### Hvad der giver energi

- Snakke med mennesker og facilitere samarbejde
- Specialist-rollen som oversætter
- Overblik og prioritering (ikke ticket-arbejde)
- Tæt på beslutninger, brugere, kollegaer
- Præge AI-retning og bygge automations der frigør tid

---

## Dette projekt — AU-demo

`~/Documents/coverletter` er et separat Next.js-projekt (ikke det samme som jobsøgningsappen). Hovedindholdet er en UX-/frontend-demo på `app/au-demo`:

- 4 faser: Interesse → Ansøgning → Optagelse → Studieliv
- Persona i prototypen hedder Astrid; bruger ser sidenav med faser, "Næste skridt"-kort, gemte uddannelser, kladder, aktiviteter
- Data ligger i `app/au-demo/data.ts`, UI i `app/au-demo/au-demo-client.tsx`

**Formål:** Portfolio-case der viser hele studierejsen fra interesse til studieliv på Aarhus Universitet. Sandsynligvis del af ansøgning til AU-relaterede stillinger.

### Persona-test-agenter

Der ligger 3 persona-subagents i `.claude/agents/`:
- `persona-astrid` — 18, 3.g'er, målrettet, kernemålgruppe
- `persona-jonas` — 19, sabbatår, usikker, skoletræt
- `persona-mehmet` — 28, faglært elektriker, karriereskifter, voksen bruger

Hver persona læser au-demo-koden (uden at kommentere på den som kode), simulerer rejsen i karakter, og giver feedback i 1.-person på dansk. De skal IKKE bryde karakter. Invokes via Agent-tool med `subagent_type: persona-astrid` osv.

### Projektleder-agent

`projektleder` (`.claude/agents/projektleder.md`) modtager feedback fra personaerne, verificerer mod koden, filtrerer aggressivt mod scope og leverer prioriteret backlog. Kender til at au-demo er en **portfolio-case**, ikke et reelt produkt — så ny målgruppe / nye flows / fake login afvises som default. Output: sammenfatning + prioriteret tabel + filtreret-fra-liste + næste handling.

---

## Relateret projekt — Jobsøgningsapp

**Repo:** `~/Documents/jobsøgning` (separat repo, ikke en del af dette).
**Formål:** Personligt værktøj til at scanne danske jobopslag, vurdere match og generere skræddersyede ansøgninger.
**Stack:** Next.js 16, React 19, Tailwind v4, shadcn/ui, localStorage (ingen backend), dansk UI, dark theme med lilla/lime accenter.

**Nøglefiler i det repo at konsultere inden ansøgninger genereres:**
- `profil.md` — faglig baggrund, kompetencer, erfaring
- `drommearbejdsplads.md` — Job Match Rating-system og krav
- `skrivestil.md` — tone og sprog til ansøgninger
- `tidligere-ansogninger/` — eksempler der har virket
- `CLAUDE.md` — regler for ansøgningsgenerering (250-350 ord, dansk, personlig tone, vælg 2-3 relevante kompetencer, ingen buzzwords)

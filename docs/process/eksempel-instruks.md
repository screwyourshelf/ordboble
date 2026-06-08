UTFØR ITERASJON: 018.4 — Motion and Animation Polish

LES FØRST:
- docs/00-overview.md
- docs/01-stack.md
- docs/02-frontend-guidelines.md
- docs/03-design-guidelines.md
- docs/05-copilot-instructions.md
- docs/process/working-rules.md
- docs/process/iteration-loop.md
- docs/iterations/018.4-motion-and-animation-polish.md
- apps/web/src/app.css
- apps/web/src/lib/components/contributor/ContributorMobileScreen.svelte
- apps/web/src/lib/components/presentation/PresentationModeScreen.svelte
- apps/web/src/lib/components/word-cloud/FloatingParticle.svelte
- apps/web/src/lib/components/editor/ThemePicker.svelte
- apps/web/src/lib/components/editor/ShapePicker.svelte
- apps/web/src/lib/components/editor/StyleControls.svelte
- apps/web/src/lib/components/export/ExportActionButton.svelte

BRUK ROLLEFLOW:
Architect → Developer → Tester → Reviewer → Gatekeeper

VIKTIG:
Dette er motion-system polish.
Ikke redesign UI.
Ikke legg til nye features.
Ikke legg til backend/routing-endringer.
Ikke øk mengden animasjon.

MÅL:
- gjøre animasjonene mer konsistente
- innføre tydelig easing-vokabular
- støtte prefers-reduced-motion
- gjøre motion theme-aware
- redusere samtidig ambient visual noise
- fjerne unødvendige inline animation styles
- rydde transition-all der det er unødvendig

MOTION PRINCIPLE:
Foretrekk:
- færre samtidige animasjoner
- roligere ambient motion
- tydelig motion hierarchy
- intensjonell emphasis

IKKE:
- øk animation density
- legg til dekorativ motion uten formål
- animer flere elementer bare fordi det ser kult ut
- gjør appen tregere eller mer urolig

ARCHITECT:
- gjør en audit av eksisterende motion i app.css og relevante komponenter
- identifiser eksakt hvilke animation/easing/transition-problemer som skal løses
- lag minimal plan
- skill mellom must-fix og nice-to-have
- dokumenter risiko rundt prefers-reduced-motion, theme overrides og transition cleanup

DEVELOPER:
Implementer kun scoped changes.

I app.css:
- legg til easing tokens i :root:
  - --ease-out
  - --ease-spring
  - --ease-in-out
- oppdater relevante animation utilities til å bruke easing tokens
- legg til .animate-fade-in-slow
- legg til prefers-reduced-motion media query
- sørg for at reduced motion gjør animasjoner/transitions instant eller nesten instant
- legg til calm-theme motion overrides der det er hensiktsmessig
- ikke fjern animation identity helt

I komponenter:
- erstatt inline style="animation: fade-in ..." med utility class der mulig
- bruk .animate-fade-in eller .animate-fade-in-slow
- FloatingParticle kan beholde dynamisk inline animation style hvis nødvendig pga duration/delay props
- rydd transition-all i editor/export-komponenter der det er trygt:
  - bruk mer spesifikke transition properties
  - ikke gjør store visuelle endringer

PREFERS REDUCED MOTION:
- må dekke keyframe animations
- må dekke transitions
- må ikke ødelegge layout
- state changes skal fortsatt fungere, bare uten lang motion

THEME-AWARE MOTION:
For calm:
- roligere/soft motion
- mindre ambient støy
- mindre simultan looping
- ikke fjern alt liv

For playful/default:
- behold dagens energi så langt som mulig

IKKE:
- redesign screens
- legg til ny motion library
- legg til Svelte transitions med mindre nødvendig
- endre backend
- endre routing
- endre product flow
- endre komponent-API bredt
- gjør purity refactor uten produktverdi

TESTER:
Verifiser:
- pnpm -C apps/web tsc --noEmit
- pnpm -C apps/web build
- default/playful motion føles fortsatt levende
- calm motion føles roligere
- prefers-reduced-motion reduserer/stopper animasjoner
- hover interactions fungerer fortsatt
- loading/success/word entrance fungerer fortsatt
- ingen layout jumps introdusert
- deployed app-flow påvirkes ikke

REVIEWER:
Sjekk:
- ingen scope creep
- ingen økt animation density
- easing tokens brukes konsistent
- reduced-motion er implementert robust
- transition-all cleanup er trygg
- ingen unødvendige filendringer
- ingen redesign

GATEKEEPER:
Beslutning:
- approved
- approved_with_follow_up
- not_approved

Gatekeeper skal oppsummere:
- endrede filer
- hvilke motion-problemer som ble løst
- hvilke follow-ups som eventuelt gjenstår
- build/type-check-status

START MED ARCHITECT-ROLLEN.
# FreshCart — Remaining Work Plan

**Read this first:** You will not finish all of this before applying to jobs, and you shouldn't try. Phase A + B below is the real target — it's what an interviewer will actually notice. Phase C is backlog. Some of Phase C may never happen, and that's a correct outcome, not a failure. Cross items off as DONE, not as "revisited" — if it's done, don't reopen it without a real reason.

---

## PHASE A — Quick technical debt (do first, ~3-4 hours total)

These are small, mechanical, and clear existing loose ends rather than adding new surface area. Do these before anything else so they stop nagging at you.

github: git checkout -b chore/phase-a-technical-debt

- [done] **A1. Product card `priority` for LCP** *(~20 min)*
  - File: `src/components/layout/Common/Card/ProductsCard.tsx`
  - Add `priority?: boolean` prop, pass to internal `<Image priority={priority} />`
  - In brand/category detail pages, pass `priority={index < 5}` on first row
  - Done when: Lighthouse LCP audit no longer flags a product image

- [done] **A2. Convert NextAuth route to TypeScript** *(~20 min)*
  - File: `src/app/api/auth/[...nextauth]/route.js` → `.ts`
  - Type the callbacks (session, jwt) properly
  - Done when: file is `.ts`, `tsc --noEmit` clean

- [done] **A3. Merge auth Zod schemas into one file** *(~30 min)*
  - Files: `src/schema/login.schema.ts`, `verifyPassword.schema.ts`, likely `register.schema.ts`, `updateLoggedUserPassword.schema.ts`, `EditProfile.schema.ts`
  - Merge into `src/schema/auth.schema.ts`, keep separate exported consts per schema
  - Done when: one file, all imports updated, `tsc --noEmit` clean

- [done] **A4. Add validation error messages to inputs missing them** *(~30-45 min)*
  - Audit forms for missing/generic Zod error messages (e.g. "Required" vs "Please enter your email")
  - Done when: every required field has a specific, human-readable error message

- [ ] **A5. Add an error boundary component** *(~30 min)*
  - Create `error.tsx` at key route segments (at minimum: root `app/error.tsx`, and one per major route if time allows)
  - Done when: a thrown error in a page shows a graceful fallback, not a blank crash

**Phase A total: ~2-2.5 hours**

---

## PHASE B — Structure + design consistency (do second, ~6-9 hours)

This phase exists because Phase C (dark mode especially) depends on it. Do this before dark mode, not during — fixing hardcoded styles while also debugging theme-switching is harder than fixing them once, cleanly.

github: git checkout -b refactor/phase-b-design-system

- [ ] **B1. Split forms into a consistent folder structure** *(~1.5-2 hours)*
  - Decide one convention, e.g.: `components/forms/{FeatureName}/{FeatureName}Form.tsx` + co-located hook reference
  - Move existing forms (login, register, forget-password, payment, addresses, change-password, user-info, reviews) into it
  - Done when: every form lives in a predictable, identical folder shape

- [ ] **B2. Design system audit** *(~1 hour)*
  - Go through cart, products, profile, checkout — write down every button/input variant currently in use
  - Check `globals.css` for existing CSS variables vs hardcoded colors in components
  - Output: a short markdown list of inconsistencies (this doc, or a new one)
  - Done when: you have a written list, not a feeling

- [ ] **B3. Fix inconsistencies found in B2** *(~2-3 hours, scales with B2 findings)*
  - Apply one spacing scale, one color usage pattern via CSS variables
  - Done when: B2's list is resolved

- [ ] **B4. Global container/layout classes** *(~1 hour)*
  - Create shared Tailwind classes or a `Container` component for consistent page padding/max-width across all pages
  - Done when: every page wrapper uses the same container pattern

- [ ] **B5. Session hook** *(~30-45 min)*
  - Create `useCurrentUser()` (or similar) wrapping `useSession()`, decide once whether components should be `"use client"` for this or if there's a server-side alternative worth using instead
  - Done when: no component calls `useSession()` directly, all go through the hook

**Phase B total: ~6-8 hours**

---

## >>> STOPPING LINE <<<
### If you only get through Phase A + B, your portfolio is genuinely job-ready. Apply to jobs now, from here, in parallel with whatever's below. Do not wait for Phase C to start applying.

---

## PHASE C — Feature work (real backlog, pick and choose, ~25-35+ hours total)

Don't do these sequentially just because they're listed. Pick based on genuine interest or a specific gap you notice in interviews. None of these block you from applying.

- [ ] **C1. Forget-password stepper redesign** *(~2-3 hours)* — convert current conditional-render flow to a visual stepper with disabled future steps
- [ ] **C2. Payment stepper + saved-address selection** *(~3-4 hours)* — stepper UI, plus choosing an existing address vs adding new, instead of always showing a blank form
- [ ] **C3. Order history redesign** *(~2-3 hours)* — new layout for `allorders` page
- [ ] **C4. Advanced product filtering** *(~3-4 hours)* — add price range + rating + brand filters on top of existing search/category filter (`useProductFilters`)
- [ ] **C5. Per-page/per-card loading states audit** *(~2 hours)* — you've built several skeletons already (products, wishlist); check remaining pages (orders, cart, brand/category detail) for the same treatment
- [ ] **C6. Navbar responsive split/cleanup** *(~1.5-2 hours)* — separate large/small screen navbar components or simplify current responsive logic
- [ ] **C7. Accessibility pass** *(~2-3 hours)* — alt text audit, keyboard nav check, ARIA labels on icon-only buttons (delete/edit buttons in cart, reviews)
- [ ] **C8. Folder structure review** *(~2-3 hours)* — only worth doing if B1 exposed real pain; don't restructure for its own sake
- [ ] **C9. Server vs client rendering audit** *(~2-3 hours)* — per your diagram: confirm pages that could be server components aren't unnecessarily `"use client"`; you already did this correctly for `ProductSectionServer`, extend the same review to brand/category/order pages
- [ ] **C10. API caching strategy review** *(~2-3 hours)* — confirm `next: { revalidate }` is set consistently across all API functions, decide real revalidate windows per resource type (products vs categories vs user-specific data)
- [ ] **C11. TypeScript types completeness audit** *(~2 hours)* — grep for `any`, confirm all API response shapes are typed
- []  **C12: "Migrate review/payment forms from manual ref/state validation to Zod + RHF, for consistency with the rest of the app"**
---

## PHASE D — Big, expensive, genuinely optional (do only if C is done and you still want to)

These are the two biggest line items in your original plan. Both are real, valuable features — but both are large enough that starting them before applying to jobs would meaningfully delay you. Treat them as "maybe next quarter," not "next week."

- [ ] **D1. Dark mode** *(~6-8 hours)* — `next-themes`, toggle, persistence, full-page verification. Requires Phase B done first or you'll be fixing hardcoded colors reactively mid-implementation.
- [ ] **D2. Localization (Arabic + English + RTL)** *(~15-18 hours)* — `next-intl`, translation keys across 15+ components, RTL layout fixes. This is bigger than everything else on this list combined.

---

## How to actually use this file

1. Work top to bottom within a phase. Don't skip to Phase C items because they're more interesting than Phase B's audit work — B blocks C's visual consistency.
2. Check a box only when the "Done when" condition is true, verified, not assumed — same standard you held yourself to all session with the hooks extraction.
3. Re-read the stopping line after Phase B. Actually stop there and apply to jobs before deciding whether to touch Phase C.
4. This file is allowed to sit unfinished. That's what backlogs are for.

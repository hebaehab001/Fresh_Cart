# UI and Architecture Improvement Plan

## Goals

Improve the project by making the UI more consistent, reusable, and easier to maintain. The focus is on:

- creating a global Tailwind design system
- reducing repeated class strings across pages
- building reusable UI primitives such as Button, Input, Form, and Card
- improving folder structure and component separation
- making the app easier to scale as features grow

---

## 1. Establish a Global Design System

### What to do

Create a single source of truth for styling so the whole app uses the same visual language.

### Recommended actions

- Keep Tailwind tokens centralized in [src/app/globals.css](src/app/globals.css)
- Define shared design values for:
  - colors
  - spacing
  - border radius
  - shadows
  - typography
- Use CSS variables and Tailwind theme tokens instead of hardcoded repeated values
- Add reusable global classes for common patterns such as:
  - `.btn-base`
  - `.input-base`
  - `.card-base`
  - `.page-container`
  - `.section-title`

### Why

This will make the UI look more professional and reduce inconsistency between pages.

---

## 2. Build Reusable UI Primitives

### What to do

Instead of writing custom Tailwind classes everywhere, create a small set of reusable components.

### Recommended components

- `Button`
  - variants: primary, secondary, outline, ghost, destructive
  - sizes: sm, md, lg
- `Input`
  - support for labels, errors, icons, and disabled state
- `Textarea`
- `FormField`
  - wrapper for label + input + error message
- `Card`
- `Modal` / `Dialog`
- `PageHeader`

### Best practice

Use `class-variance-authority` (already installed) for component variants.

Example structure:

- [src/components/ui](src/components/ui)
  - reusable primitive components
- [src/components/forms](src/components/forms)
  - form-specific wrappers and smart form sections
- [src/components/layout](src/components/layout)
  - shared layout pieces like headers, sections, containers

---

## 3. Standardize Form Handling

### What to do

Forms should use the same structure everywhere.

### Recommended approach

- Create a shared form wrapper for all major forms
- Use `react-hook-form` consistently
- Use `zod` schemas for validation
- Build a reusable `FormField` component that handles:
  - label
  - input
  - validation message
  - helper text
  - error state

### Priority pages

Start with:

- login
- register
- reset password
- profile edit
- address form
- checkout/payment form

### Why

Forms are one of the biggest sources of repeated UI code and inconsistent behavior.

---

## 4. Improve the Architecture

### Current issue

The project already has many feature folders, but some UI logic is still spread across pages and action files.

### Recommended structure

Organize code by feature and responsibility:

- `app/` → pages and route-level composition only
- `components/` → reusable UI and feature blocks
- `hooks/` → shared hooks for state and logic
- `lib/` → utilities and helpers
- `schema/` → validation schemas
- `types/` → shared TypeScript definitions
- `actions/` → server actions and business logic

### Recommended rule

Keep pages thin. Pages should mostly compose components and pass data, not contain huge blocks of UI logic.

---

## 5. Introduce a Clear Component Hierarchy

### Recommended pattern

Use this structure for important screens:

- `Page` → top-level route component
- `Section` → grouped content block
- `Card` / `Panel` → reusable content container
- `FormBlock` → input group and validation handling
- `ActionButton` → actions such as save, submit, delete

This keeps screens easier to read and maintain.

---

## 6. Reduce Repeated Tailwind Classes

### What to do

Right now, repeated class strings make the UI harder to maintain.

### Recommended solution

Create a small set of shared class patterns:

- `cn()` helper for combining classes
- shared style constants for layout and spacing
- global component classes for buttons, inputs, cards, containers

### Example

Instead of repeating:

```tsx
className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2"
```

Use:

```tsx
className="input-base"
```

or a reusable component such as `Input`.

---

## 7. Improve Consistency Across the App

### Recommended UI rules

- use one button style system everywhere
- use one spacing scale for padding/margin
- use one card and container style everywhere
- use consistent heading hierarchy
- keep form layouts aligned and predictable

### Suggested visual direction

Use a cleaner and more modern structure:

- rounded cards
- softer shadows
- consistent spacing
- stronger primary actions
- cleaner empty/error/loading states

---

## 8. Suggested Implementation Order

### Phase 1 — Foundation

- define global Tailwind theme tokens
- create shared utility classes in [src/app/globals.css](src/app/globals.css)
- improve the existing UI primitive components

### Phase 2 — Reusable Components

- create `Button`, `Input`, `Textarea`, `FormField`, `Card`
- standardize props and variants
- add consistent loading and disabled states

### Phase 3 — Refactor Main Pages

- refactor auth pages first
- refactor profile and address forms
- refactor cart and product cards

### Phase 4 — Architecture Cleanup

- reduce page-level complexity
- move repeated UI blocks into shared components
- improve naming and folder organization

### Phase 5 — Quality and Maintenance

- run linting and fix warnings
- document component usage patterns
- make future UI changes easier by following the same structure

---

## 9. Recommended Priority

If you want the best return quickly, start with these in order:

1. global Tailwind classes and design tokens
2. shared `Button` and `Input` components
3. shared `FormField` and form patterns
4. refactor the main authentication and profile pages
5. unify cards, containers, and page layouts

---

## 10. My Recommendation

The best path is to move step by step rather than rewriting everything at once.

I recommend:

- keep the current project structure
- strengthen the existing UI component layer in [src/components/ui](src/components/ui)
- introduce a small global style system in [src/app/globals.css](src/app/globals.css)
- refactor a few high-traffic screens first, then expand the system

This approach will give you faster results and a cleaner codebase without creating too much risk.

---

# Project Summary

## What this project does

This is a Next.js e-commerce app with:

- authentication and protected routes
- product listing and product detail pages
- brand and category browsing
- cart and wishlist flows
- user profile, address management, orders, and payment flow
- review and rating support

## Current stack

- Next.js App Router
- React and client components
- NextAuth for authentication
- Tailwind CSS for styling
- Sonner for toasts
- react-hook-form + zod for forms
- shadcn-style UI primitives under [src/components/ui](src/components/ui)

## Main improvement areas

The current app already has a solid structure, but the UI layer is still repeating a lot of logic across pages and components. The biggest issues are:

- many buttons are written as raw HTML buttons or repeated custom class strings
- toasts are repeated inline in many files
- some images still use plain HTML image tags instead of Next.js Image
- repeated Tailwind class patterns make the code harder to maintain
- loading states are not yet consistent across pages and actions

---

# TODO List 1 — Standardize Buttons and Action Components

## Goal

Replace repeated and inconsistent button usage with shared button components and move action logic into reusable component files.

## Tasks

- [done] Audit all buttons in the app and list every place using raw HTML buttons or repeated button styles
- [done] Replace raw buttons with shared Button from [src/components/ui/button.jsx](src/components/ui/button.jsx)
- [done] Use ButtonGroup for grouped actions when a screen has multiple related actions such as toggle/switch controls or segmented options
- [ ] Create a small action-button layer in [src/components/layout/Buttons](src/components/layout/Buttons) for reusable actions such as:
  - [done] Add to cart button
  - [done] Add/remove wishlist button
  - [done] Submit button with loading state
  - [done] Delete/confirm action button
- [done] Move button handler logic out of page files and into dedicated components or hooks where possible
- [done] Add a loading state to buttons for all async actions
- [done] Make disabled state consistent for action buttons while submitting

## Buttons that should get loading states

These are the highest priority actions to update:

- [done] login form submit
- [done] register form submit
- [done] reset password submit
- [done] profile update save
- [done] add address submit
- [done] delete address action
- [done] add to cart action
- [done] add/remove wishlist action
- [done] payment/checkout submit
- [done] review submit/update/delete

## Suggested structure

Create reusable action components under [src/components/layout/Buttons](src/components/layout/Buttons) or a new folder such as [src/components/actions](src/components/actions):

- [ ] ActionButton
- [ ] PrimaryActionButton
- [ ] SecondaryActionButton
- [ ] IconActionButton
- [ ] AsyncActionButton with loading spinner and disabled state

## Files to refactor first

done- [src/components/layout/Buttons/CartBtn.tsx](src/components/layout/Buttons/CartBtn.tsx)
done- [src/components/layout/Buttons/WishlistBtn.tsx](src/components/layout/Buttons/WishlistBtn.tsx)
done- [src/app/(Auth)/login/page.tsx](src/app/(Auth)/login/page.tsx)
done- [src/app/(Auth)/register/page.tsx](src/app/(Auth)/register/page.tsx)
done- [src/app/payment/page.tsx](src/app/payment/page.tsx)
done- [src/components/layout/Profile/AdressesTab.jsx](src/components/layout/Profile/AdressesTab.jsx)
done- [src/components/layout/cart/CartProductsSection.tsx](src/components/layout/cart/CartProductsSection.tsx)

---

# TODO List 2 — Create a Global Toast System

## Goal

Stop repeating toast lines everywhere and use one shared toast helper for the whole app.

## Tasks

- [done] Create a shared toast helper file such as [src/lib/toast.js](src/lib/toast.js) or [src/lib/toast.ts](src/lib/toast.ts)
- [done] Wrap the app with one global Toaster instance in [src/app/layout.jsx](src/app/layout.jsx)
- [ ] Add shared helpers such as:
  - [done] showSuccess(message)
  - [done] showError(message)
  - [ ] showInfo(message)
  - [ ] showLoading(message)
- [ ] Add global toast defaults for position, duration, and style
- [ ] Replace repeated inline toast calls in the app with the shared helper
- [ ] Make sure success/error states are consistent across auth, cart, wishlist, profile, and payment flows

## Files to update

- [src/app/layout.jsx](src/app/layout.jsx)
- [src/app/(Auth)/login/page.tsx](src/app/(Auth)/login/page.tsx)
- [src/app/(Auth)/register/page.tsx](src/app/(Auth)/register/page.tsx)
- [src/app/payment/page.tsx](src/app/payment/page.tsx)
- [src/components/layout/Buttons/CartBtn.tsx](src/components/layout/Buttons/CartBtn.tsx)
- [src/components/layout/Buttons/WishlistBtn.tsx](src/components/layout/Buttons/WishlistBtn.tsx)
- [src/components/layout/cart/CartProductsSection.tsx](src/components/layout/cart/CartProductsSection.tsx)
- [src/components/layout/Profile/EditProfileTab.jsx](src/components/layout/Profile/EditProfileTab.jsx)
- [src/components/layout/Profile/EditPasswordTab.jsx](src/components/layout/Profile/EditPasswordTab.jsx)
- [src/components/layout/Profile/AdressesTab.jsx](src/components/layout/Profile/AdressesTab.jsx)
- [src/components/layout/reviews/ReviewForm.tsx](src/components/layout/reviews/ReviewForm.tsx)
- [src/components/layout/reviews/ReviewUpdate.tsx](src/components/layout/reviews/ReviewUpdate.tsx)

---

# TODO List 3 — Replace img Tags with Next.js Image and Add Fallbacks

## Goal

Improve performance and image reliability by migrating all images to Next.js Image with lazy loading and fallbacks.

## Tasks

- [ ] Replace all plain HTML img usages with Next.js Image from `next/image`
- [ ] Add lazy loading to all non-critical images
- [ ] Add a default fallback image for broken or missing images
- [ ] Add loading placeholders or skeletons for image-heavy pages
- [ ] Use responsive sizes on product, brand, category, and hero images
- [ ] Keep `unoptimized` only where the API image host requires it

## Current places to update

- [src/app/(Auth)/(ResetPassword)/forget-password/page.tsx](src/app/(Auth)/(ResetPassword)/forget-password/page.tsx)
- [src/app/(Auth)/(ResetPassword)/reset-password/page.tsx](src/app/(Auth)/(ResetPassword)/reset-password/page.tsx)
- [src/app/(Auth)/login/page.tsx](src/app/(Auth)/login/page.tsx)
- [src/app/(Auth)/register/page.tsx](src/app/(Auth)/register/page.tsx)
- [src/app/allorders/page.tsx](src/app/allorders/page.tsx)
- [src/app/payment/page.tsx](src/app/payment/page.tsx)
- [src/components/layout/Common/ImgCarousel/ImgCarousel.tsx](src/components/layout/Common/ImgCarousel/ImgCarousel.tsx)
- [src/components/ui/carousel-09.jsx](src/components/ui/carousel-09.jsx)

## Recommended image wrapper

Create a reusable wrapper component such as:

- [ ] AppImage
- [ ] with fallback image support
- [ ] with `loading="lazy"` by default
- [ ] with a skeleton placeholder while loading

---

# TODO List 4 — Reduce Repeated Tailwind Class Patterns

## Goal

Remove repeated class strings and centralize common styles in one place.

## Repeated patterns found in the project

These are the main repeated class patterns that should be turned into shared classes:

- [ ] page shell layout:
  `bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full`
- [ ] white content card:
  `bg-white rounded-xl shadow-lg w-[90%] p-6 md:p-8`
- [ ] primary button gradient:
  `bg-linear-to-b from-sky-800 to-sky-950 rounded-lg text-lg hover:cursor-pointer`
- [ ] card title gradient text:
  `text-transparent bg-clip-text bg-linear-to-b from-sky-800 to-sky-900`
- [ ] navbar hover effect classes:
  `center-fill` and `center-fill-hover`
- [ ] empty-state layout blocks
- [ ] form card wrappers used in auth pages

## Tasks

- [ ] Add shared utility classes in [src/app/globals.css](src/app/globals.css)
- [ ] Create reusable classes such as:
  - [ ] `.page-shell`
  - [ ] `.page-card`
  - [ ] `.page-title`
  - [ ] `.primary-btn`
  - [ ] `.secondary-btn`
  - [ ] `.empty-state`
  - [ ] `.form-card`
- [ ] Replace repeated class strings in pages and components with these shared classes
- [ ] Keep only small component-specific overrides in the component itself

## Recommended files to refactor first

- [src/app/page.jsx](src/app/page.jsx)
- [src/app/products/page.jsx](src/app/products/page.jsx)
- [src/app/brands/page.jsx](src/app/brands/page.jsx)
- [src/app/categories/page.jsx](src/app/categories/page.jsx)
- [src/app/cart/page.jsx](src/app/cart/page.jsx)
- [src/app/favourite/page.jsx](src/app/favourite/page.jsx)
- [src/app/profile/page.jsx](src/app/profile/page.jsx)
- [src/app/payment/page.jsx](src/app/payment/page.jsx)

---

# TODO List 5 — Improve Loading States Across the App

## Goal

Make loading feel consistent and polished on every page and action.

## Tasks

- [ ] Keep the existing route-level loading experience in [src/app/loading.tsx](src/app/loading.tsx)
- [ ] Add skeleton loading for product cards, category cards, brand cards, and cart items
- [ ] Show loading on page sections instead of only global page loading
- [ ] Add button loading states for every async submit action
- [ ] Add placeholder UI for empty states and failed fetches
- [ ] Use Suspense or loading boundaries for data-heavy pages where appropriate

## Priority pages

- [ ] home page
- [ ] products page
- [ ] brands page
- [ ] categories page
- [ ] cart page
- [ ] favourite page
- [ ] profile page
- [ ] orders page
- [ ] payment page

## Recommended loading patterns

- [ ] Skeleton card for product lists
- [ ] Skeleton row for cart and wishlist items
- [ ] Spinner inside buttons during async actions
- [ ] Placeholder image block while image loads
- [ ] Empty-state component for no data

---

# Recommended Implementation Order

1. Standardize button usage and add loading states
2. Create the global toast helper
3. Replace img tags with Next.js Image and add fallbacks
4. Centralize repeated Tailwind patterns in global CSS
5. Improve page-level loading and empty states

This order will give you the biggest visual and maintainability improvement with the least risk.

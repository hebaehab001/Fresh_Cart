# Fresh_Cart 3-Month Roadmap

**Timeline:** 3 Months (12 weeks)  
**Goal:** Transform Fresh_Cart into a production-ready full-stack e-commerce platform  
**Target:** Job-ready portfolio project with TypeScript, advanced features, and custom backend

---

## MONTH 1: TypeScript Migration + Core Features (Weeks 1-4)

### Week 1: TypeScript Setup & Foundation
**Status:** Planning  
**Tasks:**
- [✅] Create new branch: `feature/typescript-migration`
- [✅] Install TypeScript and types: `npm install -D typescript @types/react @types/node`
- [✅] Create `tsconfig.json` with strict mode enabled
- [✅] Convert `jsconfig.json` → `tsconfig.json`
- [ ] Rename all `.jsx` files → `.tsx`
- [ ] Rename all `.js` files → `.ts`
- [ ] Update `next.config.mjs` to support TypeScript
- [ ] Update ESLint config for TypeScript

**Deliverable:** Project compiles with `tsc --noEmit` (no errors)

---

### Week 2: Type Your Existing Code (Phase 1)
**Status:** In Progress  
**Files to Type (Priority Order):**
- [ ] `src/types/index.ts` - Create central types file
  - `Product` interface
  - `CartItem` interface
  - `User` interface
  - `AuthSession` interface
  - `ApiResponse<T>` generic
  - `FilterOptions` interface
- [ ] `src/lib/api.ts` - Type all API calls with proper return types
- [ ] `src/context/` - Type Context providers and hooks
- [ ] `src/components/ProductCard.tsx` - Type props interface
- [ ] `src/components/Cart.tsx` - Type props, state, and handlers
- [ ] `src/pages/api/` - Type NextAuth callbacks and API routes

**Rules:**
- No `any` types (use `unknown` if you must, then narrow it)
- Every function has parameter and return types
- Every component has `React.FC<Props>` or `function Component(props: Props)`

**Deliverable:** All warnings in IDE resolved, `npm run build` succeeds

---

### Week 3: Implement Reviews Feature
**Status:** Not Started  
**What it does:**
- Users can leave 1-5 star ratings on products
- Reviews show on product detail page
- Average rating displays on product cards
- Data stored in localStorage initially (migrates to backend in Month 2)

**Tasks:**
- [ ] Create types for reviews:
  ```typescript
  interface ProductReview {
    id: string;
    productId: string;
    rating: number; // 1-5
    comment: string;
    userId: string;
    createdAt: Date;
  }
  ```
- [ ] Create `src/hooks/useReviews.ts` hook for CRUD
- [ ] Create `src/components/RatingStars.tsx` component (display only)
- [ ] Create `src/components/ReviewForm.tsx` component (add review)
- [ ] Create `src/components/ReviewsList.tsx` component (show reviews)
- [ ] Add reviews section to product detail page
- [ ] Display average rating on product cards
- [ ] Style with Tailwind + Shadcn

**Deliverable:** Can add/view/delete reviews on live site

---

### Week 4: Implement Search & Filtering
**Status:** Not Started  
**What it does:**
- Search products by name/description
- Filter by price range (slider)
- Filter by multiple categories simultaneously
- Results update in real-time

**Tasks:**
- [ ] Create `src/types/filter.ts`:
  ```typescript
  interface FilterState {
    searchQuery: string;
    priceRange: [number, number];
    selectedCategories: string[];
    sortBy: 'name' | 'price-asc' | 'price-desc' | 'newest';
  }
  ```
- [ ] Create `src/hooks/useFilters.ts` - Manage filter state
- [ ] Create `src/components/SearchBar.tsx` - Search input
- [ ] Create `src/components/PriceRangeSlider.tsx` - Price filter
- [ ] Create `src/components/CategoryFilter.tsx` - Category checkboxes
- [ ] Create `src/components/SortDropdown.tsx` - Sort options
- [ ] Create `src/lib/filterUtils.ts` - Filter logic (runs on products)
- [ ] Add filter UI to shop page
- [ ] Test with 20+ products

**Deliverable:** Filtering works, results update instantly

---

### Month 1 Checkpoint
**Merge Checklist:**
- [ ] TypeScript builds without errors
- [ ] All components typed properly
- [ ] Reviews feature working
- [ ] Search/filter working
- [ ] App deployed to Vercel
- [ ] Tests pass (if added)

**Push to GitHub:**
```bash
git add .
git commit -m "feat: TypeScript migration, reviews, search/filter"
git push origin feature/typescript-migration
git checkout master
git merge feature/typescript-migration
git push origin master
```

---

## MONTH 2: Dark Mode + Localization + Order History (Weeks 5-8)

### Week 5: Dark Mode / Light Mode
**Status:** Not Started  
**Tools:** `next-themes` (already in stack)

**Tasks:**
- [ ] Install if not present: `npm install next-themes`
- [ ] Wrap app with `ThemeProvider` in `src/app/layout.tsx`
- [ ] Create `src/components/ThemeToggle.tsx` button
- [ ] Update Tailwind config for dark mode:
  ```js
  module.exports = {
    darkMode: 'class',
    theme: { /* ... */ }
  }
  ```
- [ ] Convert all color utilities to support dark:
  - `bg-white dark:bg-gray-900`
  - `text-gray-900 dark:text-white`
  - etc.
- [ ] Test: Toggle between themes, refresh page (persists)
- [ ] Create color constants in `src/lib/colors.ts` for consistency

**Deliverable:** Seamless theme switching, persists across sessions

---

### Week 6: Localization (i18n) - Arabic + English
**Status:** Not Started  
**Tool:** `next-intl`

**Setup:**
- [ ] Install: `npm install next-intl`
- [ ] Create `src/i18n/routing.ts`:
  ```typescript
  export const routing = {
    locales: ['en', 'ar'],
    defaultLocale: 'en'
  }
  ```
- [ ] Create translation files:
  - `src/i18n/messages/en.json`
  - `src/i18n/messages/ar.json`
- [ ] Update `next.config.mjs` for i18n
- [ ] Update `src/app/layout.tsx` to use i18n

**Translation Keys to Add:**
- Navigation items (Products, Cart, Account, etc.)
- Product descriptions
- Button labels (Add to Cart, Checkout, etc.)
- Error messages
- Cart totals
- Review form labels

**Tasks:**
- [ ] Create all translation JSON files
- [ ] Update 15+ components to use `useTranslations()`
- [ ] Add language switcher to navbar
- [ ] Test: Switch language, verify all text updates
- [ ] RTL support for Arabic:
  - Add `dir="rtl"` to html when `locale === 'ar'`
  - Adjust padding/margin (left ↔ right)

**Deliverable:** Full app in Arabic + English, RTL working for Arabic

---

### Week 7: Order History Feature
**Status:** Not Started  
**What it does:**
- After checkout, save order to localStorage
- Show "Order History" page with past purchases
- Display order details: date, items, total, status
- Can view order details

**Tasks:**
- [ ] Create `src/types/order.ts`:
  ```typescript
  interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    totalPrice: number;
    status: 'pending' | 'completed' | 'shipped' | 'delivered';
    createdAt: Date;
    shippingAddress: Address;
  }
  ```
- [ ] Create `src/hooks/useOrders.ts` - Order CRUD
- [ ] Modify checkout flow to save order:
  ```typescript
  // After successful payment
  saveOrder({
    items: cartItems,
    totalPrice: total,
    status: 'completed',
    ...
  })
  ```
- [ ] Create `src/pages/orders.tsx` - Order history page
- [ ] Create `src/pages/orders/[id].tsx` - Order detail page
- [ ] Create `src/components/OrderCard.tsx` - Display order summary
- [ ] Create `src/components/OrderDetails.tsx` - Full order info
- [ ] Add "Orders" link to navbar
- [ ] Style with Tailwind

**Deliverable:** Complete order history system with detail pages

---

### Week 8: Polish & Deploy
**Status:** Not Started  
**Tasks:**
- [ ] Test dark mode + localization together (edge cases)
- [ ] Test on mobile (responsive)
- [ ] Fix any bugs from integration
- [ ] Update README with new features
- [ ] Update GitHub repo description
- [ ] Deploy to Vercel
- [ ] Test live deployment

**Deliverable:** Fresh_Cart v2.0 deployed with all features

---

### Month 2 Checkpoint
**Feature Complete:**
- [ ] TypeScript (100%)
- [ ] Reviews (100%)
- [ ] Search/Filter (100%)
- [ ] Dark/Light Mode (100%)
- [ ] Localization (100%)
- [ ] Order History (100%)

**Performance Check:**
- [ ] Lighthouse score > 80
- [ ] Page load < 3 seconds
- [ ] Mobile responsive

---

## MONTH 3: Backend Integration + Polish (Weeks 9-12)

### Week 9: Backend Setup & Cart API
**Status:** Not Started  
**Goal:** Move cart from localStorage to real backend

**Setup:**
- [ ] Create `/backend` folder (or separate repo)
- [ ] `npm init -y && npm install express mongoose dotenv cors axios`
- [ ] Create `backend/server.js`:
  ```javascript
  const express = require('express');
  const mongoose = require('mongoose');
  
  const app = express();
  app.use(express.json());
  app.use(cors());
  ```
- [ ] Create `backend/.env`:
  ```
  MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/freshcart
  JWT_SECRET=your-secret-key
  PORT=5000
  ```
- [ ] Create `backend/models/Cart.js`:
  ```javascript
  const cartSchema = new mongoose.Schema({
    userId: String,
    items: [{
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  ```

**API Endpoints:**
- [ ] `GET /api/cart` - Get user's cart
- [ ] `POST /api/cart/items` - Add item to cart
- [ ] `PUT /api/cart/items/:productId` - Update quantity
- [ ] `DELETE /api/cart/items/:productId` - Remove item
- [ ] `DELETE /api/cart` - Clear cart

**Frontend Changes:**
- [ ] Create `src/lib/api/cart.ts` - Cart API calls
- [ ] Update `useCart()` hook to call backend instead of localStorage
- [ ] Update endpoints in environment variables

**Deliverable:** Cart data persists in MongoDB

---

### Week 10: Products & Orders API
**Status:** Not Started  
**Move Products to Database:**
- [ ] Create `backend/models/Product.js`
- [ ] Create MongoDB collection with Route Academy products
- [ ] Create `GET /api/products` endpoint
- [ ] Create `GET /api/products/:id` endpoint
- [ ] Create `GET /api/products/category/:category` endpoint

**Create Orders API:**
- [ ] Create `backend/models/Order.js`
- [ ] `POST /api/orders` - Create new order (from checkout)
- [ ] `GET /api/orders` - Get user's orders
- [ ] `GET /api/orders/:id` - Get order details

**Frontend Integration:**
- [ ] Update product fetching to use backend
- [ ] Update checkout to hit `/api/orders`
- [ ] Verify order history still works

**Deliverable:** All product/order data in backend

---

### Week 11: Reviews & Auth API
**Status:** Not Started  
**Reviews API:**
- [ ] Create `backend/models/Review.js`
- [ ] `POST /api/reviews` - Add review
- [ ] `GET /api/products/:id/reviews` - Get product reviews
- [ ] `DELETE /api/reviews/:id` - Delete review
- [ ] Add authentication middleware (only user can delete own review)

**Auth Improvements:**
- [ ] Create proper JWT auth middleware
- [ ] Update endpoints to require auth token
- [ ] Frontend: Add token to all API requests
- [ ] Refresh token handling

**Frontend Integration:**
- [ ] Update review form to hit `/api/reviews`
- [ ] Update review display to fetch from backend
- [ ] Add auth token to axios interceptors

**Deliverable:** Reviews stored in database, auth working

---

### Week 12: Deployment & Documentation
**Status:** Not Started  
**Backend Deployment:**
- [ ] Deploy to Railway.app (free tier) or Render
- [ ] Set environment variables on hosting
- [ ] Test all endpoints on live API

**Frontend Updates:**
- [ ] Update API base URL to live backend
- [ ] Test entire app end-to-end
- [ ] Fix any CORS issues

**Documentation:**
- [ ] Write comprehensive README:
  ```markdown
  # FreshCart - Full Stack E-Commerce
  
  ## Features
  - TypeScript throughout
  - Dark/Light mode
  - Arabic + English localization
  - Product reviews & ratings
  - Advanced search & filtering
  - Order history
  - Stripe payment integration
  
  ## Tech Stack
  - Frontend: Next.js, React, TypeScript, Tailwind, Shadcn UI
  - Backend: Node.js, Express, MongoDB
  - Deployment: Vercel (frontend), Railway (backend)
  
  ## Architecture
  [Explain your design decisions]
  
  ## Setup
  [How to run locally]
  ```
- [ ] Add architecture diagram
- [ ] Document API endpoints
- [ ] List all dependencies and versions

**Final Testing:**
- [ ] Test full user flow (browse → search → add to cart → checkout → order history)
- [ ] Test on mobile
- [ ] Test dark mode + localization
- [ ] Check for console errors

**GitHub:**
- [ ] Push all code
- [ ] Update README
- [ ] Add CI/CD (GitHub Actions to test on push)
- [ ] Create release notes

**Deliverable:** Production-ready FreshCart v3.0

---

### Month 3 Checkpoint & Beyond
**Final Deliverables:**
- [ ] Full-stack app deployed
- [ ] 0 console errors
- [ ] Lighthouse score > 85
- [ ] Documentation complete
- [ ] GitHub stars + views tracking

**Interview Talking Points:**
- "Built TypeScript migration from scratch"
- "Implemented localization for Arabic/English"
- "Designed MongoDB schema for products, orders, reviews"
- "Created REST API with proper auth & error handling"
- "Optimized search performance with filtering"

---

## Quick Reference: Feature Checklist

### Frontend Features
- [ ] TypeScript (100% coverage)
- [ ] Dark/Light theme toggle
- [ ] Arabic + English localization (RTL support)
- [ ] Product reviews with ratings
- [ ] Advanced search
- [ ] Multi-category filtering
- [ ] Price range slider
- [ ] Order history with details
- [ ] Responsive mobile design

### Backend Features
- [ ] Express API server
- [ ] MongoDB database
- [ ] Cart API (CRUD)
- [ ] Products API
- [ ] Orders API
- [ ] Reviews API
- [ ] JWT authentication
- [ ] Error handling & validation
- [ ] Environment configuration

### DevOps
- [ ] Frontend deployed (Vercel)
- [ ] Backend deployed (Railway/Render)
- [ ] MongoDB Atlas cluster
- [ ] Environment variables configured
- [ ] CI/CD pipeline (optional)

---

## Weekly Time Estimates

| Week | Focus | Estimated Hours |
|------|-------|-----------------|
| 1 | TypeScript Setup | 8-10 |
| 2 | Type Existing Code | 12-15 |
| 3 | Reviews Feature | 10-12 |
| 4 | Search/Filter | 12-15 |
| 5 | Dark Mode | 6-8 |
| 6 | Localization | 15-18 |
| 7 | Order History | 10-12 |
| 8 | Polish & Deploy | 8-10 |
| 9 | Backend Setup | 12-15 |
| 10 | Products/Orders API | 15-18 |
| 11 | Reviews/Auth API | 12-15 |
| 12 | Deployment & Docs | 10-12 |
| **Total** | | **137-160 hours** |

**That's ~11-13 hours per week, very achievable.**

---

## Rules for Success

1. **Commit after each task**, not at end of week
2. **Test locally before deploying**
3. **Don't skip TypeScript** - it's non-negotiable for junior devs
4. **When stuck, Google first, then ask for help**
5. **Document as you go, not at the end**
6. **Deploy early and often** (weekly to Vercel)

---

## How to Use This Roadmap

1. Copy this entire file into Notion (5 min setup)
2. Check off tasks as you complete them
3. Each week, review the checkpoint
4. If you fall behind, cut features (drop one i18n language, simplify reviews, etc.)
5. **Do not move to next month until current month checkpoint is 90% done**

---

## Git Branches Strategy

```bash
master (production)
├── develop (staging)
│   ├── feature/typescript-migration
│   ├── feature/reviews
│   ├── feature/search-filter
│   ├── feature/dark-mode
│   ├── feature/localization
│   ├── feature/order-history
│   ├── feature/backend-cart
│   ├── feature/backend-products
│   ├── feature/backend-orders
│   └── feature/backend-reviews
```

**Workflow:**
1. Create feature branch from `develop`
2. Work on feature
3. Test locally
4. Create Pull Request
5. Merge to `develop`
6. Deploy `develop` to staging URL
7. When month is done, merge `develop` → `master` and deploy to production

---

## Success Metrics

At the end of 3 months, you'll have:

✅ **Code Quality**
- TypeScript throughout (type-safe)
- Clean component structure
- Reusable hooks and utils
- Proper error handling

✅ **Features**
- 6 major features (reviews, search, dark mode, localization, orders, backend)
- Real database (MongoDB)
- Real API (Express)
- Real authentication

✅ **Deployment**
- Frontend on Vercel (auto-deploying on `master` push)
- Backend on Railway/Render
- Database on MongoDB Atlas
- Custom domain (optional but nice)

✅ **Documentation**
- Comprehensive README
- API documentation
- Architecture diagram
- Setup instructions

✅ **Portfolio Value**
- Shows progression (simple → complex)
- Shows full-stack capability
- Shows shipping mindset (deployed, not just local)
- Interview-ready talking points

---

**You're ready. Stop planning. Start building. Week 1 starts now.**

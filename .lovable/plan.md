

## Admin Panel Visual Redesign - Modern & Colorful

### Design Direction
Replace the monotone slate/gray theme with a modern gradient-based design using vibrant accent colors while keeping all functionality intact.

### Color Scheme
- **Sidebar**: Dark gradient (slate-950 to indigo-950) with colored active indicators
- **Stat Cards**: Each card gets its own gradient accent (blue, violet, emerald, amber)
- **Icon backgrounds**: Colorful gradient circles instead of gray boxes
- **Badges**: Colored variants (emerald for published, amber for draft, etc.)
- **Buttons**: Primary actions use indigo/violet gradient instead of plain black
- **Tables**: Subtle left-border color accents on hover rows
- **Background**: Subtle gradient from slate-50 to indigo-50/blue-50

### Files to Update

**1. `src/layouts/AdminLayout.tsx`**
- Sidebar background: gradient from `slate-950` via `slate-900` to `indigo-950`
- Active nav item: `bg-indigo-500/20 text-white` with left border accent in indigo
- Hover states: `hover:bg-white/10` with smooth transitions
- User avatar: gradient ring (indigo to violet)
- Mobile header: matching gradient
- Sign out button: subtle red hover state

**2. `src/pages/admin/AdminDashboard.tsx`**
- Each stat card gets a unique color theme:
  - Users: blue gradient icon bg, blue-50 border accent
  - Articles: violet gradient icon bg
  - Published: emerald gradient icon bg
  - Visits: amber gradient icon bg
- Quick Action buttons: gradient icon backgrounds (indigo, blue, violet)
- Welcome text with a subtle gradient heading

**3. `src/pages/admin/ArticlesPage.tsx`**
- "New Article" button: indigo gradient instead of black
- Published badge: emerald-500 with glow effect
- Draft badge: amber/orange tones
- Ad badges: colored per type (orange=Bitloon, blue=Bovensiepen, emerald=Braun)
- Table header: subtle indigo-50 background
- Row hover: subtle left-border color indicator

**4. `src/pages/admin/VisitsPage.tsx`**
- Stat cards with individual color themes (blue, violet, emerald, amber)
- Hourly data grid: colored bars instead of plain white boxes
- Expansion toggle: indigo accent

**5. `src/pages/admin/AnalyticsPage.tsx`**
- Stat cards with gradient icon backgrounds
- Click count badges: gradient from indigo to violet for active
- Table styling matching the new design system

**6. `src/pages/admin/UsersPage.tsx`**
- Admin badge: indigo gradient
- User badge: slate with subtle color
- Make Admin button: indigo gradient
- Remove Admin button: red-tinted outline

**7. `src/pages/admin/CardPreviewsPage.tsx`**
- Card type indicators with larger, more vibrant color dots
- Section headers with subtle colored underlines

### What stays the same
- All data fetching logic
- All CRUD operations
- All routing and navigation structure
- All component hierarchy
- Sidebar collapse/expand behavior
- Mobile responsiveness


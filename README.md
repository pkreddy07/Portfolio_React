# Pranav Kumar Reddy — Portfolio (React)

A React conversion of the static HTML/CSS portfolio, built with Vite and
`react-router-dom`. Functional components + Hooks only, no external state
library, no UI component framework.

## Setup / run

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build (dist/)
npm run preview   # preview the production build locally
```

## Folder structure

```
src/
  components/   # reusable UI pieces (Navbar, Footer, ProjectCard, ContactForm, ...)
  pages/        # one component per route (Home, About, Projects, ProjectDetail, Contact, NotFound)
  data/         # static content as plain JS objects/arrays (projects.js, skills.js, profile.js)
  context/      # ThemeContext (dark/light state shared app-wide)
  hooks/        # useWindowWidth (window resize subscription)
  assets/       # images
```

## Component tree & state-lifting decisions

```
main.jsx
└─ ThemeProvider            (theme state lives here — top of the tree)
   └─ BrowserRouter
      └─ App
         └─ Routes
            └─ Layout                     (Navbar + <Outlet/> + Footer, persists across routes)
               ├─ Navbar                  (reads theme via useContext, owns its own mobile-menu state)
               ├─ <Outlet/>
               │   ├─ Home                (owns `loading` state)
               │   ├─ About
               │   │   ├─ AboutBio        (prop-drill level 1: receives full `profile`)
               │   │   │   └─ Education   (prop-drill level 2: receives only `profile.education`)
               │   │   └─ Skills          (receives `skillCategories`)
               │   ├─ Projects
               │   │   └─ ProjectCard × N (owns its own `expanded` state — per instance)
               │   │       └─ TechTags    (prop-drill level 2: ProjectsPage → ProjectCard → TechTags)
               │   ├─ ProjectDetail       (reads :projectId via useParams, looks up data/projects.js)
               │   ├─ Contact
               │   │   └─ ContactForm     (owns `values` / `touched` / `submitted` state)
               │   └─ NotFound
               └─ Footer
```

**Why theme state lives in `ThemeContext` instead of `App`:** the assignment
allows lifting it to `App` and passing it down via props, but `Navbar` is a
sibling of every routed page under `Layout`, and the pages themselves never
need to read or set the theme. Using Context avoids threading `theme` /
`setTheme` through `App → Layout → Navbar` as props for a value only one
component actually consumes, while still keeping the *state itself* — via
`useState` — as the single source of truth, no external store involved.

**Why `ProjectCard`'s expanded state is local:** each card is a separate
component instance, so `useState` inside `ProjectCard` is automatically
scoped per-instance — opening one project's "view details" never affects the
others. This is intentionally *not* lifted to the `Projects` page, since no
sibling ever needs to know another card's expanded state.

**Why the contact form's state is local to `ContactForm`:** the values only
matter for validating and submitting that one form; nothing else in the tree
needs them.

## Props & prop drilling

- `ProjectCard` is fully generic — it receives `title`, `description`,
  `tech`, `image`, and `link` via props and renders only what it's given
  (`src/data/projects.js` is the single source of truth for project content,
  spread onto each card with `{...project}` in `Projects.jsx`).
- Prop drilling (2+ levels), demonstrated twice:
  - `About.jsx` → `AboutBio` (passes the full `profile` object) → `Education`
    (receives only `profile.education`).
  - `Projects.jsx` → `ProjectCard` (passes the full project object) →
    `TechTags` (receives only `project.tech`).

## State (`useState`)

1. **Theme toggle** — `ThemeContext` (`src/context/ThemeContext.jsx`), shared
   app-wide via Context, flipped by the button in `Navbar`.
2. **Contact form** — `ContactForm.jsx` holds `values` (controlled
   name/email/message inputs), `touched` (per-field blur tracking), and a
   derived `errors` object; the submit button is `disabled` until all fields
   are valid.
3. **Per-card "view details"** — each `ProjectCard` instance owns its own
   `expanded` boolean, proving state is scoped per component instance.
4. (Bonus) **Home loading flag** and **Navbar mobile menu** are two more
   independent `useState` values.

## Effects (`useEffect`) and why each is needed

1. **`Home.jsx`** — on mount (`[]` dependency array), starts a `setTimeout`
   to simulate a ~1s loading sequence before revealing the hero content, and
   `clearTimeout`s it on unmount so a fast unmount can't call `setState` on
   an unmounted component.
2. **`ThemeContext.jsx`** — runs whenever `theme` changes; writes the value
   to `localStorage` and reflects it on `<html data-theme>` so the CSS
   variables update immediately. The initial value is read back from
   `localStorage` (falling back to `prefers-color-scheme`) when the provider
   first mounts.
3. **`useWindowWidth.js`** (used by `Navbar` for responsive behavior) —
   subscribes to `window.resize` on mount and returns a cleanup function
   that calls `removeEventListener`, preventing a leaked listener across
   re-renders/unmounts.

## Routing

- `react-router-dom` v7, `BrowserRouter` + `Routes`/`Route`.
- Shared `Layout` (`Navbar` + `<Outlet/>` + `Footer`) wraps every route so
  navigation persists.
- Routes: `/home`, `/about`, `/projects`, `/projects/:projectId` (dynamic,
  read with `useParams`), `/contact`, plus `/` → redirect to `/home` and a
  `path="*"` catch-all `NotFound` page with a link back to `/home`.
- All in-app navigation uses `<Link>` / `<NavLink>` — no `<a href>` for
  internal routes, so there are no full page reloads.

## Known limitations

- The contact form has no backend yet — submitting just shows a client-side
  success state (this is intentionally deferred to the API/Express
  assignment).
- Project content is static (`src/data/projects.js`); a later assignment
  will likely fetch this from an API instead.

# Git Rules

## Commit Conventions

Use conventional commits with a scope:

```
<type>(<scope>): <short description>
```

**Types:**
- `feat` — new feature or component
- `fix` — bug fix
- `refactor` — code change with no behavior change
- `style` — formatting, whitespace, no logic change
- `test` — adding or updating tests
- `docs` — documentation only
- `chore` — build, config, dependencies

**Scope** is the area changed: `app`, `button`, `header`, `nav`, `stores`, `composables`, etc.

**Examples:**
```
feat(button): add ghost variant
fix(header): correct mobile nav z-index
refactor(app): remove unused imports
test(button): add coverage for disabled state
```

## Branching

- Branch from `develop`, not `main`
- Branch naming: `<type>/<short-description>` — e.g., `feat/cta-bar`, `fix/nav-overlap`
- PRs target `develop`

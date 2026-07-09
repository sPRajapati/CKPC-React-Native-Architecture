# Shared UI — Atomic Design

Reusable, presentational components organized atomic-design style. Feature-specific
components stay in `features/<feature>/components/`; only generic UI lives here.

## Tiers

- **atoms/** — smallest primitives: `Button`, `Input`, `Text`, `Loader`, `Icon`.
- **molecules/** — small compositions of atoms: `TextField`, `Avatar`, `SearchBar`.
- **organisms/** — larger sections of molecules/atoms: `Card`, `EmptyState`.
- **templates/** — page-level layout wrappers: `Screen`.

## Import-direction rule (enforced by convention)

Dependencies only ever point downward:

1. atoms import nothing from molecules/organisms/templates
2. molecules import atoms only
3. organisms import molecules + atoms
4. templates import any lower tier

Consume everything from the barrel:
`import { Button, TextField, Card, Screen } from '@/shared/components'`.

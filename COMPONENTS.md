# Components Architecture

PacketFlow's components are divided into structural, domain-specific, and unstyled base components.

## `src/components/ui/`
This directory holds heavily reusable, domain-agnostic UI primitives (often powered by `@rn-primitives`). 
- Examples: `Button`, `Input`, `Dialog`, `Popover`.
- Styled aggressively with NativeWind classes.

## `src/components/`
Higher-level shared components that are used across multiple features.
- Examples: `ProjectCard`, `EmptyState`, `DeviceIcon`.

## `src/features/*/`
Components locked to a specific business domain live inside their feature slices.
- `features/devices/DeviceDrawer`: Specifically for dragging devices onto the canvas.
- `features/terminal/TerminalPanel`: Specifically for rendering packet simulation outputs.

When building a new feature, avoid polluting the global `components/` directory unless the component is truly reusable across different domains.

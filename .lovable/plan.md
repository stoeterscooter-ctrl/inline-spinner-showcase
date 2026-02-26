

## Problem

The GooeySwitch showcase page has two issues:

1. **The switch defaults to `size="lg"`** (120x56px) which is oversized for a showcase context
2. **The `ComponentShowcase` layout** uses a side-by-side split (preview + 224px configurator panel) which, inside the narrow 520px Studio container, feels cramped and cluttered
3. Too many configurator options visible at once (size, default state, color, animation mode, duration, bezier curve)

## Plan

### 1. Simplify the showcase layout

Restructure `ComponentShowcase` to stack vertically instead of side-by-side, fitting the narrow 520px container naturally:
- Preview area on top (centered, modest height)
- Configurator below, using the full width
- Code preview at the bottom

### 2. Reduce default switch size

Change the default size in `GooeySwitchShowcase` from `"lg"` to `"md"`.

### 3. Declutter the configurator

- Collapse the bezier controls into a collapsible section (only shown when tween is enabled and user expands it)
- Tighten spacing between config sections
- Keep the color grid to 3 columns but reduce the number of presets or make them smaller dots instead of labeled buttons

### Files changed

- **`src/components/ComponentShowcase.tsx`** — switch from horizontal split to vertical stack layout
- **`src/pages/GooeySwitchShowcase.tsx`** — default to `"md"`, simplify configurator density


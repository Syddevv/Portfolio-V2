# Portfolio UI sizing

For every current and future UI change, size actual CSS and Tailwind properties for comfortable use at 100% browser zoom. Use responsive widths, heights, type sizes, spacing, and breakpoints for large desktops, laptops, tablets, and phones. Do not use `transform: scale()`, CSS `zoom`, or global scaling tricks to correct the layout.

Preserve the neo-brutalist visual identity: the grid canvas, palette, Space Grotesk and JetBrains Mono hierarchy, strong borders, hard shadows, and system-interface layout. Before finishing UI work, check readability, control size, viewport use, balance, and small-screen behavior.

Use the shared `.page-container` for all major section content. Its width is relative to the workspace after the desktop sidebar, with equal responsive left and right gutters. Section headings, text, and card grids must share those boundaries. Full-bleed elements such as the ticker, grid background, and dividers may extend across the workspace. Do not add one-off horizontal section padding or margins without a deliberate design reason.

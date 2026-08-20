# IranYekan

The confirmed design direction keeps IranYekan for Persian body copy (see
`docs/product-planning.md` Section 21 and the published visual-direction
artifact) — it's already in use on the current site and is a solid,
professional, widely-supported choice.

It is not distributed via Google Fonts. To wire it up:

1. Obtain licensed webfont files (woff2 preferred) from Panah or a licensed
   Iranian font distributor.
2. Drop the files here, e.g. `iranyekan-regular.woff2`, `iranyekan-bold.woff2`.
3. In `src/app/layout.tsx`, replace the commented-out section with:

```ts
import localFont from "next/font/local";

const iranYekan = localFont({
  variable: "--font-iranyekan",
  src: [
    { path: "./fonts/iranyekan-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/iranyekan-bold.woff2", weight: "700", style: "normal" },
  ],
});
```

4. Add `iranYekan.variable` back into the `<html>` className in `layout.tsx`.

Until then, Persian body text falls back to Vazirmatn/Tahoma (see `globals.css`).

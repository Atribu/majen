"use client";
import Image from "next/image";
import Link from "next/link";

export function BorderlessHero({
  title, subtitle, image, alt,
  leftBadge, rightBadge,
  primaryHref, primaryLabel,
  secondaryHref, secondaryLabel
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-sm bg-white">
      {/* yumuşak doku */}
      <div className="pointer-events-none absolute inset-0 -z-10
                      [mask-image:radial-gradient(55%_45%_at_20%_0%,black,transparent)]
                      bg-[radial-gradient(36rem_20rem_at_30%_-10%,#e9e3d8_24%,transparent)]" />
      <div className="px-5 md:px-8 lg:px-10 py-7 md:py-9">
        {(leftBadge || rightBadge) && (
          <div className="inline-flex items-center gap-2 text-[10px]">
            {leftBadge && <span className="rounded-full bg-black text-white px-2 py-1">{leftBadge}</span>}
            {rightBadge && <span className="rounded-full bg-neutral-900/5 text-neutral-700 px-2 py-1">{rightBadge}</span>}
          </div>
        )}

        <div className="mt-2 grid items-center gap-6 md:grid-cols-[1.2fr,0.8fr]">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-2.5 text-sm md:text-base text-neutral-700 leading-relaxed">{subtitle}</p>}

            <div className="mt-4 flex flex-wrap gap-2">
              {primaryHref && (
                <Link href={primaryHref}
                      className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-white hover:opacity-90 transition">
                  {primaryLabel}
                </Link>
              )}
              {secondaryHref && (
                <Link href={secondaryHref}
                      className="inline-flex items-center rounded-xl px-4 py-2 text-black hover:bg-neutral-900/5 transition">
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>

          {/* ince banner görseli */}
          <div className="relative h-40 md:h-48 lg:h-56">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-md">
              <Image src={image} alt={alt} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] md:text-[13px] bg-neutral-900/5 text-neutral-800">
      {children}
    </span>
  );
}

export function ChipGroup({ label, values = [] }) {
  if (!values.length) return null;
  return (
    <div className="space-y-2">
      <div className="text-[11px] uppercase tracking-wide text-neutral-500">{label}</div>
      <div className="flex flex-wrap gap-2">
        {values.map((v, i) => <Chip key={i}>{v}</Chip>)}
      </div>
    </div>
  );
}

export function SoftDivider() {
  return (
    <div className="my-10 h-[1px] bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent" />
  );
}

/** Kenarlıksız varyant kartı: overlay başlık + hover scale */
export function VariantTile({ href, image, title, subtitle, alt }) {
  return (
    <Link href={href} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition">
      <div className="relative aspect-[4/3]">
        <Image src={image} alt={alt || title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      {/* altta overlay etiketi */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <div className="rounded-2xl px-4 py-2 bg-white/85 backdrop-blur text-neutral-900 shadow-sm">
          <div className="text-sm md:text-base font-semibold">{title}</div>
          {subtitle && <div className="text-[12px] md:text-[13px] text-neutral-600">{subtitle}</div>}
        </div>
      </div>
    </Link>
  );
}

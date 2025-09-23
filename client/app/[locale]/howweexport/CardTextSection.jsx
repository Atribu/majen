import React from 'react'

const CardTextSection = () => {
  return (
 
       <section className="max-w-[1200px] mx-auto px-5 py-10 text-center items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
          What Is FOB in International Trade?
        </h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          FOB (Free On Board) is an Incoterm that splits responsibilities
          clearly. Under FOB, Majen delivers goods to the port, clears them for
          export and loads them onto the buyer’s nominated vessel. From that
          moment, the buyer takes responsibility for freight, insurance and
          destination fees. This clarity is why{" "}
          <strong>FOB Travertine Export From Turkey</strong> is efficient and
          transparent for importers.
        </p>

        {/* WHY FOB – 3 cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Cost Transparency",
              d: "Origin costs handled by Majen; importers control freight, insurance and destination charges.",
            },
            {
              t: "Flexible Shipping",
              d: "Choose carriers and negotiate rates directly; keep logistics partners you trust.",
            },
            {
              t: "Industry Standard",
              d: "Widely used for natural stone; ideal for large travertine block and slab consignments.",
            },
          ].map((c) => (
            <article
              key={c.t}
              className="rounded-2xl bg-white p-5 ring-1 ring-neutral-200 shadow"
            >
              <h3 className="mb-1 font-semibold">{c.t}</h3>
              <p className="text-neutral-700 text-sm leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </section>


  )
}

export default CardTextSection

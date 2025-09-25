import React from 'react'

const InternalNav = () => {
  return (
    <div className="py-10">
        <div className="mx-auto w-[92%] max-w-[1300px]">
          <nav className="flex flex-wrap gap-5">
            {[
              ["/en/travertine/tiles", "Travertine Tiles"],
              ["/en/travertine/slabs", "Travertine Slabs"],
              ["/en/travertine/blocks", "Travertine Blocks"],
              ["/en/travertine/pavers", "Travertine Pavers"],
              ["/en/travertine/mosaics", "Travertine Mosaics"],
              ["/en/travertine/ivory", "Ivory Travertine"],
              ["/en/travertine/silver", "Silver Travertine"],
              ["/en/travertine/noce", "Noce Travertine"],
              ["/en/travertine/polished", "Polished Travertine"],
              ["/en/travertine/honed", "Honed Travertine"],
              ["/en/travertine/tumbled", "Tumbled Travertine"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="text-teal-700 hover:underline hover:scale-110">{label}</Link>
            ))}
          </nav>
        </div>
    </div>
  )
}

export default InternalNav

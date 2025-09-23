"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function GaPageView() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const didInit = useRef(false); // ilk yükte config atılıyor, tekrar atmayalım

  useEffect(() => {
    if (!GA_ID) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    if (didInit.current) {
      // client-side navigation pageview
      // eslint-disable-next-line no-undef
      window.gtag?.("config", GA_ID, { page_path: url });
    } else {
      didInit.current = true;
    }
  }, [pathname, searchParams, GA_ID]);

  return null;
}

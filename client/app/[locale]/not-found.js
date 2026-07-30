import NotFoundContent from "./components/generalcomponent/NotFoundContent";

export const metadata = {
  title: "404 | Majen",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <NotFoundContent />;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ако адресът НЕ започва с "/shop", тогава скролвай до горе
    if (!pathname.startsWith("/shop")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
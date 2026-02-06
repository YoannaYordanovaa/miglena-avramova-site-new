import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // 1. Ако има хеш (напр. #forever-section), НЕ скролваме до горе, 
    // за да оставим HashLink да си свърши работата.
    if (hash) {
      return;
    }

    // 2. Ако адресът НЕ започва с "/shop", скролваме до горе.
    if (!pathname.startsWith("/shop")) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Добавяме hash в масива със зависимости

  return null;
}
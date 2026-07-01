import { useEffect } from 'react';

export default function useDynamicAttention() {
  useEffect(() => {
    let savedTitle = '';
    let savedFaviconHref = '';
    let savedFaviconType = '';

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Captura o título AGORA (no momento da saída, não no mount)
        savedTitle = document.title;
        
        const currentFavicon = document.querySelector("link[rel*='icon']");
        if (currentFavicon) {
          savedFaviconHref = currentFavicon.href;
          savedFaviconType = currentFavicon.type || 'image/png';
        }
        
        document.title = "👀 Ei, volte para lucrar!";
        
        // Altera o favicon para um emoji chamativo
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/svg+xml';
        link.rel = 'icon';
        link.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💰</text></svg>";
        document.getElementsByTagName('head')[0].appendChild(link);
      } else {
        // Restaura título e favicon originais
        if (savedTitle) document.title = savedTitle;
        
        const link = document.querySelector("link[rel*='icon']");
        if (link && savedFaviconHref) {
          link.type = savedFaviconType;
          link.href = savedFaviconHref;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}

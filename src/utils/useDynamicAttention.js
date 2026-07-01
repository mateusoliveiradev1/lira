import { useEffect } from 'react';

export default function useDynamicAttention() {
  useEffect(() => {
    let savedTitle = '';
    let savedFaviconHref = '';

    const setFavicon = (href, type) => {
      // Remove TODOS os favicons existentes para evitar duplicatas
      document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']").forEach(el => el.remove());
      
      // Cria um novo link do zero
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = type;
      link.href = href;
      document.head.appendChild(link);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Captura o título AGORA (no momento da saída)
        savedTitle = document.title;
        const currentFavicon = document.querySelector("link[rel*='icon']");
        if (currentFavicon) {
          savedFaviconHref = currentFavicon.href;
        }
        
        document.title = "👀 Ei, volte para lucrar!";
        setFavicon(
          "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💰</text></svg>",
          'image/svg+xml'
        );
      } else {
        // Restaura título e favicon originais
        if (savedTitle) document.title = savedTitle;
        if (savedFaviconHref) {
          setFavicon(savedFaviconHref, 'image/png');
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}

import { useEffect } from 'react';

// Call from any overlay that is conditionally mounted — it locks for as long as the
// component is on screen. The counter keeps the lock intact through the one commit
// where the product modal unmounts and the cart drawer mounts in its place.
let lockCount = 0;
let savedScrollY = 0;

// `overflow: hidden` on <body> alone does not stop iOS Safari from scrolling the page
// behind a fixed overlay, which is how you end up scrolling the homepage while trying
// to scroll the cart. Pinning the body and restoring the offset on release does.
export default function useScrollLock() {
  useEffect(() => {
    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      Object.assign(document.body.style, {
        position: 'fixed',
        top: `-${savedScrollY}px`,
        left: '0',
        right: '0',
        overflow: 'hidden',
      });
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        Object.assign(document.body.style, { position: '', top: '', left: '', right: '', overflow: '' });
        window.scrollTo(0, savedScrollY);
      }
    };
  }, []);
}

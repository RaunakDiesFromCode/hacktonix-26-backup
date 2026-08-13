import { useEffect, useState } from "react";

export function useImageReady(src: string) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setReady(true);
        img.onerror = () => setReady(true); // fail open, not stuck forever
    }, [src]);

    return ready;
}

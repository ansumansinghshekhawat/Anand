import React, { useEffect, useRef, useState } from 'react';
import { MotionValue } from 'motion/react';

// Use import.meta.glob to gather all image URLs statically.
// Using eager to get the URLs directly.
const imagesPart1 = import.meta.glob('@/ezgif-88afc3554f051b28-jpg/*.jpg', { eager: true, query: '?url', import: 'default' });
const imagesPart2 = import.meta.glob('@/ezgif-8aa59d1a1133baa9-jpg/*.jpg', { eager: true, query: '?url', import: 'default' });

// Sort the paths to ensure correct frame order
const getSortedUrls = (record: Record<string, unknown>) => {
  return Object.entries(record)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([, url]) => url as string);
};

const urls1 = getSortedUrls(imagesPart1);
const urls2 = getSortedUrls(imagesPart2);

// Combine both parts for a smooth 240-frame sequence
const allFrameUrls = [...urls1, ...urls2];

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const ImageSequence: React.FC<Props> = ({ scrollYProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const imgArray = new Array(allFrameUrls.length);

    allFrameUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      imgArray[i] = img;
    });

    setImages(imgArray);
  }, []);

  // Draw frame on canvas based on scroll progress
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas fill the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(scrollYProgress.get());
    };

    const renderFrame = (progress: number) => {
      if (images.length === 0) return;
      
      const frameIndex = Math.min(
        images.length - 1,
        Math.max(0, Math.floor(progress * images.length))
      );
      
      const img = images[frameIndex];
      if (img && img.complete) {
        // Draw image covering the whole canvas (like object-fit: cover)
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // initial draw

    // Subscribe to framer-motion scroll updates
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      renderFrame(latest);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
    };
  }, [images, scrollYProgress, loadedCount]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#000' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Optional Loading Indicator */}
      {loadedCount < allFrameUrls.length && (
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'white', fontSize: '12px', fontFamily: 'monospace' }}>
          Loading assets... {Math.round((loadedCount / allFrameUrls.length) * 100)}%
        </div>
      )}
    </div>
  );
};

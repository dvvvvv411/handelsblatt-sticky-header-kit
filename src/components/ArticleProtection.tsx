import React, { useEffect } from 'react';

interface ArticleProtectionProps {
  children: React.ReactNode;
  watermarkEmail?: string;
}

const ArticleProtection: React.FC<ArticleProtectionProps> = ({ children, watermarkEmail }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // Block Ctrl+U (view source)
      if (e.ctrlKey && key === 'u') { e.preventDefault(); return; }
      // Block Ctrl+S (save)
      if (e.ctrlKey && key === 's') { e.preventDefault(); return; }
      // Block Ctrl+P (print)
      if (e.ctrlKey && key === 'p') { e.preventDefault(); return; }
      // Block Ctrl+A (select all)
      if (e.ctrlKey && key === 'a') { e.preventDefault(); return; }
      // Block Ctrl+C (copy)
      if (e.ctrlKey && key === 'c') { e.preventDefault(); return; }
      // Block Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && key === 'i') { e.preventDefault(); return; }
      // Block Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && key === 'j') { e.preventDefault(); return; }
      // Block Ctrl+Shift+C (Inspect)
      if (e.ctrlKey && e.shiftKey && key === 'c') { e.preventDefault(); return; }
      // Block F12
      if (e.key === 'F12') { e.preventDefault(); return; }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', position: 'relative' }}
    >
      {children}
      
      {watermarkEmail && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-50%',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '60px',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-30deg)',
            }}
          >
            {Array.from({ length: 80 }).map((_, i) => (
              <span
                key={i}
                style={{
                  fontSize: '14px',
                  color: 'rgba(0, 0, 0, 0.06)',
                  whiteSpace: 'nowrap',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  letterSpacing: '1px',
                }}
              >
                {watermarkEmail}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleProtection;

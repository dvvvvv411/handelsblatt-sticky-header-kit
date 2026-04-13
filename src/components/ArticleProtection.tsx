import React, { useEffect, useState, useCallback } from 'react';

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  hasSelection: boolean;
  linkHref: string | null;
  linkText: string | null;
}

interface ArticleProtectionProps {
  children: React.ReactNode;
  watermarkEmail?: string;
  strictMode?: boolean;
}

const ArticleProtection: React.FC<ArticleProtectionProps> = ({ children, watermarkEmail, strictMode = false }) => {
  const [menu, setMenu] = useState<ContextMenuState>({
    visible: false, x: 0, y: 0, hasSelection: false, linkHref: null, linkText: null,
  });

  const closeMenu = useCallback(() => setMenu(prev => ({ ...prev, visible: false })), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (e.ctrlKey && key === 'u') { e.preventDefault(); return; }
      if (e.ctrlKey && key === 's') { e.preventDefault(); return; }
      if (e.ctrlKey && key === 'p') { e.preventDefault(); return; }
      if (strictMode) {
        if (e.ctrlKey && key === 'a') { e.preventDefault(); return; }
        if (e.ctrlKey && key === 'c') { e.preventDefault(); return; }
      }
      if (e.ctrlKey && e.shiftKey && key === 'i') { e.preventDefault(); return; }
      if (e.ctrlKey && e.shiftKey && key === 'j') { e.preventDefault(); return; }
      if (e.ctrlKey && e.shiftKey && key === 'c') { e.preventDefault(); return; }
      if (e.key === 'F12') { e.preventDefault(); return; }
      if (e.key === 'Escape') closeMenu();
    };

    const handleClick = () => closeMenu();
    const handleScroll = () => closeMenu();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [strictMode, closeMenu]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = window.getSelection();
    const hasSelection = !!(selection && selection.toString().trim().length > 0);

    let linkHref: string | null = null;
    let linkText: string | null = null;
    let target = e.target as HTMLElement | null;
    while (target) {
      if (target.tagName === 'A') {
        linkHref = (target as HTMLAnchorElement).href;
        linkText = target.textContent || linkHref;
        break;
      }
      target = target.parentElement;
    }

    const menuWidth = 220;
    const menuHeight = 250;
    const x = Math.min(e.clientX, window.innerWidth - menuWidth - 8);
    const y = Math.min(e.clientY, window.innerHeight - menuHeight - 8);

    setMenu({ visible: true, x, y, hasSelection, linkHref, linkText });
  };

  const handleCopy = () => {
    document.execCommand('copy');
    closeMenu();
  };

  const handleSelectAll = () => {
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.body);
    sel?.removeAllRanges();
    sel?.addRange(range);
    closeMenu();
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(window.location.href);
    closeMenu();
  };

  const handlePrint = () => {
    closeMenu();
    setTimeout(() => window.print(), 100);
  };

  const handleCopyLink = () => {
    if (menu.linkHref) navigator.clipboard.writeText(menu.linkHref);
    closeMenu();
  };

  const handleOpenLinkNewTab = () => {
    if (menu.linkHref) window.open(menu.linkHref, '_blank');
    closeMenu();
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{
        userSelect: strictMode ? 'none' : 'auto',
        WebkitUserSelect: strictMode ? 'none' : 'auto',
        position: 'relative',
      }}
    >
      {children}

      {watermarkEmail && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 10 }}>
          <div style={{ position: 'absolute', inset: '-50%', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-30deg)' }}>
            {Array.from({ length: 80 }).map((_, i) => (
              <span key={i} style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.06)', whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 600, letterSpacing: '1px' }}>
                {watermarkEmail}
              </span>
            ))}
          </div>
        </div>
      )}

      {menu.visible && (
        <div
          style={{
            position: 'fixed',
            top: menu.y,
            left: menu.x,
            zIndex: 99999,
            minWidth: '200px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #b0b0b0',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            padding: '4px 0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '13px',
            color: '#1a1a1a',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem label="Zurück" shortcut="" onClick={() => { history.back(); closeMenu(); }} />
          <MenuItem label="Vorwärts" shortcut="" onClick={() => { history.forward(); closeMenu(); }} />
          <MenuItem label="Neu laden" shortcut="" onClick={() => { location.reload(); }} />
          <MenuSeparator />
          {menu.hasSelection && (
            <MenuItem label="Kopieren" shortcut="Strg+C" onClick={handleCopy} />
          )}
          <MenuItem label="Alles auswählen" shortcut="Strg+A" onClick={handleSelectAll} />
          <MenuSeparator />
          <MenuItem label="Adresse kopieren" onClick={handleCopyAddress} />
          <MenuSeparator />
          <MenuItem label="Drucken…" shortcut="Strg+P" onClick={handlePrint} />
          {menu.linkHref && (
            <>
              <MenuSeparator />
              <MenuItem label="Link kopieren" onClick={handleCopyLink} />
              <MenuItem label="Link in neuem Tab öffnen" onClick={handleOpenLinkNewTab} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

const MenuItem: React.FC<{ label: string; shortcut?: string; onClick: () => void; disabled?: boolean }> = ({ label, shortcut, onClick, disabled }) => (
  <div
    onClick={disabled ? undefined : onClick}
    style={{
      padding: '5px 24px 5px 12px',
      cursor: disabled ? 'default' : 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      opacity: disabled ? 0.4 : 1,
      borderRadius: '3px',
      margin: '0 4px',
    }}
    onMouseEnter={(e) => { if (!disabled) (e.currentTarget.style.backgroundColor = '#0060df'); (e.currentTarget.style.color = '#fff'); }}
    onMouseLeave={(e) => { (e.currentTarget.style.backgroundColor = 'transparent'); (e.currentTarget.style.color = '#1a1a1a'); }}
  >
    <span>{label}</span>
    {shortcut && <span style={{ marginLeft: '24px', fontSize: '12px', opacity: 0.6 }}>{shortcut}</span>}
  </div>
);

const MenuSeparator: React.FC = () => (
  <div style={{ height: '1px', backgroundColor: '#c8c8c8', margin: '4px 8px' }} />
);

export default ArticleProtection;

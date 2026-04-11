import React, { useRef, useCallback, useEffect } from 'react';
import { Bold } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = '',
  className,
  id,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // Sync external value changes into the editor
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const toggleBold = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.execCommand('bold', false);
    editorRef.current?.focus();
    handleInput();
  }, [handleInput]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Allow Ctrl+B / Cmd+B for bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      document.execCommand('bold', false);
      handleInput();
    }
  }, [handleInput]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    // Only allow plain text + preserve bold from clipboard
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    
    if (html) {
      // Strip all tags except <strong>, <b>
      const cleaned = html
        .replace(/<(?!\/?(strong|b)\b)[^>]*>/gi, '')
        .replace(/&nbsp;/g, ' ');
      document.execCommand('insertHTML', false, cleaned);
    } else {
      document.execCommand('insertText', false, text);
    }
    handleInput();
  }, [handleInput]);

  const isEmpty = !value || value === '<br>' || value === '<div><br></div>';

  return (
    <div className="space-y-1">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border border-slate-200 rounded-t-md bg-slate-50 px-2 py-1">
        <button
          type="button"
          onMouseDown={toggleBold}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors text-slate-600 hover:text-slate-900"
          title="Fett (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <span className="text-xs text-slate-400 ml-2">Ctrl+B für Fett</span>
      </div>
      
      {/* Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          id={id}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className={cn(
            "min-h-[100px] w-full rounded-b-md border border-t-0 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          suppressContentEditableWarning
        />
        {isEmpty && (
          <div className="absolute top-2 left-3 text-sm text-muted-foreground pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;

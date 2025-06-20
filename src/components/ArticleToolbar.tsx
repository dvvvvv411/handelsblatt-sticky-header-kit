
import React from 'react';
import { Copy, Mail, Twitter, Linkedin, Facebook, Printer, Bookmark } from 'lucide-react';

const ArticleToolbar = () => {
  const shareIcons = [
    { icon: Copy, label: 'Copy' },
    { icon: Mail, label: 'Email' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Facebook, label: 'Facebook' },
    { icon: Copy, label: 'Xing' }, // Using Copy as placeholder for Xing
    { icon: Copy, label: 'Flipboard' }, // Using Copy as placeholder for Flipboard
    { icon: Copy, label: 'Pocket' }, // Using Copy as placeholder for Pocket
  ];

  return (
    <div 
      className="py-3 px-4 border-t border-b flex items-center justify-between bg-slate-50 border-slate-200"
    >
      {/* Share Icons */}
      <div className="flex items-center gap-2">
        {shareIcons.map((item, index) => (
          <button
            key={index}
            className="p-2 rounded transition-colors duration-200 hover:bg-slate-200"
            title={item.label}
          >
            <item.icon 
              size={24} 
              className="text-gray-600"
            />
          </button>
        ))}
      </div>

      {/* Print & Bookmark */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded transition-colors duration-200 hover:bg-slate-200"
          title="Drucken"
        >
          <Printer 
            size={24} 
            className="text-gray-600"
          />
        </button>
        <button
          className="p-2 rounded transition-colors duration-200 hover:bg-slate-200"
          title="Lesezeichen"
        >
          <Bookmark 
            size={24} 
            className="text-gray-600"
          />
        </button>
      </div>
    </div>
  );
};

export default ArticleToolbar;

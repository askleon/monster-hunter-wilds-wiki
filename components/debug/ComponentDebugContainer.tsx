import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { GlassCanvas } from '@/components/GlassCanvas';

interface ComponentDebugContainerProps {
  title: string;
  component: React.ReactNode;
  code: string;
  language?: string;
}

export function ComponentDebugContainer({ 
  title, 
  component, 
  code,
  language = 'tsx'
}: ComponentDebugContainerProps) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const PreviewHeader = (
    <div className="flex justify-between items-center px-4 py-2 border-b border-color">
      <span className="text-sm text-secondary">Preview</span>
    </div>
  );

  const CodeHeader = (
    <div className="flex justify-between items-center px-4 py-2 border-b border-color">
      <span className="text-sm text-secondary">Code</span>
      <button
        onClick={copyCode}
        className="flex items-center gap-2 px-3 py-1 text-sm rounded-md 
          bg-black/20 hover:bg-white/10 text-primary hover:text-accent 
          transition-colors"
      >
        <FiCopy className="w-4 h-4" />
        Copy
      </button>
    </div>
  );

  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCanvas header={PreviewHeader}>
          <div className="p-4">
            {component}
          </div>
        </GlassCanvas>

        <GlassCanvas header={CodeHeader}>
          <pre className="p-4 overflow-x-auto">
            <code className={`language-${language}`}>
              {code}
            </code>
          </pre>
        </GlassCanvas>
      </div>
    </div>
  );
} 
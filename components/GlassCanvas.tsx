import { ReactNode } from 'react';

interface GlassCanvasProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  blur?: 'none' | 'sm' | 'md' | 'lg';
  opacity?: 'light' | 'medium' | 'dark';
}

export function GlassCanvas({ 
  children, 
  className = '', 
  header,
  blur = 'sm',
  opacity = 'medium'
}: GlassCanvasProps) {
  const blurClasses = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  const opacityClasses = {
    light: 'bg-black/10',
    medium: 'bg-black/20',
    dark: 'bg-black/30'
  };

  return (
    <div className={`
      border border-color rounded-lg overflow-hidden 
      ${opacityClasses[opacity]} 
      ${blurClasses[blur]}
      ${className}
    `}>
      {header}
      {children}
    </div>
  );
} 
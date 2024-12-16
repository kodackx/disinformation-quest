import { VERSION } from '../version';
import { Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="p-2 text-center text-xs text-gray-500 flex items-center justify-center gap-4">
      <span>v{VERSION.current}</span>
      <a 
        href="https://github.com/kodackx/disinformation-quest" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-gray-400 transition-colors"
      >
        <Github size={12} />
        <span>Source</span>
      </a>
    </footer>
  );
}; 
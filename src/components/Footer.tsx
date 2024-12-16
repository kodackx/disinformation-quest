import { VERSION } from '../version';

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-2 text-center text-xs text-gray-500 bg-white/80">
      <span>v{VERSION.current}</span>
    </footer>
  );
}; 
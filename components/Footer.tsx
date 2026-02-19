
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 md:px-8">
      <div className="container mx-auto text-center text-slate-400">
        <p className="font-bold text-xl mb-2 text-white">MANDALA FESTIVALES</p>
        <p>&copy; {new Date().getFullYear()} Festival en la Laguna Ñahuimpuquio. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-brand-pink">Instagram</a>
            <a href="#" className="hover:text-brand-pink">Facebook</a>
            <a href="#" className="hover:text-brand-pink">TikTok</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

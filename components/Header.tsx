
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-md sticky top-0 z-40 py-4 px-4 md:px-8">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-orange">
          ÑAHUIMPUQUIO
        </a>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#lineup" className="hover:text-brand-pink transition-colors">Lineup</a>
          <a href="#activities" className="hover:text-brand-pink transition-colors">Actividades</a>
          <a href="#ai-zone" className="hover:text-brand-pink transition-colors">AI Zone</a>
          <a href="#register" className="hover:text-brand-pink transition-colors">Entradas</a>
           <Link to="/login" className="px-4 py-2 bg-brand-teal hover:bg-teal-700 rounded-full text-sm font-semibold transition-colors">
            Mi Entrada
          </Link>
        </div>
        <Link to="/admin" className="px-4 py-2 bg-brand-purple hover:bg-purple-700 rounded-full text-sm font-semibold transition-colors">
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default Header;

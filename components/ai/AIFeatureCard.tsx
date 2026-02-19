
import React, { useState } from 'react';

interface AIFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const AIFeatureCard: React.FC<AIFeatureCardProps> = ({ icon, title, description, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-brand-purple rounded-2xl p-6 transition-all duration-300 hover:border-brand-pink hover:shadow-2xl hover:shadow-pink-500/20">
      <div className="flex items-start space-x-4">
        <div className="text-brand-teal text-3xl">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-slate-400 mt-1">{description}</p>
        </div>
      </div>
      
      <div className="mt-4">
        {isOpen ? (
          <div>
            <button onClick={() => setIsOpen(false)} className="w-full text-center py-2 px-4 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors mb-4 font-semibold">
              Ocultar
            </button>
            {children}
          </div>
        ) : (
          <button onClick={() => setIsOpen(true)} className="w-full text-center py-2 px-4 rounded-full bg-brand-pink hover:bg-pink-500 transition-colors font-semibold shadow-lg shadow-pink-500/30">
            Probar ahora
          </button>
        )}
      </div>
    </div>
  );
};

export default AIFeatureCard;

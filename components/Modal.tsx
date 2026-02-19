
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto text-white border border-brand-purple transform transition-all animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-brand-pink">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

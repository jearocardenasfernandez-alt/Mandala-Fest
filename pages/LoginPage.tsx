
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { Ticket } from '../types';

const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [tickets] = useLocalStorage<Ticket[]>('tickets', []);
  const [, setCurrentUserTicketId] = useLocalStorage<string | null>('currentUserTicketId', null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const foundTicket = tickets.find(
      (ticket) => ticket.phoneNumber === phoneNumber && ticket.dni === dni
    );

    if (foundTicket) {
      setCurrentUserTicketId(foundTicket.id);
      navigate('/profile');
    } else {
      setError('Credenciales incorrectas. Verifica tu celular y DNI.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-8 bg-slate-800 rounded-2xl shadow-lg border border-brand-purple">
        <h2 className="text-2xl font-bold text-center text-brand-pink mb-6">Ver Mi Entrada</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-400 text-center bg-red-900/50 p-3 rounded-lg">{error}</p>}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-300">N° de Celular</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={9}
              className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-brand-pink focus:border-brand-pink sm:text-sm p-3"
              placeholder="987654321"
            />
          </div>
          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-slate-300">DNI (es tu contraseña)</label>
            <input
              type="password"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              maxLength={8}
              className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-brand-pink focus:border-brand-pink sm:text-sm p-3"
              placeholder="********"
            />
          </div>
          <button type="submit" className="w-full bg-brand-pink hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full transition-colors">
            Ingresar
          </button>
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-brand-teal hover:underline">Volver a la página principal</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

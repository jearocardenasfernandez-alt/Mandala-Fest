
import React, { useState } from 'react';
import { Guest, Ticket } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

interface RegistrationFormProps {
  mode: 'list' | 'ticket';
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ mode, onSuccess }) => {
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [guests, setGuests] = useLocalStorage<Guest[]>('guests', []);
  const [tickets, setTickets] = useLocalStorage<Ticket[]>('tickets', []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !dni.trim()) {
      setError('Nombre y DNI son obligatorios.');
      return;
    }
    if (mode === 'ticket' && !phoneNumber.trim()) {
        setError('El número de celular es obligatorio para comprar una entrada.');
        return;
    }
    if (!/^\d{8}$/.test(dni)) {
      setError('El DNI debe tener 8 dígitos.');
      return;
    }
    if (mode === 'ticket' && !/^\d{9}$/.test(phoneNumber)) {
        setError('El número de celular debe tener 9 dígitos.');
        return;
    }

    const existingGuest = guests.find(g => g.dni === dni);
    const existingTicket = tickets.find(t => t.dni === dni);

    if (existingGuest || existingTicket) {
      setError('Este DNI ya ha sido registrado.');
      return;
    }

    if (mode === 'list') {
      const newGuest: Guest = {
        id: crypto.randomUUID(),
        name,
        dni,
        timestamp: Date.now(),
        checkedIn: false,
      };
      setGuests([...guests, newGuest]);
    } else {
        const newTicket: Ticket = {
            id: crypto.randomUUID(),
            name,
            dni,
            phoneNumber,
            timestamp: Date.now(),
            checkedIn: false,
            paymentMethod: 'Yape', // Default to Yape for simplicity
        };
        setTickets([...tickets, newTicket]);
    }
    
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300">Nombre Completo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-brand-pink focus:border-brand-pink sm:text-sm p-3"
          placeholder="Tu nombre aquí"
        />
      </div>
      <div>
        <label htmlFor="dni" className="block text-sm font-medium text-slate-300">DNI</label>
        <input
          type="text"
          id="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          maxLength={8}
          className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-brand-pink focus:border-brand-pink sm:text-sm p-3"
          placeholder="12345678"
        />
      </div>
       {mode === 'ticket' && (
         <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-300">N° de Celular (será tu usuario)</label>
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
        )}
      {mode === 'ticket' && (
        <div className="text-center p-4 bg-slate-700 rounded-lg">
            <p className="font-bold text-lg text-brand-teal">PRE-VENTA: S/ 20.00</p>
            <p className="text-sm text-slate-400 mt-2">Paga con Yape o Plin al número 987-654-321 y luego haz click en "Confirmar Registro". Tu entrada será validada.</p>
            <div className="flex justify-center space-x-4 mt-4">
                <img src="https://picsum.photos/150/150?random=1" alt="Yape QR" className="rounded-md" />
                <img src="https://picsum.photos/150/150?random=2" alt="Plin QR" className="rounded-md" />
            </div>
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-brand-pink hover:bg-pink-500 text-white font-bold py-3 px-4 rounded-full transition-colors duration-300 shadow-lg shadow-pink-500/30"
      >
        {mode === 'list' ? '¡Apúntame en la Lista!' : 'Confirmar Registro de Entrada'}
      </button>
    </form>
  );
};

export default RegistrationForm;

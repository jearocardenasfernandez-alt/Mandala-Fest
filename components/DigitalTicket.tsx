
import React from 'react';
import { Ticket } from '../types';

interface DigitalTicketProps {
  ticket: Ticket;
}

const DigitalTicket: React.FC<DigitalTicketProps> = ({ ticket }) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticket.id)}`;

  return (
    <div className={`relative w-full max-w-md mx-auto aspect-[1.6] rounded-2xl p-6 text-white overflow-hidden shadow-2xl transition-all duration-500 transform ${ticket.checkedIn ? 'grayscale' : ''} animate-holographic`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-pink to-brand-orange animate-gradient-x`}></div>
      
      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-white/20 opacity-40 mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <header className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-wider">ÑAHUIMPUQUIO</h2>
            <p className="text-xs uppercase tracking-widest opacity-80">IV Festival</p>
          </div>
          <div className="font-bold text-lg bg-white/20 px-3 py-1 rounded-full">VIP</div>
        </header>

        <main className="flex items-end justify-between">
          <div className="flex-1">
            <p className="text-xs uppercase opacity-80">Asistente</p>
            <p className="text-2xl font-bold truncate">{ticket.name}</p>
            <p className="text-sm opacity-80">DNI: {ticket.dni}</p>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <img src={qrCodeUrl} alt="Ticket QR Code" />
          </div>
        </main>
      </div>

      {ticket.checkedIn && (
        <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center">
            <span className="text-6xl font-black text-red-500 border-4 border-red-500 p-4 rounded-lg transform -rotate-12">USADA</span>
        </div>
      )}
    </div>
  );
};

export default DigitalTicket;

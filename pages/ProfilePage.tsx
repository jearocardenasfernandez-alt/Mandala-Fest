
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { Ticket } from '../types';
import DigitalTicket from '../components/DigitalTicket';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfilePage: React.FC = () => {
  const [currentUserTicketId, setCurrentUserTicketId] = useLocalStorage<string | null>('currentUserTicketId', null);
  const [tickets] = useLocalStorage<Ticket[]>('tickets', []);
  const [userTicket, setUserTicket] = useState<Ticket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserTicketId) {
      navigate('/login');
    } else {
      const ticket = tickets.find((t) => t.id === currentUserTicketId) || null;
      if (!ticket) {
        // Ticket might have been deleted by admin
        setCurrentUserTicketId(null);
        navigate('/login');
      } else {
         setUserTicket(ticket);
      }
    }
  }, [currentUserTicketId, navigate, tickets, setCurrentUserTicketId]);

  const handleLogout = () => {
    setCurrentUserTicketId(null);
    navigate('/');
  };

  if (!userTicket) {
    return <div className="flex items-center justify-center min-h-screen">Cargando perfil...</div>;
  }

  return (
    <>
      <Header />
      <main className="py-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">¡Hola, {userTicket.name.split(' ')[0]}!</h1>
            <p className="text-slate-400">Esta es tu entrada digital. ¡Preséntala en la puerta!</p>
          </div>
          
          <DigitalTicket ticket={userTicket} />

          <button 
            onClick={handleLogout} 
            className="mt-8 bg-brand-orange hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Cerrar Sesión
          </button>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;


import React, { useState, useMemo } from 'react';
import { Guest, Ticket } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

const ADMIN_PASSWORD = "admin"; // In a real app, this would be handled securely.

const AdminDashboard: React.FC<{onLogout: () => void}> = ({ onLogout }) => {
    const [guests, setGuests] = useLocalStorage<Guest[]>('guests', []);
    const [tickets, setTickets] = useLocalStorage<Ticket[]>('tickets', []);
    const [activeTab, setActiveTab] = useState<'guests' | 'tickets'>('guests');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCheckIn = (id: string, type: 'guest' | 'ticket') => {
        if (type === 'guest') {
            setGuests(prev => prev.map(g => g.id === id ? { ...g, checkedIn: true } : g));
        } else {
            setTickets(prev => prev.map(t => t.id === id ? { ...t, checkedIn: true } : t));
        }
    };
    
    const handleDelete = (id: string, type: 'guest' | 'ticket') => {
        const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer.");
        if (confirmation) {
            if (type === 'guest') {
                setGuests(prev => prev.filter(g => g.id !== id));
            } else {
                setTickets(prev => prev.filter(t => t.id !== id));
            }
        }
    };


    const filteredGuests = useMemo(() => 
        guests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.dni.includes(searchTerm)),
        [guests, searchTerm]
    );

    const filteredTickets = useMemo(() =>
        tickets.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.dni.includes(searchTerm) || t.phoneNumber.includes(searchTerm)),
        [tickets, searchTerm]
    );
    
    const renderTable = (data: (Guest | Ticket)[], type: 'guest' | 'ticket') => (
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-slate-400 uppercase bg-slate-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nombre</th>
                        <th scope="col" className="px-6 py-3">DNI</th>
                        {type === 'ticket' && <th scope="col" className="px-6 py-3">Celular</th>}
                        <th scope="col" className="px-6 py-3">Registrado</th>
                        <th scope="col" className="px-6 py-3">Estado</th>
                        <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-600">
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4">{item.dni}</td>
                            {type === 'ticket' && <td className="px-6 py-4">{(item as Ticket).phoneNumber}</td>}
                            <td className="px-6 py-4">{new Date(item.timestamp).toLocaleString()}</td>
                            <td className="px-6 py-4">
                                {item.checkedIn 
                                    ? <span className="bg-green-900 text-green-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Ingresó</span>
                                    : <span className="bg-yellow-900 text-yellow-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Pendiente</span>
                                }
                            </td>
                            <td className="px-6 py-4 flex items-center space-x-4">
                                <button 
                                    onClick={() => handleCheckIn(item.id, type)}
                                    disabled={item.checkedIn}
                                    className="font-medium text-brand-teal hover:underline disabled:text-slate-500 disabled:cursor-not-allowed"
                                >
                                    {item.checkedIn ? 'Usado' : 'Marcar Ingreso'}
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id, type)}
                                    className="font-medium text-red-500 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold text-brand-pink">Panel de Administración</h1>
                 <div>
                    <Link to="/" className="text-brand-teal hover:underline mr-4">Ir a la Web</Link>
                    <button onClick={onLogout} className="bg-brand-orange hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full">Cerrar Sesión</button>
                 </div>
            </div>

            <div className="mb-4">
                <div className="flex border-b border-slate-700">
                    <button onClick={() => setActiveTab('guests')} className={`py-2 px-4 font-semibold ${activeTab === 'guests' ? 'border-b-2 border-brand-pink text-white' : 'text-slate-400'}`}>
                        Lista de Invitados ({guests.length})
                    </button>
                     <button onClick={() => setActiveTab('tickets')} className={`py-2 px-4 font-semibold ${activeTab === 'tickets' ? 'border-b-2 border-brand-pink text-white' : 'text-slate-400'}`}>
                        Entradas Vendidas ({tickets.length})
                    </button>
                </div>
            </div>
            
            <div className="mb-4">
                <input 
                    type="text"
                    placeholder="Buscar por nombre, DNI o celular..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full max-w-lg p-2 bg-slate-700 rounded-md border border-slate-600 focus:ring-brand-pink focus:border-brand-pink"
                />
            </div>

            {activeTab === 'guests' ? renderTable(filteredGuests, 'guest') : renderTable(filteredTickets, 'ticket')}
        </div>
    );
};

const AdminLogin: React.FC<{onLogin: () => void}> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            onLogin();
        } else {
            setError('Contraseña incorrecta.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-8 bg-slate-800 rounded-2xl shadow-lg border border-brand-purple">
                <h2 className="text-2xl font-bold text-center text-brand-pink mb-6">Acceso Admin</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-brand-pink focus:border-brand-pink sm:text-sm p-3"
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


const AdminPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('adminAuth', false);

    return isAuthenticated 
        ? <AdminDashboard onLogout={() => setIsAuthenticated(false)} /> 
        : <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
};

export default AdminPage;

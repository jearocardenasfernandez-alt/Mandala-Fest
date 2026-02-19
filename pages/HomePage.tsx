
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import RegistrationForm from '../components/RegistrationForm';
import AIZone from '../components/ai/AIZone';

const LINEUP = [
  "ROMINA DAMN", "ANDY GUTIERREZ", "DEM", "MICHAELL JM", "RAGA", "YERICH T",
  "DANSAY", "GEINER VEGA", "CHULLACHAQUI", "EL DIABLO", "MUNDANO", "LEE",
  "ZINNA B2B MAMBASTIK", "TOSHI", "LUCKA", "RICK WOLLFLICH", "ERICKK",
  "ALEXANDER HOPE", "LOWCRAF", "NAIGUEL"
];

const ACTIVITIES = [
  "Paddle", "Botes", "Cuatrimotos", "Tattoo", "Glitter", "Patio de Comida",
  "Zona Camping", "Wifi", "Estacionamiento", "Movilidad Ida y Vuelta"
];


const HomePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'list' | 'ticket' | null>(null);
    const [successMessage, setSuccessMessage] = useState('');

    const openModal = (mode: 'list' | 'ticket') => {
        setModalMode(mode);
        setIsModalOpen(true);
        setSuccessMessage('');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMode(null);
    };

    const handleSuccess = () => {
        setSuccessMessage(modalMode === 'list' 
            ? '¡Genial! Estás en la lista. ¡Nos vemos en el festival!' 
            : '¡Tu entrada ha sido registrada! Revisa tu correo para más detalles.'
        );
    };

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section id="hero" className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center px-4" style={{backgroundImage: "url('https://picsum.photos/seed/festival/1920/1080')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-4">
                            <span className="block text-white uppercase">IV Festival en la Laguna</span>
                            <span className="block text-6xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-orange">ÑAHUIMPUQUIO</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 font-semibold uppercase tracking-widest">Música • Naturaleza • Arte</p>
                        <p className="text-2xl md:text-3xl font-bold text-brand-teal mt-4">SAB 19 ABR • 10AM</p>
                        <a href="#register" className="mt-8 inline-block bg-brand-pink hover:bg-pink-500 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform hover:scale-105 shadow-lg shadow-pink-500/40">
                            ¡Consigue tus Entradas!
                        </a>
                    </div>
                </section>

                {/* Lineup Section */}
                <section id="lineup" className="py-20 px-4 md:px-8 bg-slate-900">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-12"><span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-orange">Lineup</span></h2>
                        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-x-8 md:gap-y-4 max-w-4xl mx-auto">
                            {LINEUP.map(artist => (
                                <span key={artist} className="text-lg md:text-2xl font-bold text-slate-300 transition-colors hover:text-white">{artist}</span>
                            ))}
                        </div>
                    </div>
                </section>
                
                 {/* Activities Section */}
                <section id="activities" className="py-20 px-4 md:px-8 bg-brand-bg">
                    <div className="container mx-auto text-center">
                         <h2 className="text-4xl md:text-5xl font-bold mb-12"><span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-orange">Actividades y Servicios</span></h2>
                        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 max-w-5xl mx-auto">
                            {ACTIVITIES.map(activity => (
                                <div key={activity} className="bg-slate-800/50 backdrop-blur-sm border border-brand-purple rounded-full py-3 px-6 text-base md:text-lg font-semibold transition-all hover:border-brand-pink hover:bg-brand-purple/50">
                                    {activity}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Registration/Tickets Section */}
                <section id="register" className="py-20 px-4 md:px-8 bg-slate-900">
                    <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl font-bold mb-4">Ingreso Libre</h2>
                            <p className="text-slate-400 text-lg mb-6">¡No te quedes fuera! Ponte en lista y asegura tu ingreso libre hasta las 2PM. ¡La fiesta te espera!</p>
                            <button onClick={() => openModal('list')} className="w-full md:w-auto bg-gradient-to-r from-brand-teal to-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105 shadow-lg shadow-teal-500/30">
                                Apúntate en Lista
                            </button>
                        </div>
                         <div className="text-center md:text-left bg-slate-800 p-8 rounded-2xl border border-brand-pink shadow-2xl shadow-pink-500/20">
                            <h2 className="text-4xl font-bold mb-4">Pre-Venta Exclusiva</h2>
                             <p className="text-slate-400 text-lg mb-6">Asegura tu entrada a cualquier hora y vive la experiencia al máximo. ¡Stock limitado!</p>
                             <div className="text-4xl font-bold text-brand-pink mb-6">S/ 20.00</div>
                            <button onClick={() => openModal('ticket')} className="w-full md:w-auto bg-brand-pink hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105 shadow-lg shadow-pink-500/30">
                                Comprar Entrada
                            </button>
                        </div>
                    </div>
                </section>

                <AIZone />

            </main>
            <Footer />

            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalMode === 'list' ? 'Ingreso Libre en Lista' : 'Comprar Entrada Pre-Venta'}>
                {successMessage ? (
                    <div className="text-center p-8">
                        <div className="text-6xl text-brand-teal mb-4">🎉</div>
                        <p className="text-xl font-semibold">{successMessage}</p>
                    </div>
                ) : (
                    <RegistrationForm mode={modalMode!} onSuccess={handleSuccess} />
                )}
            </Modal>
        </>
    );
};

export default HomePage;

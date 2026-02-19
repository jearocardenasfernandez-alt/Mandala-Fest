
import React from 'react';
import AIFeatureCard from './AIFeatureCard';
import ImageGenerator from './ImageGenerator';
import ImageEditor from './ImageEditor';
import VideoAnimator from './VideoAnimator';
import GroundedQA from './GroundedQA';
import ComplexTaskSolver from './ComplexTaskSolver';
import SpeechGenerator from './SpeechGenerator';
import ImageAnalyzer from './ImageAnalyzer';

const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>;
const PhotoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>;
const PaintBrushIcon = () => <svg xmlns="http://www.w.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>;
const FilmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c1.355 0 2.707-.158 4.008-.462M12 21c-1.355 0-2.707-.158-4.008-.462m0 0a9.006 9.006 0 0 1-4.21-4.21m0 0a9.006 9.006 0 0 1 0-8.42m0 0a9.006 9.006 0 0 1 4.21-4.21m0 0a9.006 9.006 0 0 1 8.42 0m0 0a9.006 9.006 0 0 1 4.21 4.21m0 0a9.006 9.006 0 0 1 0 8.42m0 0a9.006 9.006 0 0 1-4.21 4.21M12 3v18M12 3a9.004 9.004 0 0 0-8.716 6.747M12 3a9.004 9.004 0 0 1 8.716 6.747" /></svg>;
const BrainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>;
const SpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>;
const ScanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>;



const AIZone = () => {
    return (
        <section id="ai-zone" className="py-20 px-4 md:px-8 bg-slate-900">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-orange">AI Magic Zone</span>
                </h2>
                <p className="max-w-3xl mx-auto text-slate-400 mb-12">
                    Experimenta el futuro. Interactúa con nuestra suite de herramientas de IA generativa para crear, explorar y divertirte.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AIFeatureCard icon={<PhotoIcon />} title="Generador de Vibe" description="Crea tu propio arte para el festival con un simple prompt de texto.">
                        <ImageGenerator />
                    </AIFeatureCard>
                    <AIFeatureCard icon={<PaintBrushIcon />} title="Remixea el Poster" description="Edita una imagen con IA. ¡Prueba a cambiar el poster del festival!">
                        <ImageEditor />
                    </AIFeatureCard>
                    <AIFeatureCard icon={<FilmIcon />} title="Anima tus Fotos" description="Dale vida a tus imágenes. Convierte una foto estática en un video corto y mágico.">
                        <VideoAnimator />
                    </AIFeatureCard>
                    <AIFeatureCard icon={<GlobeIcon />} title="Preguntas y Respuestas" description="Obtén info actualizada del festival, clima o lugares cercanos con Search y Maps.">
                        <GroundedQA />
                    </AIFeatureCard>
                     <AIFeatureCard icon={<ScanIcon />} title="Analizador de Outfits" description="Sube una foto de tu look para el festival y recibe un análisis divertido de nuestra IA.">
                        <ImageAnalyzer />
                    </AIFeatureCard>
                    <AIFeatureCard icon={<BrainIcon />} title="Resolución Compleja" description="Haz preguntas difíciles y deja que Gemini piense profundamente para darte una respuesta detallada.">
                        <ComplexTaskSolver />
                    </AIFeatureCard>
                    <AIFeatureCard icon={<SpeakerIcon />} title="Anuncio del Festival" description="Escribe un mensaje y escúchalo con una voz generada por IA.">
                        <SpeechGenerator />
                    </AIFeatureCard>
                </div>
            </div>
        </section>
    );
};

export default AIZone;


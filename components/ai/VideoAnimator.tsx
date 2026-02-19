
import React, { useState, useRef } from 'react';
import ApiKeySelector from '../ApiKeySelector';
import { animateImageWithVeo, pollVideoOperation } from '../../services/geminiService';

const VideoAnimator: React.FC = () => {
    const [prompt, setPrompt] = useState('The water ripples and the sky fills with cosmic energy');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [mimeType, setMimeType] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadingMessages = [
        "Despertando a los duendes del video...",
        "Ajustando los pixeles para la animación...",
        "Consultando con el oráculo de la IA...",
        "Renderizando sueños en fotogramas...",
        "Esto puede tardar unos minutos, ¡la magia toma tiempo!",
    ];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSourceImage(reader.result as string);
                setMimeType(file.type);
                setVideoUrl(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnimate = async (checkAndCall: <T>(apiCall: () => Promise<T>) => Promise<T | undefined>) => {
        if (!sourceImage || !prompt) {
            setError('Por favor, sube una imagen y escribe un prompt.');
            return;
        }
        setError('');
        setIsLoading(true);
        setVideoUrl(null);

        let messageIndex = 0;
        setLoadingMessage(loadingMessages[messageIndex]);
        const intervalId = setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setLoadingMessage(loadingMessages[messageIndex]);
        }, 5000);

        try {
            const base64Data = sourceImage.split(',')[1];
            let operation = await checkAndCall(() => animateImageWithVeo(base64Data, mimeType, prompt, aspectRatio));

            if (!operation) {
                 if (!operation) {
                    setError('Error con la API Key. Por favor, selecciona una nueva.');
                    setIsLoading(false);
                    clearInterval(intervalId);
                    return;
                }
            }

            while (operation && !operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await checkAndCall(() => pollVideoOperation(operation));
            }
            
            if (operation?.response?.generatedVideos?.[0]?.video?.uri) {
                const downloadLink = operation.response.generatedVideos[0].video.uri;
                // Append API key for fetching
                const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
            } else {
                 setError('No se pudo generar el video.');
            }

        } catch (e) {
            console.error(e);
            setError('Ocurrió un error durante la generación del video.');
        } finally {
            setIsLoading(false);
            clearInterval(intervalId);
            setLoadingMessage('');
        }
    };
    
    return (
        <ApiKeySelector>
            {(isKeyReady, checkAndCall) => (
                <div className="space-y-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
                    >
                        {sourceImage ? 'Cambiar Imagen' : 'Subir Foto para Animar'}
                    </button>
                    
                    {sourceImage && <img src={sourceImage} alt="Source" className="rounded-lg mx-auto max-w-full h-40" />}
                    
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe la animación..."
                        className="w-full bg-slate-700 border-slate-600 rounded-md p-3 focus:ring-brand-pink focus:border-brand-pink"
                        rows={2}
                        disabled={!sourceImage}
                    />
                     <div>
                        <label className="block text-sm font-medium text-slate-300">Aspect Ratio</label>
                        <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value as '16:9' | '9:16')} className="w-full bg-slate-700 border-slate-600 rounded-md p-2 mt-1">
                            <option value="16:9">16:9 (Landscape)</option>
                            <option value="9:16">9:16 (Portrait)</option>
                        </select>
                    </div>
                    <button onClick={() => handleAnimate(checkAndCall)} disabled={isLoading || !sourceImage} className="w-full bg-brand-teal hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:bg-slate-600">
                        {isLoading ? 'Animando...' : 'Animar con IA'}
                    </button>
                    {error && <p className="text-red-400">{error}</p>}
                    
                    {isLoading && <div className="text-center p-4 text-brand-orange">{loadingMessage}</div>}
                    
                    {videoUrl && (
                        <div className="mt-4">
                            <video src={videoUrl} controls autoPlay loop className="rounded-lg w-full"></video>
                        </div>
                    )}
                </div>
            )}
        </ApiKeySelector>
    );
};

export default VideoAnimator;

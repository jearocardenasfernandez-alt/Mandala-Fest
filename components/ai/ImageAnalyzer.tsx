
import React, { useState, useRef } from 'react';
import { analyzeImage } from '../../services/geminiService';

const ImageAnalyzer: React.FC = () => {
    const [prompt] = useState('You are a fun and quirky fashion critic for a psychedelic music festival. Analyze this outfit with humor and positivity. Give it a creative festival-themed name. Keep the response under 100 words.');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [mimeType, setMimeType] = useState('');
    const [analysis, setAnalysis] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const imageUrl = reader.result as string;
                setImage(imageUrl);
                setMimeType(file.type);
                setError('');
                setIsLoading(true);
                setAnalysis('');
                try {
                    const base64Data = imageUrl.split(',')[1];
                    const result = await analyzeImage(base64Data, file.type, prompt);
                    setAnalysis(result.text || 'No se pudo analizar la imagen.');
                } catch (e) {
                    console.error(e);
                    setError('Ocurrió un error al analizar la imagen.');
                } finally {
                    setIsLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
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
                disabled={isLoading}
            >
                {isLoading ? 'Analizando...' : (image ? 'Analizar Otro Outfit' : 'Sube tu Outfit')}
            </button>
            
            {error && <p className="text-red-400">{error}</p>}

            {image && (
                <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                    <div className="flex flex-col md:flex-row gap-4">
                        <img src={image} alt="Outfit to analyze" className="rounded-lg w-full md:w-1/3 object-cover" />
                        <div className="flex-1">
                            <h4 className="font-bold text-brand-pink mb-2">Vibe Check de la IA:</h4>
                            {isLoading ? (
                                <p>Analizando tu estilo...</p>
                            ) : (
                                <p className="text-slate-300 whitespace-pre-wrap">{analysis}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageAnalyzer;

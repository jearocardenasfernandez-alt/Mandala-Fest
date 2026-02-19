
import React, { useState } from 'react';
import ApiKeySelector from '../ApiKeySelector';
import { generateImage } from '../../services/geminiService';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('A mystical frog DJing at a lake festival, psychedelic, vibrant colors');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const aspectRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
  const imageSizes = ["1K", "2K", "4K"];

  const handleGenerate = async (checkAndCall: <T>(apiCall: () => Promise<T>) => Promise<T | undefined>) => {
    if (!prompt) {
      setError('Por favor, ingresa un prompt.');
      return;
    }
    setError('');
    setIsLoading(true);
    setImageUrl('');

    const result = await checkAndCall(() => generateImage(prompt, aspectRatio, imageSize));

    if(result) {
        for (const part of result.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64String = part.inlineData.data;
              setImageUrl(`data:image/png;base64,${base64String}`);
              break; 
            }
        }
    } else if (result === undefined) {
        setError('Error con la API Key. Por favor, selecciona una nueva.');
    } else {
        setError('No se pudo generar la imagen. Inténtalo de nuevo.');
    }
    
    setIsLoading(false);
  };

  return (
    <ApiKeySelector>
      {(isKeyReady, checkAndCall) => (
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Escribe tu prompt aquí..."
            className="w-full bg-slate-700 border-slate-600 rounded-md shadow-sm p-3 focus:ring-brand-pink focus:border-brand-pink"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">Aspect Ratio</label>
              <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)} className="w-full bg-slate-700 border-slate-600 rounded-md p-2 mt-1">
                {aspectRatios.map(ar => <option key={ar} value={ar}>{ar}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Tamaño</label>
              <select value={imageSize} onChange={e => setImageSize(e.target.value)} className="w-full bg-slate-700 border-slate-600 rounded-md p-2 mt-1">
                {imageSizes.map(size => <option key={size} value={size}>{size}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => handleGenerate(checkAndCall)} disabled={isLoading} className="w-full bg-brand-teal hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:bg-slate-600">
            {isLoading ? 'Generando...' : 'Generar Imagen'}
          </button>
          {error && <p className="text-red-400">{error}</p>}
          {isLoading && <div className="text-center p-4">La IA está creando...</div>}
          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="Generated" className="rounded-lg mx-auto max-w-full" />
            </div>
          )}
        </div>
      )}
    </ApiKeySelector>
  );
};

export default ImageGenerator;


import React, { useState, useEffect } from 'react';
import { getGroundedResponse } from '../../services/geminiService';
import { GroundingChunk } from '../../types';

const GroundedQA: React.FC = () => {
  const [prompt, setPrompt] = useState('Qué tiempo hará en la Laguna Ñahuimpuquio el 19 de abril?');
  const [useMaps, setUseMaps] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  useEffect(() => {
    if (useMaps && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          console.warn("Could not get location:", err.message);
        }
      );
    }
  }, [useMaps]);

  const handleSubmit = async () => {
    if (!prompt) {
      setError('Por favor, ingresa una pregunta.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResponse('');
    setSources([]);

    try {
      const result = await getGroundedResponse(prompt, useMaps, location || undefined);
      setResponse(result.text || "No se obtuvo respuesta.");
      const metadata = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (metadata) {
          setSources(metadata);
      }
    } catch (e) {
      console.error(e);
      setError('Ocurrió un error. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Haz una pregunta..."
        className="w-full bg-slate-700 border-slate-600 rounded-md p-3 focus:ring-brand-pink focus:border-brand-pink"
        rows={2}
      />
      <div className="flex items-center justify-center space-x-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="grounding" checked={!useMaps} onChange={() => setUseMaps(false)} className="form-radio text-brand-pink"/>
          <span>Google Search</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="grounding" checked={useMaps} onChange={() => setUseMaps(true)} className="form-radio text-brand-pink"/>
          <span>Google Maps</span>
        </label>
      </div>
      <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-brand-teal hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:bg-slate-600">
        {isLoading ? 'Buscando...' : 'Preguntar'}
      </button>
      {error && <p className="text-red-400">{error}</p>}
      {isLoading && <div className="text-center p-4">La IA está buscando...</div>}
      {response && (
        <div className="mt-4 p-4 bg-slate-700 rounded-lg text-left">
          <p className="whitespace-pre-wrap">{response}</p>
          {sources.length > 0 && (
            <div className="mt-4 border-t border-slate-600 pt-2">
                <h4 className="font-bold text-sm text-slate-300">Fuentes:</h4>
                <ul className="list-disc list-inside text-xs">
                    {sources.map((chunk, index) => {
                       const source = chunk.web || chunk.maps;
                       const uri = source?.uri;
                       const title = source?.title;
                       return uri ? <li key={index}><a href={uri} target="_blank" rel="noreferrer" className="text-brand-teal hover:underline">{title || uri}</a></li> : null;
                    })}
                </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroundedQA;

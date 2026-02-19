
import React, { useState } from 'react';
import { getComplexResponse } from '../../services/geminiService';

const ComplexTaskSolver: React.FC = () => {
  const [prompt, setPrompt] = useState('Planifícame un itinerario para el festival. Quiero maximizar mi experiencia viendo a los DJs de techno y también disfrutar de la naturaleza y las actividades como paddle. Empiezo a las 11am y me voy a las 8pm.');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!prompt) {
      setError('Por favor, ingresa una pregunta.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResponse('');

    try {
      const result = await getComplexResponse(prompt);
      setResponse(result.text || "No se obtuvo respuesta.");
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
        placeholder="Haz una pregunta compleja..."
        className="w-full bg-slate-700 border-slate-600 rounded-md p-3 focus:ring-brand-pink focus:border-brand-pink"
        rows={4}
      />
      <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-brand-teal hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:bg-slate-600">
        {isLoading ? 'Pensando...' : 'Obtener Plan'}
      </button>
      {error && <p className="text-red-400">{error}</p>}
      {isLoading && <div className="text-center p-4">La IA está pensando profundamente...</div>}
      {response && (
        <div className="mt-4 p-4 bg-slate-700 rounded-lg text-left">
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default ComplexTaskSolver;

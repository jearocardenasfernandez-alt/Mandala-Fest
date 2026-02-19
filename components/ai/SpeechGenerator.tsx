
import React, { useState } from 'react';
import { generateSpeech } from '../../services/geminiService';

// Base64 decode function
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Raw PCM to AudioBuffer decode function
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


const SpeechGenerator: React.FC = () => {
  const [text, setText] = useState('¡Bienvenidos al Festival en la Laguna Ñahuimpuquio! Prepárense para una experiencia inolvidable.');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const handleGenerate = async () => {
    if (!text) {
      setError('Por favor, ingresa un texto.');
      return;
    }
    setError('');
    setIsLoading(true);

    let ctx = audioContext;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      setAudioContext(ctx);
    }
    
    try {
      const result = await generateSpeech(`Say energetically: ${text}`);
      const base64Audio = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioBuffer = await decodeAudioData(
            decode(base64Audio),
            ctx,
            24000,
            1,
        );
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start();
      } else {
        setError('No se pudo generar el audio.');
      }
    } catch (e) {
      console.error(e);
      setError('Ocurrió un error al generar el audio.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe algo..."
        className="w-full bg-slate-700 border-slate-600 rounded-md p-3 focus:ring-brand-pink focus:border-brand-pink"
        rows={3}
      />
      <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-brand-teal hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:bg-slate-600">
        {isLoading ? 'Generando...' : 'Escuchar Audio'}
      </button>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
};

export default SpeechGenerator;

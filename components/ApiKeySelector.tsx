
import React, { useState, useEffect, useCallback } from 'react';

interface ApiKeySelectorProps {
  children: (isKeyReady: boolean, checkAndCall: <T>(apiCall: () => Promise<T>) => Promise<T | undefined>) => React.ReactNode;
}

const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ children }) => {
  const [isKeyReady, setIsKeyReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkApiKey = useCallback(async () => {
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setIsKeyReady(hasKey);
      } catch (e) {
        console.error("Error checking API key:", e);
        setIsKeyReady(false);
      }
    } else {
      console.warn("aistudio API not available. Assuming key is not ready.");
      setIsKeyReady(false);
    }
    setIsChecking(false);
  }, []);

  useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  const handleSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // Optimistically assume the user selected a key.
      setIsKeyReady(true);
    }
  };
  
  const checkAndCall = async <T,>(apiCall: () => Promise<T>): Promise<T | undefined> => {
      try {
          return await apiCall();
      } catch(e: any) {
          if (e.message === 'API_KEY_ERROR') {
              console.error("API Key error detected. Prompting user to select a key again.");
              setIsKeyReady(false);
              return undefined;
          }
          throw e; // Re-throw other errors
      }
  };

  if (isChecking) {
    return <div className="text-center p-8">Checking API Key status...</div>;
  }
  
  if (!isKeyReady) {
    return (
        <div className="bg-slate-800 border border-brand-purple rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-brand-pink mb-2">Acción Requerida</h3>
            <p className="text-slate-300 mb-4">Esta función requiere una API Key de un projecto de Google Cloud con facturación habilitada.</p>
            <p className="text-xs text-slate-400 mb-4">Para más información, visita <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-brand-teal underline">la documentación de facturación</a>.</p>
            <button
                onClick={handleSelectKey}
                className="bg-brand-orange hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
                Seleccionar API Key
            </button>
        </div>
    );
  }

  return <>{children(isKeyReady, checkAndCall)}</>;
};

export default ApiKeySelector;

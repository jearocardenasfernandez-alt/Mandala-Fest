import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// FIX: To resolve the type conflict error for `window.aistudio`, the `AIStudio` interface
// is defined within the `declare global` block. This makes `AIStudio` a global type,
// preventing module-scope issues where TypeScript might see identically named interfaces
// in different modules as distinct types.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio: AIStudio;
  }
}

// This function creates a new instance on each call to ensure the latest API key is used.
const getGenAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Generic function to handle API calls with API key check for premium models
const callPremiumGemini = async <T,>(apiCall: (ai: GoogleGenAI) => Promise<T>): Promise<T> => {
  const ai = getGenAI();
  try {
    return await apiCall(ai);
  } catch (e: any) {
    if (e.message.includes("API key not valid") || e.message.includes("Requested entity was not found")) {
      throw new Error("API_KEY_ERROR");
    }
    throw e;
  }
};

export const analyzeImage = async (base64Image: string, mimeType: string, prompt: string): Promise<GenerateContentResponse> => {
  const ai = getGenAI();
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };
  const textPart = { text: prompt };
  return ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [imagePart, textPart] },
  });
};

export const chatWithBot = (history: { role: 'user' | 'model'; parts: { text: string }[] }[], newMessage: string) => {
  const ai = getGenAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    history: history,
  });
  return chat.sendMessageStream({ message: newMessage });
};

export const generateImage = (prompt: string, aspectRatio: string, imageSize: string) => {
  return callPremiumGemini(async (ai) => 
    ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
            imageConfig: {
                aspectRatio: aspectRatio,
                imageSize: imageSize,
            },
        },
    })
  );
};

export const editImage = (base64Image: string, mimeType: string, prompt: string): Promise<GenerateContentResponse> => {
    const ai = getGenAI();
    return ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: base64Image, mimeType } },
                { text: prompt },
            ],
        },
    });
};

export const animateImageWithVeo = (base64Image: string, mimeType: string, prompt: string, aspectRatio: '16:9' | '9:16') => {
    return callPremiumGemini(async (ai) => 
        ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            image: { imageBytes: base64Image, mimeType },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio,
            }
        })
    );
};

export const pollVideoOperation = (operation: any) => {
    return callPremiumGemini(async (ai) => 
        ai.operations.getVideosOperation({ operation: operation })
    );
};

export const getGroundedResponse = (prompt: string, useMaps: boolean, location?: { latitude: number, longitude: number }) => {
    const ai = getGenAI();
    const model = useMaps ? 'gemini-2.5-flash' : 'gemini-3-flash-preview';
    const tools = useMaps ? [{googleMaps: {}}] : [{googleSearch: {}}];
    
    let toolConfig: any = {};
    if (useMaps && location) {
        toolConfig.retrievalConfig = {
            latLng: {
                latitude: location.latitude,
                longitude: location.longitude,
            }
        };
    }

    return ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            tools,
            ...(Object.keys(toolConfig).length > 0 && { toolConfig }),
        },
    });
};

export const getComplexResponse = (prompt: string) => {
    const ai = getGenAI();
    return ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 }
        }
    });
};

export const generateSpeech = async (text: string) => {
    const ai = getGenAI();
    return ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });
};
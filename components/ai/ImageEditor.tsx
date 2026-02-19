
import React, { useState, useRef } from 'react';
import { editImage } from '../../services/geminiService';

const ImageEditor: React.FC = () => {
    const [prompt, setPrompt] = useState('Add a retro filter and some neon lights');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [mimeType, setMimeType] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setOriginalImage(reader.result as string);
                setMimeType(file.type);
                setEditedImage(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = async () => {
        if (!originalImage || !prompt) {
            setError('Por favor, sube una imagen y escribe un prompt.');
            return;
        }
        setError('');
        setIsLoading(true);
        setEditedImage(null);

        try {
            const base64Data = originalImage.split(',')[1];
            const result = await editImage(base64Data, mimeType, prompt);
            
            for (const part of result.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64String = part.inlineData.data;
                    setEditedImage(`data:${part.inlineData.mimeType};base64,${base64String}`);
                    break;
                }
            }
        } catch (e) {
            console.error(e);
            setError('No se pudo editar la imagen.');
        } finally {
            setIsLoading(false);
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
            >
                {originalImage ? 'Cambiar Imagen' : 'Subir Imagen'}
            </button>

            {originalImage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div>
                        <h4 className="font-bold mb-2 text-center">Original</h4>
                        <img src={originalImage} alt="Original" className="rounded-lg w-full" />
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-center">Editada</h4>
                        <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                            {isLoading ? (
                                <p>Editando...</p>
                            ) : editedImage ? (
                                <img src={editedImage} alt="Edited" className="rounded-lg w-full" />
                            ) : (
                                <p className="text-slate-400">La imagen editada aparecerá aquí</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe la edición..."
                className="w-full bg-slate-700 border-slate-600 rounded-md p-3 focus:ring-brand-pink focus:border-brand-pink"
                rows={2}
                disabled={!originalImage}
            />
            <button onClick={handleEdit} disabled={isLoading || !originalImage} className="w-full bg-brand-teal hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:bg-slate-600">
                {isLoading ? 'Editando...' : 'Editar con IA'}
            </button>
            {error && <p className="text-red-400">{error}</p>}
        </div>
    );
};

export default ImageEditor;

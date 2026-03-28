import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onBack: () => void;
}

const LogoGenerator: React.FC<Props> = ({ onBack }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLogo = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API Key is missing. Please set it in the environment variables.");
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: "A professional and modern logo for 'Jaiswal Packers and Movers'. The logo should feature a stylized delivery truck and moving boxes. Use a color palette of Deep Blue (#1e40af) and Vibrant Orange (#f97316). The design should be clean, minimalist, and suitable for a mobile app icon. White background.",
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64EncodeString}`);
          break;
        }
      }
    } catch (err: any) {
      console.error("Logo generation error:", err);
      setError(err.message || "Failed to generate logo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto mt-10 text-center relative">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Logo Generator</h2>
      <p className="text-slate-600 mb-6 text-sm">
        Click below to generate a professional logo for Jaiswal Packers and Movers.
      </p>
      
      {imageUrl ? (
        <div className="mb-6">
          <img 
            src={imageUrl} 
            alt="Generated Logo" 
            className="w-64 h-64 mx-auto rounded-2xl shadow-lg border-4 border-slate-100"
            referrerPolicy="no-referrer"
          />
          <p className="mt-4 text-xs text-slate-500">
            Right-click the image and select "Save image as..." to save it as <strong>icon.png</strong>.
          </p>
        </div>
      ) : (
        <div className="w-64 h-64 mx-auto bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center mb-6">
          <span className="text-slate-400 text-sm">No logo generated yet</span>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mb-4 font-medium">{error}</p>}

      <button
        onClick={generateLogo}
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Generating...' : 'Generate Logo'}
      </button>
    </div>
  );
};

export default LogoGenerator;

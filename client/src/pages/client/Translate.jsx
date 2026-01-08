import { useState } from 'react';
import { Repeat, Trash2, Volume2, Copy } from 'lucide-react';
import Header from '../../components/Header';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Vietnamese' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
];

export default function Translate() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('vi');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleClearInput = () => {
    setInputText('');
    setTranslatedText('');
  };

  const handleListen = (text, lang) => {
    if (!text || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // 🔹 Gọi backend Spring Boot thay vì gọi trực tiếp Google API
  const translateText = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/v1/translates/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          sourceLang: sourceLang,
          targetLang: targetLang,
        }),
      });

      const data = await res.json();
      if (data.translatedText) setTranslatedText(data.translatedText);
      else setTranslatedText('Error translating text');
    } catch (err) {
      console.error('Translation error:', err);
      setTranslatedText('Error translating text');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Language Selector */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-blue-400 cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>

          <button
            onClick={handleSwapLanguages}
            className="w-14 h-14 bg-cyan-400 hover:bg-cyan-500 rounded-2xl flex items-center justify-center transition-colors shadow-md"
          >
            <Repeat className="w-6 h-6 text-white" />
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-blue-400 cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>

        {/* Input & Translation Boxes */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Input */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">Input Text</h3>
              <button onClick={handleClearInput} className="text-red-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste text here..."
              className="w-full h-64 bg-gray-50 rounded-xl p-4 text-gray-900 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200 mb-3"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{inputText.length} characters</span>
              <button
                onClick={() => handleListen(inputText, sourceLang === 'en' ? 'en-US' : 'vi-VN')}
                disabled={!inputText}
                className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-sm font-medium">Listen</span>
              </button>
            </div>
          </div>

          {/* Translation */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">Translation</h3>
              <button onClick={() => handleCopy(translatedText)} disabled={!translatedText} className="text-gray-400 hover:text-gray-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full h-64 bg-purple-50 rounded-xl p-4 text-gray-900 text-base mb-3 overflow-y-auto border border-purple-100">
              {loading ? 'Translating...' : translatedText || <span className="text-gray-400">Translation will appear here...</span>}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{translatedText.length} characters</span>
              <button
                onClick={() => handleListen(translatedText, targetLang === 'en' ? 'en-US' : 'vi-VN')}
                disabled={!translatedText}
                className="text-purple-500 hover:text-purple-600 transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-sm font-medium">Listen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Translate Button */}
        <button
          onClick={translateText}
          disabled={!inputText || loading}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
        >
          Translate
        </button>
      </div>
    </div>
  );
}

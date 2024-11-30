import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en"); 
  const [translatedText, setTranslatedText] = useState("");
  const [sentiment, setSentiment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://translator-qhjy.onrender.com/analyze", {
        text,
        targetLanguage,
      });
      setTranslatedText(response.data.translatedText);
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
   
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Language Translator and Sentiment Analyzer
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg space-y-4"
      >
        <textarea
          rows="5"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <label
            htmlFor="language"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Language:
          </label>
          <select
            id="language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="af">Afrikaans</option>
            <option value="ar">Arabic</option>
            <option value="bg">Bulgarian</option>
            <option value="zh-Hans">Chinese (Simplified)</option>
            <option value="zh-Hant">Chinese (Traditional)</option>
            <option value="cs">Czech</option>
            <option value="da">Danish</option>
            <option value="nl">Dutch</option>
            <option value="en">English</option>
            <option value="fi">Finnish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="el">Greek</option>
            <option value="he">Hebrew</option>
            <option value="hi">Hindi</option>
            <option value="hu">Hungarian</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="no">Norwegian</option>
            <option value="pl">Polish</option>
            <option value="pt">Portuguese</option>
            <option value="ro">Romanian</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="sv">Swedish</option>
            <option value="th">Thai</option>
            <option value="tr">Turkish</option>
            <option value="uk">Ukrainian</option>
            <option value="vi">Vietnamese</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Analyze
        </button>
      </form>
      {translatedText && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Results:</h2>
          <p className="text-gray-700 mb-2">
            <strong>Translated Text:</strong> {translatedText}
          </p>
          <p className="text-gray-700">
            <strong>Sentiment:</strong> {sentiment}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;

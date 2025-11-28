import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import type { Subject } from '../types';

interface AiChatHelperProps {
  topic: string;
  subject: Subject;
}

interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

const AiChatHelper: React.FC<AiChatHelperProps> = ({ topic, subject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    if(isOpen) {
        setMessages([
            { role: 'model', parts: [{ text: `Hi! I'm BizNomics. How can I help you with "${topic}"?` }] }
        ]);
    }
  }, [isOpen, topic]);

  const handleSend = async () => {
    if (input.trim() === '' || loading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await getChatResponse([...messages, userMessage], input, topic, subject);
      const modelMessage: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "Sorry, I'm having trouble connecting right now." }] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-110"
        >
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-card rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200">
          <header className="bg-primary text-white p-4 rounded-t-xl flex items-center">
            <Bot className="mr-2" />
            <h3 className="font-bold text-lg">AI Chat Helper</h3>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-background">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 my-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <div className="p-2 bg-primary-light text-primary rounded-full"><Bot size={20} /></div>}
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-card shadow-sm text-text-primary'}`}>
                  {msg.parts[0].text}
                </div>
                {msg.role === 'user' && <div className="p-2 bg-gray-200 text-text-primary rounded-full"><User size={20} /></div>}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-3 my-3">
                  <div className="p-2 bg-primary-light text-primary rounded-full"><Bot size={20} /></div>
                  <div className="p-3 rounded-lg bg-card shadow-sm flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 border border-gray-300 bg-white text-text-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={handleSend} className="ml-2 p-2 bg-primary text-white rounded-full hover:bg-primary-hover disabled:bg-gray-400" disabled={loading}>
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChatHelper;
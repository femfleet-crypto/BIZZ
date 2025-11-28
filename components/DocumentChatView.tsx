import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, LogOut } from 'lucide-react';
import { getDocChatResponse } from '../services/geminiService';
import Button from './common/Button';
import type { UploadedFile } from '../App';

interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

interface DocumentChatViewProps {
  file: UploadedFile;
  onEndSession: () => void;
}

const DocumentChatView: React.FC<DocumentChatViewProps> = ({ file, onEndSession }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    setMessages([
      { role: 'model', parts: [{ text: `I've analyzed your document, **${file.name}**. Ask me anything about its content!` }] }
    ]);
    setInput('');
    setLoading(false);
  }, [file]);

  useEffect(scrollToBottom, [messages, loading]);

  const handleSend = async () => {
    if (input.trim() === '' || loading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // We pass only the messages from this session, the service prepends the context.
      const responseText = await getDocChatResponse(newMessages, file);
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
    <div className="bg-card rounded-xl shadow-2xl flex flex-col h-[calc(100vh-10rem)] border border-gray-200">
      <header className="bg-primary-light text-white p-3 flex justify-between items-center rounded-t-xl border-b border-gray-200">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-primary">{file.name}</h3>
          <p className="text-sm text-text-secondary truncate" title={file.name}>Document Chat</p>
        </div>
        <Button onClick={onEndSession} variant="outline" size="sm">
            <LogOut size={16} className="mr-2" />
            End Session
        </Button>
      </header>

      <div className="flex-1 p-4 overflow-y-auto bg-background">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && <div className="p-2 bg-primary-light text-primary rounded-full self-start"><Bot size={20} /></div>}
            <div className={`max-w-[85%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-card shadow-sm text-text-primary'}`}>
              {/* FIX: Moved className from ReactMarkdown to a wrapping div to fix the type error. Conditionally added `prose-invert` for user messages to ensure readability on a dark background. */}
              <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
              </div>
            </div>
            {msg.role === 'user' && <div className="p-2 bg-gray-200 text-text-primary rounded-full self-start"><User size={20} /></div>}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start gap-3 my-4">
              <div className="p-2 bg-primary-light text-primary rounded-full self-start"><Bot size={20} /></div>
              <div className="p-3 rounded-lg bg-card shadow-sm flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center bg-card rounded-b-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question about your document..."
          className="flex-1 border border-gray-300 bg-white text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Chat input"
        />
        <button onClick={handleSend} className="ml-3 p-3 bg-primary text-white rounded-full hover:bg-primary-hover disabled:bg-gray-400 transition-colors" disabled={loading || !input.trim()} aria-label="Send message">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default DocumentChatView;
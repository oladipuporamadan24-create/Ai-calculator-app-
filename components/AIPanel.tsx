import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { solveMathWithGemini } from '../services/gemini';
import { ChatMessage } from '../types';
import { clsx } from 'clsx';

const AIPanel: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm your AI Math Assistant. You can ask me to solve equations, explain concepts, or differentiate functions. Try 'Solve 2x + 5 = 11' or 'What is the derivative of sin(x)?'"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await solveMathWithGemini(userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const renderMarkdown = (text: string) => {
    // Simple formatter for bolding and line breaks, production would use a real markdown parser
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-blue-600 dark:text-blue-400 font-bold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="bg-blue-600 p-4 flex items-center space-x-2 text-white shadow-md z-10">
        <Sparkles size={24} className="text-yellow-300" />
        <h2 className="font-bold text-lg">AI Math Tutor</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              "flex w-full",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={clsx(
                "max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-blue-600 text-white rounded-br-none" 
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700"
              )}
            >
              <div className="flex items-center gap-2 mb-1 opacity-70 text-xs font-semibold uppercase tracking-wider">
                 {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                 {msg.role === 'user' ? 'You' : 'Gemini'}
              </div>
              <div>{renderMarkdown(msg.text)}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-2 text-gray-500">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a math question..."
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white pl-4 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIPanel;

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Check, CheckCheck } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
}

const ChatDemo: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi! Welcome to the secure chat demo.", sender: 'bot', timestamp: new Date(Date.now() - 60000), status: 'read' },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newUserMsg: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
            status: 'sent'
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate delivery
        setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === newUserMsg.id ? { ...m, status: 'delivered' } : m));
        }, 800);

        // Simulate read & reply
        setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === newUserMsg.id ? { ...m, status: 'read' } : m));

            const botReply: Message = {
                id: Date.now() + 1,
                text: "Thanks! I'm a simulated WebSocket client. Your message was encrypted end-to-end.",
                sender: 'bot',
                timestamp: new Date(),
                status: 'read'
            };
            setMessages(prev => [...prev, botReply]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <div className="bg-[#0f172a] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[400px]">
            {/* Header */}
            <div className="bg-[#1e293b] p-4 flex items-center gap-3 border-b border-white/5">
                <div className="relative">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1e293b] rounded-full"></span>
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm">SecureSupport Bot</h3>
                    <p className="text-xs text-green-400 opacity-80">Online</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex max-w-[80%] ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                        {msg.sender === 'bot' && (
                            <div className="flex-shrink-0 mr-2 mt-auto">
                                <div className="bg-[#1e293b] p-1.5 rounded-full">
                                    <Bot className="h-3 w-3 text-gray-400" />
                                </div>
                            </div>
                        )}

                        <div className={`relative px-4 py-2 rounded-2xl ${msg.sender === 'user'
                                ? 'bg-indigo-600 text-white rounded-br-sm'
                                : 'bg-[#1e293b] text-gray-200 rounded-bl-sm border border-white/5'
                            }`}>
                            <p className="text-sm">{msg.text}</p>

                            <div className={`flex items-center gap-1 mt-1 justify-end ${msg.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                                <span className="text-[10px]">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {msg.sender === 'user' && (
                                    msg.status === 'sent' ? <Check className="h-3 w-3" /> :
                                        <CheckCheck className={`h-3 w-3 ${msg.status === 'read' ? 'text-blue-300' : ''}`} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex mr-auto max-w-[80%] items-end">
                        <div className="flex-shrink-0 mr-2">
                            <div className="bg-[#1e293b] p-1.5 rounded-full">
                                <Bot className="h-3 w-3 text-gray-400" />
                            </div>
                        </div>
                        <div className="bg-[#1e293b] border border-white/5 text-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-[#1e293b] border-t border-white/5 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type an encrypted message..."
                    className="flex-1 bg-[#0f172a] border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10 flex-shrink-0"
                >
                    <Send className="h-4 w-4 ml-0.5" />
                </button>
            </form>
        </div>
    );
};

export default ChatDemo;

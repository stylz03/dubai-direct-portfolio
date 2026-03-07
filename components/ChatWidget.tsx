import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Mail, MessageCircle, Loader2 } from 'lucide-react';

type Step = 'chatting' | 'lead_name' | 'lead_email' | 'lead_phone' | 'lead_message' | 'submitting' | 'completed';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isActionable?: boolean;
}

const FAQ_RESPONSES: { pattern: RegExp; response: string; triggerLeadFlow: boolean }[] = [
  {
    pattern: /(service|offer|what do you do|build|create|capabilities)/i,
    response: "We specialize in building modern, scalable web applications, custom e-commerce solutions, UI/UX design, and complex data logic architectures. Do you have a project in mind?",
    triggerLeadFlow: false
  },
  {
    pattern: /(price|pricing|cost|how much|quote)/i,
    response: "Our pricing is highly customizable based on the specific needs, scale, and complexity of your project. We'd love to provide an accurate estimate—let's grab some details!",
    triggerLeadFlow: true
  },
  {
    pattern: /(where|location|located|based|office)/i,
    response: "We operate as a digital-first agency! We work with clients all across the globe and coordinate flawlessly via email, WhatsApp, and Google Meet.",
    triggerLeadFlow: false
  },
  {
    pattern: /(hi|hello|hey|greetings)/i,
    response: "Hello! 👋 How can I assist you today? Feel free to ask about our services, or let me know if you'd like to get in touch with our lead engineer.",
    triggerLeadFlow: false
  }
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState<Step>('chatting');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasGreeted, setHasGreeted] = useState(false);

  // Collected data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Load from environment variable (Vite prefix)
  const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || '';

  // Listen for custom event to open chat
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpenChat);

    // Initial greeting message when opened for the first time
    if (isOpen && !hasGreeted && messages.length === 0) {
      setHasGreeted(true);
      setTimeout(() => {
        addBotMessage("Hi there! 👋 Welcome to Dubai Direct. I'm your digital assistant.");
        setTimeout(() => {
          addBotMessage("Feel free to ask me anything about our services, or type 'project' to start a new inquiry!");
        }, 1000);
      }, 500);
    }

    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, [isOpen, messages.length, hasGreeted]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text: string, isActionable = false) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), sender: 'bot', text, isActionable }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), sender: 'user', text }]);
  };

  const handleFAQ = (text: string) => {
    for (const faq of FAQ_RESPONSES) {
      if (faq.pattern.test(text)) {
        addBotMessage(faq.response);
        if (faq.triggerLeadFlow) {
          setTimeout(() => {
            addBotMessage("To get started, what should I call you?");
            setCurrentStep('lead_name');
          }, 1500);
        }
        return true;
      }
    }
    return false;
  };

  const submitLead = async (data: typeof userData) => {
    setCurrentStep('submitting');
    
    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      console.warn('No Webhook URL configured. Just showing manual fallback options.');
      finalizeFlow(true); // show fallback
      return;
    }

    try {
      // Sending as text/plain ensures no CORS preflight request is made which Google Apps Script struggles with seamlessly
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', 
        },
        body: JSON.stringify({
          contactType: 'Chat Widget Lead',
          ...data,
          timestamp: new Date().toISOString()
        }),
      });

      // App scripts with cross-site POST don't always return standard JSON easily readable by the browser
      // If no promise throw, we assume success
      addBotMessage("Awesome! Your information has been securely sent. We'll be in touch as soon as possible.");
    } catch (error) {
      console.error('Webhook payload error:', error);
      addBotMessage("Oops, looks like our system had a slight network hiccup saving your info.");
    } finally {
      finalizeFlow();
    }
  };

  const finalizeFlow = (isFallback = false) => {
    setTimeout(() => {
      addBotMessage(
        isFallback 
        ? "You can also instantly message us using the secure links below!" 
        : "In the meantime, if you'd prefer instant support, you can use the secure links below!", 
        true
      );
      setCurrentStep('completed');
    }, 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim() || currentStep === 'submitting') return;

    const value = inputValue.trim();
    addUserMessage(value);
    setInputValue('');

    // State machine for chat flow
    setTimeout(() => {
      switch (currentStep) {
        case 'chatting':
          const answered = handleFAQ(value);
          if (!answered) {
            addBotMessage("I'm not quite sure about that, but I'd love to collect some details to have our team reach out directly! First, what's your name?");
            setCurrentStep('lead_name');
          }
          break;
        case 'lead_name':
          setUserData(prev => ({ ...prev, name: value }));
          addBotMessage(`Nice to meet you, ${value}! What's your best email address?`);
          setCurrentStep('lead_email');
          break;
        case 'lead_email':
          if (/\S+@\S+\.\S+/.test(value)) {
            setUserData(prev => ({ ...prev, email: value }));
            addBotMessage("Got it. And what's your phone number or WhatsApp number? (or type 'skip')");
            setCurrentStep('lead_phone');
          } else {
            addBotMessage("That doesn't look like a valid email. Please enter a valid email address.");
          }
          break;
        case 'lead_phone':
          if (value.length >= 5 || value.toLowerCase() === 'skip') {
            const finalPhone = value.toLowerCase() === 'skip' ? 'Skipped' : value;
            setUserData(prev => ({ ...prev, phone: finalPhone }));
            addBotMessage("Perfect. Lastly, tell me a bit about your project or what you'd like to discuss.");
            setCurrentStep('lead_message');
          } else {
             addBotMessage("Please provide a valid phone number, or type 'skip' if you prefer to only use email.");
          }
          break;
        case 'lead_message':
          const finalData = { ...userData, message: value };
          setUserData(finalData);
          addBotMessage("Thanks for the details! Sending your inquiry to the team now...");
          submitLead(finalData);
          break;
        default:
          break;
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const formatWhatsAppMessage = () => {
    const text = `Hi, my name is ${userData.name}.\nEmail: ${userData.email}\nPhone: ${userData.phone}\n\nMessage: ${userData.message}`;
    return encodeURIComponent(text);
  };

  const formatEmailBody = () => {
    const text = `Name: ${userData.name}\nEmail: ${userData.email}\nPhone: ${userData.phone}\n\nMessage:\n${userData.message}`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-4 right-0 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-surface-light border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-accent to-violet p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon rounded-full border-2 border-accent"></div>
              </div>
              <div>
                <h3 className="text-white font-bold">Dubai Direct Support</h3>
                <p className="text-white/80 text-xs">Typically replies instantly</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-accent text-white rounded-tr-sm' 
                    : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/5'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Submitting Loading Indicator */}
            {currentStep === 'submitting' && (
               <div className="flex justify-start animate-in fade-in">
                 <div className="bg-white/10 text-gray-200 rounded-2xl rounded-tl-sm border border-white/5 p-3 flex items-center gap-2">
                   <Loader2 className="h-4 w-4 animate-spin text-accent" />
                   <span className="text-sm">Sending...</span>
                 </div>
               </div>
            )}
            
            {/* Action Buttons for Completed State */}
            {currentStep === 'completed' && (
              <div className="flex flex-col gap-2 mt-4 animate-in slide-in-from-bottom-4 fade-in">
                <a 
                  href={`https://wa.me/27665541554?text=${formatWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send via WhatsApp
                </a>
                <a 
                  href={`mailto:contact@dubaidirect.co.za?subject=New Inquiry from ${userData.name}&body=${formatEmailBody()}`}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-violet text-white py-3 px-4 rounded-xl font-medium transition-opacity hover:opacity-90 cursor-pointer"
                >
                  <Mail className="h-5 w-5" />
                  Send via Email
                </a>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface border-t border-white/5 shrink-0">
            <div className="flex items-center gap-2 relative">
              <input
                type={currentStep === 'lead_email' ? 'email' : currentStep === 'lead_phone' ? 'tel' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  currentStep === 'chatting' ? 'Ask a question...' :
                  currentStep === 'lead_name' ? 'Type your name...' :
                  currentStep === 'lead_email' ? 'Type your email address...' :
                  currentStep === 'lead_phone' ? 'Type your phone number...' :
                  currentStep === 'lead_message' ? 'Type your message...' :
                  'Type a message...'
                }
                disabled={currentStep === 'completed' || currentStep === 'submitting'}
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || currentStep === 'completed' || currentStep === 'submitting'}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-accent hover:bg-accent/80 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-accent to-violet shadow-lg shadow-accent/20 flex items-center justify-center text-white hover:scale-110 transition-transform hover:shadow-accent/40 animate-bounce"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;

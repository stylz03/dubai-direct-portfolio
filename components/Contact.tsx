import React, { useState } from 'react';
import { Mail, MessageCircle, Send, MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Contact: React.FC = () => {
  const { ref: titleRef, isVisible } = useScrollReveal(0.1);
  const { ref: formRef, isVisible: formVisible } = useScrollReveal(0.1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 scroll-mt-24 relative">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-violet/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-accent font-mono text-sm tracking-widest uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Reach out and let's discuss your next project.
          </p>
        </div>

        <div ref={formRef} className={`grid lg:grid-cols-5 gap-8 transition-all duration-700 delay-200 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            <a href="mailto:hello@dubaidirect.co.za" className="block glass rounded-2xl p-5 hover-glow transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-accent/20 to-blue-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-white font-semibold">hello@dubaidirect.co.za</p>
                </div>
              </div>
            </a>

            <a href="https://wa.me/27600000000" className="block glass rounded-2xl p-5 hover-glow transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">WhatsApp</p>
                  <p className="text-white font-semibold">+27 60 000 0000</p>
                </div>
              </div>
            </a>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-violet/20 to-pink-500/20 p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-violet" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-white font-semibold">South Africa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="gradient-border glass rounded-2xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-neon/20 flex items-center justify-center mb-4">
                    <Send className="h-7 w-7 text-neon" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                      id="message" name="message"
                      value={formData.message} onChange={handleChange}
                      required rows={4}
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 outline-none transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-accent to-violet shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
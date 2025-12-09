import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // Assicurati di aver fatto 'npm install axios'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Scroll to top quando si entra nella pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Validazione base
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Compila tutti i campi obbligatori.' });
      setLoading(false);
      return;
    }

    try {
      // Chiamata all'API Laravel
      // Nota: In produzione dovresti usare una variabile d'ambiente come import.meta.env.VITE_API_URL
      await axios.post('http://127.0.0.1:8000/api/contact', formData);

      setStatus({ type: 'success', message: 'Messaggio inviato con successo! Ti ricontatteremo presto.' });
      
      // Resetta il form
      setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
      
    } catch (err) {
      console.error("Errore invio form:", err);
      // Gestione errori più dettagliata se il server risponde con errori di validazione
      if (err.response && err.response.data && err.response.data.message) {
         setStatus({ type: 'error', message: err.response.data.message });
      } else {
         setStatus({ type: 'error', message: 'Errore durante l\'invio. Riprova più tardi.' });
      }
    }
    
    setLoading(false);
  };

  const services = [
    'Seleziona un servizio',
    'Cucine su misura',
    'Living & Zona giorno',
    'Camera da letto',
    'Bagno',
    'Contract & Hospitality',
    'Consulenza completa',
    'Altro'
  ];

  const budgets = [
    'Seleziona budget indicativo',
    'Fino a €10.000',
    '€10.000 - €25.000',
    '€25.000 - €50.000',
    '€50.000 - €100.000',
    'Oltre €100.000',
    'Da definire'
  ];

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  return (
    <div className="w-full min-h-screen bg-white text-black pt-28 md:pt-32 pb-20">
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <span className="text-[#ff5149] uppercase tracking-[0.2em] text-xs font-bold">Contattaci</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-2 tracking-tighter">Parliamo del<br/>tuo progetto.</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          
          {/* Form */}
          <motion.form  
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Nome */}
            <motion.div variants={itemVariants} custom={0}>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Nome e Cognome <span className="text-[#ff5149]">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mario Rossi"
                className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black text-lg focus:outline-none focus:border-black transition-colors"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} custom={1}>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Email <span className="text-[#ff5149]">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mario.rossi@email.com"
                className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black text-lg focus:outline-none focus:border-black transition-colors"
              />
            </motion.div>

            {/* Telefono */}
            <motion.div variants={itemVariants} custom={2}>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Telefono
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+39 123 456 7890"
                className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black text-lg focus:outline-none focus:border-black transition-colors"
              />
            </motion.div>

            {/* Servizio */}
            <motion.div variants={itemVariants} custom={3}>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Servizio di interesse
              </label>
              <select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black text-lg focus:outline-none focus:border-black transition-colors cursor-pointer"
              >
                {services.map((s, i) => (
                  <option key={i} value={i === 0 ? '' : s} disabled={i === 0}>
                    {s}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Budget */}
            <motion.div variants={itemVariants} custom={4}>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Budget indicativo
              </label>
              <select 
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black text-lg focus:outline-none focus:border-black transition-colors cursor-pointer"
              >
                {budgets.map((b, i) => (
                  <option key={i} value={i === 0 ? '' : b} disabled={i === 0}>
                    {b}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Messaggio */}
            <motion.div variants={itemVariants} custom={5}>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Messaggio <span className="text-[#ff5149]">*</span>
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Raccontaci il tuo progetto..."
                rows="5"
                className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black text-lg focus:outline-none focus:border-black transition-colors resize-none"
              />
            </motion.div>

            {/* Status Message */}
            {status.message && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded ${
                  status.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-400' 
                    : 'bg-red-100 text-red-700 border border-red-400'
                }`}
              >
                {status.message}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={itemVariants} custom={6}>
              <button 
                type="submit"
                disabled={loading}
                className={`bg-black text-white px-12 py-5 uppercase font-bold tracking-widest 
                  hover:bg-[#ff5149] transition-all duration-300 
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    Invio in corso...
                  </span>
                ) : (
                  'Invia Richiesta'
                )}
              </button>
            </motion.div>
          </motion.form>

          {/* Info Contatti */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-12"
          >
            {/* Showroom */}
            <div className="border-t border-black pt-6">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Showroom</h3>
              <p className="text-xl font-light leading-relaxed">
                Via Example, 123<br/>
                20100 Milano (MI)<br/>
                Italia
              </p>
            </div>

            {/* Orari */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Orari</h3>
              <p className="text-lg font-light leading-relaxed">
                Lun - Ven: 9:00 - 18:30<br/>
                Sabato: 10:00 - 13:00<br/>
                Domenica: Chiuso
              </p>
            </div>

            {/* Contatti Diretti */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Contatti Diretti</h3>
              <div className="space-y-3">
                <a href="tel:+390212345678" className="block text-lg font-light hover:text-[#ff5149] transition-colors">
                  +39 02 1234 5678
                </a>
                <a href="mailto:info@arredorama.it" className="block text-lg font-light hover:text-[#ff5149] transition-colors">
                  info@arredorama.it
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Seguici</h3>
              <div className="flex gap-6">
                <a href="#" className="text-lg font-light hover:text-[#ff5149] transition-colors">Instagram</a>
                <a href="#" className="text-lg font-light hover:text-[#ff5149] transition-colors">Pinterest</a>
                <a href="#" className="text-lg font-light hover:text-[#ff5149] transition-colors">LinkedIn</a>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default Contact;
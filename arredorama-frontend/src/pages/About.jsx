import React from 'react';
import { motion } from 'framer-motion';

const TEAM = [
  { name: 'Mauro Bersani', role: 'Interior Designer', sub: 'Progettazione e vendita', email: 'mauro@arredorama.it', img: 'https://www.arredorama.it/wp-content/uploads/2019/02/mauro-bersani-interior-designer-arredorama.jpg' },
  { name: 'Stefano Bersani', role: 'Architetto', sub: 'Progettazione e vendita', email: 'stefano@arredorama.it', img: 'https://www.arredorama.it/wp-content/uploads/2019/02/stefano-bersani-architetto-interior-designer-arredorama.jpg' },
  { name: 'Lella Bersani', role: 'Interior Designer', sub: 'Progettazione e vendita', email: 'lella@arredorama.it', img: 'https://www.arredorama.it/wp-content/uploads/2019/02/lella-bersani-architetto-interior-designer-arredorama.jpg' },
  { name: 'Lucia Bersani', role: 'Textile Designer', sub: 'Progettazione e vendita', email: 'lucia@arredorama.it', img: 'https://www.arredorama.it/wp-content/uploads/2019/02/lucia-bersani-textile-interior-designer-arredorama-768x768.jpg' },
  { name: 'Marika Milani', role: 'Interior Designer', sub: 'Progettazione e vendita', email: 'marika@arredorama.it', img: 'https://www.arredorama.it/wp-content/uploads/2019/02/marika-bersani-interior-designer-arredorama-768x768.jpg' },
  { name: 'Eleonora Ziliani', role: 'Interior Designer', sub: 'Progettazione e vendita', email: 'eleonora@arredorama.it', img: 'https://www.arredorama.it/wp-content/uploads/2019/02/eleonora-ziliani-interior-designer-arredorama-768x768.jpg' },
  { name: 'Marco Jonata', role: 'Architetto', sub: 'Progettazione e vendita', email: 'progettazione01@arredorama.it', img: 'https://www.arredorama.it/wp-content/uploads/2019/02/marco-gionata-architetto-interior-designer-arredorama-768x768.jpg' },
  { name: 'Chiara Salmoiraghi', role: 'Architetto', sub: 'Progettazione e vendita', email: 'progettazione02@arredorama.it', img: 'https://www.arredorama.it/wp-content/uploads/2019/02/chiara-salmoiraghi-architetto-interior-designer-arredorama-768x768.jpg' },
  { name: 'Elena Ribolla', role: 'Resp. Amministrativo', sub: 'Amministrazione', email: 'amministrazione@arredorama.it', img: 'https://www.arredorama.it/wp-content/uploads/2019/02/elena-ribolla-iamministrazione-arredorama-768x768.jpg' },
];

const About = () => {
  return (
    <div className="w-full pt-32 pb-20 bg-white text-black">
      
      {/* FILOSOFIA */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
         <motion.div 
            initial={{opacity: 0, y: 50}} 
            whileInView={{opacity: 1, y: 0}} 
            viewport={{once: true}}
            transition={{duration: 0.8}}
         >
            <span className="text-[#00b7cd] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">La Nostra Filosofia</span>
            <h1 className="text-4xl md:text-6xl font-light mb-12 max-w-4xl leading-tight">
              Disporre gli spazi con eleganza, gusto e funzionalità è la nostra prerogativa principale.
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-600 font-light leading-relaxed text-lg">
               <p>
                 Arredorama si occupa da oltre trent’anni della fornitura di arredi, della progettazione e della realizzazione degli spazi interni relativamente ad abitazioni private e spazi commerciali offrendo anche un servizio chiavi in mano professionale. Assistenza e consulenza nello studio delle esigenze di arredamento e nella scelta del prodotto ideale di arredo, realizzazione della commessa e coordinamento delle professionalità.
               </p>
               <p>
                 La progettazione è svolta con l’impiego delle più moderne tecnologie per la rappresentazione grafica, la modellazione e il rendering delle soluzioni progettuali. La realizzazione finale è posta in essere da personale qualificato e con la collaborazione consolidata di importanti aziende e di operatori del settore dell’edilizia e dell’interior design.
               </p>
            </div>
         </motion.div>
      </section>

      {/* TEAM GRID */}
      <section className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-thin mb-16 border-b border-gray-200 pb-6">Il Nostro Team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {TEAM.map((member, index) => (
            <motion.div 
               key={index}
               initial={{opacity: 0, scale: 0.95}}
               whileInView={{opacity: 1, scale: 1}}
               viewport={{once: true}}
               transition={{delay: index * 0.1, duration: 0.6}}
               className="group"
            >
               <div className="overflow-hidden mb-6 bg-gray-100">
                  <img src={member.img} alt={member.name} className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" />
               </div>
               <h3 className="text-xl font-medium">{member.name}</h3>
               <p className="text-[#00b7cd] text-xs uppercase tracking-widest font-bold mt-1 mb-2">{member.role}</p>
               <p className="text-gray-500 text-sm font-light">{member.sub}</p>
               <a href={`mailto:${member.email}`} className="text-gray-400 text-sm hover:text-black transition-colors mt-2 block">{member.email}</a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
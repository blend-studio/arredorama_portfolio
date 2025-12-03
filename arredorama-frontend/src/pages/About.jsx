import React from 'react';

const About = () => {
  return (
    <div className="pt-40 px-6 min-h-screen flex flex-col items-center">
      <h1 className="text-6xl font-thin mb-10">Parliamo del tuo progetto</h1>
      <form className="w-full max-w-lg space-y-6">
        <input type="email" placeholder="La tua Email" className="w-full bg-transparent border-b border-gray-600 py-4 text-white focus:outline-none focus:border-white transition-colors" />
        <textarea placeholder="Il tuo Messaggio" rows="4" className="w-full bg-transparent border-b border-gray-600 py-4 text-white focus:outline-none focus:border-white transition-colors"></textarea>
        <button className="bg-white text-black px-10 py-4 uppercase font-bold tracking-widest hover:bg-[#ff5149] hover:text-white transition-all">Invia</button>
      </form>
    </div>
  );
};
export default About;
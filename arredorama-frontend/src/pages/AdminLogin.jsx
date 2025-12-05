import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_BASE_URL = 'http://127.0.0.1:8000';
const USE_STATIC_DATA = import.meta.env.VITE_USE_STATIC_DATA === 'true';
const BASE_URL = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const IS_STATIC_MODE =
  USE_STATIC_DATA || (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));
const STATIC_AUTH_URL = `${BASE_URL}/admin-auth.json`;

let staticAdminsCache = null;
const loadStaticAdmins = async () => {
  if (staticAdminsCache) return staticAdminsCache;
  const response = await fetch(STATIC_AUTH_URL);
  const data = await response.json();
  const admins = Array.isArray(data) ? data : Array.isArray(data.admins) ? data.admins : [data];
  staticAdminsCache = admins.filter(Boolean);
  return staticAdminsCache;
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (IS_STATIC_MODE) {
        const admins = await loadStaticAdmins();
        const match = admins.find(
          (a) => a.email === formData.email && a.password === formData.password,
        );

        if (!match) {
          throw new Error('Credenziali non valide');
        }

        localStorage.setItem('adminToken', 'static-auth');
        localStorage.setItem(
          'adminUser',
          JSON.stringify({ email: match.email, name: match.name || 'Admin' })
        );
      } else {
        const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Credenziali non valide');
        }

        // Salva il token nel localStorage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
      }

      // Reindirizza alla dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="https://www.arredorama.it/wp-content/uploads/2019/02/logo-arredorama.png"
            alt="Arredorama"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Area Riservata</h1>
          <p className="text-gray-500 mt-2">Accedi per gestire i progetti</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="admin@arredorama.it"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Accesso in corso...
              </span>
            ) : (
              'Accedi'
            )}
          </button>
        </form>

        {/* Link ritorno */}
        <div className="mt-6 text-center">
          <a href="/" className="text-gray-500 hover:text-red-600 text-sm transition-colors">
            ← Torna al sito
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
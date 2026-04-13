import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, Mail, Lock, CircleAlert as AlertCircle, Smile } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLoginSuccess();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccessMessage('Cuenta creada exitosamente. Puedes iniciar sesion ahora.');
        setMode('login');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ocurrio un error inesperado';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #f5f9fc 0%, #ffffff 100%)' }}>
      <div
        className="w-full max-w-md rounded-3xl shadow-2xl p-8 border"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)',
          borderColor: '#e0f2fe',
          boxShadow: '0 20px 60px rgba(2, 132, 199, 0.12)',
        }}
      >
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full opacity-20" style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }} />
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}>
              <Smile className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">CENTRO ODONTOLÓGICO</h1>
          <p className="text-sm font-semibold" style={{ color: '#0284c7' }}>DENTAL SAN CRISTOBAL S.R.L.</p>
          <div className="w-12 h-1 mx-auto mt-3" style={{ background: 'linear-gradient(90deg, #0284c7, #0369a1)' }} />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Correo Electrónico o Usuario"
              className="w-full px-4 py-3 border-2 rounded-full text-sm text-gray-800 placeholder-gray-400 transition-all focus:outline-none"
              style={{
                borderColor: '#0284c7',
                background: 'rgba(255, 255, 255, 0.8)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0369a1';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.15)';
                e.currentTarget.style.background = 'white';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              }}
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Contraseña"
                className="w-full px-4 py-3 border-2 rounded-full text-sm text-gray-800 placeholder-gray-400 transition-all focus:outline-none pr-12"
                style={{
                  borderColor: '#0284c7',
                  background: 'rgba(255, 255, 255, 0.8)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0369a1';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.15)';
                  e.currentTarget.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#0284c7';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="text-sm font-medium transition-colors"
                style={{ color: '#0284c7' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0369a1')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#0284c7')}
              >
                Olvidé mi contraseña
              </button>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded cursor-pointer"
                style={{ accentColor: '#0284c7' }}
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Recuérdame en este dispositivo
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-bold text-sm transition-all duration-200 mt-6"
            style={{
              background: loading ? '#93c5fd' : 'linear-gradient(135deg, #0284c7, #0369a1)',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = 'linear-gradient(135deg, #0369a1, #075985)';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.background = 'linear-gradient(135deg, #0284c7, #0369a1)';
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Procesando...
              </span>
            ) : mode === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-blue-100 text-center">
          <p className="text-sm text-gray-600 mb-3">
            {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </p>
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
              setSuccessMessage('');
            }}
            className="text-sm font-bold transition-colors"
            style={{ color: '#0284c7' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#0369a1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#0284c7')}
          >
            {mode === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; 2026 Dental San Cristobal. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

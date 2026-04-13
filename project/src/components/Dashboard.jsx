import { supabase } from '../lib/supabase';
import { LogOut, Calendar, FileText, Phone, User } from 'lucide-react';

export default function Dashboard({ email, onLogout }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen" style={{ background: '#f0f7ff' }}>
      <header className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0369a1, #0284c7)' }}>
              <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
                <path d="M32 8C24 8 18 14 18 20c0 4 1.5 8 4 12 2 3 3 7 3 10v2c0 2 1 3 3 3h1c1 0 2-1 2-2v-8c0-1 1-2 2-2h0c1 0 2 1 2 2v8c0 1 1 2 2 2h1c2 0 3-1 3-3v-2c0-3 1-7 3-10 2.5-4 4-8 4-12 0-6-6-12-14-12z" fill="white" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-gray-800">DentalCare Pro</h1>
              <p className="text-xs text-blue-600">Portal del Paciente</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #0369a1, #0284c7)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(135deg, #075985, #0369a1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'linear-gradient(135deg, #0369a1, #0284c7)')}
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido al Portal</h2>
          <p className="text-gray-500 mt-1">Gestiona tus citas y servicios dentales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Calendar, title: 'Mis Citas', desc: 'Proxima cita: No programada', color: '#0284c7', bg: '#e0f2fe' },
            { icon: FileText, title: 'Historial Clinico', desc: 'Ver tratamientos anteriores', color: '#0369a1', bg: '#dbeafe' },
            { icon: Phone, title: 'Contacto', desc: '+1 (555) 234-5678', color: '#0891b2', bg: '#cffafe' },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-2xl p-6 border border-blue-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: card.bg }}>
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

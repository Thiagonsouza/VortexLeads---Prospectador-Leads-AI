import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { MapPin, DollarSign, Target, Users } from 'lucide-react';

interface OnboardingFormProps {
  onComplete: (prefs: UserPreferences) => void;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const [prefs, setPrefs] = useState<UserPreferences>({
    targetNiche: '',
    radiusKm: 50,
    minRevenue: 20000,
    targetAudience: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(prefs);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="bg-brand-900 p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Mapeamento de Oportunidades</h2>
          <p className="text-brand-100 opacity-90">Configure sua IA para encontrar os leads perfeitos.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-500" />
                Qual seu Nicho de Mercado?
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Clínicas Odontológicas, Autopeças, Escritórios de Advocacia..."
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-brand-500 focus:ring-0 transition-colors"
                value={prefs.targetNiche}
                onChange={(e) => setPrefs({...prefs, targetNiche: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-500" />
                Público Alvo (Perfil)
              </label>
              <input
                type="text"
                placeholder="Ex: Donos, Gerentes..."
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-brand-500 focus:ring-0 transition-colors"
                value={prefs.targetAudience}
                onChange={(e) => setPrefs({...prefs, targetAudience: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500" />
                Raio de Alcance (Km)
              </label>
              <input
                type="number"
                min="1"
                max="500"
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-brand-500 focus:ring-0 transition-colors"
                value={prefs.radiusKm}
                onChange={(e) => setPrefs({...prefs, radiusKm: Number(e.target.value)})}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-brand-500" />
                Faturamento Médio Alvo (Mensal)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                <input
                  type="number"
                  step="1000"
                  className="w-full border-2 border-gray-200 rounded-xl p-4 pl-12 focus:border-brand-500 focus:ring-0 transition-colors font-mono text-lg"
                  value={prefs.minRevenue}
                  onChange={(e) => setPrefs({...prefs, minRevenue: Number(e.target.value)})}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Nossa IA buscará empresas com movimentação estimada próxima a este valor.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-700 to-brand-500 hover:from-brand-800 hover:to-brand-600 text-white font-extrabold py-5 rounded-xl shadow-xl transform transition hover:-translate-y-1 text-lg flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              <Target className="w-6 h-6" />
              Prospectar Agora
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
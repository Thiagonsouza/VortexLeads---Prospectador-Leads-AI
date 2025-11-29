import React from 'react';
import { Mic, Video, Users, Play, Calendar } from 'lucide-react';

export const CollaborationHub: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-900 to-brand-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-2">Central de Estratégia</h2>
          <p className="text-brand-100 max-w-xl">
            Conecte-se com seu time, assista treinamentos e participe de lives exclusivas para otimizar sua máquina de vendas.
          </p>
        </div>
        <Mic className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 text-white opacity-10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Stream Area */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-black aspect-video relative flex items-center justify-center group cursor-pointer">
            <img 
              src="https://picsum.photos/800/450" 
              alt="Live Cover" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
            />
            <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              AO VIVO
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900">Masterclass: Quebrando Objeções em Vendas B2B</h3>
            <p className="text-gray-500 mt-2 text-sm">Aprenda as técnicas avançadas de PNL para fechar contratos acima de R$ 50k.</p>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
               <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/32/32?random=1" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/32/32?random=2" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/32/32?random=3" />
               </div>
               <span className="text-xs text-gray-500">248 assistindo agora</span>
            </div>
          </div>
        </div>

        {/* Schedule / Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-500" /> Próximas Reuniões
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-brand-100 text-brand-700 font-bold p-2 rounded text-center min-w-[50px]">
                  <span className="text-xs block">NOV</span>
                  <span className="text-lg">24</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Alinhamento Semanal</h4>
                  <p className="text-xs text-gray-500">09:00 - 10:00 • Google Meet</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-brand-100 text-brand-700 font-bold p-2 rounded text-center min-w-[50px]">
                  <span className="text-xs block">NOV</span>
                  <span className="text-lg">26</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Podcast: Vendas Tech</h4>
                  <p className="text-xs text-gray-500">14:00 - 15:30 • Estúdio 2</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 border border-brand-500 text-brand-600 font-medium py-2 rounded-lg hover:bg-brand-50 transition-colors text-sm">
              Agendar Nova
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl shadow-md text-white">
            <div className="flex items-center gap-3 mb-4">
              <Mic className="w-6 h-6 text-purple-300" />
              <h3 className="font-bold">VortexCast</h3>
            </div>
            <p className="text-sm text-purple-100 mb-4">Ouça os últimos episódios sobre Growth Hacking.</p>
            <div className="bg-white/10 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-white/20 transition-colors">
              <div className="text-xs">
                <span className="block font-bold">Ep #42 - Cold Calling 2.0</span>
                <span className="text-purple-200">45 min</span>
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-900">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
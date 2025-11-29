import React, { useState, useEffect } from 'react';
import { Lead, UserPreferences } from '../types';
import { generateLeads, exportLeadsToXML } from '../services/mockData';
import { Download, Filter, Search, MapPin, Loader2, MoreHorizontal, Phone, Mail } from 'lucide-react';

interface ProspectingViewProps {
  prefs: UserPreferences;
}

export const ProspectingView: React.FC<ProspectingViewProps> = ({ prefs }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterRegion, setFilterRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate AI extraction delay
    const timer = setTimeout(() => {
      setLeads(generateLeads(25, prefs));
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [prefs]);

  const filteredLeads = leads.filter(lead => {
    const matchesRegion = filterRegion ? lead.region === filterRegion : true;
    const matchesSearch = lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.niche.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const uniqueRegions = Array.from(new Set(leads.map(l => l.region)));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="text-brand-600 animate-bounce" />
          </div>
        </div>
        <h2 className="mt-6 text-xl font-bold text-brand-900">Rastreando Leads via Google Maps...</h2>
        <p className="text-gray-500 mt-2">Analisando movimentação financeira e localização.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header / Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">Leads Encontrados</h2>
          <p className="text-sm text-gray-500">
            {filteredLeads.length} empresas encontradas no nicho <span className="font-semibold text-brand-600">{prefs.targetNiche}</span>
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por nome..." 
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm appearance-none bg-white cursor-pointer"
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              <option value="">Todas Regiões</option>
              {uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <button 
            onClick={() => exportLeadsToXML(filteredLeads)}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm"
          >
            <Download className="w-4 h-4" />
            Exportar XML
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-semibold">Nome / Empresa</th>
                <th className="p-4 font-semibold">Contato</th>
                <th className="p-4 font-semibold">Localização</th>
                <th className="p-4 font-semibold">Faturamento Est.</th>
                <th className="p-4 font-semibold">Nicho/Interesse</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{lead.fullName}</div>
                    <div className="text-xs text-gray-500">Nasc: {lead.birthDate}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-3 h-3 text-brand-500" /> {lead.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                      <Mail className="w-3 h-3" /> {lead.email}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 max-w-[200px] truncate" title={lead.address}>
                    {lead.address}
                    <div className="text-xs font-semibold text-brand-600 mt-1">{lead.region}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold text-xs">
                      R$ {lead.revenue.toLocaleString('pt-BR')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                      {lead.niche}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-gray-400 hover:text-brand-600 transition-colors">
                      <MoreHorizontal className="w-5 h-5 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLeads.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            Nenhum lead encontrado com os filtros atuais.
          </div>
        )}
      </div>
    </div>
  );
};
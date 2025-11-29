import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const dataGrowth = [
  { name: 'Seg', leads: 4 },
  { name: 'Ter', leads: 7 },
  { name: 'Qua', leads: 15 },
  { name: 'Qui', leads: 23 },
  { name: 'Sex', leads: 35 },
  { name: 'Sáb', leads: 28 },
  { name: 'Dom', leads: 12 },
];

const dataNiche = [
  { name: 'Saúde', value: 400 },
  { name: 'Varejo', value: 300 },
  { name: 'Serviços', value: 300 },
  { name: 'Tecnologia', value: 200 },
];

const COLORS = ['#1e3a8a', '#3b82f6', '#f59e0b', '#10b981'];

export const StatsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Leads Totais</p>
            <h3 className="text-2xl font-bold text-gray-900">1,284</h3>
            <p className="text-green-500 text-xs flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" /> +12% essa semana</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-brand-600"><Users className="w-6 h-6" /></div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Potencial de Caixa</p>
            <h3 className="text-2xl font-bold text-gray-900">R$ 25M</h3>
            <p className="text-green-500 text-xs flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" /> +5% essa semana</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-green-600"><DollarSign className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Taxa de Conversão</p>
            <h3 className="text-2xl font-bold text-gray-900">3.2%</h3>
            <p className="text-red-500 text-xs flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1 rotate-180" /> -0.4% essa semana</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg text-amber-600"><Activity className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Evolução de Prospecção</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataGrowth}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="leads" stroke="#1e3a8a" fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Niche Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Distribuição por Nicho</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataNiche}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataNiche.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {dataNiche.map((entry, index) => (
              <div key={index} className="flex items-center text-xs text-gray-600">
                <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
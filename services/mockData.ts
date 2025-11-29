import { Lead, UserPreferences } from '../types';

// Helper to generate random date
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString('pt-BR');
};

const firstNames = ['Carlos', 'Ana', 'Roberto', 'Juliana', 'Marcos', 'Fernanda', 'Paulo', 'Patrícia', 'Ricardo', 'Camila'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Almeida', 'Pereira', 'Lima', 'Gomes'];
const streets = ['Av. Paulista', 'Rua Augusta', 'Av. Faria Lima', 'Rua da Consolação', 'Av. Berrini', 'Rua Oscar Freire', 'Av. Brasil', 'Rua dos Pinheiros'];
const regions = ['Zona Sul', 'Zona Norte', 'Centro', 'Zona Oeste', 'Zona Leste', 'Grande SP'];

export const generateLeads = (count: number, prefs: UserPreferences): Lead[] => {
  const leads: Lead[] = [];

  for (let i = 0; i < count; i++) {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const num = Math.floor(Math.random() * 2000) + 1;
    
    // Simulate revenue around the target (with some variance)
    const variance = (Math.random() * 10000) - 5000;
    const revenue = Math.max(5000, prefs.minRevenue + variance);

    leads.push({
      id: `lead-${i}-${Date.now()}`,
      fullName: `${fn} ${ln}`,
      birthDate: randomDate(new Date(1970, 0, 1), new Date(1995, 0, 1)),
      phone: `(11) 9${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@empresa.com.br`,
      address: `${street}, ${num} - São Paulo, SP`,
      revenue: parseFloat(revenue.toFixed(2)),
      niche: prefs.targetNiche || 'Geral',
      region: regions[Math.floor(Math.random() * regions.length)],
      status: 'New'
    });
  }
  return leads;
};

export const exportLeadsToXML = (leads: Lead[]) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<leads>\n';
  leads.forEach(lead => {
    xml += '  <lead>\n';
    xml += `    <nome>${lead.fullName}</nome>\n`;
    xml += `    <nascimento>${lead.birthDate}</nascimento>\n`;
    xml += `    <telefone>${lead.phone}</telefone>\n`;
    xml += `    <email>${lead.email}</email>\n`;
    xml += `    <endereco>${lead.address}</endereco>\n`;
    xml += `    <faturamento>${lead.revenue}</faturamento>\n`;
    xml += `    <nicho>${lead.niche}</nicho>\n`;
    xml += '  </lead>\n';
  });
  xml += '</leads>';
  
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'leads_vortex.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
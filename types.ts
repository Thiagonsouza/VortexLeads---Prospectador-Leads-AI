
export interface Lead {
  id: string;
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  revenue: number; // Monthly revenue
  niche: string;
  region: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted';
}

export interface UserPreferences {
  targetNiche: string;
  radiusKm: number;
  minRevenue: number;
  targetAudience: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'google' | 'linkedin' | 'email';
}

export enum AppView {
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD_PROSPECT = 'DASHBOARD_PROSPECT',
  DASHBOARD_STATS = 'DASHBOARD_STATS',
  DASHBOARD_COLLAB = 'DASHBOARD_COLLAB',
}

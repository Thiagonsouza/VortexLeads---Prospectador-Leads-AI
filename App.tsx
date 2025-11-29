import React, { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { OnboardingForm } from './components/OnboardingForm';
import { ProspectingView } from './components/ProspectingView';
import { StatsDashboard } from './components/StatsDashboard';
import { CollaborationHub } from './components/CollaborationHub';
import { AppView, UserPreferences, UserProfile } from './types';
import { Target, LayoutDashboard, Database, Mic2, LogOut, Menu, X, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.AUTH);
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView(AppView.ONBOARDING);
  };

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    setUserPrefs(prefs);
    setCurrentView(AppView.DASHBOARD_PROSPECT);
  };

  const handleLogout = () => {
    setCurrentView(AppView.AUTH);
    setUserPrefs(null);
    setCurrentUser(null);
  };

  // Render Auth
  if (currentView === AppView.AUTH) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // Render Onboarding
  if (currentView === AppView.ONBOARDING) {
    return <OnboardingForm onComplete={handleOnboardingComplete} />;
  }

  // Render Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-brand-900 text-white w-64 transform transition-transform duration-200 ease-in-out z-30 lg:translate-x-0 lg:static ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-2 border-b border-brand-800">
            <Target className="w-8 h-8 text-brand-500" />
            <span className="text-xl font-bold tracking-tight">VORTEX<span className="text-brand-500">LEADS</span></span>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <NavItem 
              icon={<Database className="w-5 h-5" />} 
              label="Prospecção" 
              active={currentView === AppView.DASHBOARD_PROSPECT}
              onClick={() => { setCurrentView(AppView.DASHBOARD_PROSPECT); setMobileMenuOpen(false); }}
            />
            <NavItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Dashboard" 
              active={currentView === AppView.DASHBOARD_STATS}
              onClick={() => { setCurrentView(AppView.DASHBOARD_STATS); setMobileMenuOpen(false); }}
            />
            <NavItem 
              icon={<Mic2 className="w-5 h-5" />} 
              label="Colaboração & Live" 
              active={currentView === AppView.DASHBOARD_COLLAB}
              onClick={() => { setCurrentView(AppView.DASHBOARD_COLLAB); setMobileMenuOpen(false); }}
            />
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-brand-800 bg-brand-800/50">
            <div className="flex items-center gap-3 mb-4">
              {currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="User" className="w-10 h-10 rounded-full border-2 border-brand-500" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-700 flex items-center justify-center border-2 border-brand-600">
                  <UserIcon className="w-6 h-6 text-brand-300" />
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{currentUser?.name || 'Usuário'}</p>
                <p className="text-xs text-brand-300 truncate">{currentUser?.email || 'user@vortex.com'}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-brand-200 hover:text-white hover:bg-brand-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair da conta
            </button>
            
            {/* Version Footer */}
            <div className="mt-4 pt-4 border-t border-brand-700 text-center">
              <p className="text-[10px] text-brand-400 font-mono opacity-60">v1.0.0 (Release)</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 lg:hidden flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-900">
            <Target className="w-6 h-6 text-brand-600" />
            <span className="font-bold">VORTEXLEADS</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {userPrefs && (
            <>
              {currentView === AppView.DASHBOARD_PROSPECT && <ProspectingView prefs={userPrefs} />}
              {currentView === AppView.DASHBOARD_STATS && <StatsDashboard />}
              {currentView === AppView.DASHBOARD_COLLAB && <CollaborationHub />}
            </>
          )}
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active 
        ? 'bg-brand-500 text-white shadow-lg' 
        : 'text-brand-100 hover:bg-brand-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default App;

import React, { useState } from 'react';
import { Target, Linkedin, Mail, Lock, User, CheckSquare, Zap, Database, BarChart3, Bot, Loader2, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthPageProps {
  onLogin: (user: UserProfile) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [authMethod, setAuthMethod] = useState<'google' | 'linkedin' | 'email' | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(false); // State to toggle between Login/Signup
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agree: false
  });

  // Mock Login Handlers
  const handleSocialLogin = (method: 'google' | 'linkedin') => {
    setAuthMethod(method);
    setIsLoading(true);

    // Simulate OAuth Delay
    setTimeout(() => {
      const mockUser: UserProfile = method === 'google' 
        ? {
            name: "Alexandre Silva",
            email: "alexandre.silva@gmail.com",
            avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocIq8dM5xL8x=s96-c",
            provider: 'google'
          }
        : {
            name: "Alexandre Silva",
            email: "alex.biz@corporation.com",
            avatarUrl: "https://media.licdn.com/dms/image/D4D03AQGsB-xxxx/profile-displayphoto-shrink_800_800/0/1680000000000?e=2147483647&v=beta&t=xxxx",
            provider: 'linkedin'
          };
      
      onLogin(mockUser);
    }, 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Only check terms if registering
    if (!isLoginMode && !formData.agree) {
      alert("Você precisa concordar com os termos.");
      return;
    }

    setAuthMethod('email');
    setIsLoading(true);

    // Simulate Server Validation
    setTimeout(() => {
      // If logging in, derive a name or use stored; if registering, use form name
      const userName = isLoginMode ? (formData.email.split('@')[0] || 'Usuário') : formData.name;

      onLogin({
        name: userName,
        email: formData.email,
        provider: 'email'
      });
    }, 1500);
  };

  const toggleMode = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the error "refused to connect" by stopping link navigation
    setIsLoginMode(!isLoginMode);
    setAuthMethod(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white shadow-xl z-10">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center gap-2 mb-2 text-brand-900 animate-fade-in">
            <Target className="w-10 h-10 text-brand-600" />
            <span className="text-3xl font-extrabold tracking-tight">VORTEX<span className="text-brand-600">LEADS</span></span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {isLoginMode ? 'Bem-vindo de volta!' : 'Crie sua conta grátis'}
          </h1>

          {!isLoginMode && (
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-8">
              <div className="flex gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold">i</div>
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>Programa de Beta Testers.</strong> O acesso à ferramenta de extração de leads via Maps está liberado temporariamente para novas contas.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3 mb-8">
            <button 
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className={`w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all shadow-sm ${isLoading && authMethod !== 'google' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading && authMethod === 'google' ? (
                <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  {isLoginMode ? 'Entrar com Google' : 'Cadastre-se com o Google'}
                </>
              )}
            </button>
            <button 
              onClick={() => handleSocialLogin('linkedin')}
              disabled={isLoading}
              className={`w-full bg-[#0077b5] hover:bg-[#006097] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-sm ${isLoading && authMethod !== 'linkedin' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading && authMethod === 'linkedin' ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <>
                  <Linkedin className="w-5 h-5" />
                  {isLoginMode ? 'Entrar com Linkedin' : 'Cadastre-se com o Linkedin'}
                </>
              )}
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isLoginMode ? 'Ou entre com seu e-mail' : 'Ou crie sua conta grátis'}
              </span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleEmailSubmit}>
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diga, qual o seu nome?</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-colors" 
                    placeholder="Seu nome completo" 
                    required={!isLoginMode}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isLoginMode ? 'Seu e-mail cadastrado' : 'Seu e-mail de trabalho'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-colors" 
                  placeholder="nome@empresa.com" 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>

            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu telefone</label>
                <div className="flex rounded-lg shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    🇧🇷 +55
                  </span>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="flex-1 block w-full px-3 py-3 border border-gray-300 rounded-r-md focus:ring-brand-500 focus:border-brand-500 transition-colors" 
                    placeholder="11 99999-9999" 
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  {isLoginMode ? 'Sua senha' : 'Crie uma senha de acesso'}
                </label>
                {isLoginMode && <a href="#" className="text-xs text-brand-600 hover:underline">Esqueceu a senha?</a>}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-colors" 
                  placeholder="••••••••" 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>

            {!isLoginMode && (
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input 
                    id="terms" 
                    type="checkbox" 
                    checked={formData.agree}
                    onChange={(e) => setFormData({...formData, agree: e.target.checked})}
                    className="focus:ring-brand-500 h-4 w-4 text-brand-600 border-gray-300 rounded cursor-pointer" 
                    required 
                    disabled={isLoading}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700 cursor-pointer">Li e concordo com os <a href="#" className="text-brand-600 hover:text-brand-500 underline">termos de uso</a> e <a href="#" className="text-brand-600 hover:text-brand-500 underline">política de privacidade</a>.</label>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <button onClick={toggleMode} className="text-sm text-gray-600 hover:text-brand-600 underline focus:outline-none">
                {isLoginMode ? 'Ainda não tem conta? Cadastre-se' : 'Já cadastrado? Entrar'}
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className={`bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed transform-none' : ''}`}
              >
                {isLoading && authMethod === 'email' ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {isLoading && authMethod === 'email' ? 'Processando...' : (isLoginMode ? 'Entrar' : 'Cadastre-se')}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column: Hero/Marketing */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 relative overflow-hidden items-center justify-center p-12 text-white">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-500 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-accent-500 opacity-10 blur-3xl"></div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            SUA PROSPECÇÃO <span className="text-accent-500">AUTOMÁTICA</span> ESTÁ AQUI!
          </h2>
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-12 text-sm font-semibold tracking-wide uppercase border border-white/10">
            Comece agora e potencialize suas vendas
          </div>

          <div className="relative hover:scale-105 transition-transform duration-500">
             {/* Central "App" Image simulation */}
             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-4 mb-4 bg-white/5 p-3 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="h-2 w-24 bg-white/40 rounded mb-1"></div>
                    <div className="h-2 w-16 bg-white/20 rounded"></div>
                  </div>
                  <div className="ml-auto text-green-400 font-bold text-sm">R$ 25.000,00</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-brand-600 p-4 rounded-xl flex items-center gap-2 transform transition hover:scale-105 cursor-pointer border border-brand-500/30">
                      <Database className="w-5 h-5" />
                      <span className="text-sm font-bold">Lista de Empresas</span>
                   </div>
                   <div className="bg-brand-700 p-4 rounded-xl flex items-center gap-2 transform transition hover:scale-105 cursor-pointer border border-brand-500/30">
                      <BarChart3 className="w-5 h-5" />
                      <span className="text-sm font-bold">CRM Integrado</span>
                   </div>
                   <div className="col-span-2 bg-gradient-to-r from-blue-600 to-brand-500 p-4 rounded-xl flex items-center gap-2 transform transition hover:scale-105 cursor-pointer shadow-lg border border-white/10">
                      <Bot className="w-5 h-5" />
                      <span className="text-sm font-bold">Assistente IA no WhatsApp</span>
                   </div>
                </div>
             </div>

             {/* Connected Nodes */}
             <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-8">
                <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center shadow-lg animate-bounce">
                  <Zap className="w-6 h-6 text-white" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

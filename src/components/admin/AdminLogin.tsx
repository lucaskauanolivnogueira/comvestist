import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, Mail, User, ArrowLeft, Database, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { login, registerUser, navigateTo, sqlConfig } = useApp();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@vestibular.com');
  const [password, setPassword] = useState('admin123');
  const [confirmPassword, setConfirmPassword] = useState('admin123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isRegisterMode) {
      if (!name.trim()) {
        setErrorMessage('Por favor, informe seu nome completo.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('As senhas digitadas não coincidem.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
      const success = registerUser(name, email, password);
      if (!success) {
        setErrorMessage('Erro ao realizar o cadastro de administrador.');
      }
    } else {
      if (!email || !password) {
        setErrorMessage('Informe seu e-mail e senha.');
        return;
      }
      const success = login(email, password);
      if (!success) {
        setErrorMessage('Credenciais inválidas.');
      }
    }
  };

  return (
    <div className="min-h-[85vh] bg-stone-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button
          onClick={() => navigateTo('home')}
          className="mx-auto flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Portal Público</span>
        </button>

        <div className="w-14 h-14 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-md">
          <Shield className="w-8 h-8" />
        </div>

        <h2 className="mt-4 text-center text-2xl font-serif font-bold tracking-tight text-stone-900">
          {isRegisterMode ? 'Cadastro de Administrador' : 'Painel Administrativo da COVEST'}
        </h2>
        <p className="mt-1 text-center text-xs text-stone-600">
          {isRegisterMode
            ? 'Crie uma credencial de acesso para gerenciar o portal'
            : 'Gerenciamento do site, editais, notícias e exportador SQL'}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-xl border border-stone-200">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Prof. Roberto Ferreira"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                E-mail Institucional
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@vestibular.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Senha de Acesso
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>{isRegisterMode ? 'Concluir Cadastro & Entrar' : 'Acessar Painel de Controle'}</span>
              </button>
            </div>
          </form>

          {/* Toggle between login and register */}
          <div className="mt-6 pt-4 border-t border-stone-200 text-center">
            {isRegisterMode ? (
              <p className="text-xs text-stone-600">
                Já possui credencial cadastrada?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(false);
                    setErrorMessage('');
                  }}
                  className="font-semibold text-amber-900 hover:underline"
                >
                  Fazer Login
                </button>
              </p>
            ) : (
              <p className="text-xs text-stone-600">
                Novo membro da comissão?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(true);
                    setErrorMessage('');
                  }}
                  className="font-semibold text-amber-900 hover:underline"
                >
                  Cadastrar Administrador
                </button>
              </p>
            )}
          </div>

          {/* Database configuration trust footer */}
          <div className="mt-6 p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-[11px] text-stone-600">
            <div className="flex items-center gap-1.5 font-semibold text-stone-800">
              <Database className="w-3.5 h-3.5 text-amber-700" />
              <span>Conexão MySQL InfinityFree</span>
            </div>
            <p className="text-[10px] text-stone-500">
              Host: <code className="font-mono text-stone-800">{sqlConfig.host}</code> · Banco: <code className="font-mono text-stone-800">{sqlConfig.database}</code>
            </p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 pt-0.5">
              <CheckCircle2 className="w-3 h-3" />
              <span>Gerador de arquivo .SQL configurado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SelectiveProcess, CandidateApplication } from '../types';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, FileText, Download, UserCheck, AlertCircle } from 'lucide-react';

interface Props {
  process: SelectiveProcess;
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateRegistrationModal: React.FC<Props> = ({ process, isOpen, onClose }) => {
  const { addApplication } = useApp();

  const [candidateName, setCandidateName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [chosenCourse, setChosenCourse] = useState(
    process.courses && process.courses.length > 0 ? process.courses[0].name : process.title
  );
  const [submittedApp, setSubmittedApp] = useState<CandidateApplication | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !cpf.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const app = addApplication({
      processId: process.id,
      processTitle: process.title,
      candidateName: candidateName.trim(),
      cpf: cpf.trim(),
      email: email.trim(),
      phone: phone.trim(),
      chosenCourse,
      status: process.fee === 0 ? 'Inscrição Confirmada' : 'Aguardando Pagamento',
    });

    setSubmittedApp(app);
    setErrorMsg('');
  };

  const handleReset = () => {
    setCandidateName('');
    setCpf('');
    setEmail('');
    setPhone('');
    setSubmittedApp(null);
    setErrorMsg('');
    onClose();
  };

  const handleDownloadProtocol = () => {
    if (!submittedApp) return;
    const content = `COMPROVANTE DE INSCRIÇÃO OFICIAL
COMISSÃO ORGANIZADORA DO VESTIBULAR (COVEST)
=====================================================
Protocolo: ${submittedApp.protocolNumber}
Data da Inscrição: ${submittedApp.registrationDate}

SELETIVO: ${submittedApp.processTitle}
OPÇÃO DE VAGA / CURSO: ${submittedApp.chosenCourse}

DADOS DO CANDIDATO:
Nome: ${submittedApp.candidateName}
CPF: ${submittedApp.cpf}
E-mail: ${submittedApp.email}
Telefone: ${submittedApp.phone}

STATUS DA INSCRIÇÃO: ${submittedApp.status}
VALOR DA TAXA: R$ ${process.fee.toFixed(2)}
=====================================================
Guarde este comprovante. As informações de local de prova
serão divulgadas no portal conforme o cronograma oficial.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprovante_${submittedApp.protocolNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 relative">
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
            Ficha de Inscrição Online
          </span>
          <h3 className="text-xl font-serif font-bold text-white leading-tight">
            {process.title}
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            Taxa de Inscrição: {process.fee === 0 ? 'Gratuito' : `R$ ${process.fee.toFixed(2)}`} · Encerramento em {new Date(process.registrationEnd).toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedApp ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-serif font-bold text-stone-900">
                  Inscrição Registrada com Sucesso!
                </h4>
                <p className="text-sm text-stone-600 mt-1">
                  Seus dados foram processados no sistema da comissão organizadora.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left space-y-2 text-xs text-stone-700">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500 font-medium">Número do Protocolo:</span>
                  <span className="font-mono font-bold text-amber-900 text-sm">{submittedApp.protocolNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Candidato:</span>
                  <span className="font-semibold">{submittedApp.candidateName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">CPF:</span>
                  <span className="font-mono">{submittedApp.cpf}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Opção de Vaga:</span>
                  <span className="font-semibold text-stone-900">{submittedApp.chosenCourse}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                  <span className="text-stone-500 font-medium">Status:</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <UserCheck className="w-3 h-3" />
                    {submittedApp.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleDownloadProtocol}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Comprovante (.TXT)</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nome Completo do Candidato *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria dos Santos Silva"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    CPF *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  E-mail para Notificações & Convocação *
                </label>
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              {process.courses && process.courses.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Opção de Curso / Cargo Pretendido *
                  </label>
                  <select
                    value={chosenCourse}
                    onChange={(e) => setChosenCourse(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-900"
                  >
                    {process.courses.map((course) => (
                      <option key={course.id} value={`${course.name} (${course.shift} - ${course.campus})`}>
                        {course.name} - {course.shift} ({course.vacancies} vagas)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-2 text-[11px] text-stone-500 flex items-start gap-2">
                <FileText className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>
                  Declaro que li e concordo com os termos e normas estabelecidos no Edital de Abertura deste processo seletivo.
                </span>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg transition-colors shadow-sm"
                >
                  Confirmar Inscrição
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

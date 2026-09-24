export type ProcessCategory = 'vestibular' | 'concurso' | 'seletivo_ead' | 'residencia';

export type ProcessStatus = 'inscricoes_abertas' | 'em_andamento' | 'encerrado' | 'em_breve';

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  status: 'concluido' | 'atual' | 'futuro';
  description?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'edital' | 'retificacao' | 'gabarito' | 'resultado' | 'anexo';
  publishDate: string;
  fileSize: string;
  downloadUrl: string;
}

export interface CourseVacancy {
  id: string;
  name: string;
  shift: 'Matutino' | 'Vespertino' | 'Noturno' | 'Integral' | 'EAD' | 'Matutino / Noturno' | string;
  vacancies: number;
  campus: string;
}

export interface SelectiveProcess {
  id: string;
  title: string;
  slug: string;
  category: ProcessCategory;
  status: ProcessStatus;
  image: string;
  badgeTag: string;
  registrationStart: string;
  registrationEnd: string;
  examDate: string;
  fee: number;
  vacancies: number;
  summary: string;
  description: string;
  requirements: string[];
  schedule: ScheduleEvent[];
  documents: DocumentItem[];
  courses?: CourseVacancy[];
  contactEmail: string;
  featured: boolean;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  image: string;
  publishDate: string;
  author: string;
  category: string;
  featuredInSlider: boolean;
  sliderOrder: number;
  readTime: string;
}

export interface SiteSettings {
  institutionName: string;
  commissionAcronym: string;
  slogan: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  operationalHours: string;
  alertBanner: {
    active: boolean;
    text: string;
    type: 'info' | 'warning' | 'urgent';
    linkText?: string;
    linkUrl?: string;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrador Geral' | 'Coordenador de Seleções';
  lastLogin: string;
}

export interface CandidateApplication {
  id: string;
  processId: string;
  processTitle: string;
  candidateName: string;
  cpf: string;
  email: string;
  phone: string;
  chosenCourse: string;
  status: 'Inscrição Confirmada' | 'Aguardando Pagamento' | 'Isenção Deferida';
  registrationDate: string;
  protocolNumber: string;
}

export interface SqlConfig {
  user: string;
  password: string;
  host: string;
  database: string;
  port: number;
}

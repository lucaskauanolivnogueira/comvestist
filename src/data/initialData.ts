import { SelectiveProcess, NewsItem, SiteSettings, SqlConfig } from '../types';

import imgHeroSlider from '../assets/images/hero_vestibular_slider_1790277221192.jpg';
import imgNewsIsencao from '../assets/images/news_isencao_taxa_1790277232243.jpg';
import imgCardMedicina from '../assets/images/card_vestibular_medicina_1790277241917.jpg';
import imgCardConcurso from '../assets/images/card_concurso_docentes_1790277251257.jpg';
import imgCardEad from '../assets/images/card_seletivo_ead_tech_1790277260973.jpg';

export const initialSqlConfig: SqlConfig = {
  user: 'if0_42366022',
  password: 'OQdKtGCKW1',
  host: 'sql301.infinityfree.com',
  database: 'if0_42366022_sistema',
  port: 3306,
};

export const initialSiteSettings: SiteSettings = {
  institutionName: 'Comissão Organizadora do Vestibular & Concursos Públicos',
  commissionAcronym: 'COVEST',
  slogan: 'Portal Oficial de Ingressos, Processos Seletivos e Carreiras Públicas',
  contactEmail: 'vestibular@covest.institucional.br',
  contactPhone: '(81) 3412-8900 / (81) 98844-3320',
  address: 'Campus Universitário Central, Edifício das Comissões, Bloco B - Sala 104',
  operationalHours: 'Segunda a Sexta-feira: 08:00 às 17:30 (Horário de Brasília)',
  alertBanner: {
    active: true,
    text: 'Atenção candidatos: prazo final para solicitação de isenção de taxa encerra-se nesta sexta-feira às 23h59.',
    type: 'warning',
    linkText: 'Consultar Edital de Isenção',
    linkUrl: '#seletivos',
  },
};

export const initialNews: NewsItem[] = [
  {
    id: 'noticia-1',
    title: 'Publicado o Edital Unificado do Vestibular 2026/1 com mais de 3.500 vagas',
    subtitle: 'Confira as datas oficiais, cursos contemplados e novidades para o processo seletivo',
    summary: 'A Comissão Organizadora divulgou oficialmente nesta manhã o cronograma e o manual do candidato para o Vestibular Geral 2026/1. As inscrições começam na próxima segunda-feira.',
    content: `A Comissão Permanente do Vestibular (COVEST) torna público o Edital Unificado de Abertura do Vestibular 2026/1. Estão sendo ofertadas 3.520 vagas distribuídas em mais de 45 cursos de graduação, abrangendo as áreas de Ciências Exatas, Humanas, Biológicas e da Saúde.

O processo seletivo deste ano conta com inovações no formato da prova objetiva e na redação em língua portuguesa, priorizando a avaliação reflexiva e competências contemporâneas. Candidatos de escolas públicas terão direito à reserva de vagas conforme a legislação vigente de cotas.

O período de inscrições será exclusivamente online através do Portal do Candidato, com taxa fixada em R$ 120,00. As provas presenciais serão aplicadas no dia 24 de novembro nas principais cidades polo da região.`,
    image: imgHeroSlider,
    publishDate: '24/09/2026',
    author: 'Secretaria Geral de Comunicação - COVEST',
    category: 'Vestibular Geral',
    featuredInSlider: true,
    sliderOrder: 1,
    readTime: '3 min de leitura',
  },
  {
    id: 'noticia-2',
    title: 'Abertas as solicitações de Isenção da Taxa de Inscrição para candidatos de baixa renda',
    subtitle: 'Inscritos no CadÚnico e concluintes da rede pública têm direito ao benefício integral',
    summary: 'O pedido de isenção pode ser realizado diretamente no sistema com o envio digital dos comprovantes exigidos pelo edital normativo.',
    content: `Os candidatos interessados em participar do Vestibular e Concursos da instituição que atendem aos requisitos socioeconômicos já podem solicitar a isenção integral da taxa de inscrição.

Para ter direito, o candidato deve comprovar inscrição ativa no Cadastro Único para Programas Sociais do Governo Federal (CadÚnico) com NIS válido ou renda familiar per capita igual ou inferior a um salário mínimo e meio, tendo cursado todo o ensino médio em escola pública.

O resultado preliminar das solicitações de isenção será divulgado no dia 05 de outubro, com prazo de dois dias úteis para interposição de recursos administrativos.`,
    image: imgNewsIsencao,
    publishDate: '23/09/2026',
    author: 'Coordenação de Atendimento Social',
    category: 'Isenção & Cotas',
    featuredInSlider: true,
    sliderOrder: 2,
    readTime: '2 min de leitura',
  },
  {
    id: 'noticia-3',
    title: 'Divulgado o resultado final e homologação das notas do Vestibular de Medicina',
    subtitle: 'Convocados em primeira chamada devem realizar a pré-matrícula acadêmica digital',
    summary: 'A lista de classificados e a nota de corte por modalidade de concorrência já estão disponíveis para consulta individual no portal.',
    content: `Foi homologado pelo Conselho Superior da instituição o resultado definitivo das notas e a relação nominal dos candidatos classificados em 1ª chamada para o curso de Medicina (Campus Central).

Os candidatos convocados devem ficar atentos aos prazos da pré-matrícula acadêmica online, anexando a documentação pessoal, histórico escolar e comprovante de vacinação atualizado no sistema acadêmico. A ausência de manifestação dentro do prazo implicará na perda automática da vaga e convocação imediata da lista de espera.`,
    image: imgCardMedicina,
    publishDate: '20/09/2026',
    author: 'Comissão Especial de Medicina',
    category: 'Resultados & Matrículas',
    featuredInSlider: true,
    sliderOrder: 3,
    readTime: '4 min de leitura',
  },
];

export const initialSelectiveProcesses: SelectiveProcess[] = [
  {
    id: 'proc-med-2026',
    title: 'Vestibular de Medicina 2026/1 - Edital nº 01/2026',
    slug: 'vestibular-medicina-2026-1',
    category: 'vestibular',
    status: 'inscricoes_abertas',
    image: imgCardMedicina,
    badgeTag: 'Medicina e Saúde',
    registrationStart: '2026-09-15',
    registrationEnd: '2026-10-25',
    examDate: '2026-11-15',
    fee: 280.0,
    vacancies: 80,
    summary: 'Seleção para o curso de graduação em Medicina integral com laboratórios de última geração e internato em hospitais universitários credenciados.',
    description: `O Vestibular de Medicina 2026/1 destina-se ao preenchimento de 80 vagas no curso de Medicina (turno integral). A seleção é realizada sob rígidos padrões de segurança e lisura pela Comissão Permanente do Vestibular (COVEST).

A prova é composta por 60 questões de múltipla escolha com peso diferenciado para Biologia, Química e Física, além de uma Prova de Redação Dissertativa-Argumentativa em Língua Portuguesa.`,
    requirements: [
      'Conclusão do Ensino Médio ou equivalente até a data da matrícula acadêmica',
      'Documento oficial de identificação com foto e CPF regular',
      'Pagamento da taxa de inscrição ou comprovação de isenção deferida',
      'Atendimento aos requisitos de cotas em caso de inscrição em modalidade reservada',
    ],
    schedule: [
      { id: 'sch-1', title: 'Publicação do Edital de Abertura', date: '10/09/2026', status: 'concluido' },
      { id: 'sch-2', title: 'Período de Inscrições Online', date: '15/09 a 25/10/2026', status: 'atual', description: 'Inscrições abertas no portal com boleto ou Pix' },
      { id: 'sch-3', title: 'Divulgação dos Locais de Prova', date: '05/11/2026', status: 'futuro' },
      { id: 'sch-4', title: 'Aplicação das Provas Objetivas e Redação', date: '15/11/2026', status: 'futuro' },
      { id: 'sch-5', title: 'Publicação dos Gabaritos Preliminares', date: '16/11/2026', status: 'futuro' },
      { id: 'sch-6', title: 'Divulgação do Resultado Final e Convocação', date: '02/12/2026', status: 'futuro' },
    ],
    documents: [
      { id: 'doc-1', title: 'Edital de Abertura nº 01/2026 - Medicina', type: 'edital', publishDate: '10/09/2026', fileSize: '1.4 MB', downloadUrl: '#' },
      { id: 'doc-2', title: 'Manual do Candidato e Guia de Estudos', type: 'anexo', publishDate: '12/09/2026', fileSize: '3.8 MB', downloadUrl: '#' },
      { id: 'doc-3', title: 'Formulário de Solicitação de Atendimento Especial', type: 'anexo', publishDate: '14/09/2026', fileSize: '450 KB', downloadUrl: '#' },
    ],
    courses: [
      { id: 'c-1', name: 'Medicina', shift: 'Integral', vacancies: 80, campus: 'Campus Universitário Central' },
    ],
    contactEmail: 'medicina.vestibular@covest.institucional.br',
    featured: true,
    createdAt: '2026-09-10',
  },
  {
    id: 'proc-concurso-docente-2026',
    title: 'Concurso Público para Professor Efetivo e Técnicos - Edital nº 04/2026',
    slug: 'concurso-publico-docentes-tecnicos-2026',
    category: 'concurso',
    status: 'inscricoes_abertas',
    image: imgCardConcurso,
    badgeTag: 'Carreira Pública / Docência',
    registrationStart: '2026-09-20',
    registrationEnd: '2026-11-05',
    examDate: '2026-12-08',
    fee: 190.0,
    vacancies: 45,
    summary: 'Concurso público de provas e títulos para provimento de vagas na carreira do Magistério Superior e Analistas em Gestão Educacional.',
    description: `A Reitoria e a Comissão Organizadora de Concursos tornam pública a abertura de inscrições para o Concurso Público destinado a selecionar candidatos para provimento de cargos efetivos do quadro de pessoal docente e técnico-administrativo.

O certame compreenderá Prova Escrita Discursiva de Conhecimentos Específicos, Prova Didática e Julgamento de Títulos para cargos de nível superior e docente com remunerações iniciais de até R$ 11.240,00.`,
    requirements: [
      'Diploma de graduação na área pretendida devidamente registrado no MEC',
      'Para vagas de Magistério Superior: comprovação de titulação de Mestre ou Doutor',
      'Quitação com as obrigações eleitorais e militares (se do sexo masculino)',
      'Idade mínima de 18 anos completos na data da posse',
    ],
    schedule: [
      { id: 'sch-c1', title: 'Publicação do Edital no Diário Oficial', date: '18/09/2026', status: 'concluido' },
      { id: 'sch-c2', title: 'Inscrições pela Internet', date: '20/09 a 05/11/2026', status: 'atual', description: 'Envio de documentação comprobatória' },
      { id: 'sch-c3', title: 'Homologação das Inscrições', date: '12/11/2026', status: 'futuro' },
      { id: 'sch-c4', title: 'Realização das Provas Escritas', date: '08/12/2026', status: 'futuro' },
      { id: 'sch-c5', title: 'Sessão Pública de Provas Didáticas', date: '15/12 a 18/12/2026', status: 'futuro' },
      { id: 'sch-c6', title: 'Resultado Final e Homologação do Concurso', date: '12/01/2027', status: 'futuro' },
    ],
    documents: [
      { id: 'doc-c1', title: 'Edital Normativo de Abertura nº 04/2026', type: 'edital', publishDate: '18/09/2026', fileSize: '2.1 MB', downloadUrl: '#' },
      { id: 'doc-c2', title: 'Anexo I - Quadro Detalhado de Vagas e Remunerações', type: 'anexo', publishDate: '18/09/2026', fileSize: '890 KB', downloadUrl: '#' },
      { id: 'doc-c3', title: 'Anexo II - Conteúdo Programático e Bibliografia Sugerida', type: 'anexo', publishDate: '19/09/2026', fileSize: '1.2 MB', downloadUrl: '#' },
    ],
    courses: [
      { id: 'c-d1', name: 'Professor Adjunto - Ciência da Computação', shift: 'Integral', vacancies: 4, campus: 'Centro de Ciências Exatas' },
      { id: 'c-d2', name: 'Professor Assistente - Engenharia de Software', shift: 'Integral', vacancies: 6, campus: 'Centro de Ciências Exatas' },
      { id: 'c-d3', name: 'Professor Titular - Direito Constitucional', shift: 'Integral', vacancies: 2, campus: 'Faculdade de Direito' },
      { id: 'c-d4', name: 'Analista de Tecnologia da Informação', shift: 'Integral', vacancies: 15, campus: 'Campus Central / Reitoria' },
    ],
    contactEmail: 'concurso.docente@covest.institucional.br',
    featured: true,
    createdAt: '2026-09-18',
  },
  {
    id: 'proc-vestibular-ead-2026',
    title: 'Processo Seletivo EAD e Tecnologias 2026/1 - Edital nº 06/2026',
    slug: 'processo-seletivo-ead-tecnologias-2026',
    category: 'seletivo_ead',
    status: 'inscricoes_abertas',
    image: imgCardEad,
    badgeTag: 'Educação a Distância & TI',
    registrationStart: '2026-09-01',
    registrationEnd: '2026-10-30',
    examDate: '2026-11-08',
    fee: 45.0,
    vacancies: 1200,
    summary: 'Cursos superiores de tecnologia e licenciaturas 100% online com polos presenciais em mais de 25 municípios.',
    description: `A Comissão Organizadora seleciona estudantes para cursos de graduação a distância com diploma idêntico ao presencial. A seleção pode ser feita através de prova de redação online agendada ou aproveitamento da nota do ENEM (edições de 2018 a 2025).

Polos de apoio presencial modernos com tutoria presencial e suporte acadêmico permanente.`,
    requirements: [
      'Certificado de conclusão do Ensino Médio',
      'Computador ou smartphone com acesso à internet para provas online e aulas virtuais',
      'Boletim do ENEM se optar por aproveitamento de notas anteriores',
    ],
    schedule: [
      { id: 'sch-ead1', title: 'Abertura das Inscrições', date: '01/09/2026', status: 'concluido' },
      { id: 'sch-ead2', title: 'Período de Inscrição e Agendamento da Prova', date: '01/09 a 30/10/2026', status: 'atual' },
      { id: 'sch-ead3', title: 'Janela de Aplicação das Provas Digitais', date: '08/11/2026', status: 'futuro' },
      { id: 'sch-ead4', title: 'Divulgação dos Aprovados em 1ª Chamada', date: '16/11/2026', status: 'futuro' },
    ],
    documents: [
      { id: 'doc-ead1', title: 'Edital Geral do Processo Seletivo EAD nº 06/2026', type: 'edital', publishDate: '01/09/2026', fileSize: '1.1 MB', downloadUrl: '#' },
      { id: 'doc-ead2', title: 'Lista de Polos Presenciais Credenciados', type: 'anexo', publishDate: '03/09/2026', fileSize: '650 KB', downloadUrl: '#' },
    ],
    courses: [
      { id: 'c-ead1', name: 'Tecnologia em Análise e Desenvolvimento de Sistemas', shift: 'EAD', vacancies: 400, campus: 'Polos Regionais' },
      { id: 'c-ead2', name: 'Licenciatura em Pedagogia', shift: 'EAD', vacancies: 350, campus: 'Polos Regionais' },
      { id: 'c-ead3', name: 'Tecnologia em Gestão Pública', shift: 'EAD', vacancies: 250, campus: 'Polos Regionais' },
      { id: 'c-ead4', name: 'Licenciatura em Matemática', shift: 'EAD', vacancies: 200, campus: 'Polos Regionais' },
    ],
    contactEmail: 'ead.suporte@covest.institucional.br',
    featured: true,
    createdAt: '2026-09-01',
  },
  {
    id: 'proc-vestibular-unificado-geral',
    title: 'Vestibular Geral Unificado 2026/1 - Edital nº 02/2026',
    slug: 'vestibular-geral-unificado-2026',
    category: 'vestibular',
    status: 'inscricoes_abertas',
    image: imgHeroSlider,
    badgeTag: 'Cursos Tradicionais',
    registrationStart: '2026-09-25',
    registrationEnd: '2026-11-10',
    examDate: '2026-11-29',
    fee: 95.0,
    vacancies: 2200,
    summary: 'Seleção para os cursos presenciais de Engenharia, Direito, Administração, Psicologia, Arquitetura e mais 30 graduações.',
    description: `O maior processo seletivo institucional do ano! Provas presenciais em formato tradicional com redação dissertativa e questões objetivas em todas as áreas do conhecimento.`,
    requirements: [
      'Ensino médio completo ou em fase de conclusão no ano letivo vigente',
      'Documento de identidade oficial com foto atualizada',
      'Comprovante de pagamento da taxa ou isenção comprovada',
    ],
    schedule: [
      { id: 'sch-g1', title: 'Lançamento do Edital', date: '22/09/2026', status: 'concluido' },
      { id: 'sch-g2', title: 'Inscrições Abertas', date: '25/09 a 10/11/2026', status: 'atual' },
      { id: 'sch-g3', title: 'Cartão de Confirmação de Inscrição', date: '20/11/2026', status: 'futuro' },
      { id: 'sch-g4', title: 'Aplicação das Provas', date: '29/11/2026', status: 'futuro' },
    ],
    documents: [
      { id: 'doc-g1', title: 'Edital Geral do Vestibular nº 02/2026', type: 'edital', publishDate: '22/09/2026', fileSize: '2.5 MB', downloadUrl: '#' },
    ],
    courses: [
      { id: 'c-g1', name: 'Direito', shift: 'Matutino / Noturno', vacancies: 160, campus: 'Campus Central' },
      { id: 'c-g2', name: 'Engenharia Civil', shift: 'Integral', vacancies: 100, campus: 'Campus Central' },
      { id: 'c-g3', name: 'Administração', shift: 'Noturno', vacancies: 120, campus: 'Campus Sul' },
      { id: 'c-g4', name: 'Psicologia', shift: 'Matutino', vacancies: 80, campus: 'Campus Central' },
    ],
    contactEmail: 'vestibular@covest.institucional.br',
    featured: true,
    createdAt: '2026-09-22',
  },
];

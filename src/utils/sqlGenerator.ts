import { SelectiveProcess, NewsItem, SiteSettings, CandidateApplication, SqlConfig } from '../types';

function escapeSql(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? '1' : '0';
  const str = String(value);
  return `'${str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

export function generatePhpMyAdminSql(
  config: SqlConfig,
  settings: SiteSettings,
  newsList: NewsItem[],
  processes: SelectiveProcess[],
  applications: CandidateApplication[]
): string {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  return `-- ========================================================
-- BANCO DE DADOS: ${config.database}
-- SERVIDOR HOST: ${config.host}
-- USUÁRIO PHPMYADMIN: ${config.user}
-- GERADO EM: ${timestamp}
-- SISTEMA DA COMISSÃO ORGANIZADORA DO VESTIBULAR (COVEST)
-- Compatível com phpMyAdmin / MySQL 5.7+ / MariaDB 10.3+
-- ========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Criação ou uso do banco de dados
CREATE DATABASE IF NOT EXISTS \`${config.database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`${config.database}\`;

-- --------------------------------------------------------
-- Estrutura da tabela: configuracoes_site
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`configuracoes_site\`;
CREATE TABLE \`configuracoes_site\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`institution_name\` varchar(255) NOT NULL,
  \`commission_acronym\` varchar(50) NOT NULL,
  \`slogan\` text NOT NULL,
  \`contact_email\` varchar(150) NOT NULL,
  \`contact_phone\` varchar(100) NOT NULL,
  \`address\` text NOT NULL,
  \`operational_hours\` varchar(200) NOT NULL,
  \`alert_active\` tinyint(1) NOT NULL DEFAULT 1,
  \`alert_text\` text DEFAULT NULL,
  \`alert_type\` varchar(50) DEFAULT 'warning',
  \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`configuracoes_site\` (
  \`id\`, \`institution_name\`, \`commission_acronym\`, \`slogan\`, \`contact_email\`,
  \`contact_phone\`, \`address\`, \`operational_hours\`, \`alert_active\`, \`alert_text\`, \`alert_type\`
) VALUES (
  1,
  ${escapeSql(settings.institutionName)},
  ${escapeSql(settings.commissionAcronym)},
  ${escapeSql(settings.slogan)},
  ${escapeSql(settings.contactEmail)},
  ${escapeSql(settings.contactPhone)},
  ${escapeSql(settings.address)},
  ${escapeSql(settings.operationalHours)},
  ${escapeSql(settings.alertBanner.active)},
  ${escapeSql(settings.alertBanner.text)},
  ${escapeSql(settings.alertBanner.type)}
);

-- --------------------------------------------------------
-- Estrutura da tabela: administradores
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`administradores\`;
CREATE TABLE \`administradores\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`nome\` varchar(150) NOT NULL,
  \`email\` varchar(150) NOT NULL UNIQUE,
  \`senha_hash\` varchar(255) NOT NULL,
  \`cargo\` varchar(100) NOT NULL DEFAULT 'Administrador Geral',
  \`criado_em\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`administradores\` (\`nome\`, \`email\`, \`senha_hash\`, \`cargo\`) VALUES
('Administrador Geral COVEST', 'admin@vestibular.com', '$2y$10$abcdef1234567890dummyhashforadmin123', 'Administrador Geral'),
('Lucas Kauan', 'vestibulandolucaskauan@gmail.com', '$2y$10$abcdef1234567890dummyhashforadmin123', 'Coordenador do Sistema');

-- --------------------------------------------------------
-- Estrutura da tabela: noticias_slider
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`noticias_slider\`;
CREATE TABLE \`noticias_slider\` (
  \`id\` varchar(80) NOT NULL,
  \`titulo\` varchar(255) NOT NULL,
  \`subtitulo\` text NOT NULL,
  \`resumo\` text NOT NULL,
  \`conteudo\` longtext NOT NULL,
  \`imagem_url\` varchar(500) NOT NULL,
  \`data_publicacao\` varchar(50) NOT NULL,
  \`autor\` varchar(150) NOT NULL,
  \`categoria\` varchar(100) NOT NULL,
  \`destaque_slider\` tinyint(1) NOT NULL DEFAULT 1,
  \`ordem_slider\` int(11) NOT NULL DEFAULT 1,
  \`tempo_leitura\` varchar(50) DEFAULT '3 min de leitura',
  \`criado_em\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${
  newsList.length > 0
    ? `INSERT INTO \`noticias_slider\` (\`id\`, \`titulo\`, \`subtitulo\`, \`resumo\`, \`conteudo\`, \`imagem_url\`, \`data_publicacao\`, \`autor\`, \`categoria\`, \`destaque_slider\`, \`ordem_slider\`, \`tempo_leitura\`) VALUES\n` +
      newsList
        .map(
          (n) =>
            `(${escapeSql(n.id)}, ${escapeSql(n.title)}, ${escapeSql(n.subtitle)}, ${escapeSql(n.summary)}, ${escapeSql(n.content)}, ${escapeSql(n.image)}, ${escapeSql(n.publishDate)}, ${escapeSql(n.author)}, ${escapeSql(n.category)}, ${escapeSql(n.featuredInSlider)}, ${escapeSql(n.sliderOrder)}, ${escapeSql(n.readTime)})`
        )
        .join(',\n') +
      ';'
    : '-- Nenhuma notícia cadastrada no momento'
}

-- --------------------------------------------------------
-- Estrutura da tabela: processos_seletivos
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`processos_seletivos\`;
CREATE TABLE \`processos_seletivos\` (
  \`id\` varchar(80) NOT NULL,
  \`titulo\` varchar(255) NOT NULL,
  \`slug\` varchar(150) NOT NULL UNIQUE,
  \`categoria\` enum('vestibular','concurso','seletivo_ead','residencia') NOT NULL,
  \`status\` enum('inscricoes_abertas','em_andamento','encerrado','em_breve') NOT NULL,
  \`imagem_url\` varchar(500) NOT NULL,
  \`tag_destaque\` varchar(100) DEFAULT NULL,
  \`inscricao_inicio\` date NOT NULL,
  \`inscricao_fim\` date NOT NULL,
  \`data_prova\` date NOT NULL,
  \`taxa_inscricao\` decimal(10,2) NOT NULL DEFAULT 0.00,
  \`vagas_totais\` int(11) NOT NULL DEFAULT 0,
  \`resumo\` text NOT NULL,
  \`descricao\` longtext NOT NULL,
  \`email_contato\` varchar(150) NOT NULL,
  \`destaque\` tinyint(1) NOT NULL DEFAULT 1,
  \`criado_em\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${
  processes.length > 0
    ? `INSERT INTO \`processos_seletivos\` (\`id\`, \`titulo\`, \`slug\`, \`categoria\`, \`status\`, \`imagem_url\`, \`tag_destaque\`, \`inscricao_inicio\`, \`inscricao_fim\`, \`data_prova\`, \`taxa_inscricao\`, \`vagas_totais\`, \`resumo\`, \`descricao\`, \`email_contato\`, \`destaque\`) VALUES\n` +
      processes
        .map(
          (p) =>
            `(${escapeSql(p.id)}, ${escapeSql(p.title)}, ${escapeSql(p.slug)}, ${escapeSql(p.category)}, ${escapeSql(p.status)}, ${escapeSql(p.image)}, ${escapeSql(p.badgeTag)}, ${escapeSql(p.registrationStart)}, ${escapeSql(p.registrationEnd)}, ${escapeSql(p.examDate)}, ${p.fee.toFixed(2)}, ${p.vacancies}, ${escapeSql(p.summary)}, ${escapeSql(p.description)}, ${escapeSql(p.contactEmail)}, ${escapeSql(p.featured)})`
        )
        .join(',\n') +
      ';'
    : '-- Nenhum processo seletivo cadastrado'
}

-- --------------------------------------------------------
-- Estrutura da tabela: etapas_cronograma
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`etapas_cronograma\`;
CREATE TABLE \`etapas_cronograma\` (
  \`id\` varchar(80) NOT NULL,
  \`processo_id\` varchar(80) NOT NULL,
  \`titulo\` varchar(255) NOT NULL,
  \`data_etapa\` varchar(100) NOT NULL,
  \`status\` enum('concluido','atual','futuro') NOT NULL DEFAULT 'futuro',
  \`descricao\` text DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`fk_cronograma_processo\` (\`processo_id\`),
  CONSTRAINT \`fk_cronograma_processo\` FOREIGN KEY (\`processo_id\`) REFERENCES \`processos_seletivos\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${
  processes.flatMap(p => p.schedule.map(s => ({ ...s, processId: p.id }))).length > 0
    ? `INSERT INTO \`etapas_cronograma\` (\`id\`, \`processo_id\`, \`titulo\`, \`data_etapa\`, \`status\`, \`descricao\`) VALUES\n` +
      processes
        .flatMap(p => p.schedule.map(s => ({ ...s, processId: p.id })))
        .map(
          (s) =>
            `(${escapeSql(s.id)}, ${escapeSql(s.processId)}, ${escapeSql(s.title)}, ${escapeSql(s.date)}, ${escapeSql(s.status)}, ${escapeSql(s.description || '')})`
        )
        .join(',\n') +
      ';'
    : '-- Nenhum cronograma registrado'
}

-- --------------------------------------------------------
-- Estrutura da tabela: documentos_editais
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`documentos_editais\`;
CREATE TABLE \`documentos_editais\` (
  \`id\` varchar(80) NOT NULL,
  \`processo_id\` varchar(80) NOT NULL,
  \`titulo\` varchar(255) NOT NULL,
  \`tipo\` enum('edital','retificacao','gabarito','resultado','anexo') NOT NULL DEFAULT 'edital',
  \`data_publicacao\` varchar(50) NOT NULL,
  \`tamanho_arquivo\` varchar(50) DEFAULT '1.0 MB',
  \`url_download\` varchar(500) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`fk_documento_processo\` (\`processo_id\`),
  CONSTRAINT \`fk_documento_processo\` FOREIGN KEY (\`processo_id\`) REFERENCES \`processos_seletivos\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${
  processes.flatMap(p => p.documents.map(d => ({ ...d, processId: p.id }))).length > 0
    ? `INSERT INTO \`documentos_editais\` (\`id\`, \`processo_id\`, \`titulo\`, \`tipo\`, \`data_publicacao\`, \`tamanho_arquivo\`, \`url_download\`) VALUES\n` +
      processes
        .flatMap(p => p.documents.map(d => ({ ...d, processId: p.id })))
        .map(
          (d) =>
            `(${escapeSql(d.id)}, ${escapeSql(d.processId)}, ${escapeSql(d.title)}, ${escapeSql(d.type)}, ${escapeSql(d.publishDate)}, ${escapeSql(d.fileSize)}, ${escapeSql(d.downloadUrl)})`
        )
        .join(',\n') +
      ';'
    : '-- Nenhum documento registrado'
}

-- --------------------------------------------------------
-- Estrutura da tabela: cursos_vagas
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`cursos_vagas\`;
CREATE TABLE \`cursos_vagas\` (
  \`id\` varchar(80) NOT NULL,
  \`processo_id\` varchar(80) NOT NULL,
  \`nome_curso\` varchar(255) NOT NULL,
  \`turno\` varchar(50) NOT NULL,
  \`vagas\` int(11) NOT NULL DEFAULT 1,
  \`campus\` varchar(150) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`fk_curso_processo\` (\`processo_id\`),
  CONSTRAINT \`fk_curso_processo\` FOREIGN KEY (\`processo_id\`) REFERENCES \`processos_seletivos\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${
  processes.flatMap(p => (p.courses || []).map(c => ({ ...c, processId: p.id }))).length > 0
    ? `INSERT INTO \`cursos_vagas\` (\`id\`, \`processo_id\`, \`nome_curso\`, \`turno\`, \`vagas\`, \`campus\`) VALUES\n` +
      processes
        .flatMap(p => (p.courses || []).map(c => ({ ...c, processId: p.id })))
        .map(
          (c) =>
            `(${escapeSql(c.id)}, ${escapeSql(c.processId)}, ${escapeSql(c.name)}, ${escapeSql(c.shift)}, ${c.vacancies}, ${escapeSql(c.campus)})`
        )
        .join(',\n') +
      ';'
    : '-- Nenhum curso registrado'
}

-- --------------------------------------------------------
-- Estrutura da tabela: candidatos_inscricoes
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`candidatos_inscricoes\`;
CREATE TABLE \`candidatos_inscricoes\` (
  \`id\` varchar(80) NOT NULL,
  \`processo_id\` varchar(80) NOT NULL,
  \`processo_titulo\` varchar(255) NOT NULL,
  \`nome_candidato\` varchar(200) NOT NULL,
  \`cpf\` varchar(20) NOT NULL,
  \`email\` varchar(150) NOT NULL,
  \`telefone\` varchar(50) NOT NULL,
  \`opcao_curso\` varchar(200) NOT NULL,
  \`status\` varchar(80) NOT NULL DEFAULT 'Inscrição Confirmada',
  \`numero_protocolo\` varchar(50) NOT NULL UNIQUE,
  \`data_inscricao\` varchar(50) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`fk_candidato_processo\` (\`processo_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${
  applications.length > 0
    ? `INSERT INTO \`candidatos_inscricoes\` (\`id\`, \`processo_id\`, \`processo_titulo\`, \`nome_candidato\`, \`cpf\`, \`email\`, \`telefone\`, \`opcao_curso\`, \`status\`, \`numero_protocolo\`, \`data_inscricao\`) VALUES\n` +
      applications
        .map(
          (a) =>
            `(${escapeSql(a.id)}, ${escapeSql(a.processId)}, ${escapeSql(a.processTitle)}, ${escapeSql(a.candidateName)}, ${escapeSql(a.cpf)}, ${escapeSql(a.email)}, ${escapeSql(a.phone)}, ${escapeSql(a.chosenCourse)}, ${escapeSql(a.status)}, ${escapeSql(a.protocolNumber)}, ${escapeSql(a.registrationDate)})`
        )
        .join(',\n') +
      ';'
    : `-- Registros de exemplo para tabela de candidatos
INSERT INTO \`candidatos_inscricoes\` (\`id\`, \`processo_id\`, \`processo_titulo\`, \`nome_candidato\`, \`cpf\`, \`email\`, \`telefone\`, \`opcao_curso\`, \`status\`, \`numero_protocolo\`, \`data_inscricao\`) VALUES
('insc-001', 'proc-med-2026', 'Vestibular de Medicina 2026/1 - Edital nº 01/2026', 'Mariana Alencar Silva', '123.456.789-00', 'mariana.alencar@email.com', '(81) 99876-5432', 'Medicina - Integral', 'Inscrição Confirmada', 'MED2026-98124', '22/09/2026 14:32'),
('insc-002', 'proc-concurso-docente-2026', 'Concurso Público para Professor Efetivo e Técnicos - Edital nº 04/2026', 'Dr. Roberto Vasconcelos', '987.654.321-11', 'roberto.vasconcelos@email.com', '(81) 98111-2233', 'Professor Adjunto - Ciência da Computação', 'Aguardando Pagamento', 'DOC2026-44321', '23/09/2026 09:15');`
}

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
`;
}

export function downloadSqlFile(content: string, filename = 'if0_42366022_sistema.sql'): void {
  const blob = new Blob([content], { type: 'text/sql;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

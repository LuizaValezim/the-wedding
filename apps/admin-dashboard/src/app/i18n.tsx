'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Lang = 'en' | 'pt-BR';

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const translations: Record<Lang, Record<string, string>> = {
  en: {
    'menu.overview': 'Overview',
    'menu.guests': 'Guests',
    'menu.budget': 'Budget',
    'menu.tables': 'Tables',
    'menu.venues': 'Venues',
    'menu.suppliers': 'Suppliers',
    'menu.tasks': 'Checklist',
    'menu.inspirations': 'Inspirations',
    'menu.honeymoon': 'Honeymoon',

    'common.logout': 'Logout',
    'common.settings': 'Settings',
    'common.add': 'Add',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.actions': 'Actions',
    'common.status': 'Status',
    'common.notes': 'Notes',
    'common.search': 'Search',
    'layout.planning_dashboard': 'Planning Dashboard',
    'layout.account': 'Account',
    'layout.manage_details': 'Manage your wedding details',

    'dashboard.title': "Bride and Groom's Dashboard",
    'dashboard.public_site': 'View Public Site',
    'dashboard.overview': 'Overview',
    'dashboard.quick_actions': 'Quick Actions',
    'dashboard.recent_guests': 'Recent Guests',
    'dashboard.manage_guests': 'Manage Guests',
    'dashboard.budget_planning': 'Budget Planning',
    'dashboard.quick_guests_body': 'Add & track guests',
    'dashboard.quick_budget_body': 'Track expenses',
    'dashboard.quick_honeymoon_body': 'Manage donations',
    'dashboard.see_tasks': 'See Checklist',
    'dashboard.honeymoon_fund': 'Honeymoon Fund',
    'dashboard.total_budget': 'Total Budget',
    'dashboard.total_guests': 'Total Guests',
    'dashboard.rsvp_status': 'RSVP Status',
    'dashboard.honeymoon': 'Honeymoon Fund',
    'dashboard.recent_table.name': 'Name',
    'dashboard.recent_table.email': 'Email',
    'dashboard.recent_table.status': 'Status',
    'dashboard.recent_table.plus_ones': 'Plus Ones',
    'dashboard.empty_title': 'Welcome to Your Wedding Dashboard',
    'dashboard.empty_body': 'Start planning your wedding by adding guests, managing your budget, and organizing your honeymoon fund.',
    'dashboard.empty_cta': 'Add Your First Guest',

    'guests.title': 'Guest Management',
    'guests.subtitle': 'Manage RSVPs and seating arrangements',

    'budget.title': 'Budget Planning',
    'budget.subtitle': 'Track your wedding expenses and budget',
    'budget.total_wedding_budget': 'Total Wedding Budget',
    'budget.budget_usage': 'Budget Usage',
    'budget.over_budget': 'Over budget by {amount}',
    'budget.remaining': '{amount} remaining',
    'budget.total_estimated': 'Total Estimated',
    'budget.total_spent': 'Total Spent',
    'budget.add_item': 'Add Budget Item',
    'budget.table.category': 'Category',
    'budget.table.description': 'Description',
    'budget.table.estimated': 'Estimated',
    'budget.table.actual': 'Actual',
    'budget.table.difference': 'Difference',
    'budget.table.status': 'Status',
    'budget.table.actions': 'Actions',
    'budget.table.editing': 'Editing...',

    'tasks.title': 'Wedding Tasks',
    'tasks.subtitle': 'Keep track of all wedding planning tasks',
    'tasks.add_task': 'Add Task',
    'tasks.edit_task': 'Edit Task',

    'venues.title': 'Venue Management',
    'venues.subtitle': 'Compare and manage potential wedding venues',
    'venues.add_venue': 'Add Venue',
    'venues.no_venues': 'No Venues Added Yet',
    'venues.no_venues_body': 'Start adding venues to compare and track your options',

    'honeymoon.title': 'Honeymoon Fund',
    'honeymoon.subtitle': 'Track contributions and gift items for your honeymoon',

    'suppliers.title': 'Suppliers',
    'suppliers.subtitle': 'Manage all wedding suppliers and vendors',

    'inspirations.title': 'Inspirations',
    'inspirations.subtitle': 'Collect ideas for decor, style, and more',
    'inspirations.page_title': 'Wedding Inspirations',
    'inspirations.card_title': 'Wedding Inspiration',
    'inspirations.card_body': 'Create a mood board and save inspiration images for decorations, themes, and design ideas.',
    'inspirations.add': 'Add Inspiration',
    'inspirations.empty_title': 'No Inspiration Added Yet',
    'inspirations.empty_body': 'Start saving images and ideas to build your wedding vision',

    'tables.title': 'Seating Tables',
    'suppliers.page_title': 'Suppliers & Vendors',
    'suppliers.card_title': 'Suppliers & Vendors',
    'suppliers.card_body': 'Manage your wedding vendors and suppliers here. Add venues, caterers, florists, photographers, and more.',
    'suppliers.add': 'Add Supplier',
    'suppliers.empty_title': 'No Suppliers Added Yet',
    'suppliers.empty_body': 'Start adding vendors to organize your wedding team',
    'suppliers.page_subtitle': 'Manage your wedding vendors and suppliers',

    'honeymoon.page_title': 'Honeymoon Fund',
    'honeymoon.page_subtitle': 'Manage your honeymoon fund and donations',
    'honeymoon.activities_title': 'Destination Activities',
    'honeymoon.activities_body': 'Plan and track honeymoon activities and attractions at your destination.',
    'honeymoon.activities_add': 'Add Activity',
    'honeymoon.fund_title': 'Fund Progress',
    'honeymoon.fund_body': 'View contributions toward your honeymoon fund and track progress.',
    'honeymoon.fund_cta': 'View Donations',
  },
  'pt-BR': {
    'menu.overview': 'Visão Geral',
    'menu.guests': 'Convidados',
    'menu.budget': 'Orçamento',
    'menu.tables': 'Mesas',
    'menu.venues': 'Locais',
    'menu.suppliers': 'Fornecedores',
    'menu.tasks': 'Checklist',
    'menu.inspirations': 'Inspirações',
    'menu.honeymoon': 'Lua de Mel',

    'common.logout': 'Sair',
    'common.settings': 'Configurações',
    'common.add': 'Adicionar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.actions': 'Ações',
    'common.status': 'Status',
    'common.notes': 'Observações',
    'common.search': 'Buscar',
    'layout.planning_dashboard': 'Painel de Planejamento',
    'layout.account': 'Conta',
    'layout.manage_details': 'Gerencie os detalhes do casamento',

    'dashboard.title': 'Painel dos Noivos',
    'dashboard.public_site': 'Ver Site Público',
    'dashboard.overview': 'Visão Geral',
    'dashboard.quick_actions': 'Ações Rápidas',
    'dashboard.recent_guests': 'Convidados Recentes',
    'dashboard.manage_guests': 'Gerenciar Convidados',
    'dashboard.budget_planning': 'Planejamento do Orçamento',
    'dashboard.quick_guests_body': 'Adicionar e acompanhar convidados',
    'dashboard.quick_budget_body': 'Acompanhar despesas',
    'dashboard.quick_honeymoon_body': 'Gerenciar doações',
    'dashboard.see_tasks': 'Ver Checklist',
    'dashboard.honeymoon_fund': 'Fundo de Lua de Mel',
    'dashboard.total_budget': 'Orçamento Total',
    'dashboard.total_guests': 'Total de Convidados',
    'dashboard.rsvp_status': 'Status de RSVP',
    'dashboard.honeymoon': 'Fundo de Lua de Mel',
    'dashboard.recent_table.name': 'Nome',
    'dashboard.recent_table.email': 'Email',
    'dashboard.recent_table.status': 'Status',
    'dashboard.recent_table.plus_ones': 'Acompanhantes',
    'dashboard.empty_title': 'Bem-vindo ao Painel do Casamento',
    'dashboard.empty_body': 'Comece a planejar adicionando convidados, gerenciando o orçamento e organizando o fundo de lua de mel.',
    'dashboard.empty_cta': 'Adicionar Primeiro Convidado',

    'guests.title': 'Gestão de Convidados',
    'guests.subtitle': 'Gerencie RSVPs e organização das mesas',

    'budget.title': 'Planejamento do Orçamento',
    'budget.subtitle': 'Acompanhe despesas e orçamento do casamento',
    'budget.total_wedding_budget': 'Orçamento Total do Casamento',
    'budget.budget_usage': 'Uso do Orçamento',
    'budget.over_budget': 'Acima do orçamento em {amount}',
    'budget.remaining': '{amount} restante',
    'budget.total_estimated': 'Total Estimado',
    'budget.total_spent': 'Total Gasto',
    'budget.add_item': 'Adicionar Item de Orçamento',
    'budget.table.category': 'Categoria',
    'budget.table.description': 'Descrição',
    'budget.table.estimated': 'Estimado',
    'budget.table.actual': 'Real',
    'budget.table.difference': 'Diferença',
    'budget.table.status': 'Status',
    'budget.table.actions': 'Ações',
    'budget.table.editing': 'Editando...',

    'tasks.title': 'Tarefas do Casamento',
    'tasks.subtitle': 'Acompanhe todas as tarefas do planejamento',
    'tasks.add_task': 'Adicionar Tarefa',
    'tasks.edit_task': 'Editar Tarefa',

    'venues.title': 'Gestão de Locais',
    'venues.subtitle': 'Compare e gerencie possíveis locais de casamento',
    'venues.add_venue': 'Adicionar Local',
    'venues.no_venues': 'Nenhum local adicionado',
    'venues.no_venues_body': 'Comece adicionando locais para comparar e acompanhar',

    'honeymoon.title': 'Fundo de Lua de Mel',
    'honeymoon.subtitle': 'Acompanhe contribuições e itens da lua de mel',

    'suppliers.title': 'Fornecedores',
    'suppliers.subtitle': 'Gerencie fornecedores e prestadores',

    'inspirations.title': 'Inspirações',
    'inspirations.subtitle': 'Reúna ideias de decoração, estilo e mais',
    'inspirations.page_title': 'Inspirações do Casamento',
    'inspirations.card_title': 'Inspiração do Casamento',
    'inspirations.card_body': 'Crie um mood board e salve imagens de inspiração para decoração, temas e design.',
    'inspirations.add': 'Adicionar Inspiração',
    'inspirations.empty_title': 'Nenhuma inspiração adicionada',
    'inspirations.empty_body': 'Comece a salvar imagens e ideias para construir sua visão do casamento',

    'tables.title': 'Mesas de Lugares',
    'suppliers.page_title': 'Fornecedores e Prestadores',
    'suppliers.card_title': 'Fornecedores e Prestadores',
    'suppliers.card_body': 'Gerencie fornecedores do casamento aqui. Adicione locais, buffet, floristas, fotógrafos e mais.',
    'suppliers.add': 'Adicionar Fornecedor',
    'suppliers.empty_title': 'Nenhum fornecedor adicionado',
    'suppliers.empty_body': 'Comece a adicionar fornecedores para organizar sua equipe',
    'suppliers.page_subtitle': 'Gerencie fornecedores e prestadores',

    'honeymoon.page_title': 'Fundo de Lua de Mel',
    'honeymoon.page_subtitle': 'Gerencie o fundo e as doações',
    'honeymoon.activities_title': 'Atividades no Destino',
    'honeymoon.activities_body': 'Planeje e acompanhe atividades e atrações do destino.',
    'honeymoon.activities_add': 'Adicionar Atividade',
    'honeymoon.fund_title': 'Progresso do Fundo',
    'honeymoon.fund_body': 'Veja contribuições para o fundo de lua de mel e acompanhe o progresso.',
    'honeymoon.fund_cta': 'Ver Doações',
  },
};

const I18nContext = createContext<I18nContextValue | null>(null);

const interpolate = (template: string, vars?: Record<string, string | number>) => {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('weddingLang') : null;
    if (saved === 'en' || saved === 'pt-BR') {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingLang', lang);
    }
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string, vars?: Record<string, string | number>) => {
      const dict = translations[lang] ?? translations.en;
      const template = dict[key] ?? translations.en[key] ?? key;
      return interpolate(template, vars);
    };

    return {
      lang,
      setLang,
      toggleLang: () => setLang(lang === 'en' ? 'pt-BR' : 'en'),
      t,
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within LanguageProvider');
  }
  return ctx;
}

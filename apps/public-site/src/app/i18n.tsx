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
    'nav.home': 'Home',
    'nav.our_story': 'Our Story',
    'nav.details': 'Details',
    'nav.rsvp': 'RSVP',
    'nav.admin': 'Admin',
    'nav.admin_title': 'Bride and Groom only',

    'hero.date': 'June 12th, 2027',
    'hero.slogan.line1': "It's not going to be a wedding,",
    'hero.slogan.line2': "it's going to be The Wedding",

    'cta.rsvp': 'RSVP',
    'cta.honeymoon': 'Honeymoon Fund',

    'countdown.days_until': 'Days until',
    'countdown.location': 'Location',
    'countdown.time': 'Time',
    'countdown.status': 'Status',
    'countdown.status_value': 'Coming Soon',
    'countdown.today': "It's today!",

    'section.expect': 'What To Expect',
    'card.ceremony.title': 'Ceremony',
    'card.ceremony.body':
      'Join us for an intimate ceremony celebrating our love, followed by an elegant reception with good food, music, and dancing.',
    'card.celebration.title': 'Celebration',
    'card.celebration.body':
      'A beautiful evening of celebration with family and friends. Expect good vibes, great food, and unforgettable moments.',
    'card.honeymoon.title': 'Honeymoon',
    'card.honeymoon.body':
      'Help us create unforgettable memories on our dream honeymoon. Every contribution brings us closer to paradise.',

    'section.honeymoon.title': 'Our Honeymoon',
    'section.honeymoon.body':
      "Instead of a traditional registry, we're putting together a honeymoon fund. Help us create the memories of a lifetime by contributing to specific experiences we want to share.",
    'section.honeymoon.cta': 'Browse Honeymoon Items',
    'section.honeymoon.destination.label': 'Dream Destination',
    'section.honeymoon.destination.value': 'Italy',
    'section.honeymoon.destination.body':
      'A romantic journey through Tuscany, Venice, and the Amalfi Coast filled with love, culture, and unforgettable moments.',

    'section.join.title': 'Please Join Us',
    'section.join.body':
      'Your presence is the greatest gift. Please join us for an unforgettable celebration of love.',
    'section.join.cta': 'RSVP Now',

    'footer.title': 'The Wedding',
    'footer.subtitle': 'Luiza & Raphael • June 12th, 2027 • São Paulo, Brazil',
    'footer.love': 'With love',

    'details.title': 'Wedding Details',
    'details.ceremony_reception': 'Ceremony & Reception',
    'details.location': 'Location',
    'details.date': 'Date',
    'details.schedule': 'Schedule',
    'details.schedule_value': 'Ceremony at 4:00 PM, reception to follow',
    'details.dress_code': 'Dress Code',
    'details.rsvp.title': 'RSVP Information',
    'details.rsvp.body':
      'We would love for you to celebrate with us! Please confirm your attendance at your earliest convenience.',
    'details.rsvp.cta': 'RSVP Now',
    'details.back': '← Back to Home',

    'story.title': 'Our Love Story',
    'story.intro':
      'Once upon a time, two souls found each other in the most unexpected way. What started as a chance meeting has blossomed into the greatest adventure of our lives.',
    'story.met.title': '💫 How We Met',
    'story.met.body':
      'Our story began in a moment that felt like destiny. Through mutual friends and shared interests, we were introduced to each other. From the very first conversation, there was an undeniable spark.',
    'story.love.title': '❤️ Falling in Love',
    'story.love.body':
      "As days turned into weeks and weeks into months, our connection deepened. We discovered that we were each other's missing puzzle piece. Every moment together felt magical, and every challenge we faced only made us stronger.",
    'story.proposal.title': '💍 The Proposal',
    'story.proposal.body':
      'When the moment came to ask the most important question of our lives, it was perfect because it was us. A simple, heartfelt moment that confirmed what we already knew—we were meant to be together forever.',
    'story.photos.title': '📸 Moments Along the Way',
    'story.photos.placeholder': 'Photo Placeholder',
    'story.outro':
      'Now, as we prepare to say "I do," we invite you to be part of our journey. Thank you for being there for us, and we can\'t wait to celebrate our love with everyone who means the most to us.',
    'story.back': '← Back to Home',

    'rsvp.title': 'RSVP to Our Wedding',
    'rsvp.subtitle': "We can't wait to celebrate with you!",
    'rsvp.name': 'Full Name *',
    'rsvp.email': 'Email *',
    'rsvp.attending': 'Will You Be Attending? *',
    'rsvp.attending_yes': "Yes, I'll Be There! 🎉",
    'rsvp.attending_no': "Sorry, I Can't Make It 😢",
    'rsvp.plus_ones': 'Plus Ones',
    'rsvp.dietary': 'Dietary Restrictions',
    'rsvp.dietary.placeholder': 'e.g. vegetarian, vegan, allergies...',
    'rsvp.submit': 'Submit RSVP',
    'rsvp.submitting': 'Submitting...',
    'rsvp.back': '← Back to Home',

    'rsvp.success': '✅ RSVP submitted successfully! See you at the wedding!',
    'rsvp.error': '❌ Error: {message}',
    'rsvp.error_generic': '❌ Failed to submit RSVP. Please try again.',

    'honeymoon.title': 'Honeymoon Fund',
    'honeymoon.subtitle': 'Help us create unforgettable memories on our dream honeymoon in Italy',
    'honeymoon.progress': 'Overall Progress',
    'honeymoon.funded': '{percent}% funded',
    'honeymoon.contributed': '{amount} contributed',
    'honeymoon.contribute': 'Contribute',
    'honeymoon.back': '← Back to Home',

    'contribute.title': 'Make a Contribution',
    'contribute.subtitle': 'Help us create unforgettable memories in Italy',
    'contribute.amount': 'Contribution Amount *',
    'contribute.email': 'Your Email *',
    'contribute.payment': 'Payment Method *',
    'contribute.payment_stripe': 'Credit/Debit Card (Stripe)',
    'contribute.payment_pix': 'Pix / Brazilian Cards (Mercado Pago)',
    'contribute.anonymous': 'Make this contribution anonymous',
    'contribute.message': 'Message (Optional)',
    'contribute.message.placeholder': 'Leave a message for the couple...',
    'contribute.processing': 'Processing...',
    'contribute.cta': 'Contribute {amount}',
    'contribute.back': '← Back to Honeymoon Fund',

    'admin.title': 'Bride & Groom Login',
    'admin.subtitle': 'Enter the access code to open the admin dashboard.',
    'admin.code': 'Access Code',
    'admin.placeholder': 'Enter code',
    'admin.continue': 'Continue to Dashboard',
    'admin.back': '← Back to Home',
    'admin.error_config': 'Admin access code is not configured.',
    'admin.error_invalid': 'Incorrect access code.',

    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Moments that mean everything to us',
    'gallery.memory': 'Memory {index}',
    'gallery.description': 'Our special moments',
    'gallery.back': '← Back to Home',
  },
  'pt-BR': {
    'nav.home': 'Início',
    'nav.our_story': 'Nossa História',
    'nav.details': 'Detalhes',
    'nav.rsvp': 'RSVP',
    'nav.admin': 'Admin',
    'nav.admin_title': 'Apenas noiva e noivo',

    'hero.date': '12 de junho de 2027',
    'hero.slogan.line1': 'Não vai ser um casamento,',
    'hero.slogan.line2': 'vai ser O Casamento',

    'cta.rsvp': 'RSVP',
    'cta.honeymoon': 'Fundo da Lua de Mel',

    'countdown.days_until': 'Faltam',
    'countdown.location': 'Local',
    'countdown.time': 'Horário',
    'countdown.status': 'Status',
    'countdown.status_value': 'Em breve',
    'countdown.today': 'É hoje!',

    'section.expect': 'O Que Esperar',
    'card.ceremony.title': 'Cerimônia',
    'card.ceremony.body':
      'Junte-se a nós para uma cerimônia íntima celebrando nosso amor, seguida de uma recepção elegante com boa comida, música e dança.',
    'card.celebration.title': 'Celebração',
    'card.celebration.body':
      'Uma linda noite de celebração com família e amigos. Espere boas vibrações, ótima comida e momentos inesquecíveis.',
    'card.honeymoon.title': 'Lua de Mel',
    'card.honeymoon.body':
      'Ajude-nos a criar memórias inesquecíveis na nossa lua de mel dos sonhos. Cada contribuição nos aproxima do paraíso.',

    'section.honeymoon.title': 'Nossa Lua de Mel',
    'section.honeymoon.body':
      'Em vez de uma lista tradicional, criamos um fundo para a lua de mel. Ajude-nos a criar memórias para a vida toda contribuindo com experiências que queremos viver juntos.',
    'section.honeymoon.cta': 'Ver Itens da Lua de Mel',
    'section.honeymoon.destination.label': 'Destino dos Sonhos',
    'section.honeymoon.destination.value': 'Itália',
    'section.honeymoon.destination.body':
      'Uma viagem romântica pela Toscana, Veneza e Costa Amalfitana, cheia de amor, cultura e momentos inesquecíveis.',

    'section.join.title': 'Venha Celebrar',
    'section.join.body':
      'Sua presença é o maior presente. Junte-se a nós para uma celebração inesquecível do amor.',
    'section.join.cta': 'Confirmar Presença',

    'footer.title': 'O Casamento',
    'footer.subtitle': 'Luiza & Raphael • 12 de junho de 2027 • São Paulo, Brasil',
    'footer.love': 'Com amor',

    'details.title': 'Detalhes do Casamento',
    'details.ceremony_reception': 'Cerimônia e Recepção',
    'details.location': 'Local',
    'details.date': 'Data',
    'details.schedule': 'Programação',
    'details.schedule_value': 'Cerimônia às 16:00, recepção em seguida',
    'details.dress_code': 'Traje',
    'details.rsvp.title': 'Informações de RSVP',
    'details.rsvp.body':
      'Adoraríamos celebrar com você! Confirme sua presença o quanto antes.',
    'details.rsvp.cta': 'Confirmar Presença',
    'details.back': '← Voltar para o início',

    'story.title': 'Nossa História de Amor',
    'story.intro':
      'Era uma vez, duas almas que se encontraram da forma mais inesperada. O que começou como um encontro casual floresceu na maior aventura das nossas vidas.',
    'story.met.title': '💫 Como nos Conhecemos',
    'story.met.body':
      'Nossa história começou em um momento que parecia destino. Por meio de amigos em comum e interesses compartilhados, fomos apresentados. Desde a primeira conversa, houve uma conexão inegável.',
    'story.love.title': '❤️ Apaixonando-se',
    'story.love.body':
      'Conforme os dias viraram semanas e as semanas viraram meses, nossa conexão se aprofundou. Descobrimos que éramos a peça que faltava um no outro. Cada momento juntos era mágico, e cada desafio nos fortaleceu.',
    'story.proposal.title': '💍 O Pedido',
    'story.proposal.body':
      'Quando chegou o momento de fazer a pergunta mais importante das nossas vidas, foi perfeito porque era a nossa cara. Um momento simples e sincero que confirmou o que já sabíamos: fomos feitos um para o outro.',
    'story.photos.title': '📸 Momentos Pelo Caminho',
    'story.photos.placeholder': 'Espaço para foto',
    'story.outro':
      'Agora, enquanto nos preparamos para dizer “sim”, convidamos você a fazer parte da nossa jornada. Obrigado por estar conosco; mal podemos esperar para celebrar nosso amor com todos que são especiais para nós.',
    'story.back': '← Voltar para o início',

    'rsvp.title': 'Confirme sua Presença',
    'rsvp.subtitle': 'Mal podemos esperar para celebrar com você!',
    'rsvp.name': 'Nome completo *',
    'rsvp.email': 'Email *',
    'rsvp.attending': 'Você vai comparecer? *',
    'rsvp.attending_yes': 'Sim, estarei lá! 🎉',
    'rsvp.attending_no': 'Infelizmente não poderei ir 😢',
    'rsvp.plus_ones': 'Acompanhantes',
    'rsvp.dietary': 'Restrições alimentares',
    'rsvp.dietary.placeholder': 'ex.: vegetariano, vegano, alergias...',
    'rsvp.submit': 'Enviar RSVP',
    'rsvp.submitting': 'Enviando...',
    'rsvp.back': '← Voltar para o início',

    'rsvp.success': '✅ RSVP enviado com sucesso! Nos vemos no casamento!',
    'rsvp.error': '❌ Erro: {message}',
    'rsvp.error_generic': '❌ Falha ao enviar RSVP. Tente novamente.',

    'honeymoon.title': 'Fundo da Lua de Mel',
    'honeymoon.subtitle': 'Ajude-nos a criar memórias inesquecíveis na nossa lua de mel na Itália',
    'honeymoon.progress': 'Progresso geral',
    'honeymoon.funded': '{percent}% arrecadado',
    'honeymoon.contributed': '{amount} contribuído',
    'honeymoon.contribute': 'Contribuir',
    'honeymoon.back': '← Voltar para o início',

    'contribute.title': 'Fazer Contribuição',
    'contribute.subtitle': 'Ajude-nos a criar memórias inesquecíveis na Itália',
    'contribute.amount': 'Valor da contribuição *',
    'contribute.email': 'Seu email *',
    'contribute.payment': 'Forma de pagamento *',
    'contribute.payment_stripe': 'Cartão de crédito/débito (Stripe)',
    'contribute.payment_pix': 'Pix / Cartões brasileiros (Mercado Pago)',
    'contribute.anonymous': 'Tornar contribuição anônima',
    'contribute.message': 'Mensagem (opcional)',
    'contribute.message.placeholder': 'Deixe uma mensagem para o casal...',
    'contribute.processing': 'Processando...',
    'contribute.cta': 'Contribuir {amount}',
    'contribute.back': '← Voltar para o fundo de lua de mel',

    'admin.title': 'Login dos Noivos',
    'admin.subtitle': 'Informe o código de acesso para abrir o painel.',
    'admin.code': 'Código de acesso',
    'admin.placeholder': 'Digite o código',
    'admin.continue': 'Continuar para o painel',
    'admin.back': '← Voltar para o início',
    'admin.error_config': 'Código de acesso não configurado.',
    'admin.error_invalid': 'Código incorreto.',

    'gallery.title': 'Galeria de Fotos',
    'gallery.subtitle': 'Momentos que significam tudo para nós',
    'gallery.memory': 'Memória {index}',
    'gallery.description': 'Nossos momentos especiais',
    'gallery.back': '← Voltar para o início',
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

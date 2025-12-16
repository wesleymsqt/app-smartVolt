export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const carouselFeatures: Feature[] = [
  {
    id: '1',
    title: 'Controle Total',
    description: 'Ligue e desligue seus aparelhos de qualquer lugar pelo celular.',
  },
  {
    id: '2',
    title: 'Economia de Energia',
    description: 'Monitore o consumo em tempo real e defina metas para não estourar a conta.',
  },
  {
    id: '3',
    title: 'Rotinas Inteligentes',
    description: 'Programe horários para seus aparelhos funcionarem automaticamente.',
  },
];

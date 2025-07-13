import { Animal, AnimalCategory, ConservationStatus } from '../types/Animal';

export const animalsData: Animal[] = [
  {
    id: 'lion-001',
    name: 'Lion d\'Afrique',
    title: 'ROI',
    topic: 'SAUVAGE',
    author: 'WILDLIFE PHOTOGRAPHER',
    description: 'Le lion, roi incontesté de la savane africaine, incarne la puissance et la majesté. Avec sa crinière dorée flottant au vent et son rugissement qui porte à des kilomètres, il règne sur son territoire avec une autorité naturelle.',
    image: '/images/Lion.jpg',
    category: AnimalCategory.MAMMAL,
    habitat: 'Savane, prairies, forêts clairsemées',
    conservation_status: ConservationStatus.VULNERABLE,
    facts: [
      'Un rugissement de lion peut être entendu à 8 kilomètres de distance',
      'Les lions dorment 16 à 20 heures par jour',
      'Seuls les mâles développent une crinière',
      'Les lionnes chassent en groupe avec une stratégie coordonnée',
      'Un lion peut sauter 3 mètres de haut et 11 mètres de long'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Kenya', 'Tanzanie', 'Afrique du Sud', 'Botswana', 'Zimbabwe'],
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    weight: '120-250 kg',
    height: '1.2 mètres au garrot',
    lifespan: '10-14 ans (sauvage), 20 ans (captivité)',
    diet: 'Carnivore - zèbres, gnous, buffles, antilopes',
    social_behavior: 'Groupes familiaux (fierté) dirigés par un mâle dominant',
    threats: ['Perte d\'habitat', 'Conflit homme-lion', 'Braconnage', 'Diminution des proies'],
    gallery: ['/images/Lion.jpg', '/images/lion-2.jpg', '/images/lion-3.jpg']
  },
  {
    id: 'elephant-001',
    name: 'Éléphant d\'Afrique',
    title: 'GÉANT',
    topic: 'SAGE',
    author: 'CONSERVATION EXPERT',
    description: 'L\'éléphant d\'Afrique, colosse aux oreilles en forme de continent, traverse la savane avec une grâce surprenante. Sa mémoire légendaire et son intelligence remarquable en font l\'un des animaux les plus respectés du règne animal.',
    image: '/images/Elephant.jpg',
    category: AnimalCategory.MAMMAL,
    habitat: 'Savane, forêts, déserts, marécages',
    conservation_status: ConservationStatus.ENDANGERED,
    facts: [
      'Un éléphant peut consommer jusqu\'à 300 kg de végétation par jour',
      'Leur trompe contient plus de 40 000 muscles',
      'Ils peuvent détecter les vibrations sismiques avec leurs pieds',
      'Les éléphants pleurent leurs morts et ont des rituels funéraires',
      'Leur mémoire peut s\'étendre sur plusieurs décennies'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Botswana', 'Zimbabwe', 'Tanzanie', 'Kenya', 'Namibie'],
      coordinates: { lat: -20.0, lng: 25.0 }
    },
    weight: '4000-7000 kg',
    height: '3-4 mètres',
    lifespan: '60-70 ans',
    diet: 'Herbivore - herbes, fruits, écorces, racines',
    social_behavior: 'Matriarcal, groupes familiaux dirigés par la femelle la plus âgée',
    threats: ['Braconnage pour l\'ivoire', 'Perte d\'habitat', 'Conflit homme-éléphant', 'Sécheresse'],
    gallery: ['/images/Elephant.jpg', '/images/elephant-2.jpg', '/images/elephant-3.jpg']
  },
  {
    id: 'tiger-001',
    name: 'Tigre du Bengale',
    title: 'CHASSEUR',
    topic: 'RAYÉ',
    author: 'WILD LIFE EXPERT',
    description: 'Le tigre, prédateur solitaire aux rayures uniques, chasse avec une précision redoutable dans les jungles d\'Asie. Sa beauté sauvage et sa puissance en font l\'un des félins les plus admirés au monde. Chaque tigre a un motif de rayures unique.',
    image: '/images/tigre.png',
    category: AnimalCategory.MAMMAL,
    habitat: 'Forêts tropicales, mangroves, prairies',
    conservation_status: ConservationStatus.ENDANGERED,
    facts: [
      'Les rayures d\'un tigre sont uniques comme les empreintes digitales',
      'Un tigre peut bondir horizontalement sur 10 mètres',
      'Ils sont d\'excellents nageurs, contrairement aux autres félins',
      'Un tigre peut consommer jusqu\'à 25 kg de viande en une seule fois',
      'Leur vision nocturne est 6 fois meilleure que celle des humains'
    ],
    location: {
      continent: 'Asie',
      countries: ['Inde', 'Bangladesh', 'Népal', 'Bhoutan', 'Myanmar'],
      coordinates: { lat: 20.5937, lng: 78.9629 }
    },
    weight: '140-300 kg',
    height: '1 mètre au garrot',
    lifespan: '10-15 ans (sauvage), 20-25 ans (captivité)',
    diet: 'Carnivore - cerfs, sangliers, buffles d\'eau',
    social_behavior: 'Solitaire, territoires marqués par l\'urine et les griffures',
    threats: ['Braconnage', 'Perte d\'habitat', 'Conflit homme-tigre', 'Diminution des proies'],
    gallery: ['/images/tigre.png', '/images/tiger-2.jpg', '/images/tiger-3.jpg']
  },
  {
    id: 'giraffe-001',
    name: 'Girafe Masaï',
    title: 'ÉLÉGANCE',
    topic: 'MAJESTUEUSE',
    author: 'SAFARI GUIDE',
    description: 'La girafe, avec son cou élancé et ses taches distinctives, domine la canopée africaine. Sa grâce naturelle et sa hauteur impressionnante lui permettent d\'atteindre les feuilles les plus hautes. Son cœur pèse 11 kg pour pomper le sang jusqu\'à sa tête.',
    image: '/images/Girafe.png',
    category: AnimalCategory.MAMMAL,
    habitat: 'Savane, prairies, forêts d\'acacias',
    conservation_status: ConservationStatus.VULNERABLE,
    facts: [
      'Une girafe peut mesurer jusqu\'à 6 mètres de haut',
      'Sa langue peut mesurer 50 cm de long et est de couleur bleue-noire',
      'Elle peut courir à 60 km/h sur de courtes distances',
      'Les girafes dorment seulement 30 minutes à 2 heures par jour',
      'Elles peuvent passer des semaines sans boire d\'eau'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Kenya', 'Tanzanie', 'Ouganda', 'Rwanda', 'Burundi'],
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    weight: '800-1200 kg',
    height: '4.5-6 mètres',
    lifespan: '20-25 ans',
    diet: 'Herbivore - principalement feuilles d\'acacia',
    social_behavior: 'Groupes lâches, hiérarchie basée sur la taille',
    threats: ['Perte d\'habitat', 'Braconnage', 'Guerre civile', 'Sécheresse'],
    gallery: ['/images/Girafe.png', '/images/giraffe-2.jpg', '/images/giraffe-3.jpg']
  },
  {
    id: 'leopard-001',
    name: 'Léopard d\'Afrique',
    title: 'OMBRE',
    topic: 'FURTIVE',
    author: 'NIGHT PHOTOGRAPHER',
    description: 'Le léopard, maître de la discrétion, évolue dans l\'ombre avec une agilité incomparable. Ses rosettes dorées et sa capacité à grimper aux arbres en font un prédateur redoutable et mystérieux.',
    image: '/images/leopard.jpg',
    category: AnimalCategory.MAMMAL,
    habitat: 'Forêts, savanes, montagnes, déserts',
    conservation_status: ConservationStatus.NEAR_THREATENED,
    facts: [
      'Peut hisser une proie de 50 kg dans un arbre',
      'Excellent nageur et grimpeur',
      'Chasse principalement la nuit',
      'Peut sauter 6 mètres horizontalement',
      'Territoire pouvant s\'étendre sur 30 km²'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Afrique du Sud', 'Botswana', 'Namibie', 'Zimbabwe', 'Zambie'],
      coordinates: { lat: -25.0, lng: 25.0 }
    },
    weight: '30-90 kg',
    height: '60-70 cm au garrot',
    lifespan: '12-17 ans',
    diet: 'Carnivore - antilopes, singes, oiseaux, poissons',
    social_behavior: 'Solitaire, très territorial',
    threats: ['Perte d\'habitat', 'Conflit homme-léopard', 'Braconnage', 'Diminution des proies'],
    gallery: ['/images/leopard.jpg', '/images/leopard-2.jpg', '/images/leopard-3.jpg']
  },
  {
    id: 'cheetah-001',
    name: 'Guépard',
    title: 'VITESSE',
    topic: 'PURE',
    author: 'SPEED SPECIALIST',
    description: 'Le guépard, sprinter ultime de la savane, peut atteindre 120 km/h en quelques secondes. Son corps élancé et ses griffes non-rétractiles en font la machine de course parfaite du règne animal.',
    image: '/images/Guepard.png',
    category: AnimalCategory.MAMMAL,
    habitat: 'Savanes ouvertes, semi-déserts',
    conservation_status: ConservationStatus.VULNERABLE,
    facts: [
      'Animal terrestre le plus rapide au monde',
      'Accélère de 0 à 100 km/h en 3 secondes',
      'Ses griffes non-rétractiles agissent comme des crampons',
      'Queue utilisée comme gouvernail pendant la course',
      'Chasse principalement le jour'
    ],
    location: {
      continent: 'Afrique',
      countries: ['Namibie', 'Botswana', 'Kenya', 'Tanzanie', 'Iran'],
      coordinates: { lat: -22.0, lng: 17.0 }
    },
    weight: '35-65 kg',
    height: '70-90 cm au garrot',
    lifespan: '8-12 ans',
    diet: 'Carnivore - gazelles, impalas, lièvres',
    social_behavior: 'Semi-social, mères avec petits, coalitions de mâles',
    threats: ['Perte d\'habitat', 'Conflit avec autres prédateurs', 'Consanguinité', 'Trafic illégal'],
    gallery: ['/images/Guepard.png', '/images/cheetah-2.jpg', '/images/cheetah-3.jpg']
  },
  {
    id: 'elk-001',
    name: 'Élan d\'Europe',
    title: 'MAJESTÉ',
    topic: 'NORDIQUE',
    author: 'FOREST EXPLORER',
    description: 'L\'élan, le plus grand cervidé au monde, règne sur les forêts boréales avec ses bois impressionnants. Ce géant paisible des terres nordiques peut peser jusqu\'à 700 kg et traverser les lacs avec aisance.',
    image: '/images/Elan.jpg',
    category: AnimalCategory.MAMMAL,
    habitat: 'Forêts boréales, toundra, marécages',
    conservation_status: ConservationStatus.LEAST_CONCERN,
    facts: [
      'Ses bois peuvent mesurer jusqu\'à 2 mètres d\'envergure',
      'Excellent nageur, peut plonger jusqu\'à 6 mètres de profondeur',
      'Peut courir à 56 km/h malgré sa taille',
      'Consomme jusqu\'à 27 kg de végétation par jour',
      'Ses bois tombent chaque hiver et repoussent au printemps'
    ],
    location: {
      continent: 'Europe/Amérique du Nord',
      countries: ['Suède', 'Norvège', 'Finlande', 'Canada', 'Alaska'],
      coordinates: { lat: 64.0, lng: 26.0 }
    },
    weight: '380-720 kg',
    height: '1.4-2.1 mètres au garrot',
    lifespan: '15-25 ans',
    diet: 'Herbivore - feuilles, écorces, plantes aquatiques',
    social_behavior: 'Solitaire, sauf pendant la période de reproduction',
    threats: ['Chasse excessive', 'Perte d\'habitat', 'Collisions routières', 'Changement climatique'],
    gallery: ['/images/Elan.jpg', '/images/elk-2.jpg', '/images/elk-3.jpg']
   }
];

export const getAnimalById = (id: string): Animal | undefined => {
  return animalsData.find(animal => animal.id === id);
};

export const getAnimalsByCategory = (category: AnimalCategory): Animal[] => {
  return animalsData.filter(animal => animal.category === category);
};

export const getAnimalsByConservationStatus = (status: ConservationStatus): Animal[] => {
  return animalsData.filter(animal => animal.conservation_status === status);
};

export const searchAnimals = (searchTerm: string): Animal[] => {
  const term = searchTerm.toLowerCase();
  return animalsData.filter(animal => 
    animal.name.toLowerCase().includes(term) ||
    animal.title.toLowerCase().includes(term) ||
    animal.topic.toLowerCase().includes(term) ||
    animal.description.toLowerCase().includes(term) ||
    animal.habitat.toLowerCase().includes(term)
  );
};
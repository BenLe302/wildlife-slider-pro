// Types pour les animaux et le slider
export interface Animal {
  id: string;
  name: string;
  title: string;
  topic: string;
  author: string;
  description: string;
  image: string;
  category: AnimalCategory;
  habitat: string;
  conservation_status: ConservationStatus;
  facts: string[];
  location: Location;
  weight: string;
  height: string;
  lifespan: string;
  diet: string;
  social_behavior: string;
  threats: string[];
  gallery: string[];
}

export interface Location {
  continent: string;
  countries: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export enum AnimalCategory {
  MAMMAL = 'mammal',
  BIRD = 'bird',
  REPTILE = 'reptile',
  AMPHIBIAN = 'amphibian',
  FISH = 'fish',
  INSECT = 'insect'
}

export enum ConservationStatus {
  LEAST_CONCERN = 'Least Concern',
  NEAR_THREATENED = 'Near Threatened',
  VULNERABLE = 'Vulnerable',
  ENDANGERED = 'Endangered',
  CRITICALLY_ENDANGERED = 'Critically Endangered',
  EXTINCT_IN_WILD = 'Extinct in the Wild',
  EXTINCT = 'Extinct'
}

// Types pour les composants UI
export interface SliderSettings {
  autoPlay: boolean;
  autoPlayInterval: number;
  showThumbnails: boolean;
  showProgressBar: boolean;
  enableKeyboardNavigation: boolean;
  enableMouseWheel: boolean;
  transitionDuration: number;
  pauseOnHover: boolean;
}

export interface SliderState {
  currentIndex: number;
  isAnimating: boolean;
  direction: 'next' | 'prev' | null;
  isPaused: boolean;
}

// Types pour les pages et navigation
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

// Types pour les filtres et recherche
export interface FilterOptions {
  category?: AnimalCategory;
  conservationStatus?: ConservationStatus;
  continent?: string;
  searchTerm?: string;
}

// Types pour les animations
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

// Types pour les événements
export interface SliderEvent {
  type: 'slide' | 'pause' | 'resume' | 'reset';
  currentIndex: number;
  previousIndex?: number;
  direction?: 'next' | 'prev';
}

// Types pour les données utilisateur
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  autoPlay: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
}

// Types pour les statistiques
export interface AnimalStats {
  totalAnimals: number;
  categoriesCount: Record<AnimalCategory, number>;
  conservationStats: Record<ConservationStatus, number>;
  continentStats: Record<string, number>;
}

// Types pour les API responses
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Types pour les erreurs
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Types pour les hooks personnalisés
export interface UseSliderReturn {
  currentIndex: number;
  isAnimating: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export interface UseAnimalsReturn {
  animals: Animal[];
  loading: boolean;
  error: AppError | null;
  refetch: () => void;
  filterAnimals: (filters: FilterOptions) => void;
  searchAnimals: (term: string) => void;
}
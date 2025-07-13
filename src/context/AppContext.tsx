import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Animal, FilterOptions, UserPreferences, AnimalStats, SliderEvent } from '../types';
import { animalsData } from '../data/animals';

// État global de l'application
interface AppState {
  // Données des animaux
  animals: Animal[];
  filteredAnimals: Animal[];
  currentAnimal: Animal | null;
  favorites: string[];
  
  // État de l'interface utilisateur
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  filters: FilterOptions;
  
  // Préférences utilisateur
  preferences: UserPreferences;
  
  // Statistiques
  stats: AnimalStats | null;
  
  // Navigation
  currentPage: string;
  breadcrumbs: Array<{ label: string; path: string }>;
}

// Actions pour modifier l'état
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ANIMALS'; payload: Animal[] }
  | { type: 'SET_FILTERED_ANIMALS'; payload: Animal[] }
  | { type: 'SET_CURRENT_ANIMAL'; payload: Animal | null }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'ADD_TO_FAVORITES'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'SET_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_STATS'; payload: AnimalStats }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'SET_BREADCRUMBS'; payload: Array<{ label: string; path: string }> }
  | { type: 'RESET_FILTERS' };

// Type du contexte
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentAnimal: (animal: Animal | null) => void;
  searchAnimals: (term: string) => void;
  filterAnimals: (filters: FilterOptions) => void;
  addToFavorites: (animalId: string) => void;
  removeFromFavorites: (animalId: string) => void;
  toggleFavorite: (animalId: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetFilters: () => void;
  setCurrentPage: (page: string) => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; path: string }>) => void;
}

// État initial
const initialState: AppState = {
  animals: [],
  filteredAnimals: [],
  currentAnimal: null,
  favorites: JSON.parse(localStorage.getItem('wildlife-favorites') || '[]'),
  isLoading: false,
  error: null,
  searchTerm: '',
  filters: {},
  preferences: {
    theme: 'light',
    language: 'fr',
    autoPlay: true,
    showAnimations: true,
    soundEnabled: false,
    ...JSON.parse(localStorage.getItem('wildlife-preferences') || '{}')
  },
  stats: null,
  currentPage: 'home',
  breadcrumbs: []
};

// Reducer pour gérer les actions
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'SET_ANIMALS':
      return { ...state, animals: action.payload, isLoading: false };
    
    case 'SET_FILTERED_ANIMALS':
      return { ...state, filteredAnimals: action.payload };
    
    case 'SET_CURRENT_ANIMAL':
      return { ...state, currentAnimal: action.payload };
    
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'ADD_TO_FAVORITES':
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem('wildlife-favorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    
    case 'REMOVE_FROM_FAVORITES':
      const updatedFavorites = state.favorites.filter(id => id !== action.payload);
      localStorage.setItem('wildlife-favorites', JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };
    
    case 'SET_PREFERENCES':
      const newPreferences = { ...state.preferences, ...action.payload };
      localStorage.setItem('wildlife-preferences', JSON.stringify(newPreferences));
      return { ...state, preferences: newPreferences };
    
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_BREADCRUMBS':
      return { ...state, breadcrumbs: action.payload };
    
    case 'RESET_FILTERS':
      return { ...state, filters: {}, searchTerm: '', filteredAnimals: state.animals };
    
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
    if (error) {
      toast.error(error);
    }
  };

  const setCurrentAnimal = (animal: Animal | null) => {
    dispatch({ type: 'SET_CURRENT_ANIMAL', payload: animal });
  };

  const searchAnimals = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    
    if (!term.trim()) {
      dispatch({ type: 'SET_FILTERED_ANIMALS', payload: state.animals });
      return;
    }

    const filtered = state.animals.filter(animal =>
      animal.name.toLowerCase().includes(term.toLowerCase()) ||
      animal.description.toLowerCase().includes(term.toLowerCase()) ||
      animal.habitat.toLowerCase().includes(term.toLowerCase()) ||
      animal.location.continent.toLowerCase().includes(term.toLowerCase()) ||
      animal.location.countries.some(country => 
        country.toLowerCase().includes(term.toLowerCase())
      )
    );

    dispatch({ type: 'SET_FILTERED_ANIMALS', payload: filtered });
  };

  const filterAnimals = (filters: FilterOptions) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    
    let filtered = [...state.animals];

    // Appliquer les filtres
    if (filters.category) {
      filtered = filtered.filter(animal => animal.category === filters.category);
    }

    if (filters.conservationStatus) {
      filtered = filtered.filter(animal => animal.conservation_status === filters.conservationStatus);
    }

    if (filters.continent) {
      filtered = filtered.filter(animal => animal.location.continent === filters.continent);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(animal =>
        animal.name.toLowerCase().includes(term) ||
        animal.description.toLowerCase().includes(term)
      );
    }

    dispatch({ type: 'SET_FILTERED_ANIMALS', payload: filtered });
  };

  const addToFavorites = (animalId: string) => {
    if (!state.favorites.includes(animalId)) {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: animalId });
      toast.success('Animal ajouté aux favoris!');
    }
  };

  const removeFromFavorites = (animalId: string) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: animalId });
    toast.success('Animal retiré des favoris!');
  };

  const toggleFavorite = (animalId: string) => {
    if (state.favorites.includes(animalId)) {
      removeFromFavorites(animalId);
    } else {
      addToFavorites(animalId);
    }
  };

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    dispatch({ type: 'SET_PREFERENCES', payload: preferences });
    toast.success('Préférences mises à jour!');
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const setCurrentPage = (page: string) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const setBreadcrumbs = (breadcrumbs: Array<{ label: string; path: string }>) => {
    dispatch({ type: 'SET_BREADCRUMBS', payload: breadcrumbs });
  };

  // Calculer les statistiques
  const calculateStats = (animals: Animal[]): AnimalStats => {
    const categoriesCount = animals.reduce((acc, animal) => {
      acc[animal.category] = (acc[animal.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const conservationStats = animals.reduce((acc, animal) => {
      acc[animal.conservation_status] = (acc[animal.conservation_status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const continentStats = animals.reduce((acc, animal) => {
      acc[animal.location.continent] = (acc[animal.location.continent] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalAnimals: animals.length,
      categoriesCount: categoriesCount as any,
      conservationStats: conservationStats as any,
      continentStats,
    };
  };

  // Initialiser les données au montage
  useEffect(() => {
    setLoading(true);
    try {
      // Simuler un délai de chargement
      setTimeout(() => {
        dispatch({ type: 'SET_ANIMALS', payload: animalsData });
        dispatch({ type: 'SET_FILTERED_ANIMALS', payload: animalsData });
        dispatch({ type: 'SET_STATS', payload: calculateStats(animalsData) });
      }, 1000);
    } catch (error) {
      setError('Erreur lors du chargement des données');
    }
  }, []);

  const contextValue: AppContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    setCurrentAnimal,
    searchAnimals,
    filterAnimals,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    updatePreferences,
    resetFilters,
    setCurrentPage,
    setBreadcrumbs,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
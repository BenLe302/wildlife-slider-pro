import { useState, useEffect, useCallback, useMemo } from 'react';
import { Animal, FilterOptions, UseAnimalsReturn, AppError } from '../types';
import { animalsData, searchAnimals as searchAnimalsData } from '../data/animals';

// Simuler un délai d'API pour le réalisme
const API_DELAY = 500;

// Simuler des erreurs occasionnelles
const SIMULATE_ERROR = false;

export const useAnimals = (initialFilters?: FilterOptions): UseAnimalsReturn => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [allAnimals] = useState<Animal[]>(animalsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters || {});

  // Fonction pour simuler un appel API
  const fetchAnimals = useCallback(async (filterOptions: FilterOptions = {}): Promise<Animal[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (SIMULATE_ERROR && Math.random() < 0.1) {
          reject(new Error('Erreur de réseau simulée'));
          return;
        }

        let filteredAnimals = [...allAnimals];

        // Appliquer les filtres
        if (filterOptions.category) {
          filteredAnimals = filteredAnimals.filter(
            animal => animal.category === filterOptions.category
          );
        }

        if (filterOptions.conservationStatus) {
          filteredAnimals = filteredAnimals.filter(
            animal => animal.conservation_status === filterOptions.conservationStatus
          );
        }

        if (filterOptions.continent) {
          filteredAnimals = filteredAnimals.filter(
            animal => animal.location.continent.toLowerCase() === filterOptions.continent?.toLowerCase()
          );
        }

        if (filterOptions.searchTerm) {
          filteredAnimals = searchAnimalsData(filterOptions.searchTerm);
        }

        resolve(filteredAnimals);
      }, API_DELAY);
    });
  }, [allAnimals]);

  // Fonction pour charger les animaux
  const loadAnimals = useCallback(async (filterOptions: FilterOptions = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchAnimals(filterOptions);
      setAnimals(result);
    } catch (err) {
      const appError: AppError = {
        code: 'FETCH_ERROR',
        message: err instanceof Error ? err.message : 'Erreur inconnue',
        timestamp: new Date().toISOString()
      };
      setError(appError);
      setAnimals([]);
    } finally {
      setLoading(false);
    }
  }, [fetchAnimals]);

  // Fonction pour filtrer les animaux
  const filterAnimals = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    loadAnimals(newFilters);
  }, [loadAnimals]);

  // Fonction pour rechercher des animaux
  const searchAnimals = useCallback((searchTerm: string) => {
    const newFilters = { ...filters, searchTerm };
    setFilters(newFilters);
    loadAnimals(newFilters);
  }, [filters, loadAnimals]);

  // Fonction pour recharger les données
  const refetch = useCallback(() => {
    loadAnimals(filters);
  }, [loadAnimals, filters]);

  // Charger les animaux au montage
  useEffect(() => {
    loadAnimals(filters);
  }, []);

  return {
    animals,
    loading,
    error,
    refetch,
    filterAnimals,
    searchAnimals
  };
};

// Hook pour obtenir un animal spécifique
export const useAnimal = (id: string) => {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const loadAnimal = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simuler un délai d'API
        await new Promise(resolve => setTimeout(resolve, API_DELAY));
        
        const foundAnimal = animalsData.find(a => a.id === id);
        
        if (!foundAnimal) {
          throw new Error(`Animal avec l'ID ${id} non trouvé`);
        }
        
        setAnimal(foundAnimal);
      } catch (err) {
        const appError: AppError = {
          code: 'ANIMAL_NOT_FOUND',
          message: err instanceof Error ? err.message : 'Animal non trouvé',
          timestamp: new Date().toISOString()
        };
        setError(appError);
        setAnimal(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadAnimal();
    }
  }, [id]);

  return { animal, loading, error };
};

// Hook pour obtenir des statistiques sur les animaux
export const useAnimalStats = () => {
  const stats = useMemo(() => {
    const totalAnimals = animalsData.length;
    
    const categoriesCount = animalsData.reduce((acc, animal) => {
      acc[animal.category] = (acc[animal.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const conservationStats = animalsData.reduce((acc, animal) => {
      acc[animal.conservation_status] = (acc[animal.conservation_status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const continentStats = animalsData.reduce((acc, animal) => {
      acc[animal.location.continent] = (acc[animal.location.continent] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalAnimals,
      categoriesCount,
      conservationStats,
      continentStats
    };
  }, []);

  return stats;
};

// Hook pour obtenir des animaux similaires
export const useSimilarAnimals = (currentAnimal: Animal, limit: number = 3) => {
  const similarAnimals = useMemo(() => {
    if (!currentAnimal) return [];
    
    return animalsData
      .filter(animal => 
        animal.id !== currentAnimal.id && (
          animal.category === currentAnimal.category ||
          animal.location.continent === currentAnimal.location.continent ||
          animal.conservation_status === currentAnimal.conservation_status
        )
      )
      .slice(0, limit);
  }, [currentAnimal, limit]);

  return similarAnimals;
};

export default useAnimals;
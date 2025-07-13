import { useState, useEffect, useCallback, useRef } from 'react';
import { SliderState, SliderConfig, SliderEvent } from '../types';

interface UseSliderProps {
  itemsCount: number;
  config: SliderConfig;
  onSlideChange?: (event: SliderEvent) => void;
}

interface UseSliderReturn {
  currentIndex: number;
  isAnimating: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

const useSlider = ({ itemsCount, config, onSlideChange }: UseSliderProps): UseSliderReturn => {
  const [state, setState] = useState<SliderState>({
    currentIndex: 0,
    isAnimating: false,
    direction: null,
    isPaused: false
  });

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef(true);

  // Fonction pour nettoyer les timeouts
  const clearTimeouts = useCallback(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Fonction pour démarrer l'autoplay
  const startAutoPlay = useCallback(() => {
    if (!config.autoPlay || state.isPaused || !isVisibleRef.current) return;
    
    clearTimeouts();
    autoPlayRef.current = setTimeout(() => {
      setState(prev => {
        const nextIndex = (prev.currentIndex + 1) % itemsCount;
        const event: SliderEvent = {
          type: 'slide',
          currentIndex: nextIndex,
          previousIndex: prev.currentIndex,
          direction: 'next'
        };
        onSlideChange?.(event);
        
        return {
          ...prev,
          currentIndex: nextIndex,
          isAnimating: true,
          direction: 'next'
        };
      });
    }, config.autoPlayInterval);
  }, [config.autoPlay, config.autoPlayInterval, state.isPaused, itemsCount, onSlideChange, clearTimeouts]);

  // Fonction pour aller à un slide spécifique
  const goToSlide = useCallback((index: number) => {
    if (state.isAnimating || index < 0 || index >= itemsCount || index === state.currentIndex) {
      return;
    }

    const direction = index > state.currentIndex ? 'next' : 'prev';
    
    setState(prev => ({
      ...prev,
      currentIndex: index,
      isAnimating: true,
      direction
    }));

    const event: SliderEvent = {
      type: 'slide',
      currentIndex: index,
      previousIndex: state.currentIndex,
      direction
    };
    onSlideChange?.(event);

    // Arrêter l'animation après la durée de transition
    clearTimeouts();
    animationRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        isAnimating: false,
        direction: null
      }));
      startAutoPlay();
    }, config.transitionDuration);
  }, [state.currentIndex, state.isAnimating, itemsCount, config.transitionDuration, onSlideChange, startAutoPlay, clearTimeouts]);

  // Fonction pour aller au slide suivant
  const nextSlide = useCallback(() => {
    const nextIndex = (state.currentIndex + 1) % itemsCount;
    goToSlide(nextIndex);
  }, [state.currentIndex, itemsCount, goToSlide]);

  // Fonction pour aller au slide précédent
  const prevSlide = useCallback(() => {
    const prevIndex = state.currentIndex === 0 ? itemsCount - 1 : state.currentIndex - 1;
    goToSlide(prevIndex);
  }, [state.currentIndex, itemsCount, goToSlide]);

  // Fonction pour mettre en pause
  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
    clearTimeouts();
    
    const event: SliderEvent = {
      type: 'pause',
      currentIndex: state.currentIndex
    };
    onSlideChange?.(event);
  }, [state.currentIndex, onSlideChange, clearTimeouts]);

  // Fonction pour reprendre
  const resume = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
    
    const event: SliderEvent = {
      type: 'resume',
      currentIndex: state.currentIndex
    };
    onSlideChange?.(event);
    
    startAutoPlay();
  }, [state.currentIndex, onSlideChange, startAutoPlay]);

  // Fonction pour reset
  const reset = useCallback(() => {
    clearTimeouts();
    setState({
      currentIndex: 0,
      isAnimating: false,
      direction: null,
      isPaused: false
    });
    
    const event: SliderEvent = {
      type: 'reset',
      currentIndex: 0
    };
    onSlideChange?.(event);
    
    startAutoPlay();
  }, [onSlideChange, startAutoPlay, clearTimeouts]);

  // Gestion de la navigation au clavier
  useEffect(() => {
    if (!config.enableKeyboardNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          prevSlide();
          break;
        case ' ': // Espace
          event.preventDefault();
          state.isPaused ? resume() : pause();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(itemsCount - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [config.enableKeyboardNavigation, nextSlide, prevSlide, pause, resume, goToSlide, itemsCount, state.isPaused]);

  // Gestion de la visibilité de la page
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (document.hidden) {
        clearTimeouts();
      } else if (!state.isPaused && config.autoPlay) {
        startAutoPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [state.isPaused, config.autoPlay, startAutoPlay, clearTimeouts]);

  // Démarrer l'autoplay au montage
  useEffect(() => {
    startAutoPlay();
    return () => clearTimeouts();
  }, [startAutoPlay, clearTimeouts]);

  // Redémarrer l'autoplay quand les paramètres changent
  useEffect(() => {
    if (!state.isAnimating) {
      startAutoPlay();
    }
  }, [config.autoPlay, config.autoPlayInterval, state.isPaused, startAutoPlay, state.isAnimating]);

  return {
    currentIndex: state.currentIndex,
    isAnimating: state.isAnimating,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
    reset
  };
};

export default useSlider;
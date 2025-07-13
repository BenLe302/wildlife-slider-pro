import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './context/AppContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { useAppContext } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import styled from 'styled-components';

// Lazy loading des pages pour optimiser les performances
const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));
const AnimalDetail = lazy(() => import('./pages/AnimalDetail'));
const Search = lazy(() => import('./pages/Search'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Conservation = lazy(() => import('./pages/Conservation'));
const Statistics = lazy(() => import('./pages/Statistics'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.easing.easeInOut};
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px); // Hauteur de la navigation
`;

const PageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Composant de fallback pour le loading
const PageLoadingFallback: React.FC = () => (
  <LoadingSpinner
    fullScreen
    size="xl"
    message="Chargement de la page..."
    variant="primary"
  />
);

// Composant principal de l'application avec accès au contexte
const AppContent: React.FC = () => {
  const { state } = useAppContext();
  const currentTheme = theme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Navigation />
          <MainContent>
            <PageWrapper>
              <ErrorBoundary>
                <Suspense fallback={<PageLoadingFallback />}>
                  <Routes>
                    {/* Route principale */}
                    <Route path="/" element={<Home />} />
                    
                    {/* Routes de navigation */}
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/animal/:id" element={<AnimalDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/favorites" element={<Favorites />} />
                    
                    {/* Routes d'information */}
                    <Route path="/conservation" element={<Conservation />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Route 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </PageWrapper>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

// Composant App principal avec le provider de contexte
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
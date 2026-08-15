import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import EmiratesExplorer from '@/pages/EmiratesExplorer';
import EmirateDetail from '@/pages/EmirateDetail';
import PlaceDetail from '@/pages/PlaceDetail';
import DigitalPassport from '@/pages/DigitalPassport';
import Culture from '@/pages/Culture';
import Values from '@/pages/Values';
import Citizenship from '@/pages/Citizenship';
import Sustainability from '@/pages/Sustainability';
import Timeline from '@/pages/Timeline';
import CulturalCalendar from '@/pages/CulturalCalendar';
import Challenges from '@/pages/Challenges';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/emirates-explorer" element={<EmiratesExplorer />} />
      <Route path="/explore/:emirateId" element={<EmirateDetail />} />
      <Route path="/place/:id" element={<PlaceDetail />} />
      <Route path="/culture" element={<Culture />} />
      <Route path="/values" element={<Values />} />
      <Route path="/citizenship" element={<Citizenship />} />
      <Route path="/sustainability" element={<Sustainability />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/calendar" element={<CulturalCalendar />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/digital-passport" element={<DigitalPassport />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
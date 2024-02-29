import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import LandingPage from './pages';
import ErrorPage from './pages/error';
import SmCategorySyncPage from './pages/sync/category/sm';
import TrayCategorySyncPage from './pages/sync/category/tray';
import CategorySyncPage from './pages/sync/category';
import TrayBrandSyncPage from './pages/sync/brand/tray';
import SmBrandSyncPage from './pages/sync/brand/sm';
import BrandSyncPapge from './pages/sync/brand';

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sync/brand" element={<BrandSyncPapge />} />
          <Route path="/sync/brand/sm" element={<SmBrandSyncPage />} />
          <Route path="/sync/brand/tray" element={<TrayBrandSyncPage />} />
          <Route path="/sync/category" element={<CategorySyncPage />} />
          <Route path="/sync/category/sm" element={<SmCategorySyncPage />} />
          <Route path="/sync/category/tray" element={<TrayCategorySyncPage />} />
          <Route path="/error" element={<ErrorPage />} />
          {/* Define other routes here if needed */}
          {/* For example: */}
          {/* <Route path="/about" component={AboutPage} /> */}
          {/* <Route path="/contact" component={ContactPage} /> */}

          {/* A catch-all route for 404 Not Found */}
          {/* <Route path="*" component={NotFoundPage} /> */}
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;

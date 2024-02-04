import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrimeReactContext, PrimeReactProvider } from 'primereact/api';
import LandingPage from './pages';
import SyncBrandPage from './pages/sync/brand';
import SyncCategoryPage from './pages/sync/category';
import ErrorPage from './pages/error';

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sync/brand" element={<SyncBrandPage />} />
          <Route path="/sync/category" element={<SyncCategoryPage />} />
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

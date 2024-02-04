import React from 'react';
import LandingPage from './pages';
import SyncBrandPage from './pages/sync/brand';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import SyncCategoryPage from './pages/sync/category';
import ErrorPage from './pages/error';

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/sync/brand" element={<SyncBrandPage/>} />
          <Route path="/sync/category" element={<SyncCategoryPage/>} />
          <Route path="/error" element={<ErrorPage/>} />
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

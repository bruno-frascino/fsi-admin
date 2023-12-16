import React from 'react';
import LandingPage from './pages';
import SyncBrandPage from './pages/sync/brand';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SyncCategoryPage from './pages/sync/category';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/sync/brand" Component={SyncBrandPage} />
        <Route path="/sync/category" Component={SyncCategoryPage} />
        {/* Define other routes here if needed */}
        {/* For example: */}
        {/* <Route path="/about" component={AboutPage} /> */}
        {/* <Route path="/contact" component={ContactPage} /> */}

        {/* A catch-all route for 404 Not Found */}
        {/* <Route path="*" component={NotFoundPage} /> */}
      </Routes>
    </Router>
  );
}

export default App;

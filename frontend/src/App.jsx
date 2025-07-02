import './App.css'
import HomePage from './components/home/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FeedPage from './components/feed/FeedPage.jsx';
import AuthPage from './components/auth/AuthPage.jsx';
import UserPage from './components/user/UserPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlacementsPage from './components/placements/placements.jsx';

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Router>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/explore' element={<FeedPage />} />
            <Route path='/results' element={<FeedPage />} />
            <Route path='/scholarships' element={<FeedPage />} />
            <Route path='/placement-stats' element={<PlacementsPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/user' element={<UserPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
import './App.css'
import { UserProvider } from './components/contexts/userContext.jsx';
import HomePage from './components/home/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FeedPage from './components/feed/FeedPage.jsx';
import ResultPage from './components/result/ResultPage.jsx';
import AuthPage from './components/auth/AuthPage.jsx';
import UserPage from './components/user/UserPage.jsx';
import FeedbackPage from './components/feedback/FeebackPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlacementsPage from './components/placements/placements.jsx';
import FaqsPage from './components/faqs/FaqsPage.jsx';
import CreatePost from './components/feed/CreatePost.jsx';

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <UserProvider>
        <Router>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/explore' element={<FeedPage />} />
              <Route path='/results' element={<ResultPage />} />
              <Route path='/scholarships' element={<FeedPage />} />
              <Route path='/placement-stats' element={<PlacementsPage />} />
              <Route path='/auth' element={<AuthPage />} />
              <Route path='/user' element={<UserPage />} />
              <Route path='/feedback' element={<FeedbackPage />} />
              <Route path='/faqs' element={<FaqsPage />} />
              <Route path='/create' element={<CreatePost />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
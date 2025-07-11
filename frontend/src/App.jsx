import './App.css';
import { UserProvider } from './components/contexts/userContext.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import HomePage from './components/home/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import Footer2 from './components/footer/Footer2.jsx';
import FeedPage from './components/feed/FeedPage.jsx';
import ResultPage from './components/result/ResultPage.jsx';
import AuthPage from './components/auth/AuthPage.jsx';
import UserPage from './components/user/UserPage.jsx';
import FeedbackPage from './components/feedback/FeebackPage.jsx';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PlacementsPage from './components/placements/placements.jsx';
import FaqsPage from './components/faqs/FaqsPage.jsx';
import CreatePost from './components/feed/CreatePost.jsx';
import ClubAndSociety from "./components/techteam/Techteam.jsx";
import ScholarshipsPage from './components/Scholarships/Scholarships.jsx';
import LostAndFound from './components/lostAndFound/LostAndFoundPage.jsx';
import NewLFCreate from './components/lostAndFound/NewLFCreate.jsx';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <UserProvider>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/explore' element={<FeedPage />} />
            <Route path='/results' element={<ResultPage />} />
            <Route path='/scholarships' element={<ScholarshipsPage />} />
            <Route path='/placement-stats' element={<PlacementsPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='/feedback' element={<FeedbackPage />} />
            <Route path='/faqs' element={<FaqsPage />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/clubs-societies' element={<ClubAndSociety />} />
            <Route path='/lost-and-found' element={<LostAndFound />} />
            <Route path='/lost-and-found/new' element={<NewLFCreate />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
        {location.pathname === "/" ? <Footer /> : <Footer2 />}
      </UserProvider>
    </div>
  );
}

export default AppWrapper;
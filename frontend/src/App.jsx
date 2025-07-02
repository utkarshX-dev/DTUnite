import './App.css'
import Navbar from './components/Navbar.jsx';
import HomePage from './components/home/HomePage.jsx';
import AuthPage from './components/auth/AuthPage.jsx';
import UserPage from './components/user/UserPage.jsx';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import PlacementsPage from './components/placements/placements.jsx';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/results' element={<HomePage/>}/>
          <Route path='/scholarships' element={<HomePage/>}/>
          <Route path='/auth' element={<AuthPage/>}/>
          <Route path='/placement-stats' element={<PlacementsPage/>}/>
          <Route path='/user' element={<UserPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;

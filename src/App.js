import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Login/RegisterPage';
import MyNavbar from './Components/Navbar/Navbar';
import MoviesList from './Pages/MovieList';
import MovieDetails from './Pages/MovieDetails';
import Favorites from './Pages/Favorites';


function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />}/>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Feedpage from './Pages/Feedpage';
import ProfilePage from './Pages/ProfilePage';
import ErrorPage from './Pages/ErrorPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/homepage' element={<Feedpage/>}/>
        <Route path='/:id' element={<ProfilePage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;

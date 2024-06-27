import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import FeedPage from './Pages/FeedPage';
import ProfilePage from './Pages/ProfilePage';
import ErrorPage from './Pages/ErrorPage';
import PageProtector from './components/PageProtector';




function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/homepage' element={<PageProtector>
              <FeedPage/>
          </PageProtector>}/>
        <Route path='/:id' element={<PageProtector>
              <ProfilePage/>
          </PageProtector>}/>
        <Route path='*' element={
          <PageProtector>
              <ErrorPage/>
          </PageProtector>
          }/>
      </Routes>
    </Router>
    
  );
}

export default App;

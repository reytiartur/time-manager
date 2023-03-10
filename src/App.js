import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './screens/AuthPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useSelector } from 'react-redux';
import Application from './screens/Application';
import ProjectsScreen from './screens/ProjectsScreen';
import Archived from './screens/Archived';
import ProjectFullScreen from './screens/ProjectFullScreen';

function App() {
  const user = useSelector((state) => state.user)

  return (
    <div className="App">
      <Router>
        <Routes>
          {user ? (
            <>
              <Route path='/' element={<Application />}>
                <Route path='projects' element={<ProjectsScreen />} />
                <Route path='archived' element={<Archived />} />
              </Route>
              <Route path='projects/:projectNumber' element={<ProjectFullScreen />} />
            </>
          ) : (
            <Route path='/' element={<AuthPage />}>
              <Route index element={<SignIn />} />
              <Route path='signup' element={<SignUp />} />
            </Route>
          )}
        </Routes>
      </Router>  
    </div>
  );
}

export default App;

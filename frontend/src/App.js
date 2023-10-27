import './App.css';
import { Header } from './components/index';
import { HomePage, Profile, LoginPage, Contact } from './pages/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './utils/index';
import { AuthContext, AuthProvider } from './context/index';

function App() {
  return (
    <div className="App">
      
      <Router>
        <AuthProvider>
          <Header/>

          <Routes>
            <Route element={<PrivateRoutes/>} >
              <Route path='/' element={<HomePage />} exact />
              <Route path='profile' element={<Profile />} exact />
            </Route>

            <Route path='contact' element={<Contact/>} />
            <Route path='login' element={<LoginPage />} />
          </Routes>

        </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;

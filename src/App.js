import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import RegistrationPage from './Pages/RegistrationPage';
import ProtectedRouter from './Middleware/ProtectedRoutes';
import Profile from './Pages/Profile/Profile';
import Posts from './Pages/Posts';
import ShareExperience from './Pages/ShareExperience/ShareExperience';
import School from './Pages/Schools/School';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signUp" element={<RegistrationPage />} />
        <Route path="/posts" element={<Posts />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/shareExperience/:userId" element={<ShareExperience />} />
          <Route path="/School" element={<School />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

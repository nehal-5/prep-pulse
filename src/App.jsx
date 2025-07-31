import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupsPage';
import GroupDashboard from './pages/GroupDashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/groups" element={<ProtectedRoute><GroupsPage /></ProtectedRoute>} />
        <Route path="/group/:groupId" element={<ProtectedRoute><GroupDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
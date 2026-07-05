import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <div className="container py-4">
      <h1 className="display-6 mb-3">OctoFit Tracker</h1>
      <p className="lead">A multi-tier fitness dashboard for teams, users, activities, and workouts.</p>
      <p className="text-muted">
        Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the Codespaces API URL.
      </p>
      <div className="d-flex flex-wrap gap-2">
        <Link className="btn btn-primary" to="/users">View Users</Link>
        <Link className="btn btn-outline-primary" to="/activities">View Activities</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

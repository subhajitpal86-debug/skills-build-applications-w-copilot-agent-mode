import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-muted">Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      <div className="row g-3">
        {users.map((user) => (
          <div key={user._id || user.id || user.email} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{user.name || 'Unnamed user'}</h3>
                <p className="mb-1"><strong>Email:</strong> {user.email || '—'}</p>
                <p className="mb-0"><strong>Role:</strong> {user.role || '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;

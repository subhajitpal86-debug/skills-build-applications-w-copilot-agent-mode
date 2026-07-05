import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setTeams(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTeams();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-muted">Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id || team.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{team.name || 'Unnamed team'}</h3>
                <p className="mb-1"><strong>Sport:</strong> {team.sport || '—'}</p>
                <p className="mb-0"><strong>Members:</strong> {team.members ?? '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;

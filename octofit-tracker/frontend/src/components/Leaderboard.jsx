import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setEntries(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-muted">Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id || entry.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h3 className="h6 mb-1">Rank {entry.rank ?? '—'}</h3>
              <p className="mb-0">{entry.userId?.name || entry.userName || 'Unknown user'}</p>
            </div>
            <span className="badge text-bg-success">{entry.points ?? 0} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;

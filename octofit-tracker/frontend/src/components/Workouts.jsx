import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setWorkouts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-muted">Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{workout.name || 'Workout'}</h3>
                <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty || '—'}</p>
                <p className="mb-0"><strong>Duration:</strong> {workout.duration ?? '—'} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;

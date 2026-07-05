import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setActivities(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadActivities();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-muted">Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id || activity.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h3 className="h6 mb-1">{activity.type || 'Activity'}</h3>
                <p className="mb-1">Duration: {activity.duration ?? '—'} min</p>
                <p className="mb-0">Date: {activity.date || '—'}</p>
              </div>
              <span className="badge text-bg-primary">{activity.distance ?? 0} mi</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;

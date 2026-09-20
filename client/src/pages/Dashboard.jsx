import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getObservations } from "../services/observations";
import ObservationCard from "../components/ObservationCard";

function Dashboard() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadObservations() {
      try {
        const data = await getObservations();
        setObservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadObservations();
  }, []);

  const recentObservations = observations.slice(0, 3);

  return (
    <main className="page-container">
      <section className="hero">
        <div>
          <p className="eyebrow">YOUR PERSONAL SKY JOURNAL</p>
          <h1>Explore the night. Remember what you see.</h1>
          <p className="hero-description">
            Keep track of the celestial objects you've observed
            and your experiences under the night sky.
          </p>
        </div>

        <Link
          to="/observations"
          className="button primary-button"
        >
          View Observations
        </Link>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <p>Total Observations</p>
          <h2>{observations.length}</h2>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Recent Observations</h2>

          <Link to="/observations">
            View All
          </Link>
        </div>

        {loading && <p>Loading observations...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && observations.length === 0 && (
          <div className="empty-state">
            <h3>Your skywatching journey starts here.</h3>
            <p>You haven't recorded any observations yet.</p>

            <Link
              to="/observations"
              className="button primary-button"
            >
              Record Your First Observation
            </Link>
          </div>
        )}

        {!loading && !error && (
          <div className="observation-grid">
            {recentObservations.map((observation) => (
              <ObservationCard
                key={observation.id}
                observation={observation}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
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

  const recentObservations = observations.slice(0, 4);

  const planetCount = observations.filter(
    (observation) =>
      observation.object_type?.toLowerCase() === "planet"
  ).length;

  const clearCount = observations.filter(
    (observation) =>
      observation.sky_conditions?.toLowerCase() === "clear"
  ).length;

  return (
    <main className="page-container">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            Personal skywatching journal
          </p>

          <h1>
            Keep a record of what you{" "}
            <span>see above.</span>
          </h1>

          <p className="hero-description">
            SkyLog is a quiet place to record celestial
            observations, remember good nights, and keep track
            of the objects you've found.
          </p>

          <div className="hero-actions">
            <Link
              to="/observations"
              className="button primary-button"
            >
              Open observation log
            </Link>

            <Link
              to="/observations"
              className="button secondary-button"
            >
              + New observation
            </Link>
          </div>
        </div>

        <div className="sky-orbit" aria-hidden="true">
          <div className="orbit-center" />

          <span className="orbit-star star-one" />
          <span className="orbit-star star-two" />
          <span className="orbit-star star-three" />
          <span className="orbit-star star-four" />
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <p>Total observations</p>
          <h2>{observations.length}</h2>
        </div>

        <div className="stat-card">
          <p>Planets recorded</p>
          <h2>{planetCount}</h2>
        </div>

        <div className="stat-card">
          <p>Clear nights</p>
          <h2>{clearCount}</h2>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your log</p>
            <h2>Recent observations</h2>
            <p>Your latest entries from the night sky.</p>
          </div>

          <Link
            to="/observations"
            className="button secondary-button"
          >
            View all
          </Link>
        </div>

        {loading && (
          <div className="empty-state">
            <p>Reading your observation log...</p>
          </div>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          observations.length === 0 && (
            <div className="empty-state">
              <p className="eyebrow">No entries yet</p>

              <h2>Your log is waiting.</h2>

              <p>
                Record your first observation and start
                building your personal skywatching history.
              </p>

              <Link
                to="/observations"
                className="button primary-button"
              >
                Record first observation
              </Link>
            </div>
          )}

        {!loading &&
          !error &&
          observations.length > 0 && (
            <div className="observation-grid">
              {recentObservations.map((observation) => (
                <ObservationCard
                  key={observation.id}
                  observation={observation}
                />
              ))}
            </div>
          )}
      </section>
    </main>
  );
}

export default Dashboard;
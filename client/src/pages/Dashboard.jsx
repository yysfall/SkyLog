import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getObservations,
} from "../services/observations";

function Dashboard() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getObservations();
        setObservations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const recentObservations = observations.slice(0, 3);

  const totalObservations = observations.length;

  const ratedObservations = observations.filter(
    (observation) => observation.rating
  );

  const averageRating =
    ratedObservations.length > 0
      ? (
          ratedObservations.reduce(
            (sum, observation) =>
              sum + Number(observation.rating),
            0
          ) / ratedObservations.length
        ).toFixed(1)
      : "—";

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">SKYLOG</p>

        <h1>Explore the night sky.</h1>

        <p>
          Keep track of your observations, record what you
          discover, and revisit your favorite moments under
          the stars.
        </p>

        <Link
          to="/observations"
          className="btn btn-primary"
        >
          View Observations
        </Link>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total Observations</span>
          <strong>{totalObservations}</strong>
        </div>

        <div className="stat-card">
          <span>Average Rating</span>
          <strong>
            {averageRating}
            {averageRating !== "—" && " / 5"}
          </strong>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Recent Observations</h2>
            <p>Your latest skywatching entries.</p>
          </div>

          <Link to="/observations">
            View All
          </Link>
        </div>

        {loading ? (
          <p className="loading">Loading observations...</p>
        ) : recentObservations.length === 0 ? (
          <div className="empty-state">
            <h2>No observations yet</h2>

            <p>
              Start recording your skywatching experiences.
            </p>

            <Link
              to="/observations"
              className="btn btn-primary"
            >
              Add Observation
            </Link>
          </div>
        ) : (
          <div className="observation-list">
            {recentObservations.map((observation) => (
              <Link
                key={observation.id}
                to={`/observations/${observation.id}`}
                className="dashboard-observation"
              >
                <div>
                  <strong>{observation.object_name}</strong>

                  <span>
                    {observation.object_type}
                  </span>
                </div>

                <span>
                  {observation.rating
                    ? `${observation.rating} / 5`
                    : "Not rated"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getObservationById,
  deleteObservation,
} from "../services/observations";

function ObservationDetails() {
  const { id } = useParams();

  const [observation, setObservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadObservation() {
      try {
        const data = await getObservationById(id);

        setObservation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadObservation();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this observation permanently?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteObservation(id);

      window.location.href = "/observations";
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <p>Opening observation log...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <p className="error-message">{error}</p>

        <Link
          to="/observations"
          className="back-link"
        >
          ← Back to observations
        </Link>
      </main>
    );
  }

  if (!observation) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <h2>Observation not found.</h2>

          <Link
            to="/observations"
            className="button secondary-button"
          >
            Back to observations
          </Link>
        </div>
      </main>
    );
  }

  const date = new Date(observation.date_observed);

  const formattedDate = date.toLocaleDateString(
    undefined,
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const formattedTime = date.toLocaleTimeString(
    undefined,
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <main className="page-container">
      <Link
        to="/observations"
        className="back-link"
      >
        ← Back to observation log
      </Link>

      <article className="details-panel">
        <header className="details-header">
          <p className="eyebrow">
            {observation.object_type}
          </p>

          <h1>{observation.object_name}</h1>

          <p className="details-date">
            {formattedDate} · {formattedTime}
          </p>
        </header>

        <section className="details-grid">
          <div className="detail-item">
            <p className="detail-label">Location</p>

            <p className="detail-value">
              {observation.location || "Not recorded"}
            </p>
          </div>

          <div className="detail-item">
            <p className="detail-label">Equipment</p>

            <p className="detail-value">
              {observation.equipment || "Not recorded"}
            </p>
          </div>

          <div className="detail-item">
            <p className="detail-label">Sky conditions</p>

            <p className="detail-value">
              {observation.sky_conditions ||
                "Not recorded"}
            </p>
          </div>

          <div className="detail-item">
            <p className="detail-label">Rating</p>

            <p className="detail-value">
              {observation.rating ? (
                <span className="rating">
                  {"★".repeat(observation.rating)}
                  <span className="rating-empty">
                    {"★".repeat(5 - observation.rating)}
                  </span>
                </span>
              ) : (
                "Not rated"
              )}
            </p>
          </div>
        </section>

        <section className="notes-section">
          <p className="eyebrow">Field notes</p>

          <h2>What I saw</h2>

          <p>
            {observation.notes ||
              "No notes were recorded for this observation."}
          </p>
        </section>

        <div className="card-actions">
          <Link
            to={`/observations/${observation.id}/edit`}
            className="button primary-button"
          >
            Edit observation
          </Link>

          <button
            type="button"
            className="button danger-button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </article>
    </main>
  );
}

export default ObservationDetails;
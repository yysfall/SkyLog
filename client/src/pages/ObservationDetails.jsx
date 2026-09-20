import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getObservationById } from "../services/observations";

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

  if (loading) {
    return <main className="page-container">Loading observation...</main>;
  }

  if (error) {
    return (
      <main className="page-container">
        <p className="error-message">{error}</p>
        <Link to="/observations">Back to Observations</Link>
      </main>
    );
  }

  if (!observation) {
    return (
      <main className="page-container">
        <p>Observation not found.</p>
      </main>
    );
  }

  return (
    <main className="page-container">
      <Link to="/observations" className="back-link">
        ← Back to Observations
      </Link>

      <article className="details-panel">
        <p className="eyebrow">OBSERVATION DETAILS</p>

        <h1>{observation.object_name}</h1>

        <span className="badge">{observation.object_type}</span>

        <div className="details-list">
          <p>
            <strong>Date observed:</strong>{" "}
            {new Date(observation.date_observed).toLocaleString()}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {observation.location || "Not specified"}
          </p>

          <p>
            <strong>Equipment:</strong>{" "}
            {observation.equipment || "Not specified"}
          </p>

          <p>
            <strong>Sky conditions:</strong>{" "}
            {observation.sky_conditions || "Not specified"}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            {observation.rating
              ? `${observation.rating}/5`
              : "Not rated"}
          </p>

          <div>
            <strong>Notes</strong>
            <p>{observation.notes || "No notes added."}</p>
          </div>
        </div>
      </article>
    </main>
  );
}

export default ObservationDetails;
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ObservationForm from "../components/ObservationForm";
import {
  deleteObservation,
  getObservationById,
  updateObservation,
} from "../services/observations";

function ObservationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [observation, setObservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function loadObservation() {
      try {
        setLoading(true);
        setError("");

        const data = await getObservationById(id);
        setObservation(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadObservation();
  }, [id]);

  async function handleUpdate(updatedData) {
    const updatedObservation = await updateObservation(id, updatedData);

    setObservation(updatedObservation);
    setIsEditing(false);
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this observation?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteObservation(id);
      navigate("/observations");
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) {
    return (
      <main className="page">
        <p className="loading">Loading observation...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="error-message">
          {error}
        </div>

        <Link to="/observations" className="btn btn-secondary">
          Back to Observations
        </Link>
      </main>
    );
  }

  if (!observation) {
    return null;
  }

  if (isEditing) {
    return (
      <main className="page">
        <div className="page-header">
          <div>
            <Link to={`/observations/${id}`} className="back-link">
              ← Cancel
            </Link>

            <h1>Edit Observation</h1>
            <p>Update the details of your observation.</p>
          </div>
        </div>

        <section className="surface">
          <ObservationForm
            initialData={observation}
            onSubmit={handleUpdate}
            submitLabel="Update Observation"
          />
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <Link to="/observations" className="back-link">
            ← Back to Observations
          </Link>

          <h1>{observation.object_name}</h1>

          <p>{observation.object_type}</p>
        </div>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <section className="details-grid">
        <div className="detail-card">
          <span className="detail-label">Date & Time</span>
          <strong>
            {new Date(observation.date_observed).toLocaleString()}
          </strong>
        </div>

        <div className="detail-card">
          <span className="detail-label">Location</span>
          <strong>
            {observation.location || "Not specified"}
          </strong>
        </div>

        <div className="detail-card">
          <span className="detail-label">Equipment</span>
          <strong>
            {observation.equipment || "Not specified"}
          </strong>
        </div>

        <div className="detail-card">
          <span className="detail-label">Sky Conditions</span>
          <strong>
            {observation.sky_conditions || "Not specified"}
          </strong>
        </div>

        <div className="detail-card">
          <span className="detail-label">Rating</span>
          <strong>
            {observation.rating
              ? `${observation.rating} / 5`
              : "Not rated"}
          </strong>
        </div>
      </section>

      <section className="surface notes-section">
        <h2>Notes</h2>

        <p>
          {observation.notes || "No notes were added."}
        </p>
      </section>
    </main>
  );
}

export default ObservationDetails;
import { useEffect, useState } from "react";

import ObservationCard from "../components/ObservationCard";
import ObservationForm from "../components/ObservationForm";

import {
  getObservations,
  createObservation,
  deleteObservation,
} from "../services/observations";

function Observations() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function loadObservations() {
    try {
      setError("");
      const data = await getObservations();
      setObservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadObservations();
  }, []);

  async function handleCreate(observation) {
    await createObservation(observation);

    await loadObservations();
    setShowForm(false);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this observation?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteObservation(id);

      setObservations((previous) =>
        previous.filter((observation) => observation.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page-container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR JOURNAL</p>
          <h1>My Observations</h1>
          <p>Browse and manage your skywatching records.</p>
        </div>

        <button
          className="button primary-button"
          onClick={() => setShowForm((previous) => !previous)}
        >
          {showForm ? "Close Form" : "+ Add Observation"}
        </button>
      </div>

      {showForm && (
        <section className="form-panel">
          <h2>Record an Observation</h2>

          <ObservationForm onSubmit={handleCreate} />
        </section>
      )}

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading observations...</p>
      ) : observations.length === 0 ? (
        <div className="empty-state">
          <h2>No observations yet</h2>
          <p>
            Add your first celestial observation to begin
            building your skywatching journal.
          </p>
        </div>
      ) : (
        <div className="observation-grid">
          {observations.map((observation) => (
            <ObservationCard
              key={observation.id}
              observation={observation}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Observations;
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
      "Delete this observation permanently?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteObservation(id);

      setObservations((previous) =>
        previous.filter(
          (observation) => observation.id !== id
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page-container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Observation log</p>

          <h1>What have you seen?</h1>

          <p>
            Every entry is a small record of a night under
            the sky.
          </p>
        </div>

        <button
          type="button"
          className="button primary-button"
          onClick={() =>
            setShowForm((previous) => !previous)
          }
        >
          {showForm ? "Close form" : "+ New observation"}
        </button>
      </div>

      {showForm && (
        <section className="form-panel">
          <p className="eyebrow">New entry</p>

          <h2>Record an observation</h2>

          <ObservationForm onSubmit={handleCreate} />
        </section>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {loading && (
        <div className="empty-state">
          <p>Loading your observation log...</p>
        </div>
      )}

      {!loading && observations.length === 0 && (
        <div className="empty-state">
          <p className="eyebrow">Empty log</p>

          <h2>No observations yet.</h2>

          <p>
            Your first observation will appear here once
            you record it.
          </p>

          <button
            type="button"
            className="button primary-button"
            onClick={() => setShowForm(true)}
          >
            Record an observation
          </button>
        </div>
      )}

      {!loading && observations.length > 0 && (
        <section>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Archive</p>

              <h2>
                {observations.length}{" "}
                {observations.length === 1
                  ? "observation"
                  : "observations"}
              </h2>
            </div>
          </div>

          <div className="observation-grid">
            {observations.map((observation) => (
              <ObservationCard
                key={observation.id}
                observation={observation}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Observations;
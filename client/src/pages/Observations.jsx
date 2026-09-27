import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ObservationCard from "../components/ObservationCard";
import ObservationForm from "../components/ObservationForm";

import {
  createObservation,
  deleteObservation,
  getObservations,
} from "../services/observations";

function Observations() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function loadObservations() {
    try {
      setLoading(true);
      setError("");

      const data = await getObservations();
      setObservations(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadObservations();
  }, []);

  async function handleCreate(data) {
    try {
      const newObservation = await createObservation(data);

      setObservations((current) => [
        newObservation,
        ...current,
      ]);

      setShowForm(false);
    } catch (error) {
      throw error;
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this observation?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteObservation(id);

      setObservations((current) =>
        current.filter((observation) => observation.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h1>Observations</h1>
          <p>Keep track of the objects you have observed.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm((current) => !current)}
        >
          {showForm ? "Close Form" : "+ Add Observation"}
        </button>
      </div>

      {showForm && (
        <section className="surface">
          <h2>New Observation</h2>

          <ObservationForm
            onSubmit={handleCreate}
            submitLabel="Save Observation"
          />
        </section>
      )}

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <p className="loading">Loading observations...</p>
      ) : observations.length === 0 ? (
        <section className="empty-state">
          <h2>No observations yet</h2>

          <p>
            Add your first skywatching observation to get started.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            Add Observation
          </button>
        </section>
      ) : (
        <section className="observation-list">
          {observations.map((observation) => (
            <ObservationCard
              key={observation.id}
              observation={observation}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Observations;
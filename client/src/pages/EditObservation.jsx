import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getObservationById,
  updateObservation,
} from "../services/observations";

function EditObservation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    object_name: "",
    object_type: "",
    date_observed: "",
    location: "",
    equipment: "",
    sky_conditions: "",
    notes: "",
    rating: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadObservation() {
      try {
        const data = await getObservationById(id);

        const date = new Date(data.date_observed);

        const localDate = new Date(
          date.getTime() -
            date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);

        setForm({
          object_name: data.object_name || "",
          object_type: data.object_type || "",
          date_observed: localDate,
          location: data.location || "",
          equipment: data.equipment || "",
          sky_conditions: data.sky_conditions || "",
          notes: data.notes || "",
          rating:
            data.rating !== null &&
            data.rating !== undefined
              ? String(data.rating)
              : "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadObservation();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      await updateObservation(id, {
        ...form,
        rating: form.rating
          ? Number(form.rating)
          : null,
      });

      navigate(`/observations/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <p>Loading observation...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <Link
        to={`/observations/${id}`}
        className="back-link"
      >
        ← Back to observation
      </Link>

      <section className="form-panel">
        <p className="eyebrow">Edit entry</p>

        <h1>Edit observation</h1>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form
          className="observation-form"
          onSubmit={handleSubmit}
        >
          <label>
            Object Name *
            <input
              name="object_name"
              value={form.object_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Object Type *
            <select
              name="object_type"
              value={form.object_type}
              onChange={handleChange}
              required
            >
              <option value="">
                Select object type
              </option>

              <option value="Planet">
                Planet
              </option>

              <option value="Moon">
                Moon
              </option>

              <option value="Star">
                Star
              </option>

              <option value="Galaxy">
                Galaxy
              </option>

              <option value="Nebula">
                Nebula
              </option>

              <option value="Star Cluster">
                Star Cluster
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </label>

          <label>
            Date and Time Observed *
            <input
              type="datetime-local"
              name="date_observed"
              value={form.date_observed}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Location
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </label>

          <label>
            Equipment Used
            <input
              name="equipment"
              value={form.equipment}
              onChange={handleChange}
            />
          </label>

          <label>
            Sky Conditions
            <select
              name="sky_conditions"
              value={form.sky_conditions}
              onChange={handleChange}
            >
              <option value="">
                Select conditions
              </option>

              <option value="Clear">
                Clear
              </option>

              <option value="Partly Cloudy">
                Partly Cloudy
              </option>

              <option value="Cloudy">
                Cloudy
              </option>

              <option value="Hazy">
                Hazy
              </option>
            </select>
          </label>

          <label>
            Rating
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
            >
              <option value="">
                No rating
              </option>

              <option value="1">
                1 - Poor
              </option>

              <option value="2">
                2 - Fair
              </option>

              <option value="3">
                3 - Good
              </option>

              <option value="4">
                4 - Very Good
              </option>

              <option value="5">
                5 - Excellent
              </option>
            </select>
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="6"
            />
          </label>

          <div className="card-actions">
            <button
              type="submit"
              className="button primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <Link
              to={`/observations/${id}`}
              className="button secondary-button"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default EditObservation;
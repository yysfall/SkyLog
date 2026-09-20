import { useState } from "react";

const initialForm = {
  object_name: "",
  object_type: "",
  date_observed: "",
  location: "",
  equipment: "",
  sky_conditions: "",
  notes: "",
  rating: "",
};

function ObservationForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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

    if (
      !form.object_name.trim() ||
      !form.object_type ||
      !form.date_observed
    ) {
      setError("Please complete all required fields.");
      return;
    }

    setSaving(true);

    try {
      await onSubmit({
        ...form,
        object_name: form.object_name.trim(),
        rating: form.rating ? Number(form.rating) : null,
      });

      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="observation-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}

      <label>
        Object Name *
        <input
          name="object_name"
          value={form.object_name}
          onChange={handleChange}
          placeholder="e.g. Jupiter"
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
          <option value="">Select object type</option>
          <option value="Planet">Planet</option>
          <option value="Moon">Moon</option>
          <option value="Star">Star</option>
          <option value="Galaxy">Galaxy</option>
          <option value="Nebula">Nebula</option>
          <option value="Star Cluster">Star Cluster</option>
          <option value="Other">Other</option>
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
          placeholder="Where did you observe it?"
        />
      </label>

      <label>
        Equipment Used
        <input
          name="equipment"
          value={form.equipment}
          onChange={handleChange}
          placeholder="e.g. 10x50 binoculars"
        />
      </label>

      <label>
        Sky Conditions
        <select
          name="sky_conditions"
          value={form.sky_conditions}
          onChange={handleChange}
        >
          <option value="">Select conditions</option>
          <option value="Clear">Clear</option>
          <option value="Partly Cloudy">Partly Cloudy</option>
          <option value="Cloudy">Cloudy</option>
          <option value="Hazy">Hazy</option>
        </select>
      </label>

      <label>
        Rating
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
        >
          <option value="">No rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </label>

      <label>
        Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Describe what you observed..."
        />
      </label>

      <button
        type="submit"
        className="button primary-button"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Observation"}
      </button>
    </form>
  );
}

export default ObservationForm;
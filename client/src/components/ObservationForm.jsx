import { useEffect, useState } from "react";

function formatDateTimeLocal(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);

  return localDate.toISOString().slice(0, 16);
}

function ObservationForm({
  initialData = null,
  onSubmit,
  submitLabel = "Save Observation",
}) {
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

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        object_name: initialData.object_name || "",
        object_type: initialData.object_type || "",
        date_observed: formatDateTimeLocal(
          initialData.date_observed
        ),
        location: initialData.location || "",
        equipment: initialData.equipment || "",
        sky_conditions:
          initialData.sky_conditions || "",
        notes: initialData.notes || "",
        rating:
          initialData.rating !== null &&
          initialData.rating !== undefined
            ? String(initialData.rating)
            : "",
      });
    }
  }, [initialData]);

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

    if (!form.object_name.trim()) {
      setError("Object name is required.");
      return;
    }

    if (!form.object_type) {
      setError("Object type is required.");
      return;
    }

    if (!form.date_observed) {
      setError("Observation date and time are required.");
      return;
    }

    if (
      form.rating &&
      (Number(form.rating) < 1 ||
        Number(form.rating) > 5)
    ) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    try {
      setSaving(true);

      await onSubmit({
        object_name: form.object_name.trim(),
        object_type: form.object_type,
        date_observed: form.date_observed,
        location: form.location.trim(),
        equipment: form.equipment.trim(),
        sky_conditions: form.sky_conditions,
        notes: form.notes.trim(),
        rating: form.rating
          ? Number(form.rating)
          : null,
      });
    } catch (err) {
      setError(
        err.message || "Failed to save observation."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="observation-form"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <label>
        Object Name *
        <input
          type="text"
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
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Where did you observe it?"
        />
      </label>

      <label>
        Equipment
        <input
          type="text"
          name="equipment"
          value={form.equipment}
          onChange={handleChange}
          placeholder="e.g. 8-inch Dobsonian"
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
            1 — Poor
          </option>

          <option value="2">
            2 — Fair
          </option>

          <option value="3">
            3 — Good
          </option>

          <option value="4">
            4 — Very Good
          </option>

          <option value="5">
            5 — Excellent
          </option>
        </select>
      </label>

      <label>
        Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="What did you see?"
          rows="6"
        />
      </label>

      <div className="form-actions">
        <button
          type="submit"
          className="button primary-button save-button"
          disabled={saving}
        >
          <span className="button-icon">
            {saving ? "…" : "✦"}
          </span>

          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ObservationForm;
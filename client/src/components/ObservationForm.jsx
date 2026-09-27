import { useEffect, useState } from "react";

const emptyForm = {
  object_name: "",
  object_type: "",
  date_observed: "",
  location: "",
  equipment: "",
  sky_conditions: "",
  notes: "",
  rating: "",
};

function formatDateTimeLocal(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function ObservationForm({
  initialData = null,
  onSubmit,
  submitLabel = "Save Observation",
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setForm({
        object_name: initialData.object_name || "",
        object_type: initialData.object_type || "",
        date_observed: formatDateTimeLocal(initialData.date_observed),
        location: initialData.location || "",
        equipment: initialData.equipment || "",
        sky_conditions: initialData.sky_conditions || "",
        notes: initialData.notes || "",
        rating: initialData.rating || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    // Required field validation
    if (!form.object_name.trim()) {
      setError("Object name is required.");
      return;
    }

    if (!form.object_type) {
      setError("Please select an object type.");
      return;
    }

    if (!form.date_observed) {
      setError("Observation date and time are required.");
      return;
    }

    // Rating validation
    if (
      form.rating &&
      (Number(form.rating) < 1 || Number(form.rating) > 5)
    ) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit({
        object_name: form.object_name.trim(),
        object_type: form.object_type,
        date_observed: form.date_observed,
        location: form.location.trim(),
        equipment: form.equipment.trim(),
        sky_conditions: form.sky_conditions,
        notes: form.notes.trim(),
        rating: form.rating ? Number(form.rating) : null,
      });

      if (!isEditing) {
        setForm(emptyForm);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="observation-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="object_name">
            Object Name <span>*</span>
          </label>

          <input
            id="object_name"
            name="object_name"
            type="text"
            value={form.object_name}
            onChange={handleChange}
            placeholder="e.g. Jupiter"
          />
        </div>

        <div className="form-group">
          <label htmlFor="object_type">
            Object Type <span>*</span>
          </label>

          <select
            id="object_type"
            name="object_type"
            value={form.object_type}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="Planet">Planet</option>
            <option value="Moon">Moon</option>
            <option value="Star">Star</option>
            <option value="Galaxy">Galaxy</option>
            <option value="Nebula">Nebula</option>
            <option value="Cluster">Cluster</option>
            <option value="Constellation">Constellation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date_observed">
            Date & Time <span>*</span>
          </label>

          <input
            id="date_observed"
            name="date_observed"
            type="datetime-local"
            value={form.date_observed}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>

          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Backyard, Angeles City"
          />
        </div>

        <div className="form-group">
          <label htmlFor="equipment">Equipment</label>

          <input
            id="equipment"
            name="equipment"
            type="text"
            value={form.equipment}
            onChange={handleChange}
            placeholder="e.g. Telescope, Binoculars"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sky_conditions">Sky Conditions</label>

          <select
            id="sky_conditions"
            name="sky_conditions"
            value={form.sky_conditions}
            onChange={handleChange}
          >
            <option value="">Select conditions</option>
            <option value="Clear">Clear</option>
            <option value="Partly Cloudy">Partly Cloudy</option>
            <option value="Cloudy">Cloudy</option>
            <option value="Hazy">Hazy</option>
            <option value="Light Pollution">Light Pollution</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>

        <textarea
          id="notes"
          name="notes"
          rows="5"
          value={form.notes}
          onChange={handleChange}
          placeholder="Write about what you observed..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating</label>

        <select
          id="rating"
          name="rating"
          value={form.rating}
          onChange={handleChange}
        >
          <option value="">No rating</option>
          <option value="1">1 / 5</option>
          <option value="2">2 / 5</option>
          <option value="3">3 / 5</option>
          <option value="4">4 / 5</option>
          <option value="5">5 / 5</option>
        </select>
      </div>

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ObservationForm;
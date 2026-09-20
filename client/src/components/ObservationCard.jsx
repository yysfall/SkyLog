import { Link } from "react-router-dom";

function ObservationCard({ observation, onDelete }) {
  const date = new Date(observation.date_observed);

  return (
    <article className="observation-card">
      <div className="card-heading">
        <div>
          <h3>{observation.object_name}</h3>
          <span className="badge">{observation.object_type}</span>
        </div>
      </div>

      <p>
        <strong>Observed:</strong>{" "}
        {date.toLocaleString()}
      </p>

      {observation.location && (
        <p>
          <strong>Location:</strong> {observation.location}
        </p>
      )}

      {observation.equipment && (
        <p>
          <strong>Equipment:</strong> {observation.equipment}
        </p>
      )}

      <div className="card-actions">
        <Link
          to={`/observations/${observation.id}`}
          className="button secondary-button"
        >
          View Details
        </Link>

        <button
          className="button danger-button"
          onClick={() => onDelete(observation.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ObservationCard;
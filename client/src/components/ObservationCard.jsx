import { Link } from "react-router-dom";

function ObservationCard({ observation, onDelete }) {
  const date = new Date(observation.date_observed);

  const formattedDate = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="observation-card">
      <div className="card-heading">
        <span className="badge">
          {observation.object_type}
        </span>

        <h3>{observation.object_name}</h3>

        <div className="observation-meta">
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>

          {observation.location && (
            <span>{observation.location}</span>
          )}

          {observation.sky_conditions && (
            <span>{observation.sky_conditions}</span>
          )}
        </div>
      </div>

      <div className="card-actions">
        <Link
          to={`/observations/${observation.id}`}
          className="button secondary-button"
        >
          Open log
        </Link>

        {onDelete && (
          <button
            type="button"
            className="button danger-button"
            onClick={() => onDelete(observation.id)}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

export default ObservationCard;
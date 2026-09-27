import { Link } from "react-router-dom";

function ObservationCard({ observation, onDelete }) {
  return (
    <article className="observation-card">
      <div className="observation-card-content">
        <div>
          <span className="observation-type">
            {observation.object_type}
          </span>

          <h2>{observation.object_name}</h2>

          <p>
            {new Date(
              observation.date_observed
            ).toLocaleString()}
          </p>
        </div>

        <div className="observation-rating">
          {observation.rating
            ? `${observation.rating} / 5`
            : "Not rated"}
        </div>
      </div>

      <div className="card-actions">
        <Link
          to={`/observations/${observation.id}`}
          className="btn btn-secondary"
        >
          View Details
        </Link>

        {onDelete && (
          <button
            className="btn btn-danger"
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
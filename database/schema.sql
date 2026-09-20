CREATE TABLE IF NOT EXISTS observations (
    id SERIAL PRIMARY KEY,

    object_name VARCHAR(150) NOT NULL,

    object_type VARCHAR(50) NOT NULL,

    date_observed TIMESTAMP NOT NULL,

    location VARCHAR(200),

    equipment VARCHAR(200),

    sky_conditions VARCHAR(100),

    notes TEXT,

    rating INTEGER CHECK (rating BETWEEN 1 AND 5),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
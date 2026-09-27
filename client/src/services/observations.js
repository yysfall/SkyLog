const API_URL = "http://localhost:3000/api/observations";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}

export async function getObservations() {
  return request(API_URL);
}

export async function getObservationById(id) {
  return request(`${API_URL}/${id}`);
}

export async function createObservation(observation) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(observation),
  });
}

export async function updateObservation(id, observation) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(observation),
  });
}

export async function deleteObservation(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
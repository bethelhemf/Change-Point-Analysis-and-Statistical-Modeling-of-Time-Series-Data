# Birhan Energies API Documentation

## Endpoints

### 1. `GET /api/data`
The primary endpoint for the dashboard.
- **Query Parameters:**
  - `start`: Start date filter (e.g., `2001-09-11`)
  - `end`: End date filter (e.g., `2022-12-31`)
- **Returns:** A JSON object containing:
  - `prices`: Daily Brent oil prices.
  - `events`: Major geopolitical/economic events.
  - `change_points`: Structural breaks detected by the Bayesian model.

### 2. `GET /`
- **Returns:** Health check status ("Backend is Live").
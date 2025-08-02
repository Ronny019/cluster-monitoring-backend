

# Cluster Monitoring Backend (AdonisJS)

## Overview
This project is a backend API for cluster monitoring, built with AdonisJS. It provides endpoints to retrieve and update cluster snapshots and time series data (IOPS, Throughput, etc.).

## Prerequisites
- Node.js (v14 or higher recommended)
- npm (v6 or higher)
- [AdonisJS CLI](https://adonisjs.com/docs/4.1/installation) (optional, for development)

## Environment Variables
Create a `.env` file in the root directory if you need to override AdonisJS defaults (e.g., port, database, etc.).

## Folder Structure
```
├── app/
│   ├── Controllers/Http/DatumController.js   # Main API logic
│   ├── Middleware/                          # Custom middleware
│   └── Models/                              # Data models
├── config/                                  # App configuration
├── data/                                    # JSON data files
├── public/                                  # Static assets
├── resources/views/                         # Edge templates
├── start/                                   # App bootstrap & routes
└── ...
```

## Running Locally
1. Clone the repo:
   ```sh
   git clone <repo-url>
   cd cluster-monitoring-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   adonis serve --dev
   ```
4. The API will be available at:
   - **IP:** 127.0.0.1
   - **Port:** 3333
   - **Base URL:** http://127.0.0.1:3333

---

## API Documentation

### 1. Get All Clusters
**GET** `/data/clusters`

Returns a list of all clusters with their `cluster_id` and `cluster_name`.

**Response Example:**
```json
[
  {
    "cluster_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "cluster_name": "Cluster A"
  },
  ...
]
```

---

### 2. Get Snapshot for a Cluster
**GET** `/data/snapshot?cluster_id=CLUSTER_ID`

Returns snapshot data for the specified cluster.

**Query Parameters:**
- `cluster_id` (required)

**Response Example:**
```json
[
  {
    "cluster_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "cluster_name": "Cluster A",
    ...
  }
]
```

---

### 3. Update or Add Snapshot
**PUT** `/data/snapshot`

Update or add a snapshot for a cluster. If the cluster exists, it will be updated; otherwise, a new snapshot will be added.

**Request Body Example:**
```json
{
  "cluster_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "cluster_name": "Cluster A",
  ...
}
```

**Response Example:**
```json
{
  "success": true,
  "snapshot": { ... }
}
```

---

### 4. Get Time Series Data
**GET** `/data/timeseries?cluster_id=CLUSTER_ID&type=TYPE`

Returns time series data for the specified cluster and type (e.g., IOPS, Throughput).

**Query Parameters:**
- `cluster_id` (required)
- `type` (required, e.g., IOPS, Throughput)

**Response Example:**
```json
[
  {
    "cluster_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "type": "IOPS",
    "data": [ ... ]
  }
]
```

---

## Example Requests

### Get All Clusters (curl)
```sh
curl http://127.0.0.1:3333/data/clusters
```

### Get Snapshot (curl)
```sh
curl "http://127.0.0.1:3333/data/snapshot?cluster_id=a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

### Update Snapshot (curl)
```sh
curl -X PUT http://127.0.0.1:3333/data/snapshot \
  -H "Content-Type: application/json" \
  -d '{"cluster_id":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","cluster_name":"Cluster A"}'
```

### Get Time Series (curl)
```sh
curl "http://127.0.0.1:3333/data/timeseries?cluster_id=a1b2c3d4-e5f6-7890-abcd-ef1234567890&type=IOPS"
```

---

## Error Handling

All endpoints return errors in the following format:
```json
{
  "error": "Error message here",
  "details": "Optional details"
}
```

Common errors:
- 400: Missing required parameters
- 500: Internal server/data error

---

'use strict'

const fs = require('fs').promises;
const path = require('path');

class DatumController {
  // Get all cluster_id and cluster_data from snapshot.json
  async getAllClusters({ response }) {
    try {
      const filePath = path.join(__dirname, '../../../data/snapshot.json');
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      if (!data.snapshots || !Array.isArray(data.snapshots)) {
        return response.status(500).json({ error: 'Invalid snapshot data format' });
      }
      // Map to only cluster_id and cluster_name
      const clusters = data.snapshots.map(item => ({
        cluster_id: item.cluster_id,
        cluster_name: item.cluster_name
      }));
      return response.json(clusters);
    } catch (err) {
      return response.status(500).json({ error: 'Failed to read snapshot data', details: err.message });
    }
  }

  async getSnapshot({ request, response }) {
    try {
      const clusterId = request.input('cluster_id');
      const filePath = path.join(__dirname, '../../../data/snapshot.json');
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      if (!clusterId) {
        return response.status(400).json({ error: 'cluster_id is required' });
      }
      if (!data.snapshots || !Array.isArray(data.snapshots)) {
        return response.status(500).json({ error: 'Invalid snapshot data format' });
      }
      const filtered = data.snapshots.filter(item => item.cluster_id == clusterId);
      return response.json(filtered);
    } catch (err) {
      return response.status(500).json({ error: 'Failed to read snapshot data', details: err.message });
    }
  }

  async getTimeSeries({ response }) {
    try {
      const request = arguments[0].request;
      const clusterId = request.input('cluster_id');
      const type = request.input('type');
      const filePath = path.join(__dirname, '../../../data/time-series.json');
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      if (!clusterId || !type) {
        return response.status(400).json({ error: 'cluster_id and type are required' });
      }
      if (!data.time_series || !Array.isArray(data.time_series)) {
        return response.status(500).json({ error: 'Invalid time series data format' });
      }
      const filtered = data.time_series.filter(item => item.cluster_id == clusterId && item.type == type);
      return response.json(filtered);
    } catch (err) {
      return response.status(500).json({ error: 'Failed to read time series data', details: err.message });
    }
  }

  async putSnapshot({ request, response }) {
    try {
      const newSnapshot = request.post();
      if (!newSnapshot.cluster_id) {
        return response.status(400).json({ error: 'cluster_id is required in payload' });
      }
      const filePath = path.join(__dirname, '../../../data/snapshot.json');
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      if (!data.snapshots || !Array.isArray(data.snapshots)) {
        return response.status(500).json({ error: 'Invalid snapshot data format' });
      }
      // Check if snapshot with the same cluster_id exists
      const idx = data.snapshots.findIndex(item => item.cluster_id == newSnapshot.cluster_id);
      if (idx !== -1) {
        // Update existing snapshot
        data.snapshots[idx] = { ...data.snapshots[idx], ...newSnapshot };
      } else {
        // Add new snapshot
        data.snapshots.push(newSnapshot);
      }
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      return response.json({ success: true, snapshot: newSnapshot });
    } catch (err) {
      return response.status(500).json({ error: 'Failed to write snapshot data', details: err.message });
    }
  }
}

module.exports = DatumController

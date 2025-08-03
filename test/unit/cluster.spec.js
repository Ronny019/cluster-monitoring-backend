const { test, trait } = use('Test/Suite')('Cluster API')
const { assert } = require('chai') // Add this at the top if not present

trait('Test/ApiClient')

test('sanity check', async () => {
  // This will always pass
})

test('get all clusters returns 200', async ({ client }) => {
  const response = await client.get('/data/clusters').end()
  response.assertStatus(200)
})

test('get all clusters returns array', async ({ client }) => {
  const response = await client.get('/data/clusters').end()
  response.assertStatus(200)
  response.assertJSONSubset([])
  // Checks that the response is an array (empty or not)
})

test('put snapshot with valid data returns success', async ({ client }) => {
  const validSnapshot = {
    cluster_id: 'test-cluster-id',
    cluster_name: 'Test Cluster'
    // Add other required fields if needed
  }
  const response = await client.put('/data/snapshot').send(validSnapshot).end()
  response.assertStatus(200)
  response.assertJSONSubset({ success: true })
})

test('put snapshot with full data returns correct snapshot', async ({ client }) => {
  const fullSnapshot = {
    cluster_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    cluster_name: "ProductionCluster",
    policyName: "ProjectX_Daily_Updated_LA",
    applyDirectory: "Production/ProjectX",
    scheduleType: "Daily or Weekly",
    timeZone: "America/Los Angeles",
    snapshotHour: "08",
    snapshotMinute: "15",
    days: {
      everyDay: false,
      mon: true,
      tue: true,
      wed: true,
      thur: true,
      fri: false,
      sat: false,
      sun: false
    },
    deleteOption: "auto",
    deleteAfter: "14",
    deleteAfterUnit: "day(s)",
    lockedSnapshotsEnabled: true,
    enablePolicy: false
  }
  const response = await client.put('/data/snapshot').send(fullSnapshot).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    success: true,
    snapshot: fullSnapshot
  })
})

test('get snapshot by cluster_id returns correct snapshot', async ({ client }) => {
  const expectedSnapshot = {
    cluster_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    cluster_name: "ProductionCluster",
    policyName: "ProjectX_Daily_Updated_LA",
    applyDirectory: "Production/ProjectX",
    scheduleType: "Daily or Weekly",
    timeZone: "America/Los Angeles",
    snapshotHour: "08",
    snapshotMinute: "15",
    days: {
      everyDay: false,
      mon: true,
      tue: true,
      wed: true,
      thur: true,
      fri: false,
      sat: false,
      sun: false
    },
    deleteOption: "auto",
    deleteAfter: "14",
    deleteAfterUnit: "day(s)",
    lockedSnapshotsEnabled: true,
    enablePolicy: false
  }
  const response = await client
    .get('/data/snapshot')
    .query({ cluster_id: expectedSnapshot.cluster_id })
    .end()
  response.assertStatus(200)
  assert.isArray(response.body)
  assert.deepInclude(response.body, expectedSnapshot)
})

test('get timeseries by cluster_id and type returns correct data', async ({ client }) => {
  const expectedTimeseries = {
    cluster_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    type: "Throughput",
    data: [
      { "datetime": "2025-07-22T08:00:00Z", "read": 1.2, "write": 0.8 },
      { "datetime": "2025-07-22T14:00:00Z", "read": 1.5, "write": 0.9 },
      { "datetime": "2025-07-22T20:00:00Z", "read": 1.3, "write": 0.85 },
      { "datetime": "2025-07-23T09:00:00Z", "read": 1.4, "write": 0.95 },
      { "datetime": "2025-07-23T15:00:00Z", "read": 1.6, "write": 1 },
      { "datetime": "2025-07-23T21:00:00Z", "read": 1.35, "write": 0.87 },
      { "datetime": "2025-07-24T08:30:00Z", "read": 1.25, "write": 0.82 },
      { "datetime": "2025-07-24T13:30:00Z", "read": 1.55, "write": 0.91 },
      { "datetime": "2025-07-24T19:30:00Z", "read": 1.32, "write": 0.86 },
      { "datetime": "2025-07-25T10:00:00Z", "read": 1.45, "write": 0.97 },
      { "datetime": "2025-07-25T16:00:00Z", "read": 1.65, "write": 1.02 },
      { "datetime": "2025-07-25T22:00:00Z", "read": 1.38, "write": 0.88 },
      { "datetime": "2025-07-26T08:00:00Z", "read": 1.22, "write": 0.81 },
      { "datetime": "2025-07-26T14:00:00Z", "read": 1.52, "write": 0.92 },
      { "datetime": "2025-07-26T20:00:00Z", "read": 1.34, "write": 0.87 },
      { "datetime": "2025-07-27T09:00:00Z", "read": 1.42, "write": 0.96 },
      { "datetime": "2025-07-27T15:00:00Z", "read": 1.62, "write": 1.01 },
      { "datetime": "2025-07-27T21:00:00Z", "read": 1.36, "write": 0.89 },
      { "datetime": "2025-07-28T08:30:00Z", "read": 1.27, "write": 0.83 },
      { "datetime": "2025-07-28T13:30:00Z", "read": 1.57, "write": 0.92 },
      { "datetime": "2025-07-28T19:30:00Z", "read": 1.33, "write": 0.87 },
      { "datetime": "2025-07-29T10:00:00Z", "read": 1.46, "write": 0.98 },
      { "datetime": "2025-07-29T16:00:00Z", "read": 1.66, "write": 1.03 },
      { "datetime": "2025-07-29T22:00:00Z", "read": 1.39, "write": 0.89 },
      { "datetime": "2025-07-30T08:00:00Z", "read": 1.23, "write": 0.82 },
      { "datetime": "2025-07-30T14:00:00Z", "read": 1.53, "write": 0.93 },
      { "datetime": "2025-07-30T20:00:00Z", "read": 1.35, "write": 0.88 },
      { "datetime": "2025-07-31T09:00:00Z", "read": 1.43, "write": 0.97 },
      { "datetime": "2025-07-31T15:00:00Z", "read": 1.63, "write": 1.02 },
      { "datetime": "2025-07-31T21:00:00Z", "read": 1.37, "write": 0.9 }
    ]
  }
  const response = await client
    .get('/data/timeseries')
    .query({
      cluster_id: expectedTimeseries.cluster_id,
      type: expectedTimeseries.type
    })
    .end()
  response.assertStatus(200)
  assert.isArray(response.body)
  assert.deepInclude(response.body, expectedTimeseries)
})

test('get timeseries by cluster_id and type=IOPS returns correct data', async ({ client }) => {
  const expectedTimeseries = {
    cluster_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    type: "IOPS",
    data: [
      { "datetime": "2025-07-22T08:00:00Z", "read": 60000, "write": 40000 },
      { "datetime": "2025-07-22T14:00:00Z", "read": 25000, "write": 15000 },
      { "datetime": "2025-07-22T20:00:00Z", "read": 65000, "write": 42500 },
      { "datetime": "2025-07-23T09:00:00Z", "read": 23333, "write": 15833 },
      { "datetime": "2025-07-23T15:00:00Z", "read": 80000, "write": 50000 },
      { "datetime": "2025-07-23T21:00:00Z", "read": 67500, "write": 43500 },
      { "datetime": "2025-07-24T08:30:00Z", "read": 20833, "write": 13666 },
      { "datetime": "2025-07-24T13:30:00Z", "read": 77500, "write": 45500 },
      { "datetime": "2025-07-24T19:30:00Z", "read": 66000, "write": 43000 },
      { "datetime": "2025-07-25T10:00:00Z", "read": 24166, "write": 16166 },
      { "datetime": "2025-07-25T16:00:00Z", "read": 82500, "write": 51000 },
      { "datetime": "2025-07-25T22:00:00Z", "read": 69000, "write": 44000 },
      { "datetime": "2025-07-26T08:00:00Z", "read": 61000, "write": 40500 },
      { "datetime": "2025-07-26T14:00:00Z", "read": 25333, "write": 15333 },
      { "datetime": "2025-07-26T20:00:00Z", "read": 67000, "write": 43500 },
      { "datetime": "2025-07-27T09:00:00Z", "read": 23666, "write": 16000 },
      { "datetime": "2025-07-27T15:00:00Z", "read": 81000, "write": 50500 },
      { "datetime": "2025-07-27T21:00:00Z", "read": 68000, "write": 44500 },
      { "datetime": "2025-07-28T08:30:00Z", "read": 21166, "write": 13833 },
      { "datetime": "2025-07-28T13:30:00Z", "read": 78500, "write": 46000 },
      { "datetime": "2025-07-28T19:30:00Z", "read": 66500, "write": 43500 },
      { "datetime": "2025-07-29T10:00:00Z", "read": 24333, "write": 16333 },
      { "datetime": "2025-07-29T16:00:00Z", "read": 83000, "write": 51500 },
      { "datetime": "2025-07-29T22:00:00Z", "read": 69500, "write": 44500 },
      { "datetime": "2025-07-30T08:00:00Z", "read": 61500, "write": 41000 },
      { "datetime": "2025-07-30T14:00:00Z", "read": 25500, "write": 15500 },
      { "datetime": "2025-07-30T20:00:00Z", "read": 67500, "write": 44000 },
      { "datetime": "2025-07-31T09:00:00Z", "read": 23833, "write": 16166 },
      { "datetime": "2025-07-31T15:00:00Z", "read": 81500, "write": 51000 },
      { "datetime": "2025-07-31T21:00:00Z", "read": 68500, "write": 45000 }
    ]
  }
  const response = await client
    .get('/data/timeseries')
    .query({
      cluster_id: expectedTimeseries.cluster_id,
      type: expectedTimeseries.type
    })
    .end()
  response.assertStatus(200)
  assert.isArray(response.body)
  assert.deepInclude(response.body, expectedTimeseries)
})
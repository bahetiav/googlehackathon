const express = require('express');
const cors = require('cors');
const { PredictionServiceClient } = require('@google-cloud/aiplatform');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Set up Google Cloud Vertex AI client
const client = new PredictionServiceClient({
  keyFilename: path.join(__dirname, 'path-to-your-service-account.json'), // Add your service account JSON path here
});

// Endpoint to handle Vertex AI call
app.post('/call-vertex-ai', async (req, res) => {
  const { text } = req.body;

  // Add your Vertex AI project and endpoint details
  const endpoint = `projects/your-project-id/locations/us-central1/endpoints/your-endpoint-id`;

  try {
    const response = await client.predict({
      endpoint,
      instances: [{ content: text }],
    });

    // Extract the prediction result
    const prediction = response[0].predictions[0];
    res.status(200).json({ prediction });
  } catch (error) {
    console.error('Error calling Vertex AI:', error);
    res.status(500).json({ error: 'Failed to call Vertex AI' });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
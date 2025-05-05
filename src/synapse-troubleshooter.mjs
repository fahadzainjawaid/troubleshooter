import { DefaultAzureCredential } from '@azure/identity';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const resourceGroup = process.env.AZURE_RESOURCE_GROUP;

const credential = new DefaultAzureCredential();

async function getToken() {
  const tokenResponse = await credential.getToken('https://dev.azuresynapse.net/.default');
  return tokenResponse.token;
}

export async function getLogs(workspaceName, pipelineName, runId) {
  const token = await getToken();

  const url = `https://${workspaceName}.dev.azuresynapse.net/pipelines/${pipelineName}/runs/${runId}?api-version=2020-12-01`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export async function getLatestErrorRun(workspaceName, pipelineName) {
  const token = await getToken();

  const url = `https://${workspaceName}.dev.azuresynapse.net/pipelineruns?api-version=2020-12-01`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const failedRun = response.data.value.find(run =>
    run.pipelineName === pipelineName && run.status === 'Failed'
  );

  return failedRun ? failedRun.runId : null;
}
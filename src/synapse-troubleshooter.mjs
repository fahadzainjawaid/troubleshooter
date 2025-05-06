import { DefaultAzureCredential } from '@azure/identity';
import dotenv from 'dotenv';

dotenv.config();

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const resourceGroup = process.env.AZURE_RESOURCE_GROUP;
const apiVersion = '2020-12-01';

const credential = new DefaultAzureCredential();
const fetch = global.fetch || (await import('node-fetch')).default;

/**
 * Get an access token for Synapse
 */
async function getToken() {
  const tokenResponse = await credential.getToken('https://dev.azuresynapse.net/.default');
  return tokenResponse.token;
}

/**
 * Get logs and metadata for a specific pipeline run
 */
export async function getLogs(workspaceName, pipelineName, runId) {
  const token = await getToken();
  const baseUrl = `https://${workspaceName}.dev.azuresynapse.net`;

  const runUrl = `${baseUrl}/pipelineruns/${runId}?api-version=${apiVersion}`;
  const activityUrl = `${baseUrl}/pipelines/${pipelineName}/runs/${runId}/activityruns?api-version=${apiVersion}`;

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const runRes = await fetch(runUrl, { headers });
  const runData = await runRes.json();

  const activityRes = await fetch(activityUrl, { headers });
  const activityData = await activityRes.json();

  return {
    pipelineRun: runData,
    activities: activityData.value || []
  };
}

/**
 * Get most recent failed run ID for a pipeline
 */
export async function getLatestErrorRun(workspaceName, pipelineName) {
  const token = await getToken();
  const baseUrl = `https://${workspaceName}.dev.azuresynapse.net`;

  const url = `${baseUrl}/pipelineruns?api-version=${apiVersion}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  const failed = (data.value || []).find(run =>
    run.pipelineName === pipelineName && run.status === 'Failed'
  );

  return failed ? failed.runId : null;
}
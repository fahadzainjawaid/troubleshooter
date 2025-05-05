import { DefaultAzureCredential } from '@azure/identity';
import axios from 'axios';

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const resourceGroup = process.env.AZURE_RESOURCE_GROUP;

async function getAccessToken() {
    const credential = new DefaultAzureCredential();
    const token = await credential.getToken('https://management.azure.com/.default');
    return token.token;
}

export async function getPipelineRun(workspaceName, pipelineName, runId) {
    const token = await getAccessToken();
    const baseUrl = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.Synapse/workspaces/${workspaceName}`;

    const runUrl = `${baseUrl}/pipelines/${pipelineName}/runs/${runId}?api-version=2020-12-01`;
    const logsUrl = `${baseUrl}/pipelines/${pipelineName}/runs/${runId}/activityruns?api-version=2020-12-01`;

    const [runResp, logsResp] = await Promise.all([
        axios.get(runUrl, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(logsUrl, { headers: { Authorization: `Bearer ${token}` } })
    ]);

    return {
        runDetails: runResp.data,
        logs: logsResp.data.value
    };
}

export async function getLatestFailedRun(workspaceName, pipelineName) {
    const token = await getAccessToken();
    const baseUrl = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.Synapse/workspaces/${workspaceName}`;
    const url = `${baseUrl}/pipelines/${pipelineName}/runs?api-version=2020-12-01&$top=5&$orderby=runStart desc`;

    const resp = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const failedRun = resp.data.value.find(run => run.status === 'Failed');
    return failedRun ? failedRun.runId : null;
}
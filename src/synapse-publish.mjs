import { DefaultAzureCredential } from '@azure/identity';
import axios from 'axios';

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const resourceGroup = process.env.AZURE_RESOURCE_GROUP;

async function getAccessToken() {
    const credential = new DefaultAzureCredential();
    const token = await credential.getToken('https://management.azure.com/.default');
    return token.token;
}

export async function validateSynapseWorkspace(workspaceName, branchName) {
    const token = await getAccessToken();
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.Synapse/workspaces/${workspaceName}/validate?api-version=2020-12-01`;

    const response = await axios.post(
        url,
        { branch: branchName },
        { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
}

export async function publishSynapseWorkspace(workspaceName) {
    const token = await getAccessToken();
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.Synapse/workspaces/${workspaceName}/publish?api-version=2020-12-01`;

    const response = await axios.post(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
}
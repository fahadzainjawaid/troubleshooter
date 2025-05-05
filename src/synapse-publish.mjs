import { DefaultAzureCredential } from '@azure/identity';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const credential = new DefaultAzureCredential();

async function getToken() {
  const tokenResponse = await credential.getToken('https://dev.azuresynapse.net/.default');
  return tokenResponse.token;
}

export async function validateBranch(workspaceName, branchName) {
  const token = await getToken();

  const url = `https://${workspaceName}.dev.azuresynapse.net/workspaceValidate?api-version=2020-12-01`;

  const response = await axios.post(url, { branchName }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export async function publishWorkspace(workspaceName) {
  const token = await getToken();

  const url = `https://${workspaceName}.dev.azuresynapse.net/workspacePublish?api-version=2020-12-01`;

  const response = await axios.post(url, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
# #🚀 How to Run

## ##Install dependencies:

```bash
npm install commander @azure/identity axios
export AZURE_TENANT_ID="your-tenant-id"
export AZURE_CLIENT_ID="your-client-id"
export AZURE_CLIENT_SECRET="your-client-secret"
export AZURE_SUBSCRIPTION_ID="your-subscription-id"
export AZURE_RESOURCE_GROUP="your-resource-group"

node cli/troubleshooter.mjs getLogs -w myworkspace -p mypipeline -r <runId>
node cli/troubleshooter.mjs errorRuns -w myworkspace -p mypipeline
```

```PowerShell (Windows)
$env:AZURE_TENANT_ID="your-tenant-id"
$env:AZURE_CLIENT_ID="your-client-id"
$env:AZURE_CLIENT_SECRET="your-client-secret"
$env:AZURE_SUBSCRIPTION_ID="your-subscription-id"
$env:AZURE_RESOURCE_GROUP="your-resource-group"

node cli/troubleshooter.mjs getLogs -w myworkspace -p mypipeline -r <runId>
node cli/troubleshooter.mjs errorRuns -w myworkspace -p mypipeline
```

# 🔧 Azure Credentials Setup Guide for `troubleshooter` CLI

This guide walks you through retrieving and configuring the required Azure credentials to use the `troubleshooter` CLI for interacting with Azure Synapse.

---

## 📄 Required Environment Variables

You will need to create a `.env` file in your project root with the following variables:

```dotenv
AZURE_TENANT_ID=
AZURE_CLIENT_ID=
AZURE_CLIENT_SECRET=
AZURE_SUBSCRIPTION_ID=
AZURE_RESOURCE_GROUP=
```


## 🧾 Step-by-Step: Retrieve Values via Azure CLI

### 1. 🔐 Tenant ID (`AZURE_TENANT_ID`)

Run the following command:

`az account show --query tenantId -o tsv`



### 3. 🗂️ Resource Group (`AZURE_RESOURCE_GROUP`)

To list all resource groups and identify the one containing your Synapse workspace:

```

```


How to Authenticate as a User (No Secret)
Login using Azure CLI:

```bash

az login
```
This opens a browser and logs you in as your Azure account.

(Optional) Set default subscription:

```bash
az account set --subscription "<Your Subscription Name or ID>"
```
Run your CLI app — since DefaultAzureCredential checks for the Azure CLI login, it will just work


# 🔧 Azure Credentials Setup Guide (PowerShell Edition)

This guide shows how to retrieve and configure Azure credentials for the `troubleshooter` CLI using **Microsoft Entra ID** authentication — either with a **Service Principal** or your **user account**.

---

## 💡 Supported Authentication Modes

| Mode                | CLI Used      | Secret Required? | Recommended For                |
|---------------------|---------------|------------------|--------------------------------|
| User Account Login  | `az login`    | ❌ No            | Local development, admins      |
| Service Principal   | `az ad sp ...`| ✅ Yes           | Automation, CI/CD              |

---

## 📄 Required `.env` Variables

### ✅ For User Account Authentication (via `az login`)

```dotenv
AZURE_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx   # optional but recommended
AZURE_SUBSCRIPTION_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_RESOURCE_GROUP=your-resource-group-name

```


##Powershell commands
`az login`
`az account show --query id -o tsv`
`az group list --query "[].{name:name}" -o table`

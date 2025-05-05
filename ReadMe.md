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

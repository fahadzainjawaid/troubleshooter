import { getLogs } from '../../src/synapse-troubleshooter.mjs';

export async function handleGetLogs(options) {
    try {
        const result = await getPipelineRun(options.workspace, options.pipeline, options.runId);
        console.log('Run Details:', JSON.stringify(result.runDetails, null, 2));
        console.log('Activity Logs:', JSON.stringify(result.logs, null, 2));
    } catch (err) {
        console.error('Error fetching logs:', err.message);
    }
}
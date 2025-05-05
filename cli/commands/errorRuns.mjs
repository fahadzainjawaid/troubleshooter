import { getLatestErrorRun } from '../../src/synapse-troubleshooter.mjs';

export async function handleErrorRuns(options) {
    try {
        const runId = await getLatestErrorRun(options.workspace, options.pipeline);
        if (runId) {
            console.log(`Most recent failed run ID: ${runId}`);
        } else {
            console.log('No failed runs found.');
        }
    } catch (err) {
        console.error('Error fetching failed runs:', err.message);
    }
}
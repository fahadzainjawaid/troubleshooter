import { validateSynapseWorkspace } from '../../../src/synapse-publish.mjs';

export async function handleValidate(options) {
    try {
        const result = await validateSynapseWorkspace(options.workspace, options.branch);
        console.log('Validation Result:', JSON.stringify(result, null, 2));
    } catch (err) {
        console.error('Validation failed:', err.message);
    }
}
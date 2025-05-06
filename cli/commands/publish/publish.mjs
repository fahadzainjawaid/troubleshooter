import { publishWorkspace } from '../../../src/synapse-publish.mjs';

export async function handlePublish(options) {
    try {
        const result = await publishWorkspace(options.workspace);
        console.log('Publish Result:', JSON.stringify(result, null, 2));
    } catch (err) {
        console.error('Publish failed:', err.message);
    }
}
import { Command } from 'commander';
import { handleValidate } from './commands/publish/validate.mjs';
import { handlePublish } from './commands/publish/publish.mjs';

export function buildAutoSynapseCommand() {
  const autoSynapse = new Command('autoSynapse')
    .description('Automated Synapse deployment commands');

  autoSynapse
    .command('validate')
    .description('Validate a Synapse workspace for a given branch')
    .requiredOption('-w, --workspace <workspace>', 'Synapse workspace name')
    .requiredOption('-b, --branch <branch>', 'Branch name to validate')
    .action(handleValidate);

  autoSynapse
    .command('publish')
    .description('Publish the current state of a Synapse workspace')
    .requiredOption('-w, --workspace <workspace>', 'Synapse workspace name')
    .action(handlePublish);

  return autoSynapse;
}
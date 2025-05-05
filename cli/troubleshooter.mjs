#!/usr/bin/env node

import { Command } from 'commander';
import { handleGetLogs } from './commands/getLogs.mjs';
import { handleErrorRuns } from './commands/errorRuns.mjs';

const program = new Command();
program.name('troubleshooter').description('Azure Synapse pipeline troubleshooting utility').version('1.0.0');

program
    .command('getLogs')
    .description('Get logs for a specific Synapse pipeline run')
    .requiredOption('-w, --workspace <workspace>', 'Synapse workspace name')
    .requiredOption('-p, --pipeline <pipeline>', 'Pipeline name')
    .requiredOption('-r, --runId <runId>', 'Pipeline run ID')
    .action(handleGetLogs);

program
    .command('errorRuns')
    .description('Get most recent failed runId for a pipeline')
    .requiredOption('-w, --workspace <workspace>', 'Synapse workspace name')
    .requiredOption('-p, --pipeline <pipeline>', 'Pipeline name')
    .action(handleErrorRuns);

// Parse CLI args
program.parse(process.argv);
import * as core from '@actions/core';
import {InputOptions} from '@actions/core';
import * as github from '@actions/github';
import * as GitHub from './namespaces/GitHub';
import {createRun} from './checks';
import fetch from 'node-fetch';
import {Finding, Findings} from './namespaces/findings';
import * as Inputs from './namespaces/Inputs';

// prettier-ignore
const prEvents = [
  'pull_request',
  'pull_request_review',
  'pull_request_review_comment',
];

function getSHA(): string {
  let sha = github.context.sha;
  if (prEvents.includes(github.context.eventName)) {
    const pull = github.context.payload.pull_request as GitHub.PullRequest;
    if (pull?.head.sha) {
      sha = pull?.head.sha;
    }
  }
  return sha;
}

async function run(): Promise<void> {
  try {
    core.debug(`Parsing inputs`);
    const inputs = parseInputs(core.getInput);

    core.debug(`Setting up OctoKit`);
    const octokit = github.getOctokit(inputs.token);

    const ownership = {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
    };
    const sha = getSHA();

    if (inputs.repo) {
      const repo = inputs.repo.split('/');
      ownership.owner = repo[0];
      ownership.repo = repo[1];
    }

    const response =
        await fetch(inputs.serverUrl+'/v1/'+inputs.projectId+'/findings', {
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + inputs.ciFuzzToken,
          },
        });

    const text = await response.text();
    const findings: Findings = JSON.parse(text);
    core.debug(
        `Creating a new Run on ${ownership.owner}/${ownership.repo}@${sha}`);
    const findingsFiltered: Findings = {findings:
          getFilteredFindings(findings.findings, inputs.testCollectionRun)};
    const id = await createRun(
        octokit, inputs.name, sha, ownership, inputs, findingsFiltered);
    core.setOutput('check_id', id);
    core.debug(`Done`);
  } catch (e) {
    const error = e as Error;
    core.debug(error.toString());
    core.setFailed(error.message);
  }
}

function getFilteredFindings(findings: Finding[], testCollectionRun: string) {
  if (findings === undefined) {
    return [];
  }

  const filteredFindings:Finding[] = [];
  findings.forEach((finding) => {
    if (finding.campaign_run === testCollectionRun) {
      filteredFindings.push(finding);
    }
  },
  );

  return filteredFindings;
}

type GetInput = (name: string, options?: InputOptions | undefined) => string;

function parseInputs(getInput: GetInput): Inputs.Args {
  const repo = getInput('owner')+'/'+getInput('repository');
  const token = getInput('github_token', {required: true});
  const serverUrl = getInput('dashboard_address', {required: true});
  const projectId = getInput('project', {required: true});
  const ciFuzzToken = getInput('ci_fuzz_api_token', {required: true});
  const testCollectionRun = getInput('test_collection_run', {required: false});

  const name = getInput('name');

  return {
    repo,
    name,
    serverUrl,
    projectId,
    token,
    ciFuzzToken,
    testCollectionRun,
  };
}

void run();

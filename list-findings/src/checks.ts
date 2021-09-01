import {GitHub} from '@actions/github/lib/utils';
import {Args} from './namespaces/Inputs';
import {Finding, Findings} from './namespaces/findings';
import {CheckAnnotation} from './namespaces/CheckAnnotation';

type Ownership = {
    owner: string;
    repo: string;
};

export async function createRun(octokit: InstanceType<typeof GitHub>,
    name: string,
    sha: string,
    ownership: Ownership,
    inputs: Args,
    findings: Findings): Promise<number> {
  const {data} = await octokit.checks.create({
    ...ownership,
    head_sha: sha,
    name: name,
    started_at: formatDate(),
    ...unpackInputs(name, inputs, findings),
  });
  return data.id;
}

function getSummary(findings: Findings, testCollectionRun: string) {
  const okMsg = 'No findings were found!';

  if (testCollectionRun === undefined || testCollectionRun.length == 0) {
    return 'Previous steps failed.';
  }

  if (findings !== undefined && findings.findings !== undefined) {
    const countFindings = findings.findings.length;
    if (countFindings == 0) {
      return okMsg;
    }

    return countFindings + ' findings found!';
  } else {
    return okMsg;
  }
}

function unpackInputs(title: string, inputs: Args, findings: Findings)
    : Record<string, unknown> {
  const annotations = getFindingsStringArray(findings);
  return {
    output: {
      title,
      summary: getSummary(findings, inputs.testCollectionRun),
      annotations: annotations,
    },
    conclusion: annotations.length == 0 ? 'success' : 'failure',
    completed_at: formatDate(),
  };
}

function formatDate(): string {
  return new Date().toISOString();
}

function getFindingsStringArray(findings: Findings): CheckAnnotation[] {
  const findingsArray: CheckAnnotation[] = [];
  if (findings !== undefined && findings.findings !== undefined) {
    findings.findings.forEach((finding) => {
      findingsArray.push(getFindingsString(finding));
    });
  }
  return findingsArray;
}

function getFindingsString(finding: Finding): CheckAnnotation {
  const firstBreakPoint = finding.error_report.debugging_info
      .break_points[0];
  const crashingInput = finding.error_report.input_data;
  return {
    path: firstBreakPoint.source_file_path,
    blob_href: firstBreakPoint.source_file_path,
    annotation_level: 'failure',
    title: finding.error_report.more_details.name,
    message: finding.error_report.more_details.description,
    raw_details: crashingInput ?
            'Crashing input: ' + crashingInput :
            'No crashing input available',
    start_line: firstBreakPoint.location.line,
    end_line: firstBreakPoint.location.line,
  };
}

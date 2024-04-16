# Save Fuzz Test Results

This action starts a fuzzers in CI Sense and monitors the result for
a specified time. If a finding with configurable severity is found
the action will fail.

## Inputs

### `ci_sense_api_token`

**Required** Token generated in the CI Sense web app for authenticating with the CI Sense API.

### `project_name`

**Required** Name of the project in CI Sense.

### `repository_dir`

**Required** Path to the CI Fuzz configured git repository.

### `timeout`

Timeout until the pipeline is marked as 'success' if during that time no failing findings are found.

### `min_findings_severity`

Minimum severity for findings that causes the pipeline to fail. Findings with lower severity are
still reported but do not fail the pipeline. Possible values: 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'.

### `ci_sense_http_url`

CI Sense HTTP API endpoint.

### `fuzz_tests`

Fuzz tests to run.

### `additional_cifuzz_args`

Additional arguments to pass to cifuzz.

## Example usage

```
  name: Save Fuzz Test Results
  uses: CodeIntelligenceTesting/github-actions/save-results@v6
  if: ${{ success() || failure() }}
  with:
    ci_sense_api_token: ${{ secrets.CI_SENSE_API_TOKEN }}
    ci_sense_http_url: https://app.code-intelligence.com
    ci_sense_grpc_url: grpc.code-intelligence.com:443
    project_name: prj-
    started_run: ${{ steps.run-fuzz-tests.outputs.started_run }}
```

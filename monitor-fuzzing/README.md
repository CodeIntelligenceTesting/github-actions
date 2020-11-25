# Monitor Fuzzing

This action monitors a Test Collection run until it finds a crash or times out.

## Inputs

### `ci_fuzz_api_token`

Token generated in the web app for authenticating with the fuzzing server.
If not specified, authentication will be attempted with Cognito.

### `cognito_user`

**Required** Cognito user to authenticate with Code-Intelligence's fuzzing server.

### `cognito_password`

**Required** Password of the Cognito user used to authenticate with Code-Intelligence's fuzzing server.

### `project`

**Required** Name of the project to fuzz.

### `test_collection_run`

**Required** Display Name of the Test Collection run that was started and outputted by the `start-fuzzing` GitHub Action.

### `timeout`

Timeout (in seconds) to monitor the fuzzing. If no crash was found when it times out, the action is considered successful.

**Default** 5 minutes.

### `findings_type`

Comma separated types of findings to monitor. Accepted values: `UNKNOWN_ERROR`, `COMPILATION_ERROR`, `CRASH`, `WARNING`, `RUNTIME_ERROR`.

**Default** `CRASH`.

### `fuzzing_server_address`

URL of Code-Intelligence's gRPC server for fuzzing.
Set this input if you wish to use a fuzzing server other than Code-Intelligence's cloud.

### `dashboard_address`

URL Code-Intelligence's dashboard. Used to display a link to the crash if one is found during fuzzing. 

### `github_token`

GitHub token used by the GitHub API to create a comment in a pull request with a link to the finding.

### `pull_request_number`

Number of the pull request where the comment with the finding link will be created.

### `owner`

Owner of the repository that contains the pull request.

### `repository`

Repository that contains the pull request.

## Example usage

```
uses: CodeIntelligenceTesting/github-actions/monitor-fuzzing@master
with:
  ci_fuzz_api_token: ${{ secrets.CI_FUZZ_API_TOKEN }}
  project: ${{ env.PROJECT_NAME }}
  test_collection_run: ${{ steps.start-fuzzing.outputs.test-collection-run }}
  github_token: ${{ secrets.GITHUB_TOKEN }}
  pull_request_number: ${{ github.event.pull_request.number }}
  owner: ${{ github.event.repository.owner.login }}
  repository: ${{ github.event.repository.name }}
```

# Report Coverage

This action reports the coverage of a Test Collection in a pull request comment.

## Inputs

### `ci_fuzz_api_token`

Token generated in the web app for authenticating with the fuzzing server.
If not specified, authentication will be attempted with Cognito.

### `cognito_user`

**Required** Cognito user to authenticate with Code-Intelligence's fuzzing server.

### `cognito_password`

**Required** Password of the Cognito user used to authenticate with Code-Intelligence's fuzzing server.

### `project`

**Required** Name of the project to be get the coverage from.

### `test_collection_run`

**Required** Name of the Test Collection run that was started and outputted by the `start-fuzzing` GitHub Action.

### `fuzzing_server_address`

URL of Code-Intelligence's gRPC server for fuzzing.
Set this input if you wish to use a fuzzing server other than Code-Intelligence's cloud.

### `dashboard_address`

URL Code-Intelligence's dashboard. Used to display a link for further information. 


### `github_token`

GitHub token used by the GitHub API to create a comment.

### `pull_request_number`

Number of the pull request where the comment with the coverage information will be created.

### `owner`

Owner of the repository that contains the pull request.

### `repository`

Repository that contains the pull request.

### `git_reference`

Git reference used when forming the URL to the files.

## Example usage

```
uses: CodeIntelligenceTesting/github-actions/report-coverage@master
with:
  ci_fuzz_api_token: ${{ secrets.CI_FUZZ_API_TOKEN }}
  project: ${{ env.PROJECT_NAME }}
  test_collection_run: ${{ steps.start-fuzzing.outputs.test-collection-run }}
  github_token: ${{ secrets.GITHUB_TOKEN }}
  pull_request_number: ${{ github.event.pull_request.number }}
  owner: ${{ github.event.repository.owner.login }}
  repository: ${{ github.event.repository.name }}
  git_reference: ${{ github.sha }}
```

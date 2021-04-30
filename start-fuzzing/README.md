# Start Fuzzing

This action builds and starts fuzzing a Test Collection.

## Inputs

### `ci_fuzz_api_token`

Token generated in the web app for authenticating with the fuzzing server.
If not specified, authentication will be attempted with Cognito.

### `cognito_user`

Cognito user to authenticate with Code-Intelligence's fuzzing server.

### `cognito_password`

Password of the Cognito user used to authenticate with Code-Intelligence's fuzzing server.

### `project`

Resource name of the project to fuzz. Either `project` or `test_collection` is required.

### `test_collection`

Full name of the Test Collection to fuzz. Either `project` or `test_collection` is required.

### `report_email`

E-mail to receive crash reports.

### `fuzzing_server_address`

URL of Code-Intelligence's gRPC server for fuzzing.
Set this input if you wish to use a fuzzing server other than Code-Intelligence's cloud.

### `git_reference`

Git reference used when pulling code from the repository to be fuzzed.

## Outputs

### `test_collection_run`

Name of the test collection run that was just started, it will be used as input for the `monitor-fuzzing` GitHub Action.

## Example usage

```
uses: CodeIntelligenceTesting/github-actions/start-fuzzing@master
with:
  ci_fuzz_api_token: ${{ secrets.CI_FUZZ_API_TOKEN }}
  project:           "projects/myProject"
  report_email:      "my@email.com"
  git_reference:     ${{ github.sha }}
```

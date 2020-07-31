# Start Fuzzing

This action builds and starts fuzzing a Test Collection.

## Inputs

### `cognito-user`

**Required** Cognito user to authenticate with Code-Intelligence's fuzzing server.

### `cognito-password`

**Required** Password of the Cognito user used to authenticate with Code-Intelligence's fuzzing server.

### `project`

**Required** Name of the project to fuzz.

### `test-collection`

**Required** Name of the Test Collection to fuzz.

### `report-email`

E-mail to receive crash reports.

### `fuzzing-server-address`

URL of Code-Intelligence's gRPC server for fuzzing.
Set this input if you wish to use a fuzzing server other than Code-Intelligence's cloud.

## Outputs

### `test-collection-run`

Name of the test collection run that was just started, it will be used as input for the `monitor-fuzzing` GitHub Action.

## Example usage

```
uses: CodeIntelligenceTesting/github-actions/start-fuzzing@master
with:
  cognito_user: ${{ secrets.COGNITO_USER }}
  cognito_password: ${{ secrets.COGNITO_PASSWORD }}
  project: "project_test"
  test_collection: "fuzz_api_DoStuff"          
  report_email: "my@email.com"
```
# Monitor Fuzzing

This action monitors a Test Collection run until it finds a crash or times out.

## Inputs

### `cognito_user`

**Required** Cognito user to authenticate with Code-Intelligence's fuzzing server.

### `cognito_password`

**Required** Password of the Cognito user used to authenticate with Code-Intelligence's fuzzing server.

### `project`

**Required** Name of the project to fuzz.

### `test_collection_run`

**Required** Name of the Test Collection run that was started and outputted by the `start-fuzzing` GitHub Action.

### `timeout`

Timeout (in seconds) to monitor the fuzzing. If no crash was found when it times out, the action is considered successful.

**Default** 5 minutes.

### `findings_type`

Comma separated types of findings to monitor. Accepted values: `UNKNOWN_ERROR`, `COMPILATION_ERROR`, `CRASH`, `WARNING`, `RUNTIME_ERROR`.

**Default** `UNKNOWN_ERROR,COMPILATION_ERROR`.

### `fuzzing_server_address`

URL of Code-Intelligence's gRPC server for fuzzing.
Set this input if you wish to use a fuzzing server other than Code-Intelligence's cloud.

### `dashboard_address`

URL Code-Intelligence's dashboard. Used to display a link to the crash if one is found during fuzzing. 


## Example usage

```
uses: CodeIntelligenceTesting/github-actions/monitor-fuzzing@master
with:
  cognito_user: ${{ secrets.COGNITO_USER }}
  cognito_password: ${{ secrets.COGNITO_PASSWORD }}
  project: ${{ env.PROJECT_NAME }}
  test_collection_run: ${{ steps.start-fuzzing.outputs.test-collection-run }}
```

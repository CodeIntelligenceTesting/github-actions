# Monitor Fuzzing

This action monitors a Test Collection run until it finds a crash or times out.

## Inputs

### `cognito-user`

**Required** Cognito user to authenticate with Code-Intelligence's fuzzing server.

### `cognito-password`

**Required** Password of the Cognito user used to authenticate with Code-Intelligence's fuzzing server.

### `project`

**Required** Name of the project to fuzz.

### `test-collection-run`

**Required** Name of the Test Collection run that was started and outputted by the `start-fuzzing` GitHub Action.

### `timeout`

Timeout (in seconds) to monitor the fuzzing. If no crash was found when it times out, the action is considered successful.

**Default** 5 minutes.

### `fuzzing-server-address`

URL of Code-Intelligence's gRPC server for fuzzing.
Set this input if you wish to use a fuzzing server other than Code-Intelligence's cloud.

## Example usage

```
uses: CodeIntelligenceTesting/github-actions/monitor-fuzzing@master
with:
  cognito-user: ${{ secrets.COGNITO_USER }}
  cognito-password: ${{ secrets.COGNITO_PASSWORD }}
  project: ${{ env.PROJECT_NAME }}
  test-collection-run: ${{ steps.start-fuzzing.outputs.test-collection-run }}
```

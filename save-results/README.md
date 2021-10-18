# Save Fuzz Test Results

This action retreives the findings and code coverage for a campaign run and stores them in the files 
`findings.json` and `coverage.json`. Using the `actions/upload-artifact@v2` action these can be saved
in a workflow archive.

Note: The cifuzz GitHub App relies on this workflow artifact to post pull request comments.

## Inputs

### `ci_fuzz_api_token`

**Required** Token generated in the web app for authenticating with the fuzzing server.

### `project`

**Required** Name of the project to be get the coverage from.

### `test_collection_run`

**Required** Resource Name of the Test Collection run that was started and outputted by the `start-fuzzing` GitHub Action.

### `fuzzing_server_address`

URL of Code-Intelligence's gRPC server for fuzzing.
Set this input if you wish to use a fuzzing server other than Code-Intelligence's cloud.


### `dashboard_address`

URL Code-Intelligence's dashboard. Used to display a link to the crash if one is found during fuzzing. 

## Example usage

```
uses: CodeIntelligenceTesting/github-actions/save-results@master
if: ${{ github.event_name == 'pull_request' && (success() || failure()) }}
with:
  test_collection_run: ${{ steps.start-fuzzing.outputs.test_collection_run }}
  ci_fuzz_api_token: ${{ secrets.CI_FUZZ_API_TOKEN }}
  fuzzing_server_address: ${{ env.FUZZING_SERVER_ADDRESS }}
  project: ${{env.PROJECT_ID}}
  dashboard_address: ${{ env.WEB_APP_ADDRESS }}
```

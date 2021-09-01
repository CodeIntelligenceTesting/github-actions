# List Findings

This action lists the findings found in the previous actions using the Checks API.

## Inputs

### `ci_fuzz_api_token`

**Required** Token generated in the web app for authenticating with the fuzzing server.

### `github-token`

**Required** GitHub token used by the GitHub Checks API to create a check with the findings as annotations.

### `serverUrl`

**Required** URL Code-Intelligence's dashboard. Used to call the specific REST-API.

### `projectId`

**Required** Name of the project to fuzz.

### `owner`

**Required** Owner of the repository that contains the pull request.

### `repository`

**Required** Repository that contains the pull request.

### `name` 

**Required** Display name of the check

### `test_collection_run`

**Required** Display Name of the Test Collection run that was started and outputted by the start-fuzzing GitHub Action.

## Example usage

```
    uses: CodeIntelligenceTesting/github-actions/list-findings@master   
    if: ${{ github.event_name == 'pull_request' && (success() || failure()) }}
    with:
      name: 'CI Fuzz Findings'
      test_collection_run: ${{ steps.start-fuzzing.outputs.test_collection_run }}
      ci-fuzz-api-token: ${{ secrets.CI_FUZZ_API_TOKEN }}
      serverUrl: ${{env.WEB_APP_ADDRESS}}
      projectId: ${{env.PROJECT_ID}}
      github-token: ${{ secrets.GITHUB_TOKEN }}
      owner: ${{ github.event.repository.owner.login }}
      repository: ${{ github.event.repository.name }}  
```

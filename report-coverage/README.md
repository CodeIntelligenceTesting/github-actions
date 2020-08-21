# Report Coverage

This action reports the coverage of a Test Collection in a pull request comment.

## Inputs

### `cognito_user`

**Required** Cognito user to authenticate with Code-Intelligence's fuzzing server.

### `cognito_password`

**Required** Password of the Cognito user used to authenticate with Code-Intelligence's fuzzing server.

### `project`

**Required** Name of the project to be get the coverage from.

### `test_collection`

**Required** Name of the Test Collection to get the coverage from.

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

## Example usage

```
uses: CodeIntelligenceTesting/github-actions/report-coverage@master
with:
  cognito_user: ${{ secrets.COGNITO_USER }}
  cognito_password: ${{ secrets.COGNITO_PASSWORD }}
  project: ${{ env.PROJECT_NAME }}
  test_collection: "my_test_collection"  
  github_token: ${{ secrets.GITHUB_TOKEN }}
  pull_request_number: ${{ github.event.pull_request.number }}
  owner: ${{ github.event.repository.owner.login }}
  repository: ${{ github.event.repository.name }}
```

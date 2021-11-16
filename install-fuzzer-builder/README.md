# Install Fuzzer Build Tools

This action installs ci-build and dependant tools into the current workspace.
Subsequent action can access the `ci-fuzz/bin/ci-build` binary to build a fuzzing artifact.

## Outputs

The tools are installed into `{{ github.workspace }}/ci-fuzz`.

## Example usage

```yaml
- id: install-build-tools
  uses: CodeIntelligenceTesting/github-actions/install-fuzzer-builder@v3
- id: build-fuzzers
  run: ci-fuzz/bin/ci-build fuzzers --directory $GITHUB_WORKSPACE/checkout-dir/ 
  shell: "bash"
```
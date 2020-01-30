# Hello World

[![License: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

This action loads and executes a private Action. This allows private actions to be reused in other private repositories. All inputs are passed down into the private action. All outputs of the private actions are passed back to the loader action.

---

## **Inputs**

### **`pal-repo-token`**

**Required** An access token with the [repo](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) scope to the repository containing the action. **This should be stored as a [repo secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)**.

---

## **Outputs**

### **`pal-repo-token`**

An access token with the [repo](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) scope to the repository containing the action. **This should be stored as a [repo secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)**.

---

## **Examples**

### Example usage w/ pal-action-directory

```yaml
- uses: invisionapp/private-action-loader@v3
  with:
    pal-repo-token: ${{ secrets.REPO_TOKEN }}
    pal-repo-name: some-org/super-secret-action
    pal-action-directory: src/super-secret-nested-action
```

---

## **Limitations**

- Only supports javascript actions
- There is very little error handling so far

# action-gen

Node CLI tool that generates an `action.yml` and `README.md` for GitHub Actions from a config file. It is further intended to keep both `action.yml` and `README.md` in sync after initial generation by relying on a single source of truth (the config) for changes.

---

## Usage

```
action-gen [options]
```

### Options

- `--actionDirectory [relative path to directory containing action]` (shorthand: `-a`)
  - Optional
  - Defaults to `./` if omitted
  - Relative path to the directory containing `action.yml`, `README.md` and `.actionrc.[js|json]`
- `--config [relative path to action config file]` (shorthand: `-c`)
  - Optional
  - Defaults to `./.actionrc.js` if omitted
  - Relative path to the config file. `js` and `json` are the only supported configurations.
- `--init` (shorthand: `-i`)
  - Optional
  - Generates starter config, action and readme in `./` unless `--actionDirectory` also specified

---

## Examples

### Create new configuration

For use when creating a brand new Action. This will generate a boilerplate `.actiongenrc.js` with all possible options, then generate an `action.yml` and `README.md` from the boileplate template.

- Initialize `.actiongenrc.js`, `action.yml` and `README.md` in `./`

  ```
  action-gen init
  ```

- Initialize `.actiongenrc.js`, `action.yml` and `README.md` in subdirectory `./some/dir`

  ```
  action-gen init -a ./some/dir
  ```

### Create new configuration from existing action.yml

Generates a new `.actiongenrc.js` from an existing `action.yml`. This is useful in existing projects where maintaining the action.yml and README.md is desired from a single source of truth.

- Generate `.actiongenrc.js` in `./` from an existing `action.yml`

  ```
  action-gen -f ./action.yml
  ```

- Generate `.actiongenrc.js` in subdirectory `./some/dir` from an existing `action.yml`

  ```
  action-gen init -a ./some/dir -f ./some/dir/.actiongenrc.js
  ```

### Generate or synchronize action.yml and README.md

Generates new or synchronizes an existing action.yml and README.md from an existing `.actiongenrc.js`

- Generate/sync action in `./`

  ```
  action-gen generate
  ```

- Generate/sync action in `./some/dir`

  ```
  action-gen generate -a ./some/dir
  ```

- Generate/sync action in `./some/dir` with config in different directory

  ```
  action-gen -a ./some/dir -c ./configs/some-config.js
  ```

---

## Suggested Pairings

Once Actions are being maintained by an `.actiongenrc.js` config file, it's easy to automate the synchronization of `action.yml` and `README.md` as part of a pre-commit hook. [Husky](https://www.npmjs.com/package/husky) makes running sync scripts on `pre-commit` hooks easy.

```
npm install --save-dev action-gen husky
```

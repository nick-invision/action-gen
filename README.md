# action-gen

CLI tool that generates an `action.yml` and `README.md` for GitHub Actions from a config file. It is further intended to keep both `action.yml` and `README.md` in sync after initial generation by relying on a single source of truth (the config) for changes.

---

## TL;DR

- Initialize action in `./`

  ```
  action-gen -i
  ```

- Initialize action in subdirectory `./some/dir`

  ```
  action-gen -i -a ./some/dir
  ```

- Generate/sync action in `./`

  ```
  action-gen
  ```

- Generate/sync action in `./some/dir`

  ```
  action-gen -a ./some/dir
  ```

- Generate/sync action in `./some/dir` with config in different directory

  ```
  action-gen -a ./some/dir -c ./configs/some-config.js
  ```

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

## Suggested Pairings

```

npm install --save-dev action-gen husky lint-staged

```

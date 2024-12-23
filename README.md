# Project Introduction

    The goal is to develop an application based on Electron, referencing the architecture of engines like Cocos and editors like VSCode. We aim to learn from well-known applications such as NetEase Cloud Music and Bilibili. The project will cover a wide range of technologies, requiring careful consideration of the overall project structure. This project is mainly for learning purposes. While our technical skills are average, our ambitions are high, "I am a man who aims to become the Pirate King."

[Chinese](./README.zh-CN.md) | **English**

## Dependency Installation

    - `-D` == `--save-dev` == `devDependencies` == Development Environment
    - `-S` == `--save` == `dependencies` == Production Environment

> electron:
>
> Desktop Application

```shell
npm install electron --save-dev
```

> react:
>
> Frontend Library

```shell
npm install react react-dom
npm install @types/react @types/react-dom --save-dev
```

> eslint:
>
> Syntax Checker

```shell
npm init @eslint/config

# After selection, it prompts for installation (equivalent to)
npm install -D eslint globals @eslint/js typescript-eslint eslint-plugin-react

# Further installation requirements
npm install -D @typescript-eslint/parser
```

> gulp:
>
> Automation Build Tool

```shell
npm install -D  gulp
```

> prettier:
>
> Code Style Formatter

```shell
npm install -D prettier
```

> husky
> Commit Message Standardization and Code Validation

```shell
npm install -D @commitlint/{config-conventional,cli} husky
```

> CSS related - Utilities, Animation Styles

```shell

```

> 2D Rendering Library

```shell
npm install -S fabric
```

> 3D Rendering Library

```shell
npm install -S three
```

### Installation Issue Records

---

## Style Guidelines

### Commit Conventions

| Abbreviation | Description                                                              | Example                                                 |
| ------------ | ------------------------------------------------------------------------ | ------------------------------------------------------- |
| feat         | Add new features                                                         | `feat(user): Add user registration feature`             |
| fix          | Fix code errors                                                          | `fix(auth): Fix login failure issue`                    |
| docs         | Update documentation                                                     | `docs(readme): Update README file`                      |
| style        | Modify code style without affecting functionality                        | `style(icons): Unify icon styles`                       |
| refactor     | Refactor code without adding/removing features                           | `refactor(components): Refactor component structure`    |
| perf         | Performance optimization                                                 | `perf(api): Optimize API response speed`                |
| test         | Add or modify test code                                                  | `test(unit): Add unit test coverage`                    |
| dep          | Install and configure tool dependencies                                  | `dep(linter): Configure ESLint rules`                   |
| build        | Changes in build tools or external dependencies                          | `build(webpack): Upgrade Webpack version`               |
| ci           | Modify continuous integration configuration                              | `ci(jenkins): Integrate Jenkins CI`                     |
| chore        | Other changes that do not affect code execution                          | `chore(dependencies): Update dependency versions`       |
| revert       | Revert previous commits                                                  | `revert: Revert last commit`                            |
| workflow     | Improve or update workflows                                              | `workflow(publish): Automate release process`           |
| mod          | Adjustments in code or modules not clearly belonging to other categories | `mod(styles): Adjust global styles`                     |
| wip          | Work in progress, mark development commits                               | `wip: In development, not completed yet`                |
| types        | Changes in type definition files                                         | `types(interface): Add user interface type definitions` |
| release      | Version release related changes                                          | `release(version): Release v1.0.0 version`              |
| merge        | Branch merge operations                                                  | `merge(branch): Merge develop branch into master`       |
| bug          | Fix non-functional issues or minor bugs                                  | `bug(syntax): Fix syntax error`                         |
| del          | Delete code or files                                                     | `del(deprecated): Remove deprecated code`               |
| assets       | Add resources                                                            | `asset(icns): Add some Icns icons`                      |
| base         | Basic project build process                                              | `base(git): Configure/update git ignore file`           |
| editor       | Editor configuration and modifications                                   | `editor(vscode): Configure vscode`                      |

---

## Project Architecture

### Directory Structure

> Character Explanation
>
> - `None` means there is no such item
> - `Ignore` is ignored by Git
> - `SG` is automatically generated directories or files
> - `UNG` is manually generated directories or files
> - `File` indicates file type
> - `Folder` indicates directory type
> - `Pedding` indicates potential changes later (ignored by Git)

- **Folder** `.vscode`: VS Code editor configuration directory
- **Folder** `.config`: Project configuration directory
- **Folder-Ignore-SG** `app`: Output directory for source code after compilation
- **Folder-Ignore-SG** `backup`: Directory for local temporary backup files
- **Folder-Ignore-SG** `cache`: Main process runtime cache directory
- **Folder** `docs`: Documentation directory for learning records

- **Folder** `gulp`: Gulp build tool configuration directory

  - **Folder** `tasks`: Gulp task directory
  - **Folder** `utils`: Gulp utility directory

- **Folder** `core`: Extension directory, application environment, main logic, and core functionalities, not packed into asar (stored in `app.asar.unpacked`)

  - **Folder** `bin`: Application runtime environment directory
    - **Folder** `.cache`: Runtime environment cache
  - **Folder-Pedding** `builtin`: External files directory
  - **Folder** `extensions`: Directory for application extension plugins, such as React plugins.
  - **Folder** `packages`: Contains multiple independent sub-modules or packages
  - **Folder** `polyfill`: Provides missing functions or APIs to support modern JavaScript features or browser functionalities in older environments.
  - **Folder-Pedding** `external`: External files directory
  - **Folder** `internal`: Internal files, such as template files.
  - **Folder-Pedding** `node_modules.asar.unpacked`: Directory for node js script dependencies in `extend`.

- **Folder** `licenses`: Directory for software license agreement terms (multi-language versions, e.g., `LICENSE-chs.rtf` Simplified Chinese, `LICENSE-cht.rtf` Traditional Chinese, `LICENSE-jpn.rtf` Japanese, etc.)

- **Folder-Ignore-SG** `private`: Directory for private files that cannot be open-sourced, only providing structure and generation methods.

  - **Folder-Ignore-SG** `ssl`: Directory for SSL certificate files required by `https` protocol
  - **Folder-Ignore-SG** `secret`: Directory for important files like account passwords

- **Folder** `public`: Static resource files directory, files hosted on the web.

  - **Folder** `assets`: Directory for static resources
    - **Folder** `atlas`: Directory for `.icns` files
    - **Folder** `images`: Directory for images

- **Folder-Ignore-SG** `release`: Output directory for application builds.

- **Folder** `resources`: Static files included in packaging or compilation (stored in `app.asar.unpacked`)

  - **Folder** `icon`: Application icons
  - **Folder** `text`: Text files

- **Folder-Ignore-SG** `local`: Application configuration directory

- **Folder** `source`: Source code directory for the application (src)

  - **Folder** `common`: Common files, such as common variables and functions
  - **Folder** `electron`: Main process directory
  - **Folder** `preload`: Preload process directory
  - **Folder** `src`: Renderer process directory

- **Folder** `temp`: Temporary files directory, hoping not to be lost accidentally in git history but not very useful.
- **Folder** `template`: Various learning example directories
- **Folder** `test`: Various learning example directories
- **Folder** `types`: Type definition directory
- **File** `.gitattributes`: A configuration file in Git version control system used to specify how file attributes and behaviors are handled
- **File** `.gitignore`: Git ignore configuration
- **File** `package.json`: npm configuration file
- **File** `README.md`: Project introduction
- **File** `LICENSE`: Open-source license (MIT)
- **File-None** `LICENSE.rtf`: Software license agreement term (Simplified Chinese version)

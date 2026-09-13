# react-native-HelloCxxModule

> A sample of React Native CxxModule on Android

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Repository Structure](#repository-structure)
4. [Key Components](#key-components)
5. [Setup & Installation](#setup--installation)
6. [Running the Application](#running-the-application)
7. [Infrastructure & CI/CD](#infrastructure--cicd)
8. [Contributing](#contributing)

---

## Overview

**react-native-HelloCxxModule** is part of the [Unacademy](https://github.com/unacademy) engineering ecosystem.

A sample of React Native CxxModule on Android

**Topics / Tags:** `approvers-1`

---

## Tech Stack

| Attribute | Value |
|-----------|-------|
| **Primary Language** | Unknown |
| **Framework / Platform** | React Native |
| **Package Manager** | — |

### Dependencies

**Runtime Dependencies:**
- `react`
- `react-native`

**Dev Dependencies:**
- `@babel/core`
- `@babel/runtime`
- `@react-native-community/eslint-config`
- `babel-jest`
- `eslint`
- `jest`
- `metro-react-native-babel-preset`
- `patch-package`
- `react-test-renderer`


---

## Repository Structure

```
react-native-HelloCxxModule/
├── .babelrc
├── .buckconfig
├── .eslintrc.js
├── .flowconfig
├── .gitattributes
├── .gitignore
├── .watchmanconfig
├── App.js
├── LICENSE
├── README.md
├── __tests__
├── android/
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
├── app.json
├── babel.config.js
├── index.js
├── ios/
│   ├── HelloCxxModule
│   ├── HelloCxxModule-tvOS
│   ├── HelloCxxModule-tvOSTests
│   ├── HelloCxxModule.xcodeproj
│   ├── HelloCxxModule.xcworkspace
├── metro.config.js
├── package.json
├── patches
├── yarn.lock
```

---

## Key Components

Below is an analysis of the key files and modules:

| File / Directory | Purpose |
|-----------------|---------|
| `App.js` | Source file |
| `LICENSE` | Source file |
| `README.md` | Source file |
| `__tests__/App-test.js` | Source file |
| `android/app/BUCK` | Source file |
| `android/app/build.gradle` | Source file |
| `android/app/build_defs.bzl` | Source file |
| `android/app/proguard-rules.pro` | Source file |
| `android/app/src/debug/AndroidManifest.xml` | Source file |
| `android/app/src/main/AndroidManifest.xml` | Source file |
| `android/app/src/main/java/com/hellocxxmodule/HelloCxxPackage.java` | Source file |
| `android/app/src/main/java/com/hellocxxmodule/MainActivity.java` | Source file |
| `android/app/src/main/java/com/hellocxxmodule/MainApplication.java` | Source file |

> **Note:** Only the first 20 non-trivial files are listed. See the repository tree above for the complete structure.

---

## Setup & Installation

### Prerequisites

- Git (`git --version`)
- Unknown runtime installed



### Steps

```bash
# 1. Clone the repository
git clone git@github.com:unacademy/react-native-HelloCxxModule.git
cd react-native-HelloCxxModule

# 2. Install dependencies
npm install      # or yarn install
```

### Available Scripts

```bash
# start
npm run start   # react-native start

# test
npm run test   # jest

# lint
npm run lint   # eslint .

# prepare
npm run prepare   # patch-package

```


---

## Running the Application

```bash
npm run start   # react-native start
```

---

## Infrastructure & CI/CD

- Test suite present — run tests before submitting PRs

---

## Contributing

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Commit your changes: `git commit -m "feat: describe your change"`
3. Push and open a PR targeting `master`
4. Ensure all CI checks pass before requesting review

---

## Original README (Excerpt)

> # react-native-HelloCxxModule
Code sample of React Native CxxModule introduction at https://medium.com/@kudochien/how-to-write-a-react-native-cxxmodule-59073259f15d

---

*This README was auto-generated on 2026-09-14 by the Unacademy repo-summarizer tool.*
*For corrections or additions, edit this file directly or open an issue.*

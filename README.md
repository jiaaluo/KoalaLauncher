# KoalaLauncher

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub issues](https://img.shields.io/github/issues-raw/KoalaDevs/KoalaLauncher.svg)](https://github.com/KoalaDevs/KoalaLauncher/issues) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/213eb618fa59424fba7ccfcd4f1b6a09)](https://www.codacy.com/manual/KoalaDevs/KoalaLauncher?utm_source=github.com&utm_medium=referral&utm_content=KoalaDevs/KoalaLauncher&utm_campaign=Badge_Grade) [![GitHub pull requests](https://img.shields.io/github/issues-pr/KoalaDevs/KoalaLauncher.svg)](https://github.com/KoalaDevs/KoalaLauncher/pulls)[![PRs Welcome](https://img.shields.io/github/license/KoalaDevs/KoalaLauncher.svg)](http://makeapullrequest.com) ![Electron CD](https://github.com/KoalaDevs/KoalaLauncher/workflows/Electron%20CD/badge.svg?branch=next) ![Discord](https://img.shields.io/discord/398091532881756161.svg) ![David](https://img.shields.io/david/KoalaDevs/KoalaLauncher.svg) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/KoalaDevs/KoalaLauncher.svg)![](https://img.shields.io/github/release/KoalaDevs/KoalaLauncher.svg?style=flat)
![Github All Releases](https://img.shields.io/github/downloads/KoalaDevs/KoalaLauncher/total.svg)

<details>
 <summary><strong>Table of Contents</strong> (click to expand)
</summary>

- [KoalaLauncher](#gdlauncher)
  - [🎮 What is KoalaLauncher](#-what-is-gdlauncher)
  - [⚡️ Comparison with Twitch Launcher](#-comparison-with-twitch-launcher)
  - [🚀 Getting Started](#-getting-started)
  - [🎮 Download](#-download)
  - [🎨 Features](#-features)
    - [Our features:](#our-features)
    - [You can also:](#you-can-also)
    - [Some of the features we are still working on are:](#some-of-the-features-we-are-still-working-on-are)
  - [💾 Compilation](#-compilation)
    - [⚙️ Requirements](#%EF%B8%8F-requirements)
    - [▶️ Steps](#%EF%B8%8F-steps)
    - [🚚 Packaging](#-packaging)
  - [🚀 Technologies](#-technologies)
  - [🎁 Contributing](#-contributing)
  - [❤️ Author](#-author)
  - [📜 History](#-history)
  - [🎓 License](#-license)
  </details>

<p align="center">
    <img width="800" height="auto" src="https://koala.crankysupertoon.live/showcase.jpg" alt="KoalaLauncher" />
</p>

## 🎮 What is KoalaLauncher

KoalaLauncher is a custom open-source Minecraft launcher written from the ground up in electron/react. Its main goal is to make it easy and enjoyable to manage different Minecraft versions and install `forge/fabric`, bringing the playing and modding experience to the next level!

## ⚡️ Comparison with Twitch Launcher

This is an example of the time that KoalaLauncher takes to install a modpack in comparison to Twitch. Both tests are running at the same time over a 1Gbps network to ensure that the network doesn't impact the comparison.

- KoalaLauncher: `0.52m`
- Twitch Launcher: `2.25m`

<p align="center">
    <img width="800" height="auto" src="https://koala.crankysupertoon.live/comparison.gif" alt="KoalaLauncher" />
</p>

## 🚀 Getting Started

Below you will find everything you need to know about the launcher. If you want to download the latest stable release you can do it from our official website ([koala.crankysupertoon.live](https://koala.crankysupertoon.live)). If you want to test the possibly unstable features, you can clone the repo and compile it yourself.

## 🎮 Download

To download the latest version, you can either click [here](https://github.com/KoalaDevs/KoalaLauncher/releases) and select the appropriate version for your operating system or visit our [website](https://koala.crankysupertoon.live).

## 🎨 Features

#### Our features:

- Java downloader. You don't need to have java installed, a suitable version will be downloaded automatically.
- It's as easy as pie to install the `vanilla` game, `forge`, `fabric`, and all `twitch modpacks`. No further action from the user is required.
- Install `mods` for both fabric and forge directly from our UI
- Built-in auto-updater. The launcher will always keep itself updated to the latest release.
- Easily manage multiple `accounts` and switch between them.
- Still playing on your grandma pc from the 80s? Don't worry, we got you covered with our `Potato PC Mode`!

#### You can also:

- Import modpacks from other launchers
- Keep track of the time you played each instance
- Add instances to the download queue, they will automatically download one after the other
- Manage your Minecraft skin directly from the launcher

#### Some of the features we are still working on are:

- Drag and drop instances wherever you like them, just like in your desktop
- Export instances to other launchers
- Liteloader support
- Optifine easy-installation support
- A lot more...

## 💾 Compilation

These are the steps to compile it yourself.

### ⚙️ Requirements

You need the following software installed:

- [NodeJS](https://nodejs.org/en/download/) (> v14.8.0 x64)
- [Rust](https://www.rust-lang.org/)
- C++ compiler (g++ or windows build tools)

### ▶️ Steps

Install the dependencies and devDependencies.

```sh
yarn
```

Start the development environment

```sh
yarn dev
```

For production environment...

```sh
yarn build
yarn start-prod
```

### 🚚 Packaging

To package the app for the local platform:

```sh
yarn release
```

## 🚀 Technologies

- [Javascript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [NodeJS](https://nodejs.org/en/)
- [Electron](https://electronjs.org/)
- [Codacy](https://www.codacy.com/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [ESLint](https://eslint.org/)
- [Ant Design](https://ant.design/)
- [Styled Components](https://styled-components.com/)
- [Rust](https://www.rust-lang.org/)

## 🎁 Contributing

You can find a list of unassigned tasks [here](https://github.com/KoalaDevs/KoalaLauncher/projects). Feel free to ask anything on our discord if you need help or want other tasks.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
6. Hope it gets merged.

## ❤️ Author

- **Davide Ceschia** - _Main Developer_ - [KoalaDevs](https://github.com/KoalaDevs)

See also the list of [contributors](https://github.com/KoalaDevs/KoalaLauncher/contributors) who participated in this project.

## 📜 History

This project started as a way for me to learn programming and get better at it. I initially developed it in C#.

After a while, I didn't really like the language, so I just started it again from scratch in React and Electron.
It was here that a community started gathering around the project. In the meanwhile, I also found a job where I could learn even more about best practices, data structures, and more.

This is why I decided to rewrite it completely one more time, applying all the knowledge I gained at that time, and that made it possible to implement a lot of really cool features, that were really complicated to code from a technical point of view.

Here you can find the previous versions of the code:

- [Original C# Code](https://www.github.com/KoalaDevs/KoalaLauncher/tree/csharp_legacy_launcher)
- [First React Version](https://www.github.com/KoalaDevs/KoalaLauncher/tree/KoalaLauncher_old)

## 🎓 License

This project is licensed under the GNU GPL V3.0 - see the [LICENSE](LICENSE) file for details.

If you need KoalaLauncher licensed under different conditions, please contact davide@koala.crankysupertoon.live

A simple way to keep in terms of the license is by forking this repository and leaving it open source under the same license. We love free software, seeing people use our code and then not share the code, breaking the license, is saddening. So please take a look at the license and respect what we're doing.

Also, while we cannot enforce this under the license, you cannot use our CDN/files/assets on your own launcher. Again we cannot enforce this under the license, but needless to say, we'd be very unhappy if you did that and really would like to leave cease and desist letters as a last resort.

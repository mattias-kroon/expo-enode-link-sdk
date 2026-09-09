# Changelog

## Unpublished

### 🛠 Breaking changes

### 🎉 New features

### 🐛 Bug fixes

### 💡 Others

## 1.1.0 — fork, native SDKs brought up to date

First release of the Iternio fork. No JavaScript API changes: `show()`,
`listenToResult()` and the `ResultCode` union are unchanged, so consumers need
no code changes.

### 🎉 New features

- **iOS: LinkKit 1.0.6 → 1.0.12** (`ios/Frameworks/LinkKit.xcframework`, from
  `enode/enode-link-ios` tag `1.0.12`). Minimum iOS stays 13.1 and no new system
  frameworks are linked, so the podspec is unchanged.
- **Android: `io.enode:linkkit` 1.0.4 → 1.0.8.** Transitive dependencies are
  identical between the two versions.
- LinkKit 1.0.12 adds a `PresentationStyle` (`.pageSheet` / `.fullScreen`) to
  `Handler.init` and the SwiftUI helpers. It defaults to `.pageSheet`, which is
  the behaviour this module already had, so nothing is exposed through the JS
  API — worth wiring up if a full-screen link flow is ever wanted, but it has no
  Android equivalent.

### 🐛 Bug fixes

These three were previously carried in ABRP as
`patches/@youssefhenna+expo-enode-link-sdk+1.0.4.patch` and are now in source;
**delete that patch file when moving to this fork.**

- **iOS: don't force-unwrap the presenting view controller.** `show()` resolved
  `currentViewController()!` eagerly and crashed when it was nil. It is now
  resolved on the main queue, immediately before presenting, and bails out
  safely if there is none.
- **Android: use `Exceptions.PermissionsModuleNotFound()`** instead of the
  removed `expo.modules.core.errors.ModuleNotFoundException`.
- **Android: set `jvmTarget` to 17 unconditionally.** It was nested inside the
  `AGP < 8` branch and left at 11, which mismatches Java on AGP 8+ where
  `expo-modules-core` compiles at 17.

### 💡 Others

- README now records which native SDK versions are bundled and how to update
  each platform.

## 1.1.1 — make git installs actually work

- **Commit `build/`** (the compiled TypeScript that `main`/`types` point at) and
  un-ignore the root `build/` in `.gitignore`, leaving `android/build/` and
  `example/ios/build/` ignored.
- **Remove the `prepare` script.** `expo-module prepare` runs
  `expo-module-clean` before rebuilding, so on a git install it deleted `build/`
  and then failed — no devDependencies present, and it also tries to build the
  `plugin/` directory, which has no tsconfig. The result was a package with no
  `build/` at all and an unresolvable `main`. Use `yarn build` after editing
  `src/` and commit the output.

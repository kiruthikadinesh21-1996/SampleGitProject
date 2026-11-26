# Playwright Learning

This project turns the Day 1 notes into runnable examples. The demo app and API run locally, so the tests do not depend on a public website.

## Setup

```powershell
npm.cmd install
npx.cmd playwright install
npm.cmd test
```

`npm.cmd` avoids the PowerShell script-execution restriction that can block `npm.ps1`.

## Examples in the tests

| Topic | Where to look |
| --- | --- |
| Accessible locators, auto-waiting, and assertions | `tests/ui.spec.js` |
| New tabs, frames, and open shadow DOM | `tests/ui.spec.js` |
| Network interception and parameterized cases | `tests/ui.spec.js` |
| API GET, POST, response data, and invalid input | `tests/api.spec.js` |
| Reusing login cookies and local storage in another context | `tests/context.spec.js` |
| Mobile viewport emulation | `tests/mobile.spec.js` |
| Chromium, Firefox, WebKit, trace, screenshot, and video settings | `playwright.config.js` |
| CI execution | `.github/workflows/playwright.yml` |

The local demo server is started automatically by the Playwright configuration. To open it manually, run `npm.cmd run demo`.

## Useful commands

```powershell
npm.cmd run test:chromium
npm.cmd run test:firefox
npm.cmd run test:webkit
npm.cmd run test:mobile
npm.cmd run test:headed
npm.cmd run test:ui
npm.cmd run test:debug
npm.cmd run show-report
```

To try Codegen, start the demo server with `npm.cmd run demo`, then in a second terminal run `npm.cmd run codegen`.

## Notes

- Playwright's mobile device presets emulate browser viewport, user agent, and related device settings; they do not test native Android or iOS applications.
- A new browser context is isolated by default. To carry login state into another context, explicitly save and load `storageState` as shown in `tests/context.spec.js`; a new private window does not automatically inherit another window's cookies.
- Actions auto-wait for their relevant actionability checks. For example, `click()` checks visibility, stability, event reception, and enabled state; editability is relevant to actions such as `fill()`.
- The config records a trace on the first retry and captures screenshots and video on failure. Open the HTML report with `npm.cmd run show-report`.

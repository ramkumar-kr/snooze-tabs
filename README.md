# Snooze Tabs
Snooze tabs to open at a specific time in the future

## Steps to build locally
- Install web-ext, webpack and yarn
- Clone the repository
- Run `yarn install` in the snooze-tabs directory to install all dependencies

### Testing
- Run `yarn run watch` and `yarn run firefox` to generate the dist directory for development and test it in firefox using the `web-ext` tool

### Building for production
* Run `yarn run production`
* Upload the zip file in the web-ext-artiacts directory to the addon store


## Drawbacks
- Tabs will always be opened in the background.
- Snoozed incognito tabs will always open in a new incognito window even if an incognito window is already present.
- A tab which is pinned in incognito and snoozed will not respect the tab pinned status.

## Reporting Issues  / Giving feedback

Please create an issue in Github - [https://github.com/ramkumar-kr/snooze-tabs/issues](https://github.com/ramkumar-kr/snooze-tabs/issues)

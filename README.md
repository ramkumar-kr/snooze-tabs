# Snooze tabs

Snooze tabs to open at a specific time. Select any predefined options such as tomorrow, next week etc., or pick your date and time.

## Description
Snooze tabs to open at a specific time in the future.
Ex: Open this website after 4 hours.

- Click on the icon in the toolbar and select the time when you want to be reminded for the link the current tab.
- A notification is shown when a tab is snoozed.
- Clicking on the manage snoozed tabs button in the toolbar popup will show a list of links which are snoozed and a button to remove them.
- The same list can also be accessed from the sidebar.
- When the snoozed time of a tab is up, the tab is opened and a notification is shown.
- Tabs which were in incognito when snoozed will be opened in an incognito window when the time is up
- Normal tabs which were pinned when snoozed will be pinned when the time is up


### Some drawbacks
- Tabs will always be opened in the background.
- Snoozed incognito tabs will always open in a new incognito window even if an incognito window is already present.
- A tab which is pinned in incognito and snoozed will not respect the tab pinned status.

## Contributions
Please create an issue or more preferably a pull request and we can discuss about it

## Building
There is no build step. Just load the extension from chrome://extensions or about:debugging#addons to get started.

## Todo items
- [ ] Multi account Containers support
- [ ] Custom timers
- [ ] Better UI and UX for all pages

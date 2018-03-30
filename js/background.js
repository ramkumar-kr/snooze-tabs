async function storeAlarms(alarms) {
  var uniqAlarms = await removeDuplicates(alarms);
  browser.storage.local.set({ alarms: uniqAlarms });
  createAlarms();
}

async function storedAlarms() {
  var store = await browser.storage.local.get("alarms");
  var alarms = store.alarms;
  return (alarms);
}

async function handleAlarm(alarm) {
  var store = await browser.storage.local.get("alarms");
  var alarms = store.alarms;
  alarms.forEach((a, i) => {
    if (a.url == alarm.name) {
      alarms.splice(i, 1);
      if(a.incognito){
        browser.windows.create({ incognito: true, url: a.url });
      }
      else{
        var detail = { url: a.url, active: false, pinned: a.pinned };
        browser.tabs.create(detail);
      }
      browser.notifications.create(a.url,
        {
          type: "basic",
          title: "It's back",
          message: `A new tab to ${alarm.name} has been created`,
          iconUrl: browser.extension.getURL("resources/alert.png")
        }
      );
      clearAlarm(a.url);

    }
  });
  storeAlarms(alarms);
  reloadViews();
}

function manageActionButton(_tabId, _changeInfo, tab) {
  if (validate(tab.url)) {
    browser.browserAction.enable(tab.id);
  }
  else {
    browser.browserAction.disable(tab.id);
  }
}

function showPopup() {
  browser.browserAction.setPopup({ popup: browser.extension.getURL('popup/index.html') });
}

function validate(urlString) {
  var url = new URL(urlString);
  const allowed_protocols = ['http:', 'https:', 'file:', 'ftp:'];
  return (allowed_protocols.includes(url.protocol));
}

function reloadViews() {
  var windows = browser.extension.getViews();
  for (var extensionWindow of windows) {
    extensionWindow.location.reload();
  }
}

function inReaderMode(tab) {
  return (tab.url.isInReaderMode || /^(about\:reader\?url\=)/.test(tab.url));
}

async function snoozeTab(delay) {
  // var delay = Date.now() + delaySent.delay * 60 * 1000;
  var tabs = await browser.tabs.query({ currentWindow: true, active: true });
  var tab = tabs[0];
  if(inReaderMode(tab)){
    tab.url = decodeURIComponent(tab.url.split("about:reader?url=")[1]);
  }
  if (validate(tab.url)) {
    var store = await browser.storage.local.get("alarms");
    var alarms = store.alarms;
    if(alarms == undefined){
      alarms = [];
    }
    alarms.unshift({ url: tab.url, title: tab.title, delay: delay, pinned: tab.pinned, incognito: tab.incognito, openInReaderMode: tab.isInReaderMode });
    browser.alarms.create(tab.url, { "when": delay });
    storeAlarms(alarms);
    browser.notifications.create(tab.url,
      {
        type: "basic",
        title: "Snoozed!",
        message: "Tab " + tab.title + " has been snoozed!",
        iconUrl: browser.extension.getURL("resources/success.png")
      }
    );
    reloadViews();
    browser.tabs.remove(tab.id);
  }
  else {
    console.log(tab.url);
    browser.notifications.create(tab.url,
      {
        type: "basic",
        title: "Error!",
        message: "Tab " + tab.url + " cannot be snoozed since it is not a valid link",
        iconUrl: browser.extension.getURL("resources/error.png")
      }
    );
  }
}

async function createAlarms() {
  var alarms = await storedAlarms();
  for (const storedAlarm of alarms) {
    var alarm = await browser.alarms.get(storedAlarm.url);
    if (alarm == undefined) {
      var delay = parseInt(storedAlarm.delay);
      if(delay > Date.now()){
        browser.alarms.create(storedAlarm.url, { when: delay });
      } 
      else{
        handleAlarm({ name: storedAlarm.url })
      }
    }
  }
}

async function clearAlarm(url) {
  var store = await browser.storage.local.get("alarms");
  var alarms = store.alarms;
  alarms.forEach((alarm, i) => {
    if(alarm.url === url){
      alarms.splice(i,1);
    }
  });
  storeAlarms(alarms);
  browser.alarms.clear(url);
}

async function getPreferences() {
  return browser.storage.local.get("preferences");
}

async function setPreferences(changedPreferences) {
  var preferences = await getPreferences();
  var newPreferences = {
    hours: (changedPreferences.hours || preferences.preferences.hours),
    TimeOfDay: (changedPreferences.TimeOfDay || preferences.preferences.TimeOfDay)
  }
  browser.storage.local.set({preferences: newPreferences});
}

async function handleMessage(params, sender, sendResponse) {
  switch (params.op) {
    case "snooze":
      snoozeTab(params.args.time);
      break;
    case "clearAlarm":
      clearAlarm(params.args);
      break;
    case "getPreferences":
      return getPreferences();
      break;
    case "setPreferences":
      setPreferences(params.args);
      break;
  }

}

async function removeDuplicates(alarms) {
  var uniqAlarms = alarms.filter((element, index, self) => {
    return self.map(mapObj => mapObj.url).indexOf(element.url) === index;
  })
  return uniqAlarms;
}

async function handleInstall(details) {
  if (details.reason === "update") {
    if (localStorage.length > 0) {
      var list = [];
      for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          var element = localStorage[key];
          var date = new Date(element)
          list.push({ "url": key, "delay": date.getTime(), pinned: true });
        }
      }
      storeAlarms(list);
    }
  }
  else if (details.reason === "install" || details.temporary == true) {
    storeAlarms([]);
  }

  var prefs = await getPreferences();
  if(typeof prefs.preferences === 'undefined'){
    setPreferences({ hours: 3, TimeOfDay: { hours: 9, minutes: 0 } });    
  }
}

// handle submit
browser.runtime.onMessage.addListener(handleMessage);

browser.alarms.onAlarm.addListener(handleAlarm);

browser.runtime.onInstalled.addListener(handleInstall);

browser.runtime.onStartup.addListener(createAlarms);

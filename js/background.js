function handleAlarm(alarm) {
  var createTab = browser.tabs.create({ url: alarm.name });
  createTab.then(function (tab) {
    var uri = new URL(tab.url);
    console.log(tab.url);
    localStorage.removeItem(alarm.name);
    browser.notifications.create(tab.url,
      {
        type: "basic",
        title: "It's back",
        message: `A new tab to ${alarm.name} has been created`,
        iconUrl: browser.extension.getURL("resources/alert.png")
      });
    reloadViews();
  });
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

var delay = 0;
function snoozeTab(delaySent) {
  delay = Date.now() + delaySent.delay * 60 * 1000;
  browser.tabs.query({ currentWindow: true, active: true }).then(function (tabs) {
    var tab = tabs[0];
    if (validate(tab.url)) {
      browser.alarms.create(tab.url, { "when": delay });
      localStorage.setItem(tab.url, new Date(delay));
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
    } else {
      browser.notifications.create(tab.url,
        {
          type: "basic",
          title: "Error!",
          message: "Tab " + tab.title + " cannot be snoozed since it is not a valid link",
          iconUrl: browser.extension.getURL("resources/error.png")
        }
      );
    }
  })
}

function getList() {
  var list = []
  for (var key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      var element = localStorage[key];
      list.push({"url": key, "delay": new Date(element)});
    }
  }
  return list;
}

function onGot(item) {
  console.log(item);
}

function clearAlarm(url) {
  localStorage.removeItem(url);
  browser.alarms.clear(url);
}

function handleMessage(params, sender, response) {
  switch (params.op) {
    case "snooze":  
      response(snoozeTab(params.args));
      break;
    case "getList":
      var list = getList();
      response(list);
      return;
    case "clearAlarm":
      clearAlarm(params.args)
      break;
  }

}

function createAlarms(items) {
  for (var index = 0; index < items.length; index++) {
    var item = items[index];
    if (item.delay <= new Date()) {
      handleAlarm({ name: item.url });
    }
    Promise.resolve(browser.alarms.create(item.url, { "when": item.delay.getTime() }));

  }
}

function handleStartup() {
  var list = getList();
  createAlarms(list);
}

// handle submit
browser.runtime.onMessage.addListener(handleMessage);

browser.alarms.onAlarm.addListener(handleAlarm);

// browser.runtime.onSuspendCancelled.addListener(handleStartup);

this.preferences = null;

function later(hours) {
  var alarmTime = new Date();
  alarmTime.setHours(alarmTime.getHours() + hours);
  return alarmTime;
}

function tomorrow(preferredTimeOfDay) {
  var alarmTime = new Date();
  alarmTime.setDate(alarmTime.getDate() + 1);
  alarmTime.setHours(preferredTimeOfDay.hours);
  alarmTime.setMinutes(preferredTimeOfDay.minutes);
  return alarmTime;
}

function weekend(preferredTimeOfDay) {
  var alarmTime = new Date();
  var weekendRemaining = 6 - alarmTime.getDay();
  if (weekendRemaining === 6) {
    weekendRemaining += 1;
  }
  alarmTime.setDate(alarmTime.getDate() + weekendRemaining);
  alarmTime.setHours(preferredTimeOfDay.hours);
  alarmTime.setMinutes(preferredTimeOfDay.minutes);
  return alarmTime;
}

function nextWeek(preferredTimeOfDay) {
  var alarmTime = new Date();
  alarmTime.setDate(alarmTime.getDate() + ((7 - alarmTime.getDay()) % 7 + 1));
  alarmTime.setHours(preferredTimeOfDay.hours);
  alarmTime.setMinutes(preferredTimeOfDay.minutes);
  return alarmTime;
}

function nextMonth(preferredTimeOfDay) {
  var alarmTime = new Date();
  alarmTime.setMonth(alarmTime.getMonth() + 1);
  alarmTime.setHours(preferredTimeOfDay.hours);
  alarmTime.setMinutes(preferredTimeOfDay.minutes);
  return alarmTime;
}

async function snoozeTab(type) {
  var time = 0;
  switch (type) {
    case "later":
      time = later(this.preferences.hours);
      break;

    case "tomorrow":
      time = tomorrow(this.preferences.TimeOfDay);
      break;

    case "weekend":
      time = weekend(this.preferences.TimeOfDay);
      break;

    case "nextWeek":
      time = nextWeek(this.preferences.TimeOfDay);
      break;

    case "nextMonth":
      time = nextMonth(this.preferences.TimeOfDay);
      break;

    default:
      alert("Something went wrong!!! Please try again" + type);
      return;
      break;
  }
  browser.runtime.sendMessage({ op: "snooze", args: { time: time.getTime() } });
}

const elements = document.getElementsByClassName("one-click");
Array.from(elements).forEach((element) => {
  element.addEventListener("click", (e) => {
    snoozeTab(element.id);
    window.close();
  });
});

document.getElementById("datePicker").addEventListener("click", () => {
  window.location.href = browser.runtime.getURL("/popup/datepicker.html");
});

document.getElementById("manageTabs").addEventListener("click", () => {
  window.location.href = browser.runtime.getURL("/listing/index.html") + "?popup=true";
});

document.getElementById("preferences").addEventListener("click", () => {
  browser.runtime.openOptionsPage();
});

browser.runtime.sendMessage({op: "getPreferences"}).then((preferenceStore) => {
  this.preferences = preferenceStore.preferences;
});
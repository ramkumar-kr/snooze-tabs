document.getElementById("laterHours").addEventListener("change", (e) => { 
    browser.runtime.sendMessage({ op: 'setPreferences', args: { hours: parseInt(e.target.value) } });
})

document.getElementById("timeOfDay").addEventListener("change", (e) => { 
    var split = e.target.value.split(":");
    browser.runtime.sendMessage({ op: 'setPreferences', args: { TimeOfDay: { hours: parseInt(split[0]), minutes: parseInt(split[1]) } } });
})


browser.runtime.sendMessage({op: "getPreferences"}).then((preferenceStore) => {
    const preferences = preferenceStore.preferences;
    var hours = (preferences.TimeOfDay.hours < 10) ? ("0" + preferences.TimeOfDay.hours.toString()) : preferences.TimeOfDay.hours.toString();
    var minutes = (preferences.TimeOfDay.minutes < 10) ? ("0" + preferences.TimeOfDay.minutes.toString()) : preferences.TimeOfDay.minutes.toString();
    document.getElementById("laterHours").setAttribute("value", preferences.hours);
    document.getElementById("timeOfDay").setAttribute("value", `${hours}:${minutes}`);
  });


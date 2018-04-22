const date = document.getElementById("date");
const time = document.getElementById("time");
const currentTime = new Date();

function formattedDate(date) {
    month = (date.getMonth()+1);
    if(month < 10){
        month = "0" + month.toString();
    }
    return(`${date.getFullYear()}-${month}-${date.getDate()}`);
}

function formattedTime(time) {
    return(`${time.getHours()}:${time.getMinutes()}`);
}

date.setAttribute("min", formattedDate(currentTime));

document.getElementById("customTimeForm").addEventListener("submit", () => {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    var alarmTime = new Date(date + " " + time);
    if (alarmTime < currentTime) {
        alert("It is not possible to snooze tabs in the past");
        return;
    }
    browser.runtime.sendMessage({ op: "snooze", args: { time: alarmTime.getTime() } });
    window.close();
});

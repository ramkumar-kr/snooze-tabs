function clearAlarm(e){
  // browser.alarms.clear(e.target.value, function(){
  //   window.location.href = 'list.html'
  // });
  var child = e.target;
  browser.runtime.sendMessage({ op: "clearAlarm", args: e.target.value })
  // parent.removeChild(child);
  // loadAlarms();
  window.location.reload();

}

function listAlarms(alarms){
  var list = document.getElementById('list');
  var html = "";
  for(var a of alarms){
    // var uri = new URL(a.url);
    // html = html + `
    //   <div class="column col-12 col-xs-12">
    //     <div class="card">
    //       <div class="card-header">
    //         <h4>${uri.hostname}</h4>
    //       </div>
    //       <div class="card-footer">
    //         <a href=${a.url} target="_blank" class="btn btn-primary">Open</a>
    //         <button onclick="clearAlarm" class="danger btn float-right">Delete</button>
    //       </div>
    //     </div>
    //   </div>
    // `;

    var row = document.createElement('tr');
    
    // Create the URL item
    var urlItem = document.createElement('td');
    var url = document.createElement('a');
    url.setAttribute('href', a.url);
    url.setAttribute('target', '_blank');


    // Add the url text
    var uri = new URL(a.url);
    var urlText = document.createTextNode(uri.origin);
    url.appendChild(urlText);

    urlItem.appendChild(url);

    //Create the action button
    var actionItem = document.createElement('td');
    var action = document.createElement("button");
    action.setAttribute("class", "btn btn-sm");
    action.setAttribute("value", a.url);
    action.addEventListener("click", clearAlarm);


    // Add the close icon
    var icon = document.createTextNode('X');
    action.appendChild(icon);

    actionItem.appendChild(action);

    // Append items to table row
    row.appendChild(urlItem);
    row.appendChild(actionItem);

    // Append row to table
    list.appendChild(row);
  }
  // list.innerHTML = html;
}

function loadAlarms(){
  // browser.alarms.getAll().then(listAlarms);
  browser.runtime.sendMessage({op: "getList"}).then(listAlarms);
}

document.addEventListener('DOMContentLoaded', loadAlarms);
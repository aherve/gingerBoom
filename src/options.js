function save_options() {
  var autowin = document.getElementById('autowin').checked;
  var noSwearing = document.getElementById('no-swearing').checked;
  chrome.storage.sync.set({
    autowin,
    noSwearing,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    autowin: true,
    noSwearing: false,
  }, function(items) {
    document.getElementById('autowin').checked = items.autowin;
    document.getElementById('no-swearing').checked = items.noSwearing;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

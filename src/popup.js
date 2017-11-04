document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((tab) => {
    chrome.tabs.executeScript({code: play('assets/boom.mp4')})
  })
})

function getCurrentTabUrl(cb) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    cb(tabs[0]);
  });
}

function play (videoSrc) {

  return `
    var video = document.createElement("video");
    var autoplay = document.createAttribute('autoplay')
    var style = document.createAttribute('style')
    style.value = 'position: fixed; right: 0; top: 0; z-index: 900000;'

    video.setAttributeNode(style)
    video.setAttributeNode(autoplay)

    var source = document.createElement("source")

    var type = document.createAttribute('type')
    type.value = 'video/mp4'

    var src = document.createAttribute('src')
    src.value = '${chrome.runtime.getURL(videoSrc)}'

    source.setAttributeNode(type)
    source.setAttributeNode(src)

    video.appendChild(source);

    var body = document.body;
    body.appendChild(video);

    setTimeout(() => {video.remove()}, 3100)
  `
}

// close the popup, as we don't need it
setTimeout(() => {window.close()}, 0)

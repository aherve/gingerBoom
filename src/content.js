chrome.runtime.onMessage.addListener(msg => {
  if (msg.action === 'play' && !!msg.url) {
    play (msg.url)
  }
})

function play (videoSrc) {

  const video = document.createElement("video");
  video.classList.add('boom-button')
  const autoplay = document.createAttribute('autoplay')
  const style = document.createAttribute('style')
  style.value = 'position: fixed; right: 0; top: 0; z-index: 900000;'


  video.setAttributeNode(style)
  video.setAttributeNode(autoplay)

  const source = document.createElement("source")

  const type = document.createAttribute('type')
  type.value = 'video/mp4'

  const src = document.createAttribute('src')
  src.value = videoSrc

  source.setAttributeNode(type)
  source.setAttributeNode(src)

  video.appendChild(source);

  const body = document.body;
  body.appendChild(video);

  video.addEventListener('ended', () => fadeOut(video))
}

function fadeOut(node) {
  node.style.opacity = 0;
  setTimeout(() => {
    node.remove()
  }, 300)
}

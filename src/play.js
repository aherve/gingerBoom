function play (videoSrc) {

  const ifr = document.createElement('iframe')
  ifr.classList.add('boom-button')
  ifr.width = 320
  ifr.height = 240
  ifr.scrolling = 'no'
  ifr.frameBorder = '0'

  const video = document.createElement("video");
  video.classList.add('boom-button')
  video.classList.add('clearfix')
  video.height = ifr.height
  video.width = ifr.width
  const autoplay = document.createAttribute('autoplay')
  const style = document.createAttribute('style')
  style.value = `
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1100;
  `

  ifr.setAttributeNode(style)
  video.setAttributeNode(autoplay)

  const source = document.createElement("source")

  const type = document.createAttribute('type')
  type.value = 'video/ogg'

  const src = document.createAttribute('src')
  src.value = videoSrc + `?v${new Date().getTime()}`

  source.setAttributeNode(type)
  source.setAttributeNode(src)

  video.appendChild(source);

  video.addEventListener('ended', () => fadeOut(ifr))

  const body = document.body;
  body.prepend(ifr)
  ifr.contentDocument.querySelector('body').prepend(video)
}

function fadeOut(node) {
  if (!node) {return}
  node.style.opacity = 0;
  setTimeout(() => {
    node.remove()
  }, 300)
}

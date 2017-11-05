let hackCounter = 0

function play (videoSrc) {

  const video = document.createElement("video");
  video.classList.add('boom-button')
  video.classList.add('clearfix')
  const autoplay = document.createAttribute('autoplay')
  const style = document.createAttribute('style')
  style.value = 'position: fixed; right: 0; top: 0; z-index: 1000;'

  video.setAttributeNode(style)
  video.setAttributeNode(autoplay)

  const source = document.createElement("source")

  const type = document.createAttribute('type')
  type.value = 'video/ogg'

  const src = document.createAttribute('src')
  src.value = videoSrc + `?v-${hackCounter++}`

  source.setAttributeNode(type)
  source.setAttributeNode(src)

  video.appendChild(source);

  video.addEventListener('ended', () => fadeOut(video))
  // close after 4s whatever happens
  setTimeout(() => fadeOut(video), 4000)

  const body = document.body;
  body.prepend(video)
}

function fadeOut(videoNode) {
  if (!videoNode) {return}
  videoNode.style.opacity = 0;
  setTimeout(() => {
    videoNode.pause();
    videoNode.remove()
  }, 300)
}

chrome.runtime.onMessage.addListener((msg, sender, cb) => {
  if (msg.action === 'play' && !!msg.url) {
    setTimeout(() => {
      play (msg.url)
      trackEvent('boomButton', 'click')
    })
    cb(null)
  }
})

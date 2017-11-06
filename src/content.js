chrome.runtime.onMessage.addListener((msg, sender, cb) => {
  if (msg.action === 'play' && !!msg.url) {
    setTimeout(() => {
      play (msg.url)
    })
    cb(null)
  }
})

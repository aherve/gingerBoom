chrome.runtime.onMessage.addListener((msg, sender, cb) => {
  if (msg.action === 'play' && !!msg.url) {
    play (msg.url)
    cb(null)
  }
})

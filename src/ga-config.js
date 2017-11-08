var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-28822787-2']);
_gaq.push(['_setAllowLinker', true]);

function trackEvent(category, action) {
  console.log('plz track', category, action)
  _gaq.push(['_trackEvent', category, action]);
}

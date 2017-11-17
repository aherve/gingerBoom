const WIN_VIDEOS = []
const CHECKMATE_VIDEOS = []

chrome.storage.sync.get({
  autowin: true,
  noSwearing: false,
}, settings => {
  // nothing to run for disabled autowin
  if (!settings.autowin) { return }
  WIN_VIDEOS.push(
    ...[
      'assets/boom.ogv',
      'assets/inYourPipe.ogv',
      'assets/inYourPipe2.ogv',
    ].map(src => chrome.runtime.getURL(src))
  )

  if (settings.noSwearing) {
    CHECKMATE_VIDEOS.push(...WIN_VIDEOS)
  } else {
    CHECKMATE_VIDEOS.push(
      ...[
        'assets/checkmate.ogv',
      ].map(src => chrome.runtime.getURL(src))
    )
  }
  loopUntilInit()
})

function loopUntilInit () {
  const target = document.querySelector('.move-list-container') || document.querySelector('#moveList_')
  if (!target) {
    setTimeout(() => {
      loopUntilInit()
    }, 500)
    return
  } else {
    return init(target)
  }
}

function init (target) {

  const movesObserver = new MutationObserver(mutations => {
    if (hasWon()) {
      youWin()
      movesObserver.disconnect()
      setTimeout(() => loopUntilInit(), 3000)
      return
    } else if (hasLost()) {
      youLoose()
      movesObserver.disconnect()
      setTimeout(() => loopUntilInit(), 3000)
      return
    }
  })

  const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  }

  movesObserver.observe(target, config)
}

function hasWon() {
  const moves = getMoves()
  if (areYouWhite() && moves.includes("1-0")) { return true }
  if (!areYouWhite() && moves.includes("0-1")) { return true }
  return false
}

function hasLost() {
  const moves = getMoves()
  if (areYouWhite() && moves.includes("0-1")) { return true }
  if (!areYouWhite() && moves.includes("1-0")) { return true }
  return false
}

function areYouWhite () {
  // chess.com beta selector
  if ( !!document.querySelector('.board-player.bottom.white')) { return true }
  if ( !!document.querySelector('.board-player.bottom.black')) { return false }

  // 'old' version:
  return document.querySelector('.player-info.bottom').querySelector('.captured-pieces').id.includes("whiteScoreDivContainer_")
}

function getMoves () {
  return [...document.getElementsByClassName('gotomove')].map(m => m.innerText)
}

function youWin () {
  if (isCheckMate()) {
    if (CHECKMATE_VIDEOS.length) {
      setTimeout(() => {
        play(sample(CHECKMATE_VIDEOS))
        trackEvent('autoWin', 'checkmate')
      }, 400)
    }
  } else {
    if (WIN_VIDEOS.length) {
      setTimeout(() => {
        play(sample(WIN_VIDEOS))
        trackEvent('autoWin', 'youWin')
      }, 400)
    }
  }
}

function youLoose () {
  if (isCheckMate()) {
    //console.log("YOU LOOSE BY CHECKMATE")
  } else {
    //console.log("YOU LOOSE")
  }
}

function isCheckMate() {
  return getMoves().some(move => move[move.length - 1] === '#')
}

function sample (array) {
  return array[
    Math.floor( array.length * Math.random() )
  ]
}

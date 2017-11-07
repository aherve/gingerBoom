const WIN_VIDEOS = [
  'assets/boom.ogv',
  'assets/inYourPipe.ogv',
  'assets/inYourPipe2.ogv',
].map(src => chrome.runtime.getURL(src))

const CHECKMATE_VIDEOS = [
  'assets/checkmate.ogv'
].map(src => chrome.runtime.getURL(src))

loopUntilInit()

function loopUntilInit () {
  const target = document.querySelector('.move-list-container')
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
  return !!document.querySelector('.board-player.bottom.white')
}

function getMoves () {
  return [...document.getElementsByClassName('gotomove')].map(m => m.innerText)
}

function youWin () {
  if (isCheckMate()) {
    setTimeout(() => {
      play(sample(CHECKMATE_VIDEOS))
    }, 400)
  } else {
    setTimeout(() => {
      play(sample(WIN_VIDEOS))
    }, 400)
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

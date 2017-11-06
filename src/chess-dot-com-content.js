loopUntilInit()

function loopUntilInit () {
  const target = document.querySelector('#moveList_')
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
  return document.querySelector('.player-info.bottom').querySelector('.captured-pieces').id.includes("whiteScoreDivContainer_")
}

function getMoves () {
  return [...document.getElementsByClassName('gotomove')].map(m => m.innerText)
}

function youWin () {
  if (isCheckMate()) {
    //console.log("YOU WIN BY CHECKMATE")
    play(chrome.runtime.getURL('assets/checkmate.ogv'))
  } else {
    //console.log("YOU WIN")
    play(chrome.runtime.getURL('assets/boom.ogv'))
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

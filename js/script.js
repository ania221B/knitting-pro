const filterToggle = document.querySelector('.jsFilterToggle')
const filterButtons = document.querySelector('.jsFilterButtons')

/**
 * Opens filter buttons menu
 */
function openMenu () {
  filterButtons.setAttribute('data-state', 'opened')
  filterToggle.setAttribute('aria-expanded', 'true')

  document.body.addEventListener('animationend', e => {
    if (e.animationName === 'openMenu') {
      filterButtons.setAttribute('data-content', 'visible')
    }
  })
}

/**
 * Closes filter buttons menu
 */
function closeMenu () {
  filterToggle.setAttribute('aria-expanded', 'false')
  filterButtons.setAttribute('data-content', 'hidden')
  filterButtons.setAttribute('data-state', 'is-closing')
}

/**
 * Filters cards based on selected filter
 * @param {String} filter selected filter, which is custom attribute of the filter button
 */
function filterCards (filter) {
  const cardsContainer = document.querySelector('.cards')
  const cards = [...cardsContainer.querySelectorAll('.card')]
  const message = cardsContainer.querySelector('.message')

  cards.forEach(card => card.removeAttribute('data-visibility'))
  message.setAttribute('data-visibility', 'none')

  const excludedCards = cards.filter(
    card => card.getAttribute('data-difficulty') !== filter
  )

  if (filter === 'all') {
    cards.forEach(card => card.removeAttribute('data-visibility'))
  } else if (filter !== 'all' && excludedCards.length === cards.length) {
    message.removeAttribute('data-visibility')
    excludedCards.forEach(card => card.setAttribute('data-visibility', 'none'))
  } else {
    excludedCards.forEach(card => card.setAttribute('data-visibility', 'none'))
  }
}

/**
 * Updates the selected button
 * @param {HTMLElement} button button selected by the user
 */
function updateButton (button) {
  const buttons = [...filterButtons.querySelectorAll('.jsFilterBtn')]
  buttons.forEach(button => button.classList.remove('is-selected'))
  button.classList.add('is-selected')
}

filterToggle.addEventListener('click', () => {
  const isExpanded = filterToggle.getAttribute('aria-expanded') === 'true'
  isExpanded ? closeMenu() : openMenu()
})

document.body.addEventListener('animationend', e => {
  if (e.animationName === 'closeMenu') {
    filterButtons.setAttribute('data-state', 'closed')
  }
})

filterButtons.addEventListener('click', e => {
  const filterButton = e.target.closest('.jsFilterBtn')
  const filter = filterButton.getAttribute('data-filter')

  if (!filterButton) return
  filterCards(filter)
  updateButton(filterButton)
})

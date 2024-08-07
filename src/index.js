// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image')
  const detailName = document.querySelector('.name')
  const detailRestaurant = document.querySelector('.restaurant')
  const ratingDisplay = document.getElementById('rating-display')
  const commentDisplay = document.getElementById('comment-display')

  detailImage.src = ramen.image
  detailName.textContent = ramen.name
  detailRestaurant.textContent = ramen.restaurant
  ratingDisplay.textContent = ramen.rating
  commentDisplay.textContent = ramen.comment
}

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen')
  
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const newRamen = {
      name: event.target['new-name'].value,
      restaurant: event.target['new-restaurant'].value,
      image: event.target['new-image'].value,
      rating: event.target['new-rating'].value,
      comment: event.target['new-comment'].value
    }
    
    addRamenToMenu(newRamen)
    form.reset()
  })
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach(ramen => {
        addRamenToMenu(ramen)
      })
    })
}

const addRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu')
  const img = document.createElement('img')
  img.src = ramen.image
  img.alt = ramen.name
  img.addEventListener('click', () => handleClick(ramen))
  ramenMenu.appendChild(img)
}

const main = () => {
  displayRamens()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}
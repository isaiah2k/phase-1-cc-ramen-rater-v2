// Callbacks
const handleClick = (ramen) => {
  const detailImg = document.querySelector("#ramen-detail > .detail-image")
  const detailName = document.querySelector("#ramen-detail > .name")
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant")
  const detailsRating = document.getElementById("rating-display")
  const detailsComment = document.getElementById("comment-display")

  detailImg.src = ramen.image
  detailName.textContent = ramen.name
  detailRestaurant.textContent = ramen.restaurant
  detailsRating.textContent = ramen.rating.toString()
  detailsComment.textContent = ramen.comment
}

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen')
  ramenForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target.comment.value,
    }

    const ramenMenuDiv = document.getElementById('ramen-menu')
    const img = document.createElement('img')
    img.src = newRamen.image
    img.addEventListener('click', () => handleClick(newRamen))
    ramenMenuDiv.appendChild(img)

    event.target.reset()
  })
}

const displayRamens = async () => {
  const response = await fetch('http://localhost:3000/ramens')
  const ramens = await response.json()

  const ramenMenuDiv = document.getElementById('ramen-menu')
  ramens.forEach(ramen => {
    const img = document.createElement('img')
    img.src = ramen.image
    img.addEventListener('click', () => handleClick(ramen))
    ramenMenuDiv.appendChild(img)
  })
}

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens()
    addSubmitListener()
  })
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}
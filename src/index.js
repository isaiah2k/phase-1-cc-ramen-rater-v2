// index.js

// Callbacks
const handleClick = (ramen) => {
  document.querySelector('#ramen-detail .detail-image').src = ramen.image
  document.querySelector('#ramen-detail .name').textContent = ramen.name
  document.querySelector('#ramen-detail .restaurant').textContent = ramen.restaurant
  document.getElementById('rating-display').textContent = ramen.rating
  document.getElementById('comment-display').textContent = ramen.comment

  const ramenDetailDiv = document.getElementById('ramen-detail')

  let deleteButton = ramenDetailDiv.querySelector('button.delete-ramen')
  if (!deleteButton) {
    deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete Ramen'
    deleteButton.classList.add('delete-ramen')
    ramenDetailDiv.appendChild(deleteButton)
  }

  deleteButton.onclick = () => {
    fetch(`http://localhost:3000/ramens/${ramen.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const ramenMenu = document.getElementById('ramen-menu')
        const ramenImage = document.querySelector(`img[src="${ramen.image}"]`)
        if (ramenImage) {
          ramenMenu.removeChild(ramenImage)
        }
      })
  }

  const editForm = document.getElementById('edit-ramen')
  if (editForm) {
    editForm.onsubmit = (event) => {
      event.preventDefault()
      ramen.rating = event.target['rating'].value
      ramen.comment = event.target['new-comment'].value

      fetch(`http://localhost:3000/ramens/${ramen.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: ramen.rating,
          comment: ramen.comment
        })
      })
    }
  }
}

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen')
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const newRamen = {
      name: event.target['name'].value,
      restaurant: event.target['restaurant'].value,
      image: event.target['image'].value,
      rating: event.target['rating'].value,
      comment: event.target['new-comment'].value
    }

    const img = document.createElement('img')
    img.src = newRamen.image
    img.alt = newRamen.name
    img.addEventListener('click', () => handleClick(newRamen))

    const ramenMenu = document.getElementById('ramen-menu')
    ramenMenu.appendChild(img)

    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamen)
    })

    form.reset()
  })
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById('ramen-menu')
      ramens.forEach((ramen) => {
        const img = document.createElement('img')
        img.src = ramen.image
        img.alt = ramen.name
        img.addEventListener('click', () => handleClick(ramen))
        ramenMenu.appendChild(img)
      })

      handleClick(ramens[0])
    })
}

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens()
  addSubmitListener()
}

document.addEventListener('DOMContentLoaded', main)

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}
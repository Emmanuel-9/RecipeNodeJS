const { response } = require("express")

const edit = document.querySelector('#update-button')

edit.addEventListener('click', _ => {
    fetch('/recipes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Darth Vadar',
          Instructions: 'I find your lack of faith disturbing.'
        })
    }).then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
    })
})

const messageDiv = document.querySelector('message')
const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
  fetch('/recipes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        title: 'Darth Vadar'
        })
    })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if(response === 'No recipe to delete'){
        messageDiv.textContent = 'No Darth Vadar quote to delete'
      } else {
        window.location.reload(true)
      }
    })
  })

  

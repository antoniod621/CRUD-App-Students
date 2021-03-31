// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
  // Send PUT Request here
  fetch('/quotes', {
  	method: 'put',
  	headers: { 'Content-Type': 'application/json'},
  	body: JSON.stringify({
  		name: req.body.name,
  		quote: req.body.quote
  	})
  })
	.then (res => {
	  if (res.ok) return res.json()
	})
	.then(response => {
		window.location.reload(true)
	})
})

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'}
    body: JSON.stringify({
    	name: res.body.name,
    	quote: res.body.quote
    })
  })
	  .then(res => {
	  	if (res.ok) return res.json()
	  })
	  .then(response => {
	  	if(response === 'No student to delete'){
	  		messageDiv.textContent = 'No student to delete'
	  	} else{
	  		window.location.reload(true)
	  	}
	  })
	  .catch(console.error)

})
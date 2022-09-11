document.addEventListener('DOMContentLoaded', () => {
    getDogs()
    const dogForm = document.querySelector('#dog-form') 

    dogForm.addEventListener('submit', handleSubmit)
})

let dogHolder ={
    "id": null,
    "name": "Baby",
    "breed": "Scottish Deerhound",
    "sex": "male"
    }

function handleSubmit(e){
    e.preventDefault()
    dogObj ={
        "id": dogHolder.id,
        "name": e.target.name.value,
        "breed": e.target.breed.value,
        "sex": e.target.sex.value
    }
    updateDog(dogObj)
    
}

function updateDog(update){
    if (update.id != null){
    fetch(`http://localhost:3000/dogs/${update.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body:JSON.stringify(update)
    })
    .then(res=>res.json())
    .then(data => clear())
    
    dogHolder ={
        "id": null,
        "name": "Baby",
        "breed": "Scottish Deerhound",
        "sex": "male"
        }
    }
}

function clear(){
    const dogForm = document.querySelector('#dog-form') 
    dogForm.querySelector('[name = "name"]').value = null
    dogForm.querySelector('[name = "breed"]').value = null
    dogForm.querySelector('[name = "sex"]').value = null
    dogForm.querySelector('[name = "name"]').placeholder = "dog's name"
    dogForm.querySelector('[name = "breed"]').placeholder = "dog's breed"
    dogForm.querySelector('[name = "sex"]').placeholder = "dog's sex"
    const tBody = document.querySelector('#table-body')
    tBody.innerHTML = ''
    getDogs()
}

function renderDogs(dog){
    const tBody = document.querySelector('#table-body')
    const tableData = document.createElement('tr')
    const btn = document.createElement('button')
    const td = document.createElement('td')

    const dname = dog.name
    const dBreed = dog.breed
    const dSex  = dog.sex

    btn.innerHTML = 'Edit Dog'
    btn.addEventListener('click', function ()
    {
        const dogForm = document.querySelector('#dog-form')

        dogForm.querySelector('[name = "name"]').value = dog.name
        dogForm.querySelector('[name = "breed"]').value = dog.breed
        dogForm.querySelector('[name = "sex"]').value = dog.sex
        dogHolder = dog
    })

    tableData.innerHTML =`
    <tr>
    <td>${dname}</td>
    <td>${dBreed}</td>
    <td>${dSex}</td>
    </tr>
    `
    td.appendChild(btn)
    tableData.appendChild(td)
    tBody.appendChild(tableData)
}

function getDogs(){
    fetch('http://localhost:3000/dogs')
    .then (res => res.json())
    .then (data => data.forEach(dogo => renderDogs(dogo)))
}


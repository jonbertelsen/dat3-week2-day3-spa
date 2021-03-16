import 'bootstrap/dist/css/bootstrap.css'

// Fetches from local api on port 3333

// Eventhandlers

document.getElementById('get_all_btn').addEventListener('click', getAll)
document.getElementById('insert_person_btn').addEventListener('click', insertPerson)
document.getElementById('delete_person_btn').addEventListener('click', deletePerson)
document.getElementById('update_person_btn').addEventListener('click', updatePerson)

// GET all
function getAll() {
    fetch('http://localhost:8080/restmock/api/person/all')
        .then(response => response.json())
        .then(data => {
            const allPersons = data.map(x => `<li>id:${x.id} - name: ${x.name}</li>`)
            document.getElementById('get_all_p').innerHTML = '<ul>' + allPersons.join("") + '<ul>'
        })
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => console.log(e.detail))
            } else {
                console.log("Network error");
            }
        });
}

// DELETE
function deletePerson() {
    const options = makeOptions("DELETE");
    const id = document.getElementById('delete_person_text').value
    fetch("http://localhost:8080/restmock/api/person/" + id, options)
        .then(response => response.json())
        .then(data => document.getElementById('delete_person_p').innerHTML = data.status)
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => console.log(e.detail))
            } else {
                console.log("Network error");
            }
        });
}

// POST
function insertPerson() {
    const insertData = { id: 1, name: "Jon Snow" };
    const options = makeOptions("POST", insertData);
    fetch("http://localhost:8080/restmock/api/person", options)
        .then(response => response.json())
        .then(data => {
            let newPerson = `New Person: id:${data.id} - name: ${data.name}`
            let doc = document.getElementById('insert_person_p').innerHTML = newPerson
        })
}

// PUT
function updatePerson() {
    const id = document.getElementById('update_person_text').value
    const updateData = { id: id, name: "Khaleeesi" };
    const options = makeOptions("PUT", updateData);
    fetch("http://localhost:8080/restmock/api/person/" + id, options)
        .then(response => response.json())
        .then(data => {
            const updatedPerson = `Person got a new name: id:${data.id} - name: ${data.name}`
            document.getElementById('update_person_p').innerHTML = updatedPerson
        })
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => console.log(e.detail))
            } else {
                console.log("Network error");
            }
        });
}

// Fetch util

function makeOptions(http_method, body) {
    var options = {
        method: http_method,
        headers: {
            "Content-type": "application/json"
        }
    }
    if (body) {
        options.body = JSON.stringify(body);
    }
    return options;
}
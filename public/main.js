


document.getElementById("getFormBtn").addEventListener('click', (event) => {
    let url = '/getCats?';
    const formData = new FormData(document.getElementById("getForm"));
    for(const pair of formData.entries()){
        url += pair[0] +'='+ pair[1]+'&';
    }
    fetch(url, { method: 'GET' })
        .then(response => {
            response.json().then( json => {
                showCats(json);
            });
        })
        .catch(err => {
            alert('Whoops: '+err);
        });
});
document.getElementById("getAllCatsBtn").addEventListener('click', getAllCats);

function getAllCats() {
    fetch('/cats', { method: 'GET' })
    .then(response => {
        response.json().then( json => {
            showCats(json);
        });
    })
    .catch(err => {
        alert('Whoops: '+err);
    });
}
function showCats(cats) {
    const catContainer = document.getElementById('catContainer');
    catContainer.innerHTML = '';
    let counter = 0;
    for(const cat of cats) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card col-4');
        card.innerHTML = 
            `<img class="card-img-top" src="http://placekitten.com/g/300/300" alt="Card image cap">
            <div class="card-block">
                <h4 class="card-title">${cat.name}</h4>
                    <table class="table table-sm">
                    <tbody>
                        <tr>
                        <td>Age:</td>
                        <td>${cat.age}</td>
                        </tr>
                        <tr>
                        <td>Gender:</td>
                        <td>${cat.gender}</td>
                        </tr>
                        <tr>
                        <td>Color:</td>
                        <td>${cat.color}</td>
                        </tr>
                        <tr>
                        <td>Weight:</td>
                        <td>${cat.weight}</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
            <div class="card-footer">
                <button id="editCatBtn" class="btn btn-primary" data-toggle="modal" data-target="#editModal" onClick="editCat(${cat})">Edit</button>
                <button id="deleteCatBtn" class="btn btn-danger" onClick="deleteCat(${cat})">Delete</button>
            </div>`;
        card.querySelector('#editCatBtn').addEventListener('click', function(){
            return editCat(cat);
        });
        card.querySelector('#deleteCatBtn').addEventListener('click', function(){
            return deleteCat(cat);
        });
        catContainer.appendChild(card);
    }
}

function editCat(cat) {
    const modalForm = document.getElementById('editForm');
    modalForm.elements['name'].value = cat.name;
    modalForm.elements['age'].value = cat.age;
    modalForm.elements['gender'].value = cat.gender;
    modalForm.elements['color'].value = cat.color;
    modalForm.elements['weight'].value = cat.weight;
    document.querySelector('#saveChangesBtn').addEventListener('click', function() {
        return saveChanges(modalForm, cat._id);
    });
}
function saveChanges(form, id) {
    const formData = new FormData(form);
    let url = '/editcat?_id='+id;
    for(const pair of formData.entries()){
        url += '&'+pair[0] +'='+ pair[1];
    }
    fetch(url, { method: 'PATCH' })
        .then(response => {
            if(response.status !== 200){
                alert('Edit failed ;___;');
            }
            else {
                getAllCats();
            }
        })
        .catch(err => {
            alert('Whoops: '+err);
        });
}
function deleteCat(cat) {
    const result = confirm('Are you sure you want to delete lil\' '+cat.name+'? ;__;');
    if (result) {
        const url = '/deletecat?_id='+cat._id;
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if(response.status !== 200){
                alert('Delete FAiled!');
            }
            else {
                getAllCats();
            }
        })
        .catch(err => {
            alert('Whoops: '+err);
        });
    }
}
/*
const myImage = document.querySelector('img');
const myRequest = new Request('http://placekitten.com/768/720');
fetch(myRequest).then((response) => { 
  if(response.ok) {
    return response.blob();
  }
  throw new Error('Network response was not ok.');
}).then((myBlob) => {
  const objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
}).catch(function(error) {
  console.log('Problem :( ' + error.message);
});
*/
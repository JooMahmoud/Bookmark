var siteNameInput = document.getElementById("siteName");
var siteURlInput = document.getElementById("siteURL");


var sitesList = []
if(localStorage.getItem("sites") != null){
    sitesList = JSON.parse(localStorage.getItem("sites"));
    console.log(sitesList);
    display();
}

// =====> Add Function

function addsite() {
    if(validationsiteName("siteName")&&validationsiteURL("siteURL")){
    var site = {
        Name: siteNameInput.value,
        URL: siteURlInput.value,
    };
    sitesList.push(site);
    console.log(sitesList);
    localStorage.setItem("sites", JSON.stringify(sitesList));
    display();
    clearinput();
}else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });      
};
}

// =====> Display Function

function display() {
    var cartona = ``;
    for(var i=0 ; i<sitesList.length ; i++){
        cartona += `
              <tr>
                <th class="text-center" scope="row">${i+1}</th>
                <td class="text-center">${sitesList[i].Name}</td>
                <td class="text-center">
                  <button class="btn btn-warning text-center text-white"><i class="fa-solid fa-eye p-8"></i>Visit</button>
                </td>
                <td class="text-center"><button onclick="deleteSites(${i})" class="btn btn-danger text-center text-white"><i class="fa-solid fa-trash-can p-8"></i>Delete</button></td>
              </tr>
        `;
    }
    document.getElementById("rowdata").innerHTML = cartona;
}

// =====> Clear Function

function clearinput(){
    siteNameInput.value = null;
    siteURlInput.value = null;
    siteNameInput.classList.remove("is-valid");
    siteURlInput.classList.remove("is-valid");
}

// =====> Delete Function

function deleteSites(index){
sitesList.splice(index,1);
localStorage.setItem("sites",JSON.stringify(sitesList));
console.log(sitesList);
display();
}

  // =====> Making sure that user enter the correct data
  
function validationsiteName(){
    var Regex = /^\w{3,}(\s+\w+)*$/;
    var textstring = siteNameInput.value;
    if(Regex.test(textstring)){
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        return true
    }else{
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
        return false
    }
}

function validationsiteURL(){
    var Regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    var textstring = siteURlInput.value;
    if(Regex.test(textstring)){
        siteURlInput.classList.add("is-valid");
        siteURlInput.classList.remove("is-invalid");
        return true
    }else{
        siteURlInput.classList.add("is-invalid");
        siteURlInput.classList.remove("is-valid");
        return false
    }
}
  
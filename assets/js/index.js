// chrome://extensions/
let myLeads = [];
const inputEl = document.getElementById("input-el");
const btnInput = document.getElementById("btn-input");
const ulEL = document.getElementById("ul-el");
const btnDelete = document.getElementById("btn-delete");
const btnTab = document.getElementById("btn-save");


function removeEachLink(){
  this.addEventListener('click', function(){
    console.log(this.nodeName);
  })
}


const localsFromLocalStorage = JSON.parse(localStorage.getItem("lead"));
// console.log(localsFromLocalStorage);

if(localsFromLocalStorage){
  myLeads = localsFromLocalStorage
  renderLeads(myLeads)
}

btnTab.addEventListener('click', function(){
  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem('lead', JSON.stringify(myLeads))
    renderLeads(myLeads);
  });
})


btnDelete.addEventListener('dblclick', function(){
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
})

btnInput.addEventListener('click', function() {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("lead", JSON.stringify(myLeads));
  renderLeads(myLeads);
});

// Performance better
function renderLeads(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li id='${i}'>
        <a href='${leads[i]}' target='_blank'>${leads[i]}</a><span class="btn-close" onclick="removeEachLink()"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"/></svg></span>
      </li>
    `;
  }
  ulEL.innerHTML = listItems;
}

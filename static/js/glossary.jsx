
function Glossary(props) {
    $.get('/glossarydata', response => {
      let glossaryArray = response.data;
      buildTab(glossaryArray)

  })
    return (
      <React.Fragment>
        <div className="container">
          <br></br>
          <h1>Crypto Glossary</h1>
          <br></br>
          <h2>Learn the basic terminology for blockchain technology. </h2>
          <br></br>

        <div>
          <ul id="tabs"></ul>
          <div id="tab-content"></div>
        </div>
        </div>

      </React.Fragment>
    );
}
function searchGlossary(value, data){
    let filteredData = []

    for(let i=0; i<data.length; i++){
      value = value.toLowerCase()
      let name = data[i].name.toLowerCase()
      let symbol = data[i].symbol.toLowerCase()

      if (name.includes(value)){
        filteredData.push(data[i])
      }
    }
    return filteredData
  }

function buildTab(data) {
    let tab = document.getElementById('tabs'); 
    tab.innerHTML = '';
    let definition = document.getElementById('tab-content');
    definition.innerHTML = '';
    
    for (let i=0; i< data.length; i++) {
        const tabHeader = Object.keys(data[i])[0];
        const tabs =`<li data-tab-target="#${tabHeader}" className="tabHeader">${tabHeader}</li>`
        tab.innerHTML += tabs
        
        const defObj = data[i][tabHeader];
        for (const [key, value] of Object.entries(defObj)) {
            // console.log(`${key}: ${value}`);
            const term = `<div id="${tabHeader}" data-tab-content class="active ${tabHeader}"><h3 style="font-size:3rem">${key}</h3><p>${value}</p><br></div>`;
            definition.innerHTML += term
        }
    };
    
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelectorAll(tab.dataset.tabTarget);
            console.log("🚀 ~ file: glossary.jsx ~ line 55 ~ tab.addEventListener ~ tab.dataset.tabTarget", tab.dataset.tabTarget)
            tabContents.forEach(tabContents => {
                tabContents.classList.remove('active')
            })
            target.forEach((ele) => ele.classList.add('active'))
        })
    })
}

  ReactDOM.render(<Glossary />, document.querySelector('#app'));

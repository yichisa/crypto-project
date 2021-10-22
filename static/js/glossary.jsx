
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
          <p>Learn the basic terminology for blockchain technology. </p>
          <br></br>
        </div>

        <div>
          <ul id="tabs"></ul>
          <div id="tab-content"></div>
        </div>
      </React.Fragment>
    );
}

function buildTab(data) {
    let tab = document.getElementById('tabs'); 
    tab.innerHTML = '';
    let definition = document.getElementById('tab-content');
    definition.innerHTML = '';
    
    for (let i=0; i< data.length; i++) {
        const tabHeader = Object.keys(data[i])[0];
        const tabs =`<li data-tab-target="#${tabHeader}" className="tabHeader">${tabHeader}</li>`
        // tabArray.push(`<li className="tabHeader">${tabHeader}</li>`);
        tab.innerHTML += tabs
        
        const defObj = data[i][tabHeader];
        for (const [key, value] of Object.entries(defObj)) {
            // console.log(`${key}: ${value}`);
            const term = `<div id="${tabHeader}" data-tab-content class="active ${tabHeader}"><h2>${key}</h2><p>${value}</p></div>`;
            definition.innerHTML += term
            // console.log(definition.innerHTML)
        }
    };
    
    console.log("🚀 ~ file: glossary.jsx ~ line 29 ~ buildTab ~ definition", definition)
    const tabs = document.querySelectorAll('[data-tab-target]')
    console.log('tabs---', tabs)
    const tabContents = document.querySelectorAll('[data-tab-content]')
    console.log("🚀 ~ file: glossary.jsx ~ line 50 ~ buildTab ~ tabContents", tabContents)

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelectorAll(tab.dataset.tabTarget);
            console.log("🚀 ~ file: glossary.jsx ~ line 55 ~ tab.addEventListener ~ tab.dataset.tabTarget", tab.dataset.tabTarget)
            console.log("🚀 ~ file: glossary.jsx ~ line 55 ~ tab.addEventListener ~ target", target)
            tabContents.forEach(tabContents => {
                tabContents.classList.remove('active')
            })
            target.forEach((ele) => ele.classList.add('active'))
        })
    })
}

  ReactDOM.render(<Glossary />, document.querySelector('#app'));

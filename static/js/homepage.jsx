
function Homepage(props) {
  $.get('/api', response => {
    let coinsArray = response.data;
    buildTable(coinsArray)
  
  $('#search-input').on('keyup', function() {
    let value = $(this).val()
    let data = searchTable(value, coinsArray)
    buildTable(data)
  })

  $('#likes').on('click', function() {
    let data = favTable(coinsArray)
    buildTable(data)
  })

  $('th').on('click', function(){
    let column = $(this).data('column');
    let order = $(this).data('order');
    let text = $(this).html()
    text = text.substring(0, text.length-1)
 
    if (order=='desc') {
      $(this).data('order', 'asc')
      coinsArray = coinsArray.sort((a,b) => Number(a[(column)]) - Number(b[(column)]))
      text += "&#9660;"
    } else {
      $(this).data('order', 'desc')

      coinsArray = coinsArray.sort((a,b) => Number(b[(column)]) - Number(a[(column)]))
      text += "&#9650;"

    }
    $(this).html(text)
    buildTable(coinsArray)
  })
})
  return (
    <React.Fragment>
      
      <div className="container">
        <br></br>
        <br></br>
        <h1>Top 100 Cryptocurreny Prices</h1>
        <h2>Top Coins by Market Cap</h2>
        <br></br>
        <br></br>

        <div id="search-and-like">
          <button id="likes">Watchlist</button>
          <br></br>
          <input id="search-input" className="form-control" type="text" placeholder="Search..."></input>
        </div>

      <div className="row">
        <div className="col">
        </div>
      </div>
      <br></br>
      <br></br>

      <table className="table table-striped table-dark">
        <tbody>
          <tr id="column-name" className="active">
            <th></th>
            <th></th>
            <th>Coin</th>
            <th data-column="price" data-order="desc">Price &#9650;</th>
            <th data-column="market_cap" data-order="desc">Market Cap &#9650;</th>
            <th data-column="volume" data-order="desc">Volume</th>
            <th data-column="high" data-order="desc">All Time High &#9650;</th>
            <th data-column="circulating_supply" data-order="desc">Circulating Supply</th>
            <th data-column="price_change_pct" data-order="desc">24H Change</th>
          </tr>
        </tbody>
        <tbody id="coinTable"></tbody>
      </table>
      </div>

    </React.Fragment>
  );
  }

  function searchTable(value, data){
    let filteredData = []
    console.log(filteredData)

    for(let i=0; i<data.length; i++){
      value = value.toLowerCase()
      let name = data[i].name.toLowerCase()
      let symbol = data[i].symbol.toLowerCase()

      if (name.includes(value) | symbol.includes(value)){
        filteredData.push(data[i])
      }
    }
    return filteredData
  }

  function buildTable(data) {
    console.log('buildtable', data)
    let table = document.getElementById('coinTable');

    table.innerHTML = ''

    for (let i=0; i< data.length; i++) {
      const row = `<tr>
                    <td><Button onclick="Toggle(${i})" id="like-button${i}" class="btn" style="color:grey"><i class="fa fa-heart" style="font-size: 2em;"></i></Button></td>
                    <td><img src= ${data[i].logo_url} style="height:30px; width:auto;"></td>
                    <td style="text-align:left; width=150px"> ${data[i].symbol}   |   ${data[i].name}</td>
                    <td>$ ${parseFloat(data[i].price).toFixed(2)}</td>
                    <td id="cap${i}">$ ${parseFloat(data[i].market_cap)}</td>
                    <td id="vol${i}">$ ${parseFloat(data[i]["1d"].volume)}</td>
                    <td>$ ${parseFloat(data[i].high).toFixed(2)}</td>
                    <td id="cir${i}">$ ${parseFloat(data[i].circulating_supply)}</td>
                    <td id="price${i}">${(parseFloat(data[i]['1d'].price_change_pct)*100).toFixed(2)+'%'}</td>
                </tr>`

      table.innerHTML += row

      let prices = document.getElementById(`price${i}`)
       if (`${parseFloat(data[i]['1d'].price_change_pct)}` > 0) {
         prices.style.color = "#4caf50"
       } else {
        prices.style.color = "#E3242B"
       }

      let caps = document.getElementById(`cap${i}`)
      if (Math.abs(`${parseFloat(data[i].market_cap)}`) >= 1.0e9) {
        caps.innerHTML ="$"+((Math.abs(`${parseFloat(data[i].market_cap)}`) / 1.0e9).toFixed(2)) + "B"
      }

      let vols = document.getElementById(`vol${i}`)
      if (Math.abs(`${parseFloat(data[i]["1d"].volume)}`) >= 1.0e9) {
        vols.innerHTML ="$"+((Math.abs(`${parseFloat(data[i]["1d"].volume)}`) / 1.0e9).toFixed(2)) + "B"
      }
      if (Math.abs(`${parseFloat(data[i]["1d"].volume)}`) >= 1.0e6 && Math.abs(`${parseFloat(data[i]["1d"].volume)}`) < 1.0e9) {
        vols.innerHTML ="$"+((Math.abs(`${parseFloat(data[i]["1d"].volume)}`) / 1.0e6).toFixed(2)) + "M"
      }

      let cirs = document.getElementById(`cir${i}`)
      if (Math.abs(`${parseFloat(data[i].circulating_supply)}`) >= 1.0e9) {
        cirs.innerHTML ="$"+((Math.abs(`${parseFloat(data[i].circulating_supply)}`) / 1.0e9).toFixed(2)) + "B"
      }
      if (Math.abs(`${parseFloat(data[i].circulating_supply)}`) >= 1.0e6 && Math.abs(`${parseFloat(data[i].circulating_supply)}`) < 1.0e9) {
        cirs.innerHTML ="$"+((Math.abs(`${parseFloat(data[i].circulating_supply)}`) / 1.0e6).toFixed(2)) + "M"
      }
    }
  }

  function f_color(i=0){
    let prices = document.getElementById(`price${i}`)
    console.log("🚀 ~ file: homepage.jsx ~ line 130 ~ f_color ~ price", prices)
    console.log(prices.value)
    let el = `${parseFloat(data[i]['1d'].price_change_pct)}`;
        if(el < 0) {
          prices.style.color = "green";
        } else {
          prices.style.color = "red";
        }
  }

  function Toggle(i) {
  
    let likeButton = document.getElementById(`like-button${i}`)
    console.log(likeButton)

    if (likeButton.style.color == "grey") {
      likeButton.style.color = "red"}
    else{
      likeButton.style.color = "grey"
    }
  }

  function favTable(data){
    let favData = [];
    
    for(let i=0; i<data.length; i++){
      let likeButton = document.getElementById(`like-button${i}`);
      if (likeButton.style.color == "red"){
        favData.push(data[i])
      }
    }
    return favData
  }

  ReactDOM.render(<Homepage />, document.querySelector('#app'));

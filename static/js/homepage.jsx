
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
      
      <div className="row">
        <div className="col">
            <input id="search-input" className="form-control" type="text" placeholder="Search..."></input>
        </div>
        <div>
        <button id="likes">Watchlist</button>
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
                    <td style="text-align:left"> ${data[i].symbol}   |   ${data[i].name}</td>
                    <td>$ ${parseFloat(data[i].price).toFixed(2)}</td>
                    <td>$ ${parseFloat(data[i].market_cap)}</td>
                    <td>$ ${parseFloat(data[i]["1d"].volume)}</td>
                    <td>$ ${parseFloat(data[i].high).toFixed(2)}</td>
                    <td>$ ${parseFloat(data[i].circulating_supply)}</td>
                    <td>${(parseFloat(data[i]['1d'].price_change_pct)*100).toFixed(2) + "%"}</td>
                </tr>`
      table.innerHTML += row
    }
  }

  function Toggle(i) {
  
    let likeButton = document.getElementById(`like-button${i}`)
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

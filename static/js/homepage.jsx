
function Homepage(props) {
  $.get('/api', response => {
    let coinsArray = response.data
    console.log(coinsArray)
    console.log(coinsArray[0].name)
    buildTable(coinsArray)
  
  $('#search-input').on('keyup', function() {
    let value = $(this).val()
    let data = searchTable(value, coinsArray)
    buildTable(data)
  })

  $('th').on('click', function(){
    let column = $(this).data('column')
    let order = $(this).data('order')
 
    if (order=='desc') {
      $(this).data('order', 'asc')
      coinsArray=coinsArray.sort((a,b) => a[(column)] > b[(column)] ? 1 : -1)
    } else {
      $(this).data('order', 'desc')
      coinsArray=coinsArray.sort((a,b) => a[(column)] < b[(column)] ? 1 : -1)
    }
    buildTable(coinsArray)
  })
})
  return (
    <React.Fragment>
      
      <div className="container">
        <br></br>
        <h1>Top 100 Cryptocurreny prices</h1>
        <p>Top Coins by Market Cap</p>
        <br></br>
        <br></br>
      
      <div className="row">
        <div className="col">
            <input id="search-input" className="form-control" type="text"></input>
        </div>
      </div>
      <br></br>
      <br></br>

      <table className="table table-striped">
        <tr id="column-name" className="active">
          <th></th>
          <th></th>
          <th>Coin</th>
          <th data-column="price" data-order="desc">Price</th>
          <th data-column="marketcap" data-order="desc">Market Cap</th>
          <th data-column="volume" data-order="desc">Volume</th>
          <th data-column="high" data-order="desc">All Time High</th>
          <th data-column="supply" data-order="desc">Circulating Supply</th>
          <th data-column="change" data-order="desc">24H Change</th>
        </tr>

          <tbody id="coinTable">

          </tbody>
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
    let table = document.getElementById('coinTable')

    table.innerHTML = ''

    for (let i=0; i< data.length; i++) {
      const row = `<tr>
                    <td><Button id="like-button" class="btn"><i class="far fa-heart" style="font-size: 1.5em;"></i></Button></td>
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

  ReactDOM.render(<Homepage />, document.querySelector('#app'));




  


function Homepage(props) {
  $.get('/api', response => {
    let coinsArray = response.data;
    console.log(coinsArray)
    buildTable(coinsArray)
  
  $('#search-input').on('keyup', function() {
    let value = $(this).val()
    let data = searchTable(value, coinsArray)
    buildTable(data)
  })

  $('th').on('click', function(){
    let column = $(this).data('column');
    console.log("col name", column)
    let order = $(this).data('order');
    let text = $(this).html()
    text = text.substring(0, text.length-1)
 
    if (order=='desc') {
      $(this).data('order', 'asc')
      console.log('des')
      coinsArray = coinsArray.sort((a,b) => Number(a[(column)]) - Number(b[(column)]))
      text += "&#9660;"
    } else {
      $(this).data('order', 'desc')
      console.log('esc')

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




  

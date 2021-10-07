
function Homepage(props) {
  $.get('/api', response => {
    const coinsArray = response.data
    console.log(coinsArray)
    console.log(coinsArray[0].name)
    buildTable(coinsArray)
})
  return (
    <React.Fragment>
      
      <div className="container">
      <h1>Welcome!</h1>
      <p>Top 100 Coins</p>
      
      <table className="table table-striped">
        <tr className="active">
          <th>Coin</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Volume</th>
          <th>All Time High</th>
          <th>Circulating Supply</th>
          <th>24H Change</th>
        </tr>

          <tbody id="coinTable">

          </tbody>
      </table>
      </div>
    </React.Fragment>
  );
  }

  function buildTable(data) {
    let table = document.getElementById('coinTable')

    for (let i=0; i< data.length; i++) {
      const row = `<tr>
                    <td>${data[i].symbol} <br> ${data[i].name}</td>
                    <td>$ ${parseFloat(data[i].price).toFixed(2)}</td>
                    <td>$ ${parseFloat(data[i].market_cap)}</td>
                    <td>$ ${parseFloat(data[i]["1d"].volume)}</td>
                    <td>$ ${parseFloat(data[i].high).toFixed(2)}</td>
                    <td>$ ${parseFloat(data[i].circulating_supply)}</td>
                    <td>${parseFloat(data[i]['1d'].price_change_pct)}</td>
                </tr>`
      table.innerHTML += row
    }
  }

  ReactDOM.render(<Homepage />, document.querySelector('#app'));




  

function showFavorite(evt) {
    // TODO: get the fortune and show it in the #fortune-text div
  $.get('/watchlist', (res) => {
      
    let fav = res.favorite;
    console.log(fav)
    
    // for (let i=0; i < fav.length; i++) {
    //   current_fav = fav[i]

    })   
};

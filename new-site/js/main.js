// Get an API key for your demos at https://unsplash.com/developers
// const unsplashID = 'yJiR4Eu1pytQ-zXV5s4jGrTWdQF0955S4v_3pwdWM6M';

// fetch('./fuck-this.json')
//   .then(response => response.json())

let $container = $( '.container').infiniteScroll({

   path: function() {
    return `https://api.jsonbin.io/b/60ca9f7e8ea8ec25bd0e98da`;
  },
  // load response as JSON
  responseBody: 'json',
  status: '.scroll-status',
  history: false,
  debug:true
});

$container.on( 'load.infiniteScroll', function( event, body ) {

  // compile body data into HTML
  let itemsHTML = body.map( getItemHTML ).join('');
  // convert HTML string into elements
  let $items =  $( itemsHTML );
  // append item elements
  $container.infiniteScroll( 'appendItems', $items );
});

// load initial page
$container.infiniteScroll('loadNextPage');

//------------------//

function getItemHTML({ images, pinner,description }) {
  return `<div class="photo-item">
    <img class="photo-item__image" src="${images.orig.url}" alt="Photo by ${pinner.full_name}" />
    <p class="photo-item__caption">
      <a href="${description}?utm_source=infinite-scroll-demos&utm_medium=referral&utm_campaign=api-credit">${pinner.full_name}</a>
      </p>
  </div>`;
}

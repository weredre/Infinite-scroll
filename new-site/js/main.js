// Get an API key for your demos at https://unsplash.com/developers
const unsplashID = 'yJiR4Eu1pytQ-zXV5s4jGrTWdQF0955S4v_3pwdWM6M';

let $container = $( '.container').infiniteScroll({
  path: function() {
    return `https://api.unsplash.com/photos?client_id=${unsplashID}&page=${this.pageIndex}`;
  },
  // load response as JSON
  responseBody: 'json',
  status: '.scroll-status',
  history: false,
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

function getItemHTML({ user, urls }) {
  return `<div class="photo-item">
    <img class="photo-item__image" src="${urls.regular}" alt="Photo by ${user.name}" />
    <p class="photo-item__caption">
      <a href="${user.links.html}?utm_source=infinite-scroll-demos&utm_medium=referral&utm_campaign=api-credit">${user.name}</a>
    </p>
  </div>`;
}

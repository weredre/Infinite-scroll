const Masonry = require('masonry-layout');
const InfiniteScroll = require('infinite-scroll');
const imagesLoaded = require('imagesloaded');

let $grid = $('.grid').masonry({
  itemSelector: '.photo-item',
  columnWidth: '.grid__col-sizer',
  gutter: '.grid__gutter-sizer',
  percentPosition: true,
  stagger: 30,
  // nicer reveal transition
  visibleStyle: { transform: 'translateY(0)', opacity: 1 },
  hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});

//------------------//


// get Masonry instance
var msnry = $grid.data('masonry');

$grid.infiniteScroll({
  path: function() {
    return `https://api.jsonbin.io/b/60ca9f7e8ea8ec25bd0e98da`;
  },
  // load response as JSON
  responseBody: 'json',
  outlayer: msnry,
  status: '.page-load-status',
  history: false,

});

$grid.on( 'load.infiniteScroll', function( event, body ) {
  // compile body data into HTML
  let itemsHTML = body.map( getItemHTML ).join('');
  // convert HTML string into elements
  let $items = $( itemsHTML );
  // append item elements
  $items.imagesLoaded( function() {
    $grid.append( $items ).masonry( 'appended', $items );
  })
});

// load initial page
$grid.infiniteScroll('loadNextPage');

//------------------//

function getItemHTML({ pinner, images, link }) {
  return `<div class="photo-item">
    <img class="photo-item__image" src="${images.orig.url}" alt="Photo by ${pinner.full_name}" />
    <a href="${link}?utm_source=infinite-scroll-demos&utm_medium=referral&utm_campaign=api-credit">${pinner.full_name}</a>
   </p>
  </div>`;
}

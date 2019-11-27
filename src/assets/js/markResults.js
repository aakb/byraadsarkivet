// Import exported functions and variables from other custom js files.
import {urlParameter} from "MyAssets/js/search";

// Search for string.
export function markSearch(search_input) {
  // Determine selected options
  let options = {};
  if(typeof search_input != 'undefined') {
    $(".js-mark-results").mark(search_input, options);
  }
}

// Get search parameter specifically.
export let search_input = urlParameter('search');

// Mark all occurrences of search input.
markSearch(search_input);

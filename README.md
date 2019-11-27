# Byradsarkivet frontend
This is a frontend used for Byraadsarkivet.

## Output
The output files are located in dist folder.

## Tools used
- Webpack: [https://webpack.js.org]
- Bootstrap: [https://getbootstrap.com/]
- npm: [https://www.npmjs.com]
- Twig: [https://twig.symfony.com/]

## Requirements
npm version >= 6.10.3

## Installation
run:
```
npm install
```
## Usage
To use npm http server [https://www.npmjs.com/package/http-server] run:
```
npx http-server ./dist --port=8081
```
Then go to: http://127.0.0.1:8081/frontpage.html

## Further development
To compile code run:
```
npm run build
```

## File structure
* All code is compiled into /dist folder.
* webpack.config.js is used to determine file structure. See more: 
  [https://webpack.js.org]
* Twig layout files are compiled into individual .html files
* Example data holds a single .json file with example data. This is used
  for ajax but also included as data context during twig rendering and
  used in templates.
* Custom scss and entire bootstrap scss is compiled into single main.css
  file. All bootstrap mixins/variables and functionality is available.
  [https://getbootstrap.com/]
* Bootstrap scss variables may be overridden in bootstrap-custom.scss
* All scss files are imported into a single styles.scss in assets
  folder. This file is compiled by webpack.

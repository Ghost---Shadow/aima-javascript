# aima-javascript
Javascript implementation of algorithms (and visualizations) from Russell And Norvig's "Artificial Intelligence - A Modern Approach"

[Click here to go to the static hosted page](http://aimacode.github.io/aima-javascript/)

Some Javascript visualizations that I admire, and would like to see similar kinds of things here:
- [Red Blob Games: A* Tutorial](http://www.redblobgames.com/pathfinding/a-star/introduction.html)
- [Qiao Search Demo](https://qiao.github.io/PathFinding.js/visual/)
- [Nicky Case: Simulating the World](http://ncase.me/simulating/)
- [Rafael Matsunaga: Genetic Car Thingy](http://rednuht.org/genetic_cars_2/)
- [Lee Yiyuan: 2048 Bot](http://leeyiyuan.github.io/2048ai/)

## Prerequisites

* Node.js version 0.10.0 or newer
* Install jspm, eslint, gulp globally

```
npm install -g jspm
npm install -g eslint
npm install -g gulp

```
## Installation

To run locally for development.

1. run `npm install`
2. run `jspm install`

## Running

Start a local server, e.g. `python -m SimpleHTTPServer 80` for Python 2.x or `python -m http.server 80` for Python 3.x

Then visit `http://localhost` using your browser. 

## Deploying

To bundle the web app

1. run `gulp bundle` followed by `gulp copy` to bundle the app into build folder
2. Either serve `build` folder locally.
3. Or deploy it to gh-pages by running `gulp deploy`.

## build

This directory contains the minified source code for production deployment.

## Structure

The repository has the following structure:

- There is a directory for each chapter
- Each algorithm will have a `algorithm.js` where the main logic is to be implemented. 
- Each algorithm will also have a `c_algorithm.js` which will have the javascript visualization.
- The `index.html` will include both the scripts.
- The `c_algorithm.js` will use AJAX to load `algorithm.js` into `index.html` as plain text for side-by-side reference of the reader.  
- The `index.html` will also include `main.js` which contains minified version of global scripts like jQuery, angular etc 
- See the [`index.html`](https://github.com/aimacode/aima-javascript/blob/master/2-Intelligent-Agents/index.html) of [chapter 2](http://ghost---shadow.github.io/aima-javascript/2-Intelligent-Agents/) for reference. 

# Contribution

Put the name of the chapter you want to contribute in the [Division of work](https://github.com/aimacode/aima-javascript/issues/27) thread. Please squash all comits into a single comit.

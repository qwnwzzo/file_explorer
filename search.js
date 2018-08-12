'use strict';

const lunr = require('lunr');
let index;

function resetIndex() {
  index = lunr(function () {
    this.field('file');
    this.field('type');
    this.ref('path');
  });
}

function addToIndex(files) {
  index = lunr(function () {
    this.field('file');
    this.field('type');
    this.ref('path');

    files.forEach(function(file){
      this.add(file);
    }, this);
  });
}

function find(query, cb) {
  if (!index) {
    resetIndex();
  }
  const results = index.search(query + "*" + " " + "*" + query + " " + query);
  cb(results);
}

module.exports = { addToIndex, find, resetIndex };

const fse = require('fs-extra');

const {
  generatePage,
  stringFromArray,
} = require('./util');

const generateBook = async () => {

  const [
    chapters,
  ] = await Promise.all([
    // CHAPTERS
    generatePage('./chapters'),
  ]);

  const website_content_array = [
    // CHAPTERS
    chapters.string,
  ];

  fse.outputFileSync(`ebook/book.md`, stringFromArray(website_content_array));
};

generateBook();

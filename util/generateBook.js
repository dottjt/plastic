const fse = require('fs-extra');

const {
  generateBookString,
  // stringFromArray,
} = require('./util');

const generateBookFile = async () => {

  const [
    chapters,
  ] = await Promise.all([
    // CHAPTERS
    generateBookString('./chapters'),
  ]);

  // const website_content_array = [
  //   // CHAPTERS
  //   chapters.string,
  // ];

  // fse.outputFileSync(`ebook/book.md`, stringFromArray(website_content_array));
  fse.outputFileSync(`ebook/book.md`, chapters.string);
};

generateBookFile();

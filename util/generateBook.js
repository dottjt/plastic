const fs = require('fs');

const {
  generateBookString,
  // stringFromArray,
} = require('./util');

const generateBookFile = async () => {

  const chapters = generateBookString('./chapters');

  // const website_content_array = [
  //   // CHAPTERS
  //   chapters.string,
  // ];

  // fs.outputFileSync(`ebook/book.md`, stringFromArray(website_content_array));
  fs.writeFileSync(`ebook/book.md`, chapters.string);
};

generateBookFile();

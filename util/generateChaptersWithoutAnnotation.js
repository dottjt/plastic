const fse = require('fs-extra');

const {
  generateChapterWithoutAnnotationsString,
} = require('./util');

const generateChapterWithoutAnnotationsFile = async () => {
  const [
    chapterList
  ] = await Promise.all([
    generateChapterWithoutAnnotationsString('./chapters')
  ]);

  for (const chapter of chapterList) {
    fse.outputFileSync(
      `chapters-without-annotations/${chapter.file_name_string}`, 
      chapter.chapter_text_string
    );
  }
};

generateChapterWithoutAnnotationsFile();

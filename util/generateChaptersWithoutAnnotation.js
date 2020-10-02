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
    const fileNameStart = chapter.file_name_string.split('.')[0] + '-without-annotations';
    const fileNameExt = chapter.file_name_string.split('.')[1];

    fse.outputFileSync(
      `chapters-without-annotations/${fileNameStart}.${fileNameExt}`,
      chapter.chapter_text_string
    );
  }
};

generateChapterWithoutAnnotationsFile();


const fs = require('fs');

const {
  generateChapterWithoutAnnotationsString,
} = require('./util');

const generateChapterWithoutAnnotationsFile = () => {
  const chapterList = generateChapterWithoutAnnotationsString('./chapters');
  for (const chapter of chapterList) {
    const fileNameStart = chapter.file_name_string.split('.')[0] + '-without-annotations';
    const fileNameExt = chapter.file_name_string.split('.')[1];

    fs.writeFileSync(
      `chapters-without-annotations/${fileNameStart}.${fileNameExt}`,
      chapter.chapter_text_string
    );
  }
};

generateChapterWithoutAnnotationsFile();


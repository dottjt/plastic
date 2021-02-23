const fs = require('fs');
const { chapter_list } = require('./chapterList');

// const stringFromArray = (website_content_array) => {
//   let final_string = '';
//   for (const final_string_section of website_content_array) {
//     final_string += final_string_section;
//   }
//   return final_string;
// }

const CWA_TYPE = 'chapter-without-annotation';
const PAGE_TYPE = 'page';

const fancyBreakString = () => `
<div style="display: flex; justify-content: center; align-items: center;">
  <img src="other/page_break_1.png" alt="page break" width="80" height="60" />
</div>
`;

const getHeadWithoutAnnotation = (fileContents) => {
  const headRegex = new RegExp(/---(.|[\r\n])+---/);
  const head = fileContents.match(headRegex)[0];

  const rawWithHTMLContent =  fileContents.split('---')[2];

  const content =
    rawWithHTMLContent
    .replace(/\#\#\#\#/g, '')
    .replace(/\#\#\# [\S ]+/g, '')
    .replace(/\#\# [\S ]+/g, '')
    .replace(/\n\s*\n/g, '\n\n')
    // .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(?=  <!--)([\s\S]*?)-->/g, '')

  return {
    head,
    content,
  }
}

const getHead = (fileContents) => {
  try {
    const headRegex = new RegExp(/---(.|[\r\n])+---/);
    const head = fileContents.match(headRegex)[0];

    const rawWithHTMLContent =  fileContents.split('---')[2];

    const content =
      rawWithHTMLContent
      .replace(/\#\#\#\#/g, fancyBreakString())
      .replace(/\#\#\# [\S ]+/g, '')
      .replace(/\#\# [\S ]+/g, '')
      .replace(/\n\s*\n/g, '\n\n')
      // .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/(?=  <!--)([\s\S]*?)-->/g, '')

    return {
      head,
      content,
    }
  } catch (err) {
    throw new (`getHead - ${err}`);
  }
}

const extractHeadContents = (headContents) => {
  const titleRegex = new RegExp(/title: .+/);
  const rawTitle = headContents.match(titleRegex)[0];
  const title = rawTitle.split('"')[1].replace('"', '');


  // const descriptionRegex = new RegExp(/description: .+/);
  // const rawDescription = headContents.match(descriptionRegex)[0];
  // const description = rawDescription.split('"')[1].replace('"', '');

  return {
    title,
    // description,
  }
}

const extractData = (file_contents, file_name, type) => {
  const { head, content } = type === CWA_TYPE ? (
      getHeadWithoutAnnotation(file_contents)
    ) : (
      getHead(file_contents)
    );

  const { title/* , description */ } = extractHeadContents(head);

  // const new_list_item = { content, title/* , description */ };
  return {
    // new_list_item,
    new_string_item: `# ${title}${content}`, // \n${date}
  }
}

const generateBookString = folder => {
  try {
    const folder_files = fs.readdirSync(`${folder}`, 'utf8');

    const filtered_folder_files = folder_files.filter(file => (
      chapter_list.includes(file)
    ));

    // let new_list = [];
    let new_string = '';
    for (const file_name of filtered_folder_files) {
      const file_contents = fs.readFileSync(`${folder}/${file_name}`, 'utf8');
      const { /* new_list_item, */ new_string_item } = extractData(file_contents, file_name, PAGE_TYPE);
      // new_list.push(new_list_item);
      new_string += new_string_item;
    }
    return {
      // list: new_list,
      string: new_string,
    }
  } catch (error) {
    throw new Error(`generateBookString - ${error}`);
  }
}

const generateChapterWithoutAnnotationsString = folder => {
  try {
    const folder_files = fs.readdirSync(`${folder}`, 'utf8');

    const filtered_folder_files = folder_files.filter(file => (
      chapter_list.includes(file)
    ));

    let chapterTextArray = [];
    for (const file_name of filtered_folder_files) {
      const file_contents = fs.readFileSync(`${folder}/${file_name}`, 'utf8');
      const { /* new_list_item, */ new_string_item } = extractData(file_contents, file_name, CWA_TYPE);

      chapterTextArray.push({
        chapter_text_string: new_string_item,
        file_name_string: file_name
      });
    }
    return chapterTextArray;
  } catch (error) {
    throw new Error(`generateChapterWithoutAnnotationsString - ${error}`);
  }

}

module.exports = {
  // stringFromArray,
  generateBookString,
  generateChapterWithoutAnnotationsString,
};

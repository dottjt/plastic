const fse = require('fs-extra');

// const stringFromArray = (website_content_array) => {
//   let final_string = '';
//   for (const final_string_section of website_content_array) {
//     final_string += final_string_section;
//   }
//   return final_string;
// }

const include_files = [
  // '01-life.md',
  // '02-work.md',
  // '03-family.md',
  '04-apartment.md',
  // '05-date.md',
];

const fancyBreakString = () => `
<div style="display: flex; justify-content: center; align-items: center;">
  <img src="other/page_break_1.png" alt="page break" width="80" height="60" />
</div>
`;

const getHead = (fileContents) => {
  try {
    const headRegex = new RegExp(/---(.|[\r\n])+---/);
    const head = fileContents.match(headRegex)[0];

    const rawWithHTMLContent = fileContents.split('---')[2];

    const content =
      rawWithHTMLContent
      .replace(/\#\#\#\#/g, fancyBreakString())
      .replace(/\#\#\# [\S ]+/g, '')
      .replace(/\#\# [\S ]+/g, '')
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
  const { head, content } = getHead(file_contents);
  const { title/* , description */ } = extractHeadContents(head);

  // const new_list_item = { content, title/* , description */ };
  return {
    // new_list_item,
    new_string_item: `# ${title}\n${content}\n\n\n`, // \n${date}
  }
}

const generatePage = async folder => {
  try {
    const folder_files = await fse.readdir(`${folder}`, 'utf8');

    const filtered_folder_files = folder_files.filter(file => (
      include_files.includes(file)
    ));

    // let new_list = [];
    let new_string = '';
    for (const file_name of filtered_folder_files) {
      const file_contents = await fse.readFile(`${folder}/${file_name}`, 'utf8');
      const { /* new_list_item, */ new_string_item } = extractData(file_contents, file_name, 'page');
      // new_list.push(new_list_item);
      new_string += new_string_item;
    }
    return {
      // list: new_list,
      string: new_string,
    }
  } catch (error) {
    throw new Error(`generatePage - ${error}`);
  }
}

module.exports = {
  // stringFromArray,
  generatePage,
};

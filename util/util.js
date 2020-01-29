const fse = require('fs-extra');

const stringFromArray = (website_content_array) => {
  let final_string = '';
  for (const final_string_section of website_content_array) {
    final_string += final_string_section;
  }
  return final_string;
}

const fancyBreakString = () => `
<div style="display: flex; justify-content: center; align-items: center;">
  <img src="other/page_break_1.png" alt="page break" width="80" height="60" />
</div>
`;

const getHead = (fileContents) => {
  const headRegex = new RegExp(/---(.|[\r\n])+---/);
  const head = fileContents.match(headRegex)[0];

  const rawWithHTMLContent = fileContents.split('---')[2];

  const content =
    rawWithHTMLContent
      .replace(/(?=  <!--)([\s\S]*?)-->/g, '')
      .replace(/###/g, fancyBreakString())

  return {
    head,
    content,
  }
}

const extractHeadContents = (headContents) => {
  const titleRegex = new RegExp(/title: .+/);
  const rawTitle = headContents.match(titleRegex)[0];

  const title = rawTitle.split('"')[1].replace('"', '');

  return {
    title,
  }
}

const extractData = (file_contents, file_name, type) => {
  const { head, content } = getHead(file_contents);
  const { title } = extractHeadContents(head);

  const new_list_item = { content, title };
  return {
    new_list_item,
    new_string_item: `# ${title}\n${content}\n\n\n`, // \n${date}
  }
}

const generatePage = async folder => {
  try {
    const folder_files = await fse.readdir(`${folder}`, 'utf8');

    let new_list = [];
    let new_string = '';
    for (const file_name of folder_files) {
      const file_contents = await fse.readFile(`${folder}/${file_name}`, 'utf8');
      const { new_list_item, new_string_item } = extractData(file_contents, file_name, 'page');
      new_list.push(new_list_item);
      new_string += new_string_item;
    }
    return {
      list: new_list,
      string: new_string,
    }
  } catch (error) {
    throw new Error(`generatePage - ${error}`);
  }
}

module.exports = {
  stringFromArray,
  generatePage,
};

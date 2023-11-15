const fs = require('fs');

function generateMarkdown(jsonData) {
  let markdownContent =
    '|                                                                                                                                                    |                                                                                                                                                    |\n';
  markdownContent +=
    '| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |\n';

  // Calculate the midpoint for splitting into two columns
  const midpoint = Math.ceil(jsonData.projects.length / 2);

  for (let i = 0; i < midpoint; i++) {
    const project1 = jsonData.projects[i];
    const project2 = jsonData.projects[i + midpoint];

    markdownContent += `| **${project1.name}** <br> ${project1.stack.join(
      ', '
    )} <br> ![Preview](${project1.preview}) <br> ${
      project1.desc
    } <br> [Website](${project1.links.website}) <br> [Source](${
      project1.links.source
    }) |`;

    if (project2) {
      markdownContent += ` **${project2.name}** <br> ${project2.stack.join(
        ', '
      )} <br> ![Preview](${project2.preview}) <br> ${
        project2.desc
      } <br> [Website](${project2.links.website}) <br> [Source](${
        project2.links.source
      }) |`;
    }

    markdownContent += '\n';
  }

  return markdownContent;
}

// Загрузка данных из JSON файла
const inputJson = fs.readFileSync('input.json', 'utf-8');
const data = JSON.parse(inputJson);

// Генерация Markdown и запись в файл
const markdownContent = generateMarkdown(data);
fs.writeFileSync('output.md', markdownContent, 'utf-8');

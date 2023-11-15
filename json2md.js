const fs = require('fs');

function generateMarkdown(jsonData) {
    let markdownContent = "|                       Проекты                                                                                                                             |\n";
    markdownContent += "| -------------------------------------------------------------------------------------------------------------------------------------------------- |\n";

    for (const project of jsonData.projects) {
        markdownContent += `| <br> **${project.name}** <br> <br> ${project.stack.join(', ')} <br> <img src="${project.preview}" width="400" alt="Preview"> <br> <br> ${project.desc} <br> <br>[Демонстрация](${project.links.website}) <br> [Исходный код](${project.links.source}) <br> |\n`;
    }

    return markdownContent;
}

// Загрузка данных из JSON файла
const inputJson = fs.readFileSync('input.json', 'utf-8');
const data = JSON.parse(inputJson);

// Генерация Markdown и запись в файл
const markdownContent = generateMarkdown(data);
fs.writeFileSync('output.md', markdownContent, 'utf-8');

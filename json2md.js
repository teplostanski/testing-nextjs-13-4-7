const fs = require('fs');

function generateMarkdown(jsonData) {
    let markdownContent = "";

    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            markdownContent += `## ${key}\n`;
            markdownContent += `${jsonData[key]}\n\n`;
        }
    }

    return markdownContent;
}

// Загрузка данных из JSON файла
const inputJson = fs.readFileSync('data.json', 'utf-8');
const data = JSON.parse(inputJson);

// Генерация Markdown и запись в файл
const markdownContent = generateMarkdown(data);
fs.writeFileSync('output.md', markdownContent, 'utf-8');

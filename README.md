# nodejs-homework1
Модуль 1

# Получаем и выводим весь список контактов в виде таблицы (console.table)
node index.js --action list

<img src='./images/list.png'>

# Получаем контакт по id
node index.js --action get --id 5

<img src='./images/get.png'>

# Добавялем контакт
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

<img src='./images/add.png'>

# Удаляем контакт
node index.js --action remove --id=3

<img src='./images/remove.png'>

const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const handleError = require("./utils/handleerror");

const contactsPath = path.join(__dirname, "db", "contacts.json");

/**
 * this function prints the list of contacts to the console
 * @returns {array}
 */
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    handleError(error);
  }
}

/**
 * this function prints the contact to the console by id,
 * contactId takes a number or a string
 * @returns {object}
 */
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => String(id) === contactId); // если использовать commander
    // const contact = contacts.find(({ id }) => id === contactId); // если использовать yargs
    console.log(contact);
  } catch (error) {
    handleError(error);
  }
}

/**
 * this function removes the contact by id from the array
 * and prints the new array to the console,
 * contactId takes a number or a string
 */
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContactsList = JSON.stringify(
      contacts.filter(({ id }) => String(id) !== contactId),
      null,
      2
    ); // если использовать commander
    // const newContactsList = JSON.stringify(
    //   contacts.filter(({ id }) => id !== contactId),
    //   null,
    //   2
    // ); // если использовать yargs

    await fs.writeFile(contactsPath, newContactsList);

    const dataUpdated = await fs.readFile(contactsPath);
    console.table(JSON.parse(dataUpdated));
  } catch (error) {
    handleError(error);
  }
}

/**
 * this function adds a new contact to the array
 * and prints the new array to the console
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 */
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContactsList = JSON.stringify([...contacts, newContact], null, 2);

    await fs.writeFile(contactsPath, newContactsList);

    const dataUpdated = await fs.readFile(contactsPath);
    console.table(JSON.parse(dataUpdated));

    return newContact;
  } catch (error) {
    handleError(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// first step
// function listContacts() {
//   fs.readFile(contactsPath, "utf8")
//     .then((data) => {
//       const contacts = JSON.parse(data);
//       console.log(contacts);
//     })
//     .catch((err) => console.log(err));
// }

// function getContactById(contactId) {
//   fs.readFile(contactsPath)
//     .then((data) => {
//       const contacts = JSON.parse(data);
//       // const contact = contacts.find(({ id }) => String(id) === contactId); // если использовать commander
//       const contact = contacts.find(({ id }) => id === contactId); // если использовать yargs
//       console.log(contact);
//     })
//     .catch((err) => console.log(err));
// }

// function removeContact(contactId) {
//   fs.readFile(contactsPath)
//     .then((data) => {
//       const contacts = JSON.parse(data);
//       const newContactsList = JSON.stringify(
//         contacts.filter(({ id }) => String(id) !== contactId),
//         null,
//         2
//       );

//       fs.writeFile(contactsPath, newContactsList, (err) => {
//         if (err) {
//           console.log(err.message);
//         }
//       });
//     })
//     .catch((err) => console.log(err));
// }

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, "utf8")
//     .then((data) => {
//       const contacts = JSON.parse(data);
//       const newContact = { id: shortid.generate(), name, email, phone };
//       const newContactsList = JSON.stringify(
//         [...contacts, newContact],
//         null,
//         2
//       );

//       fs.writeFile(contactsPath, newContactsList, (err) => {
//         if (err) {
//           console.log(err.message);
//         }
//       });
//     })
//     .catch((err) => console.log(err));
// }

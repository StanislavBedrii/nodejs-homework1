const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = require("./utils/commander");
program.parse(process.argv);
const argv = program.opts();

// с использованием yargs
// const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      if (!name) name = undefined;
      if (!email) email = undefined;
      if (!phone) phone = undefined;

      if (!name && !email && !phone) {
        console.log("no contact entered");
        return;
      }

      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

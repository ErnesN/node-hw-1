const { program } = require("commander");

const contacts = require("./bd");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);

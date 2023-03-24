const { program } = require("commander");

const contacts = require("./bd/contacts.js");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);

    case "get":
      const contactById = await contacts.getContactById(id);
      console.table(contactById);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
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

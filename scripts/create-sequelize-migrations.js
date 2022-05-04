const inquirer = require("inquirer");
const cmd = require("node-run-cmd");

const createSequelizeMigration = async () => {
  try {
    const { migration } = await inquirer.prompt([
      {
        name: "migration",
      },
    ]);

    cmd
      .run(`npx sequelize-cli migration:generate --name ${migration}`)
      .then(() => {
        console.log(`Success, "${migration}" migration created`);
      })
      .catch((err) => {
        console.log(`Failed, could not create migration - ${migration}`);
      });
  } catch (e) {
    console.log("Could not create migration file, try again");
  }
};

createSequelizeMigration();

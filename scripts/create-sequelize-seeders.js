const inquirer = require("inquirer");
const cmd = require("node-run-cmd");

const createSequelizeSeeder = async () => {
  try {
    const { seeder } = await inquirer.prompt([
      {
        name: "seeder",
      },
    ]);

    cmd
      .run(`npx sequelize-cli seed:generate --name ${seeder}`)
      .then(() => {
        console.log(`Success, "${seeder}" seeder created`);
      })
      .catch((err) => {
        console.log(`Failed, could not create seeder - ${seeder}`);
      });
  } catch (e) {
    console.log("Could not create seeder file, try again");
  }
};

createSequelizeSeeder();

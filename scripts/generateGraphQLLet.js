const fs = require("fs");
const { exec } = require("child_process");

const configExists = fs.existsSync("./.graphql-let.yml");

if (!configExists) {
  console.log("No graphql-let config found - creating one...");
  exec("npx graphql-let init");
}

exec("npx graphql-let");

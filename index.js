#!/usr/bin/env node
import chalk from "chalk";
import boxen from "boxen";
import fs from "fs";
const details = JSON.parse(fs.readFileSync("./package.json").toString());
const $ = console.log;
const greet = () => {
    const welcomeMessage = chalk.green("Welcome!") +
        " " +
        chalk.red(`sql-cleaner v${details === null || details === void 0 ? void 0 : details.version}`);
    const welcomeBox = boxen(welcomeMessage, {
        padding: 1,
        borderColor: "blue",
        borderStyle: "round",
    });
    $(welcomeBox);
};
greet();

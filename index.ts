#!/usr/bin/env node
import chalk from "chalk";
import boxen from "boxen";
import fs from "fs";
const $ = console.log;

const details = JSON.parse(fs.readFileSync("./package.json").toString());

const greet = () => {
    const welcomeMessage =
        chalk.green("Welcome!") +
        " " +
        chalk.red(`sql-cleaner v${details?.version}`);

    const welcomeBox = boxen(welcomeMessage, {
        padding: 1,
        borderColor: "blue",
        borderStyle: "round",
    });

    $(welcomeBox);
};

greet();

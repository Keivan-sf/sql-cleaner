#!/usr/bin/env node
import chalk from "chalk";
import boxen from "boxen";
const $ = console.log;

const greet = () => {
    const welcomeMessage =
        chalk.green("Welcome! ") +
        chalk.red("sql-cleaner ") +
        chalk.yellowBright("v0.0.1");

    const welcomeBox = boxen(welcomeMessage, {
        padding: 1,
        borderColor: "blue",
        borderStyle: "round",
    });

    $(welcomeBox);
};

greet();

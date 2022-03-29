import chalk from "chalk";
import boxen from "boxen";

export const $ = console.log;

export const $success = (...data: any[]) => {
    $(chalk.green(`✓ ${data.join(" ")}`));
};

export const $err = (...data: any[]) => {
    $(chalk.red(`✗ ${data.join(" ")}`));
};

export const $exit = (...data: any[]) => {
    $(chalk.red(`✗ ${data.join(" ")}`));
    process.exit(1);
};

export const $warn = (...data: any[]) => {
    $(chalk.yellow(`⚠ WARNING: ${data.join(" ")}`));
}

export const greet = () => {
    const welcomeMessage =
        chalk.green("Welcome! ") +
        chalk.red("sql-cleaner ") +
        chalk.yellowBright("v0.0.1");

    const welcomeBox = boxen(welcomeMessage, {
        padding: 1,
        borderColor: "blue",
        borderStyle: "round",
    });

    return welcomeBox;
};

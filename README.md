<h3 align="center">Checkout <a href="https://twitter.com/search?q=%23mahsa_amini">#Mahsa_Amini</a>, Support women of Iran 🇮🇷</h3>

# Mysql cleaner

A simple cli to clean the whole data from tables in order to ease the development

### Install

Simply clone the repo and follow the steps below:

```bash
npm run build
```

and then:

```bash
npm i -g .
```

## Setup

**1) Set an environment variable called `DATABASE_URL`**

```bash
# in macOS/Linux
export DATABASE_URL=mysql://user:password@host/database_name

# in Windows
set DATABASE_URL=mysql://user:password@host/database_name
```

-   `.env` files are considered as well

**2) Run the command in a folder which `DATABASE_URL` is set**

```bash
sql-cleaner
```

> Note that `_prisma_migrations` table will be ignored during the process. this will become optional later on

###  Exceptions `-e` `--exception`

You can force the app to ignore one/multiple tables while cleaning others

> ⚠️ Warning: `FOREIGN_KEY_CHECKS` are disabled. meaning you will not get any foreign key error in case you break a relation using exceptions

```bash
sql-cleaner -e tableName1 tableName2
```
### Development state

- ~~making the app mess with mysql variables in order to avoid foreign-key errors and have a healthy transaction~~ Done

- ~~create flags/options such as `exceptions`~~ Done

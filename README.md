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

### Usage

for the time being there are no additional flags so just follow the simple steps below

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

### Development state

- ~~making the app mess with mysql variables in order to avoid foreign-key errors and have a healthy transaction~~ Done

- ~~create flags/options such as `exceptions`~~ Done

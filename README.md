Local Cache Stats
=================

Stats for measuring [Local Cache](https://github.com/OsQu/LocalCache) performance.

Installation
------------

Install PostgreSQL as well as nodejs. Then install dependencies

    npm install

and copy `sample.env` to `development.env` and modify accordingly. Also copy `config/config.json.sample` to `config/config.json` and modify database connection info.

Now setup database with

    npm run sync_db

Don't worry when the script doesn't return (`node -e` doesn't seem to exit). Just halt the execution with `^C`.

Running
-------

    npm run start_dev

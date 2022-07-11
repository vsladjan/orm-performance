# This project is for testing performance of most popular nodejs ORMs

## TL;DR USAGE

Add config.json file in root of project with following data:
```json
{
    "db_username": "user",
    "db_password": "password"
}
```

After running **orm.sql** script and **npm install** in project, run **run.bat** on windows to run all queries 10 times on all ORMs and collect data in results.txt file. If used big data run **run_large_data.bat** instead.
For more detailed explaination check bellow.

## Installation

First run SQL script **orm.sql** located in **database** folder to populate db with huge amount of data.
There are 3 variables at start of script number_of_clubs, number_of_players, number_of_equipments
with which it is possible to control number of records generated in database.

Install **nodejs** and perform **npm install** in the root of project.


## Usage

Command that is needed to be run to perform testing is shown below:
```bash
node app.js command param1 param2
```

where **command** can have one of the following values:

**sequelize**
**bookshelf**
**knex**
**objection**
**typeorm**
**mikroorm**
**results**

Choosing sequelize will run all queries with sequelize library for example. After running command 2 files will be generated in output directory **orm_name-log.txt** and **orm_name-ALL.txt**.

**orm_name-log.txt** contains last run times and **orm_name-ALL.txt** contains callection of all measurments done. Using results as command parameter will parse **orm_name-ALL.txt** files and generate 1 **results.txt** file in output dir.

Queries that are run are:

Basic select of club

Basic select of player

Basic select of equipment

JOIN query between player and club

JOIN query between player and equipment

JOIN query between player and equipment with selection of few columns

JOIN query between player and equipment with WHERE on **param1**

Call procedure with **param2**

**param1** and **param2** can be omitted and default values will be used.
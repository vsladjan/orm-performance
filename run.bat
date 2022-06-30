@ECHO OFF

FOR /L %%i IN (0,1,30) DO (
    ECHO %%i% Iteration
    node app.js sequelize
    node app.js knex
    node app.js bookshelf
    node app.js objection
    node app.js typeorm
    node app.js mikroorm
)
@ECHO OFF

FOR /L %%i IN (1,1,5) DO (
    ECHO %%i% Iteration
    node app.js sequelize
    ::node app.js knex GETTING TIMEOUT WITH LARGE DATA
    ::node app.js bookshelf NOT WORKING WITH LARGE DATA
    node app.js objection
    node app.js typeorm
    node app.js mikroorm
)

node app.js results
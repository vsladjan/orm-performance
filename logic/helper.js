var fs = require("fs");

var writeFile = function(times, logFile, fullLogFile){
    let strTxt = "", strHeader = "", strData = "\n";

    times.forEach(function(time){
        for (const key in time){
            strTxt += key.padEnd(30) + "\t\t" + time[key] + "\n";
            strHeader += key.padEnd(30);
        } 
    });
    times.forEach(function(time){
        for (const key in time){
            strData += JSON.stringify(time[key]).padEnd(30);
        } 
    });

    try{
        file = fs.readFileSync(fullLogFile);
    } catch(e){
        fs.writeFileSync(fullLogFile, strHeader);
    }

    try{
        fs.appendFileSync(fullLogFile, strData);
        fs.writeFileSync(logFile, strTxt);
    }catch(e){
        console.log(e);
    }
}


module.exports.writeFile = writeFile;
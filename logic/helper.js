var fs = require("fs");
const readline = require('readline');

var writeFile = function(times, logFile, fullLogFile){
    let strTxt = "", strHeader = "", strData = "\n";

    times.forEach(function(time){
        for (const key in time){
            strTxt += key.padEnd(30) + "\t\t" + time[key] + "\n";
        } 
    });
    times.forEach(function(time){
        for (const key in time){
            strData += JSON.stringify(time[key]).padEnd(30);
            strHeader += key.padEnd(30);
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

var resultFile = async function(orms, fileNameDir, fileName){
    let header = "";
    let ormNumber = 0;

    for (let k=0; k<orms.length; k++){
        let objData = [0, 0, 0, 0, 0, 0, 0, 0];
        let orm = orms[k];
        const allFileContents = fs.readFileSync(fileNameDir + orm + fileName, 'utf-8');
        
        let i = 0;
        allFileContents.split(/\r?\n/).forEach(line =>  {
            let lineArray = line.split(/\s+/);
            let j = 0;
            lineArray.forEach(function(data){
                if (data != ''){
                    if (i === 0){
                        header += data.padEnd(30) + "\t\t";
                    } else {
                        objData[j] += parseFloat(data);
                    }
                    j++;
                }
            });
            i++;
        });


        if (ormNumber == 0){
            fs.writeFileSync(fileNameDir + "results.txt", "".padEnd(30) + "\t\t" + header + "\n");
        }
        fs.appendFileSync(fileNameDir + "results.txt", orm.padEnd(30) + "\t\t");
        for (let j=0; j<objData.length; j++){
            objData[j] /= (i-1);
            fs.appendFileSync(fileNameDir + "results.txt", JSON.stringify(objData[j]).padEnd(30) + "\t\t");
        }
        fs.appendFileSync(fileNameDir + "results.txt", "\n");
        ormNumber++;

    }
    
}


module.exports.writeFile = writeFile;
module.exports.resultFile = resultFile;
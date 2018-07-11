const fs = require('fs'),
readline = require('readline'),
csvData = fs.createReadStream('./input/chicagocrimes.csv');
const rl = readline.createInterface({
    input: csvData
});

let isHeader = true,
header = [],
isHeader1 = true,
header1 = [],
year, primayType, description, arrest;
let finalData = {};
let finalData1 = {};
let arrested = 0, notArrested = 0;

/*
rl.on('line', (line) =>{	
    if(isHeader){
        isHeader = false;
        header = line.split(',');
        year = header.indexOf('Year');
        primayType = header.indexOf('Primary Type');
        description = header.indexOf('Description');		
    }else{
        const row = line.split(',');

        //filteration
        let obj = {};
        if(row[primayType] === 'THEFT' && (row[year]>=2001 && row[year] <= 2018)){
            if(row[description]=== "OVER $500"){

                if(finalData[row[year]]){
                    obj['year'] = row[year];
                    finalData[row[year]]['theftOver500']++;
                }else{
                    obj['year'] = row[year];
                    obj['theftOver500'] = 1;
                    obj['theftUnder500'] = 0;
                    finalData[row[year]] = obj;
                }
                
            } else if (row[description]=== "$500 AND UNDER"){
                if(finalData[row[year]]){
                    obj['year'] = row[year];
                    finalData[row[year]]['theftUnder500']++;
                }else{
                    obj['year'] = row[year];
                    obj['theftOver500'] = 0;
                    obj['theftUnder500'] = 1;
                    finalData[row[year]] = obj;
                }
            }
        }
    }
});

rl.on('close', () => {
    let finalData2 =[];

    for (let key in finalData) {
        finalData2.push(finalData[key]);
    }
    fs.writeFile('./output/theft.json', JSON.stringify(finalData2),(err) => {
        if(err) { console.log("Error: ", err)};

        console.log("File has been written");
        console.timeEnd('time::')
    });
});

*/


rl.on('line', (line) =>{
	
    if(isHeader1){		
        isHeader1 = false;
		header1 = line.split(',');
		primayType = header1.indexOf('Primary Type');
		year = header1.indexOf('Year');
		arrest = header1.indexOf('Arrest');	
		
    }else{
        const row = line.split(',');
		
        let obj = {};
        if(row[primayType] === 'ASSAULT' && (row[year]>=2001 && row[year] <= 2018)){ 
			obj['year'] = row[year];
			if(row[arrest] == 'true'){
				arrested++;
			} else {
				notArrested++;
			}
			obj['arrested'] = arrested;
			obj['notArrested'] = notArrested;
			finalData1[row[year]] = obj;
        }
    }
});

rl.on('close', () => {
    let finalData2 =[];

    for (let key in finalData1) {
        finalData2.push(finalData1[key]);
    }
    fs.writeFile('./output/theft-1.json', JSON.stringify(finalData2),(err) => {
        if(err) { console.log("Error: ", err)};

        console.log("File has been written");
        console.timeEnd('time::')
    });
});


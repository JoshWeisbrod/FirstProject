const fs = require("fs");
let contents = fs.readFileSync("./all.csv").toString().split("\n");
if(0 == contents[contents.length-1].length)
    contents.pop();
let headers = contents[0].split(",");// get the indeces of the first content and split it by ,
headers=headers.map(header=>{
    return header.trim();
})
console.log(headers)
let data = contents.slice(1);// take out the first row
let average=0;// this variable keeps track of the average of all values
data = data.map(row => {
    row = row.split(",");

    let output = {};
    
    for(let i = 0; i < headers.length;  ++i) {
        output[headers[i]] = row[i].trim();
  }
  return output;
});

let dataByContent = {};
let josh=3
data.map(row => {
  if(!dataByContent.hasOwnProperty(row.content)){
        dataByContent[row.content] = [];
    }
    dataByContent[row.content].push(row);
});
//console.log(data.slice(0,10));
for(let i = 0; i < headers.length;  ++i) {
    output[headers[i]] = row[i].trim();
}
return output;
});

let dataByContent = {};
let josh=3
data.map(row => {
if(!dataByContent.hasOwnProperty(row.content)){
    dataByContent[row.content] = [];
}
dataByContent[row.content].push(row);
});
//console.log(data.slice(0,10));





  
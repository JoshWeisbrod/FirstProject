let count = 0;//keeps track if it is the first file or not
let terminate;//keeps track as to whether it should write to the file or not
const fs = require("fs")
let dirs = fs.readdirSync("C:/Users/Josh Weisbrod/Desktop/countdown");
//console.log(dirs);//dirs is everything iconsolen the countdown folder
for (let countFolders = 0; countFolders < dirs.length; countFolders++) {
    let filenames = fs.readdirSync("C:/Users/Josh Weisbrod/Desktop/countdown/" + dirs[countFolders])//dirs at 0 is everything in the first folder
    for (let countFiles = 0; countFiles < filenames.length; countFiles++) {
        terminate = 0
        let contents = fs.readFileSync("C:/Users/Josh Weisbrod/Desktop/countdown/" + dirs[countFolders] + "/" + filenames[countFiles]).toString().split("\n");
        if (0 == contents[contents.length - 1].length)
            contents.pop();
        headers = contents[0].split(",");// get the indeces of the first content and split it by ,
        headers = headers.map(header => {
            return header.trim();
        })
        headers.splice(1, 0, 'event');
        headers.splice(2, 0, 'session');
        let data = contents.slice(1);// take out the first row
        data = data.map(row => {
            row = row.split(",");
            let output = {};
            for (let i = 0; i < headers.length; ++i) {
                if (i == 0) {
                    output[headers[i]] = row[i].trim();
                }
                else if (i == 1) {
                    output[headers[i]] = dirs[countFolders]
                }
                else if (i == 2) {
                    output[headers[i]] = filenames[countFiles]
                }
                else {
                    output[headers[i]] = row[parseInt(parseInt(i) - 2)].trim();
                }

                //.trim();
            }
            return output;
        });
        let dataByContent = {};
        dataByContent = [];
        data.map(row => {
            if ('e06d3f8ffcde2c6120d991a63ecafa8ded88f5ee.webm' == row.content) {
                dataByContent.push(row);
               

            }



        });

        if (dataByContent.length == 0) {
            terminate = 1;
        }
        if (terminate == 0) {
            if (count == 0) {
                fs.writeFileSync("./allfinal1.csv", headers.join(",") + "\n");//create
                count++;
            }
            let rows = [];
            for (let row of dataByContent) {//used of because it is an object
                let list = [];
                for (let header of headers) {
                    list.push(row[header]);

                }
                //fs.appendFileSync("./allfinal.csv",list.join(","));
                rows.push(list.join(","))

            }
            if (count == 0) {
                fs.appendFileSync("./allfinal1.csv", rows.join("\n"));

            }
            else {
                fs.appendFileSync("./allfinal1.csv", rows.join("\n") + "\n");

            }
        }
    }
}
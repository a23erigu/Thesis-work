import newman from "newman";
import * as fs from 'fs';
import path from 'path';
import { MemoryUsageChecker } from "./memory_usage";
import { json } from "sequelize";

const collection = process.argv[2]
const iterations = parseInt(process.argv[3], 10) || 1;
const dir = path.join(__dirname, 'reports');
const memoryReader = new MemoryUsageChecker();

let output = '';

function createDir(){
    if(!fs.existsSync(dir)){
        console.log(`Directory ${dir} does not exist, creating...`);
        fs.mkdirSync(dir);
    }
}

function ValidateOutput(){
    if(!collection.includes("SQL") && !collection.includes("Prisma") && !collection.includes("Sequelize")){
        console.error("Incorrect collection naming scheme, please include 'SQL', 'Prisma', or 'Sequelize' in the collection name. ex: 'SQL-get-simple.postman_collection'");
        process.exit();
    } else{
        const dateTime = new Date();
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        const cleanTime = `${hours}-${minutes}-${seconds}`

        const collectionName = path.basename(collection);
        
        output = path.join(dir+`/response-times-${collectionName}-${iterations}-${cleanTime}.json`);
    }
}

createDir();
ValidateOutput();

interface Results {
    responseTime: number;
}

const results: Results[] = [];

memoryReader.clearMemoryUsage();

newman.run({
    collection: collection,
    iterationCount: iterations,
}).on('request', (e: Error | null, args: any) => {
    if(e){
        console.error("Request failed: ", e);
        return;
    }

    const firstRequest = args.cursor.iteration === 0 && args.cursor.position === 0;

    if(firstRequest){
        console.log("Running collection and dropping first request...");
        return;
    }

    results.push({responseTime: args.response.responseTime});

}).on('done', () => {
    fs.writeFileSync(output, JSON.stringify(results, null, 2));
    console.log(`Test completed, report ${output} created in directory: ${dir}`);
})
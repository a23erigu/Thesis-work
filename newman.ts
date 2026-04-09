import newman from "newman";
import * as fs from 'fs';
import path from 'path';
import { MemoryUsageChecker } from "./memory-usage";

const collection = process.argv[2]
const iterations = parseInt(process.argv[3], 10) || 1;
const dir = path.join(__dirname, 'reports');
const memoryReader = new MemoryUsageChecker();
const port = process.env.PORT || 8090;

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
        
        output = path.join(dir+`/report-${collectionName}-${iterations - 1}-${cleanTime}.json`);
    }
}

createDir();
ValidateOutput();

interface Results {
    iteration: number;
    responseTime: number;
    memoryUse?: number;
}

const results: Results[] = [];
let requestCounter = 0;

async function Run(){
    await memoryReader.clearMemoryUsage();

    try{
        await fetch(`http://localhost:${port}/reset`);
    } catch(e){
        console.error("Could not run garbage collector", e);
    }
    
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
        
        results.push({
            iteration: requestCounter++,
            responseTime: args.response.responseTime
        });
        
    }).on('done', async () => {
        console.log(`Test completed, reading memory file...`);

        await new Promise(resolve => setTimeout(resolve, 500));
        
        const memoryReadings = await memoryReader.getTotalMemoryUsage();

        if(memoryReadings.length !== iterations){
            console.error("Incorrect amount of memory reads");
            process.exit();
        }

        const allResults = results.map((results, index) => {
            return{
                ...results,
                memoryUse: memoryReadings[index + 1] || null
            };
        });
        
        if(allResults){
            fs.writeFileSync(output, JSON.stringify(allResults, null, 2));
            console.log(`Test completed, created report: ${output}`);
        } else{
            console.error("Could not get memory from test");
            process.exit();
        }
    })
}

Run();
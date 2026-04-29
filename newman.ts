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

// Create a directory for reports if none exists
function createDir(){
    if(!fs.existsSync(dir)){
        console.log(`Directory ${dir} does not exist, creating...`);
        fs.mkdirSync(dir);
    }
}

// Validates that a collection is selected (does not check if it exists)
function ValidateInput(){
    if(!collection){
        console.error("No collection selected, please choose a collection to run.");
        process.exit();
    } else{
        const dateTime = new Date();
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        const cleanTime = `${hours}-${minutes}-${seconds}`

        const collectionName = path.basename(collection, '.postman_collection.json');
        
        output = path.join(dir+`/report-${collectionName}-${iterations}-${cleanTime}.json`);
    }
}

// Gets the parameters to run the newman script
interface Results {
    iteration: number;
    responseTime: number;
    memoryUse?: number;
}

const results: Results[] = [];
let requestCounter = 0;

// Warms up the database with an inital run before results are collected
async function warmUp() {
    ValidateInput();

    console.log("Running warmup...");
    await RunNewman(true);

    await memoryReader.clearMemoryUsage();

    // Collect garbage before actual run
    try{
        await fetch(`http://localhost:${port}/reset`);
    } catch(e){
        console.error("Could not run garbage collector", e);
    }
    
    console.log("Running test...");
    await RunNewman(false);
}

// Newman run method
async function RunNewman(isWarmup: boolean):Promise<void>{
    return new Promise((resolve, rejects) => {
        const startTimes = new Map<String, number>();

        // Start Newman collection and check for warmup
        newman.run({
            collection: collection,
            iterationCount: isWarmup? 100 : iterations,
        }).on('beforeRequest', (e: Error | null, args: any) => {
            // Get the time before a request is made
            startTimes.set(args.cursor.ref, performance.now())
        }).on('request', (e: Error | null, args: any) => {
            if(e){
                console.error("Request failed: ", e);
                return;
            }
            
            if(isWarmup){
                return;
            }

            // Get the time after a request is complete
            const endTime = performance.now()
            const startTime = startTimes.get(args.cursor.ref)

            const responseTimeFloat = startTime ? (endTime - startTime) : args.response.responseTime;
            
            // Add result to list and increase request iteration count
            results.push({
                iteration: requestCounter++,
                responseTime: responseTimeFloat
            });
            
        }).on('done', async (e: Error | null, summary: any) => {
            if(e){
                return rejects(e)
            }
            
            if(isWarmup){
                return resolve();
            }
            
            // Get memory reads after collection is finished
            console.log(`Reading memory file...`);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Get a list of all memory reads and check that it's the correct amount
            const memoryReadings = await memoryReader.getTotalMemoryUsage();
            
            if(memoryReadings.length !== iterations){
                console.error("Incorrect amount of memory readings");
                process.exit();
            }
            
            // Map memory reads to the respective response time
            const allResults = results.map((results, index) => {
                return{
                    ...results,
                    memoryUse: memoryReadings[index] || null
                };
            });
            
            // If everything is correct, create report
            if(allResults){
                fs.writeFileSync(output, JSON.stringify(allResults, null, 2));
                console.log("--- Test completed ---");
                console.log(`Created report: ${output}`);

                resolve();
            } else{
                console.error("Could not generate report");
                rejects(e)
                process.exit();
            }
        })
    })
}

//runs the createDir and warmUp functions
createDir();
warmUp();
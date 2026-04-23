import * as fsp from 'fs/promises'
import * as fs from 'fs'
import * as path from 'path'

export class MemoryUsageChecker{
    private file = path.join(process.cwd(), 'memoryReadings.txt');
    private baseLine = 0;

    // Initalizer function to ensure the program is running correctly with all prerequisites
    public initialize(){
        this.createFile();

        console.log(`target file: ${this.file}`);

        // Check if explicit gargabe collector is enabled
        if(!global.gc){
            console.error("Garbage collector not enabled, add '--expose-gc' to the launch options and try again");
            process.exit();
        } else {
            console.log("Garbage collector enabled!");
        }

        // Return the memory usage after request and add to memoryReadings.txt file
        return () => {
            const reading = this.getMemoryUsage();

            this.appendToFile(reading);
        }
    }

    // Create the memory logging file if it doesn't exist
    public createFile(){
        if(!fs.existsSync(this.file)){
            console.log(`file ${this.file} does not exist, creating...`);
            try{
                fs.writeFileSync(this.file, '');
                console.log(`created file: ${this.file}`);
            } catch(e){
                console.error("Could not create file", e);
            }
        }
    }

    // Clear the file contents so that they don't spill over to the next measurement
    public async clearMemoryUsage(){
        await fsp.writeFile(this.file, '');
    }

    // Add the reading to the file with 3 decimal points
    private appendToFile(reading: number){
        try{
            fs.appendFileSync(this.file, `${reading.toFixed(3)},`);
        } catch(e){
            console.error(`Could not write ${reading} to ${this.file}`);
        }
    }

    // Get the current memory usage for the heap in MB
    public getMemoryUsage(){
        const memoryUsed = process.memoryUsage();
        const usedHeapMB = memoryUsed.heapUsed / 1024 / 1024;

        return usedHeapMB;
    }

    // Get every memory reading made during a test and map it to each request in newman.ts
    public async getTotalMemoryUsage(): Promise<Number[]>{
        try{
            const data = await fsp.readFile(this.file, 'utf-8');

            const memArray = data.split(',').filter(val => val.trim() !== '');

            return memArray.map(val => parseFloat(val));
        }catch(e){
            console.error("Could not read memory usage");
            return [];
        }
    }
}

const memoryUsage = new MemoryUsageChecker();

export default memoryUsage;
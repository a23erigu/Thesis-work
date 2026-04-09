import * as fs from 'fs/promises'
import * as fss from 'fs'
import * as path from 'path'

export class MemoryUsageChecker{
    private fileName = path.join(__dirname, 'memoryReadings.txt');

    // Initalizer function to ensure the program is running correctly with all prerequisites
    public initialize(){
        console.log(`target file: ${this.fileName}`);

        // Check if explicit gargabe collector is enabled
        if(!global.gc){
            console.error("Garbage collector not enabled, add '--expose-gc' to the launch options and try again");
            process.exit();
        } else {
            console.log("Garbage collector enabled!");
        }

        // Get memory usage at start to compare with after request is finished
        const init = this.getMemoryUsage();

        // Return the memory usage after request and add to memoryReadings.txt file
        return () => {
            const reading = this.getMemoryUsage() - init;

            global.gc?.()

            this.appendToFile(reading);
        }
    }

    // Create the memory logging file if it doesn't exist
    public createFile(){
        if(!fss.existsSync(this.fileName)){
            console.log(`file ${this.fileName} does not exist, creating...`);
            try{
                fss.writeFileSync(this.fileName, '');;
                console.log(`created file: ${this.fileName}`);
            } catch(e){
                console.error("Could not create file", e);
            }
        }
    }

    // Clear the file contents so that they don't spill over to the next measurement
    public async clearMemoryUsage(){
        await fs.writeFile(this.fileName, '');
    }

    // Add the reading to the file with 3 decimal points
    private appendToFile(reading: number){
        try{
            fs.appendFile(this.fileName, `${reading.toFixed(3)},`);
            console.log(`Added ${reading} to ${this.fileName}`);
        } catch(e){
            console.error(`Could not write ${reading} to ${this.fileName}`);
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
            const data = await fs.readFile(this.fileName, 'utf-8');

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
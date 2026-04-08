import * as fs from 'fs/promises'
import * as fss from 'fs'
import * as path from 'path'

export class MemoryUsageChecker{
    private fileName = path.join(__dirname, 'memoryReadings.txt');

    public initialize(){
        this.createDir();

        console.log(`target file: ${this.fileName}`);

        if(!global.gc){
            console.error("Garbage collector not enabled, add '--expose-gc' to the launch options and try again");
            process.exit();
        } else {
            console.log("Garbage collector running!");
        }

        const init = this.getMemoryUsage();

        return async () => {
            const reading = this.getMemoryUsage() - init;

            await this.appendToFile(reading);
        }
    }

    private createDir(){
        if(!fss.existsSync(this.fileName)){
            console.log(`file ${this.fileName} does not exist, creating...`);
            fss.mkdirSync(this.fileName);
        }
    }

    public async clearMemoryUsage(){
        await fs.writeFile(this.fileName, '');
    }

    private async appendToFile(reading: number){
        await fs.appendFile(this.fileName, `${reading.toFixed(3)},`);
    }

    public getMemoryUsage(){
        const memoryUsed = process.memoryUsage();
        const usedHeapMB = memoryUsed.heapUsed / 1024 / 1024;

        return usedHeapMB;
    }

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
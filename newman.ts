import newman from "newman";
import * as fs from 'fs';
import path from 'path';

const collection = process.argv[2]
const iterations = parseInt(process.argv[3], 10) || 1;
const dir = path.join(__dirname, 'reports');

function createDir(){
    if(!fs.existsSync(dir)){
        console.log(`Directory ${dir} does not exist, creating...`);
        fs.mkdirSync(dir);
    }
}

createDir();

interface Results {
    responseTime: number;
}

const results: Results[] = [];

newman.run({
    collection: collection,
    iterationCount: iterations,
    reporters: 'cli',
    reporter: {
        cli: {
        noSummary: true
    }
}
}).on('request', (e: Error | null, args: any) => {
    if(!collection.includes("SQL") && !collection.includes("Prisma") && !collection.includes("Sequelize")){
        console.error("Incorrect collection naming scheme, please include 'SQL', 'Prisma', or 'Sequelize' in the collection name. ex: 'SQL-get-simple.postman_collection'");
        process.exit();
    }

    if(e){
        console.error("Request failed: ", e);
        return;
    }

    const firstRequest = args.cursor.iteration === 0 && args.cursor.position === 0;

    if(firstRequest){
        console.log("Dropping first request");
        return;
    }

    results.push(args.response.responseTime)

}).on('done', () => {
    const dateTime = new Date();
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
    const cleanTime = `${hours}-${minutes}-${seconds}`

    if(collection.includes("SQL")){
        fs.writeFileSync(dir+`/response-times-sql-${cleanTime}.json`, JSON.stringify(results, null, 2));
    } else if(collection.includes("Prisma")){
        fs.writeFileSync(dir+`/response-times-prisma.json-${cleanTime}.json`, JSON.stringify(results, null, 2));
    } else if(collection.includes("Sequelize")){
        fs.writeFileSync(dir+`/response-times-sequelize.json-${cleanTime}.json`, JSON.stringify(results, null, 2));
    } else{
        console.error("Incorrect collection naming scheme, please include 'SQL', 'Prisma', or 'Sequelize' in the collection name. ex: 'SQL-get-simple.postman_collection'");
    }

    console.log(`Test completed, report created in directory: ${dir}`);
})
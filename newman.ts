import newman from "newman";
import * as fs from 'fs';

const collection = process.argv[2]
const iterations = parseInt(process.argv[3], 10) || 1;

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
    fs.writeFileSync("response-times.json", JSON.stringify(results, null, 2));

    console.log("Test completed");
})
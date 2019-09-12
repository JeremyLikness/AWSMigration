const azure = require('azure-storage');

const tableService = azure.createTableService(process.env.AzureWebJobsStorage);
const entGen = azure.TableUtilities.entityGenerator;
const tableName = "primes";

module.exports = function (context, req) {

    const isItAPrime = input => {
        if (input < 2) {
            return false;
        }
        if (input == 2) {
            return true;
        }
        for (let test = (input / 2) | 0; test >= 2; test -= 1) {
            if (input % test === 0) {
                return false;
            }
        }
        return true;
    };

    const isDone = (primeTest, isPrime, isCached) => {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                test: primeTest,
                isPrime: isPrime,
                cached: isCached
            }
        };
        context.done();
    };

    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.prime || (req.body && req.body.prime)) {
        var primeTest = Number(req.query.prime || req.body.prime) | 0;
        context.log(`Prime to test: ${primeTest}`);
        if (primeTest < 1) {
            context.log("Bad prime.");
            context.res = {
                status: 400,
                body: "Please pass a positive whole integer greater than or equal to 1."
            };
            context.done();
            return;
        }

        tableService.retrieveEntity(tableName, 'key', `${primeTest}`, (error, result, response) => {
            context.log("Checking cache.");
            if (error) {
                if (error.statusCode !== 404) {
                    context.log("Error fetching cache.");
                    context.log(error);
                    isDone(primeTest, isItAPrime(primeTest), false);
                    return;
                }
                context.log("Not in cache.");
                let isPrime = isItAPrime(primeTest);
                const cache = {
                    PartitionKey: entGen.String('key'),
                    RowKey: entGen.String(`${primeTest}`),
                    isPrime: entGen.Boolean(isPrime)
                };
                tableService.insertEntity(tableName, cache, (err) => {
                    if (err) {
                        context.log("Error inserting cache.");
                        context.log(err);
                    }
                    else {
                        context.log("Successfully added to cache.");
                    }
                    isDone(primeTest, isPrime, false);
                });
            } else {
                context.log("Found it in cache.");
                isDone(primeTest, result.isPrime._, true);
            }
        });
    }
    else {
        context.log("Prime was not passed.");
        context.res = {
            status: 400,
            body: "Please pass a prime to test on the query string or in the request body"
        };
        context.done();
    }
};
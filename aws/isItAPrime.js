console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {

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

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let payload = {};

    if (event.queryStringParameters && event.queryStringParameters.prime) {
        payload.prime = event.queryStringParameters.prime;
    }
    else {
        payload = JSON.parse(event.body);
    }

    console.log(payload);

    if (payload.prime) {
        const primeTest = Number(payload.prime) | 0;
        console.log(`Prime Test: ${primeTest}`);
        if (primeTest < 1) {
            done(new Error(`Unsupported value: ${payload.prime}`));
            return;
        }
        // did we store the answer
        dynamo.getItem({ TableName: 'primes', Key: { 'id': primeTest } }, (err, result) => {
            if (err && !err.statusCode === 400) {
                console.error('Bailing out: dynamodb is wrecked.');
                console.error(err);
                done(err);
                return;
            }
            else {
                if (result && result.Item) {
                    console.log("Found it in the database.");
                    done(null, {
                        test: primeTest,
                        isPrime: result.Item.isPrime,
                        cached: true
                    });
                    return;
                }
                else {
                    const isPrime = isItAPrime(primeTest);
                    console.log(`"${primeTest} is a prime": ${isPrime}`);
                    dynamo.putItem({
                        TableName: "primes",
                        Item: {
                            id: primeTest,
                            isPrime: isPrime
                        }
                    }, (err, res) => {
                        if (err) {
                            console.error("Problem caching prime result.");
                            console.error(err);
                        }
                        else {
                            console.log("It appears we cached the result.");
                        }
                        done(null, {
                            test: primeTest,
                            isPrime: isPrime,
                            cached: false
                        });
                    });
                }
            }
        });
    }
    else {
        done(new Error("Must pass prime in body."));
    }
};

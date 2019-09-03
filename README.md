# Move AWS Lambda to Azure Functions

This is the source code for the "Moving from Lambda to Azure Functions" video series that demonstrates how to migrate from AWS Lambda to Azure Functions.

## Source

The function itself determines whether a number passed is prime or not. The pure function is available in `src\isItAPrime.js`.

## AWS Lambda

The source for the AWS Lambda function is in `aws\isItAPrime.js`.

## Azure

The portal-based version of the Azure Function is available under `azure\portal`.

## Resources

* [Comparison of AWS and Azure services](https://docs.microsoft.com/azure/architecture/aws-professional/services?WT.mc_id=awsmigration-github-jeliknes)
* [Azure Functions JavaScript developer guide](https://docs.microsoft.com/azure/azure-functions/functions-reference-node?WT.mc_id=awsmigration-github-jeliknes)
* [Introduction to Azure Storage](https://docs.microsoft.com/azure/storage/common/storage-introduction?WT.mc_id=awsmigration-github-jeliknes)

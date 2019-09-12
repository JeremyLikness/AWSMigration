# Move AWS Lambda to Azure Functions

This is the source code for the "Moving from Lambda to Azure Functions" video series that demonstrates how to migrate from AWS Lambda to Azure Functions.

🎦 [Watch the video series](https://www.youtube.com/playlist?list=PL1VfiVM16kp8U5E7U2tfJdskXJg8DPPKL) (YouTube playlist)

## Quick Start

You can get started quickly with the migrated function. Simply click or tap the "Deploy to Azure" button. Be sure to enter a unique prefix (for example, use your initials or add a sequence). After the deployment is done, you can access and test the function.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

> To enable the cache, navigate to the storage account after it is created. Click on `Tables` under `Table service` then add a table named `primes`.

## The Code

This repository contains code for all related projects.

### Source ("Pure") Function

The function itself determines whether a number passed is prime or not. The pure function is available in `src\isItAPrime.js`.

### AWS Lambda

The source for the AWS Lambda function is in `aws\isItAPrime.js`.

### Azure

The portal-based version of the Azure Function is available under `azure\portal`.

The actual code produced in Part 5 for local functions is under `azure\local`.

## Resources

* [Comparison of AWS and Azure services](https://docs.microsoft.com/azure/architecture/aws-professional/services?WT.mc_id=awsmigration-github-jeliknes)
* [Azure Functions JavaScript developer guide](https://docs.microsoft.com/azure/azure-functions/functions-reference-node?WT.mc_id=awsmigration-github-jeliknes)
* [Introduction to Azure Storage](https://docs.microsoft.com/azure/storage/common/storage-introduction?WT.mc_id=awsmigration-github-jeliknes)
* [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local?WT.mc_id=awsmigration-github-jeliknes)

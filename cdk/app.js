const { App, Stack, RemovalPolicy } = require("aws-cdk-lib");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const lambda = require("aws-cdk-lib/aws-lambda");

const app = new App();
const stack = new Stack(app, "BookNestCdk");
const table = new dynamodb.Table(stack, "Books", {
  partitionKey: { name: "id", type: dynamodb.AttributeType.NUMBER },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  removalPolicy: RemovalPolicy.DESTROY,
});
const countBooks = new lambda.Function(stack, "CountBooks", {
  runtime: lambda.Runtime.NODEJS_24_X,
  handler: "index.handler",
  code: lambda.Code.fromAsset("../api"),
  environment: { TABLE_NAME: table.tableName },
});
table.grantReadData(countBooks);

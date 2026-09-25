const { App, Stack, RemovalPolicy } = require("aws-cdk-lib");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const lambda = require("aws-cdk-lib/aws-lambda");

class BookNestStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    const table = new dynamodb.Table(this, "Books", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    const countBooks = new lambda.Function(this, "CountBooks", {
      runtime: lambda.Runtime.NODEJS_24_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("../api"),
      environment: { TABLE_NAME: table.tableName },
    });
    table.grantReadData(countBooks);
  }
}

const app = new App();
new BookNestStack(app, "BookNestCdk");

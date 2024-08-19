// LambdaStack.ts
import { Stack, StackProps } from "aws-cdk-lib";
import {
  Code,
  Runtime,
  Function as LambdaFunction,
} from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { Construct } from "constructs";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";

export class LambdaStack extends Stack {
  public readonly helloLambdaIntegration: LambdaIntegration;
  
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new LambdaFunction(this, "HelloLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "hello.main",
      code: Code.fromAsset(join(__dirname, "..", "..", "services")),
    });

    this.helloLambdaIntegration = new LambdaIntegration(helloLambda);
  }
}

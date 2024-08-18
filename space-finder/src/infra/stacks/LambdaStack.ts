// LambdaStack.ts
import { Stack, StackProps } from "aws-cdk-lib";
import { Code, Runtime, Function as LambdaFunction } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { Construct } from "constructs";

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new LambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'hello.main',
            code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
        });
    }
}
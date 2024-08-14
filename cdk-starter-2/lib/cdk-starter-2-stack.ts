import * as cdk from "aws-cdk-lib";
import { Duration, CfnOutput  } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';


class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expiration)
      }]
    });
  }
}


export class CdkStarter2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create an s3 bucket 3 ways: 

    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration:{ 
        rules:[{
          expirationInDays: 1,
          status: 'Enabled'
        }]
      }
    });


    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(3)
      }]
    })

    new CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName
    });

    new L3Bucket(this, 'MyL3Bucket', 3);
  }
}

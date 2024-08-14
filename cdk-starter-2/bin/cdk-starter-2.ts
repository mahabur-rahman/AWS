#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import { CdkStarter2Stack } from '../lib/cdk-starter-2-stack';
import { PhotosStack } from '../lib/PhotoStack';

const app = new cdk.App();
new PhotosStack(app, 'PhotosStack');
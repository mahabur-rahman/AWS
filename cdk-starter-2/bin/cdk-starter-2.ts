#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarter2Stack } from '../lib/cdk-starter-2-stack';

const app = new cdk.App();
new CdkStarter2Stack(app, 'CdkStarter2Stack');
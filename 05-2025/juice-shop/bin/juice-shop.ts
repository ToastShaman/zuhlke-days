#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { JuiceShopStack } from '../lib/juice-shop-stack';
import { Tags } from 'aws-cdk-lib';

// See https://docs.aws.amazon.com/cdk/v2/guide/ecs-example.html

const app = new cdk.App();
const stack = new JuiceShopStack(app, 'JuiceShopStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

Tags.of(stack).add('Owner', 'ked');

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import { Protocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export class JuiceShopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'JuiceShopVPC', {});

    const cluster = new ecs.Cluster(this, 'JuiceShopCluster', {
      vpc: vpc
    });

    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'JuiceShop', {
      cluster: cluster,
      cpu: 256,
      memoryLimitMiB: 512,
      desiredCount: 1,
      minHealthyPercent: 100,
      publicLoadBalancer: true,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('bkimminich/juice-shop'),
        containerPort: 3000,
        environment: {
          'NODE_ENV': 'ctf',
        }
      }
    });

    const ctfd = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'CTFd', {
      cluster: cluster,
      cpu: 256,
      memoryLimitMiB: 512,
      desiredCount: 1,
      minHealthyPercent: 100,
      publicLoadBalancer: true,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('ctfd/ctfd'),
        containerPort: 8000,
      }
    });

    ctfd.targetGroup.configureHealthCheck({
      path: '/',
      protocol: Protocol.HTTP,
      healthyHttpCodes: '200-399',
      interval: cdk.Duration.seconds(30),
      timeout: cdk.Duration.seconds(5),
      healthyThresholdCount: 2,
      unhealthyThresholdCount: 3
    });
  };
};

import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export interface DiscordCommandStackProps extends StackProps {
  queueName?: string;
}

export class DiscordCommandStack extends Stack {
  constructor(scope: Construct, id: string, props?: DiscordCommandStackProps) {
    super(scope, id, props);

    // Create SQS queue
    const queue = new sqs.Queue(this, 'DiscordCommandQueue', {
      queueName: props?.queueName || 'DiscordCommandQueue',
    });

    // Create Lambda function for handling HTTP
    const httpLambdaFunction = new lambda.Function(this, 'DiscordCommandHttpFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('src/'), // Replace with your Lambda function code path
      handler: 'index.handler', // Replace with your Lambda function handler file path
      timeout: cdk.Duration.seconds(60),
      environment: {
        QUEUE_URL: queue.queueUrl,
      },
    });

    const api = new apigateway.RestApi(this, 'DiscordCommandApi', {
      restApiName: 'DiscordCommandApi',
      description: 'This service serves Discord commands.',
    });

    const integration = new apigateway.LambdaIntegration(httpLambdaFunction, {
      proxy: true,
      requestTemplates: {
        'application/json': '{ "statusCode": "200" }',
      },
    });

    const apiResource = api.root.addResource('discord');
    apiResource.addMethod('POST', integration);

    // Create Lambda function for handling Async commands
    const asyncLambdaFunction = new lambda.Function(this, 'DiscordCommandAsyncFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('src/'), // Replace with your Lambda function code path
      handler: 'index.asyncHandler', // Replace with your Lambda function handler file path
      timeout: cdk.Duration.seconds(20),
      environment: {
        QUEUE_URL: queue.queueUrl,
      },
    });

    // Grant permissions to the Lambda function to access the SQS queue
    queue.grantConsumeMessages(asyncLambdaFunction);
    asyncLambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [queue.queueArn],
        actions: ['sqs:DeleteMessage'],
      })
    );

    // Grant permission for HTTP Lambda function to add to the SQS queue
    queue.grantSendMessages(httpLambdaFunction);
    httpLambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [queue.queueArn],
        actions: ['sqs:GetQueueAttributes'],
      })
    );

    // Set up trigger for Lambda function to consume messages from the SQS queue
    const eventSource = new SqsEventSource(queue, {
      batchSize: 1,
    });
    asyncLambdaFunction.addEventSource(eventSource);
  }
}

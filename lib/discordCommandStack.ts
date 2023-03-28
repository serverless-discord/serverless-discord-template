import { DockerImage, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export interface DiscordCommandStackProps extends StackProps {
  queueName?: string;
  discordPublicKey: string;
  discordApplicationId: string;
  discordBotToken: string;
}

export class DiscordCommandStack extends Stack {
  constructor(scope: Construct, id: string, props: DiscordCommandStackProps) {
    super(scope, id, props);

    if (!props.queueName) {
      props.queueName = 'DiscordCommandQueue';
    }

    // Create SQS queue
    const queue = new sqs.Queue(this, 'DiscordCommandQueue', {
      queueName: props.queueName,
    });

    const environment = {
      QUEUE_URL: queue.queueUrl,
      DISCORD_PUBLIC_KEY: props.discordPublicKey,
      DISCORD_APPLICATION_ID: props.discordApplicationId,
      DISCORD_BOT_TOKEN: props.discordBotToken,
    };

    const allowGetParameter = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ssm:GetParameter'],
      resources: [
        `arn:aws:ssm:${this.region}:${this.account}:parameter${props.discordPublicKey}`,
        `arn:aws:ssm:${this.region}:${this.account}:parameter${props.discordApplicationId}`,
        `arn:aws:ssm:${this.region}:${this.account}:parameter${props.discordBotToken}`,
      ],
    });

    // Create Lambda function for handling HTTP
    const httpLambdaFunction = new lambda.Function(this, 'DiscordCommandHttpFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromDockerBuild('.'), // Replace with your Lambda function code path
      handler: 'index.lambdaHandler', // Replace with your Lambda function handler file path
      timeout: cdk.Duration.seconds(30),
      environment,
      memorySize: 2048,
    });

    // Grant permissions to the Lambda function to access the SSM Parameter Store secure string
    httpLambdaFunction.addToRolePolicy(allowGetParameter);

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
      code: lambda.Code.fromDockerBuild('.'), // Replace with your Lambda function code path
      handler: 'index.asyncHandler', // Replace with your Lambda function handler file path
      timeout: cdk.Duration.seconds(30),
      environment,
    });

    // Grant permissions to the Lambda function to access the SSM Parameter Store secure string
    asyncLambdaFunction.addToRolePolicy(allowGetParameter);

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

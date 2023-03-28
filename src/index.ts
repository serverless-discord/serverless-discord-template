import { APIGatewayEvent, APIGatewayProxyResult, SQSEvent } from "aws-lambda";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { HelloWorldCommand, HelloWorldCommandAsync } from "./commands";
import { initAsyncLambdaRouter, initLambdaRouter } from "serverless-discord/lambda/router";

// Get the SSM Paths for secrets
const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY || "";
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID || "";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "";
const queueUrl = process.env.QUEUE_URL || "";

// Initialize the AWS SDK SSM client
const ssmClient = new SSMClient({ region: process.env.AWS_REGION || "us-west-2" });

// Define the application public key and application id here so that
// we can cache them for subsequent invocations
let applicationPublicKey: string;
let applicationId: string;
let botToken: string;

export const commands = [
  new HelloWorldCommand(), 
  new HelloWorldCommandAsync()
];

const getSecret = async ({ ssmClient, name } : { ssmClient: SSMClient; name?: string }): Promise<string> => {
  if (!name) {
    return "";
  }
  const res = await ssmClient.send(new GetParameterCommand({ Name: name, WithDecryption: true }));
  return res.Parameter?.Value || "";
};

export const lambdaHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  // Get secrets from SSM Parameter store if they are not already cached
  applicationPublicKey = applicationPublicKey || await getSecret({ ssmClient, name: DISCORD_PUBLIC_KEY });
  applicationId = applicationId || await getSecret({ ssmClient, name: DISCORD_APPLICATION_ID });
  // Initialize the router with the command and the public key of your application.
  const router = initLambdaRouter({ applicationPublicKey, applicationId, commands, queueUrl, logLevel: "debug" });
  return router.handleLambda(event);
};

export const asyncHandler = async (event: SQSEvent): Promise<void> => {
  // Get secrets from SSM Parameter store if they are not already cached
  applicationId = applicationId || await getSecret({ ssmClient, name: DISCORD_APPLICATION_ID });
  botToken = botToken || await getSecret({ ssmClient, name: DISCORD_BOT_TOKEN });
  // Initialize the router with the command and the public key of your application.
  const router = initAsyncLambdaRouter({ applicationId, botToken, commands, logLevel: "debug" });
  await router.handleSqsEvent(event);
};
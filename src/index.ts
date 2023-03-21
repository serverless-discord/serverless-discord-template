import { SecretValue } from "aws-cdk-lib";
import { initLambdaRouter } from "serverless-discord/lambda/router";
import { HelloWorldCommand } from "./commands";

// Get DISCORD_PUBLIC_KEY from Parameter Store secure string
const applicationPublicKey = SecretValue.ssmSecure(process.env.DISCORD_PUBLIC_KEY || "").toString();

// Initialize the router with the command and the public key of your application.
const router = initLambdaRouter({ 
    commands: [new HelloWorldCommand()], 
    applicationPublicKey
});

// Export the handler for AWS Lambda.
export const handler = router.handleLambda;
// Export the handler for AWS Lambda Async
export const asyncHandler = router.handleLambdaAsyncApplicationCommand;
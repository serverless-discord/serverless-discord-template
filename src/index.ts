import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { initLambdaRouter } from "serverless-discord/lambda/router";
import { HelloWorldCommand } from "./commands";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

// Initialize the AWS SDK SSM client
const client = new SSMClient({ region: process.env.AWS_REGION || "us-west-2" });

export const lambdaHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  // Get DISCORD_PUBLIC_KEY from Parameter Store secure string
  const res = await client.send(new GetParameterCommand({ Name: process.env.DISCORD_PUBLIC_KEY || "", WithDecryption: true }));
  const applicationPublicKey = res.Parameter?.Value || "";

  // Initialize the router with the command and the public key of your application.
  const router = initLambdaRouter({ 
      commands: [new HelloWorldCommand()], 
      applicationPublicKey,
      logLevel: "debug"
  });
  return router.handleLambda(event);
};

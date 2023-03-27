import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { createRouter } from "./router";

// Initialize the AWS SDK SSM client
const client = new SSMClient({ region: process.env.AWS_REGION || "us-west-2" });
// Define the application public key and application id here so that
// we can cache them for subsequent invocations
let applicationPublicKey = "";
let applicationId = "";

export const lambdaHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  // Get secrets from SSM Parameter store if they are not already cached
  if (!applicationPublicKey) {
    const res = await client.send(new GetParameterCommand({ Name: process.env.DISCORD_PUBLIC_KEY || "", WithDecryption: true }));
    applicationPublicKey = res.Parameter?.Value || "";
  }
  if (!applicationId) {
    const res = await client.send(new GetParameterCommand({ Name: process.env.DISCORD_APPLICATION_ID || "", WithDecryption: true }));
    applicationId = res.Parameter?.Value || "";
  }

  // Initialize the router with the command and the public key of your application.
  const router = createRouter({ applicationPublicKey, applicationId });
  return router.handleLambda(event);
};

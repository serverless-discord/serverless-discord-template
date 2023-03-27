import { initLambdaRouter } from "serverless-discord/lambda/router";
import { HelloWorldCommand } from "./commands";

// Initialize the router with the command and the public key of your application.
export const createRouter = ({ applicationPublicKey, applicationId, botToken } : {
  applicationPublicKey: string;
  applicationId: string;
  botToken?: string;
}) => {
  return initLambdaRouter({ 
    commands: [new HelloWorldCommand()], 
    applicationPublicKey,
    applicationId,
    botToken,
    logLevel: "debug"
  });
};
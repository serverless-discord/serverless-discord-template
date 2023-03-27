import dotenv from "dotenv";
dotenv.config();
import { initRegistrar } from "serverless-discord/core/register";
import { commands } from "../src";

const applicationId = process.env.DISCORD_APPLICATION_ID || "";
const botToken = process.env.DISCORD_BOT_TOKEN || "";

if (!applicationId || !botToken) {
  throw new Error("DISCORD_APPLICATION_ID and DISCORD_BOT_TOKEN must be set");
}

const registrar = initRegistrar({ commands, applicationId, botToken, logLevel: "debug" });
registrar.registerAllCommands();
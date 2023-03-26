import { createRouter } from "../src/router";

// Get secrets from environment variables
const applicationPublicKey = process.env.DISCORD_PUBLIC_KEY || "";
const applicationId = process.env.DISCORD_APPLICATION_ID || "";
const botToken = process.env.DISCORD_BOT_TOKEN || "";

if (!applicationPublicKey || !applicationId || !botToken) {
  throw new Error("Missing environment variables");
}

// Initialize the router with the command and the public key of your application.
const router = createRouter({
  applicationPublicKey,
  applicationId,
  botToken,
});

// Register all commands
console.log("Registering all commands");
Promise.resolve(router.registerAllCommands());
console.log("Registered all commands");
import { ServerlessDiscordCommandChatInput, DiscordInteractionApplicationCommand, DiscordInteractionResponse, DiscordInteractionResponseTypes } from "serverless-discord";
import { initLambdaRouter } from "serverless-discord/aws";

// You can get this from the Discord Developer Portal
const DISCORD_PUBLIC_KEY = process.env?.DISCORD_PUBLIC_KEY || "";

class HelloWorldCommand extends ServerlessDiscordCommandChatInput {
    constructor() {
        super({
            name: "test",
            options: [],
        });
    }
    async handleInteraction(interaction: DiscordInteractionApplicationCommand): Promise<DiscordInteractionResponse> {
        return {
            type: DiscordInteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Hello World!",
            },
        }
    }
}

const router = initLambdaRouter({ commands: [new HelloWorldCommand()], applicationPublicKey: DISCORD_PUBLIC_KEY });

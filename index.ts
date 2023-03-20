import { ServerlessDiscordCommandChatInput, DiscordInteractionApplicationCommand, DiscordInteractionResponse, DiscordInteractionResponseTypes, initLambdaRouter } from "serverless-discord";

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

const router = initLambdaRouter({ 
    commands: [new HelloWorldCommand()], 
    applicationPublicKey: process.env?.DISCORD_PUBLIC_KEY || "" 
});

export const handler = router.handleLambda;
import { CommandChatInput } from "serverless-discord/core/command";
import { DiscordInteractionApplicationCommand, DiscordInteractionResponse, DiscordInteractionResponseTypes } from "serverless-discord/discord/interactions";

// This is a simple command that replies with "Hello World!" when the command is executed.
export class HelloWorldCommand extends CommandChatInput {
    constructor() {
        super({
            name: "test",
            options: [],
        });
    }
    async handleInteraction(interaction: DiscordInteractionApplicationCommand): Promise<DiscordInteractionResponse> {
        console.log(interaction);
        return {
            type: DiscordInteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Hello World!",
            },
        }
    }
}
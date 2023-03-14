import { ServerlessDiscordCommandChatInput, DiscordInteractionApplicationCommand, DiscordInteractionResponse } from "serverless-discord";

class TestCommand extends ServerlessDiscordCommandChatInput {
    constructor() {
        super({
            name: "test",
            options: [],
        });
    }
    handleInteraction(interaction: DiscordInteractionApplicationCommand): DiscordInteractionResponse {
        return {
            type: 1,
            data: {
                tts: false,
                content: "test",
                embeds: [],
                allowed_mentions: {
                    parse: [],
                    roles: [],
                    users: [],
                    replied_user: false,
                },
                components: [],
            },
        }
    }
}
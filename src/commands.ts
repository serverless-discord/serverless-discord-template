import { CommandChatInput, CommandChatInputAsync } from "serverless-discord/core/command";
import { DiscordInteractionApplicationCommand, DiscordInteractionResponse, DiscordInteractionResponseData, DiscordInteractionResponseTypes } from "serverless-discord/discord/interactions";

// This is a simple command that replies with "Hello World!" when the command is executed.
export class HelloWorldCommand extends CommandChatInput {
  constructor() {
    super({
      name: "test",
      description: "Test command",
      options: [],
    });
  }

  async handleInteraction(interaction: DiscordInteractionApplicationCommand): Promise<DiscordInteractionResponse> {
    return {
      type: DiscordInteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Hello World!",
      },
    };
  }
}

export class HelloWorldCommandAsync extends CommandChatInputAsync {
  constructor() {
    super({
      name: "testasync",
      description: "Test async command",
      options: [],
    });
  }

  async handleInteractionAsync(interaction: DiscordInteractionApplicationCommand): Promise<DiscordInteractionResponseData> {
    return { content: "Hello from async land!" };
  }
}
import { DiscordInteractionApplicationCommand } from "serverless-discord/discord/interactions";
import { HelloWorldCommand } from "./commands";

describe("HelloWorldCommand", () => {
  it("should return a response", async () => {
    const command = new HelloWorldCommand();
    const res = await command.handleInteraction(new DiscordInteractionApplicationCommand({
      id: "123",
      application_id: "123",
      token: "123",
      version: 1,
      data: {
        type: 1,
        id: "123",
        name: "test",
        options: [],
      },
    }));
    expect(res).toEqual({
      type: 4,
      data: {
        content: "Hello World!",
      },
    });
  });
});
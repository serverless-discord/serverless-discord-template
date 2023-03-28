#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DiscordCommandStack } from '../lib/discordCommandStack';

const app = new cdk.App();
new DiscordCommandStack(app, 'DiscordCommandStack', {
  discordApplicationId: "/dev/serverless-discord-template/DISCORD_APPLICATION_ID",
  discordBotToken: "/dev/serverless-discord-template/DISCORD_BOT_TOKEN",
  discordPublicKey: "/dev/serverless-discord-template/DISCORD_PUBLIC_KEY",
});
# serverless-discord-template

Template for [serverless-discord](https://github.com/serverless-discord/serverless-discord) that uses AWS Lambda and
SQS to run a Discord bot. It has both an synchronous and an asynchronous command for an example of how to do either one. It
is generally recommended to use async commands when possible because Lambda doesn't always return fast enough for Discord.

## Quick start

```
npm install
```

### Setup Discord Application

You will need to create a Discord application through the developer portal. Once you have your application created, 
you will also want to create a bot for the application to get a bot token.

### Add Discord Public Key to SSM Parameter Store

Using the default KMS key on your AWS account, replace `CHANGEME!!` with your public Discord key from the Discord developer website:

```
aws ssm put-parameter \
    --name "serverless-discord-template/dev/DISCORD_PUBLIC_KEY" \
    --value "CHANGEME!!" \
    --type "SecureString"

aws ssm put-parameter \
    --name "serverless-discord-template/dev/DISCORD_APPLICATION_ID" \
    --value "CHANGEME!!" \
    --type "SecureString"

aws ssm put-parameter \
    --name "serverless-discord-template/dev/DISCORD_BOT_TOKEN" \
    --value "CHANGEME!!" \
    --type "SecureString"
```

### Initialize CDK

```
cdk bootstrap aws://<your_aws_account_id>/<region>
```

### Deploy

```
cdk deploy
```

### Update Discord with function URL

Go into the Discord developer portal and add the API Gateway URL that was output to `Interactions Endpoint URL` field. When
you click save, it should verify that your application is properly setup.

### Register commands with Discord

Discord requires you to register your commands to use them. Luckily there is a helper included that is used in `scripts/createCommands.ts` to handle the dirty work.

```
npm run deploy:discord
```

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run test`    perform the jest unit tests
 * `npm run deploy:discord` registers the command with Discord
 * `npm run lint`    runs linting across the project
 * `npm run lint:fix` runs linting and fixes anything it can
 * `cdk bootstrap`   bootstrap the cdk project to your account
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
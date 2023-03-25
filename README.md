# serverless-discord-template

Template for [serverless-discord](https://github.com/themcaffee/serverless-discord)

## Quick start

```
npm install
```

Edit `index.ts` to start adding your own classes

### Add Discord Public Key to SSM Parameter Store

Using the default KMS key on your AWS account, replace `CHANGEME!!` with your public Discord key from the Discord developer website:

```
aws ssm put-parameter \
    --name "serverless-discord-template/dev/DISCORD_PUBLIC_KEY" \
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

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk bootstrap`   bootstrap the cdk project to your account
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
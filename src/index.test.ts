import { lambdaHandler } from "./index";

describe("exported aws lambda handler", () => {
  it("should return a response", async () => {
    lambdaHandler({
      body: JSON.stringify({
        type: 2,
        token: "A_UNIQUE_TOKEN",
        id: "786008729715212338",
        "guild_id": "290926798626357999",
        "app_permissions": "442368",
        "guild_locale": "en-US",
        "locale": "en-US",
        "data": {
          "options": [
            {
              "type": 3,
              "name": "cardname",
              "value": "The Gitrog Monster"
            }
          ],
          "type": 1,
          "name": "cardsearch",
          "id": "771825006014889984"
        },
        "channel_id": "645027906669510667"
      }),
      "resource": "/{proxy+}",
      "path": "/path/to/resource",
      "httpMethod": "POST",
      "isBase64Encoded": true,
      "queryStringParameters": {
        "foo": "bar"
      },
      "multiValueQueryStringParameters": {
        "foo": [
          "bar"
        ]
      },
      "pathParameters": {
        "proxy": "/path/to/resource"
      },
      "stageVariables": {
        "baz": "qux"
      },
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, sdch",
        "Accept-Language": "en-US,en;q=0.8",
        "Cache-Control": "max-age=0",
        "CloudFront-Forwarded-Proto": "https",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-Mobile-Viewer": "false",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Tablet-Viewer": "false",
        "CloudFront-Viewer-Country": "US",
        "Host": "1234567890.execute-api.us-east-1.amazonaws.com",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Custom User Agent String",
        "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
        "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
        "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
      },
      "multiValueHeaders": {
        "Accept": [
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        ],
        "Accept-Encoding": [
          "gzip, deflate, sdch"
        ],
        "Accept-Language": [
          "en-US,en;q=0.8"
        ],
        "Cache-Control": [
          "max-age=0"
        ],
        "CloudFront-Forwarded-Proto": [
          "https"
        ],
        "CloudFront-Is-Desktop-Viewer": [
          "true"
        ],
        "CloudFront-Is-Mobile-Viewer": [
          "false"
        ],
        "CloudFront-Is-SmartTV-Viewer": [
          "false"
        ],
        "CloudFront-Is-Tablet-Viewer": [
          "false"
        ],
        "CloudFront-Viewer-Country": [
          "US"
        ],
        "Host": [
          "0123456789.execute-api.us-east-1.amazonaws.com"
        ],
        "Upgrade-Insecure-Requests": [
          "1"
        ],
        "User-Agent": [
          "Custom User Agent String"
        ],
        "Via": [
          "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)"
        ],
        "X-Amz-Cf-Id": [
          "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA=="
        ],
        "X-Forwarded-For": [
          "127.0.0.1, 127.0.0.2"
        ],
        "X-Forwarded-Port": [
          "443"
        ],
        "X-Forwarded-Proto": [
          "https"
        ]
      },
      "requestContext": {
        "accountId": "123456789012",
        "resourceId": "123456",
        "stage": "prod",
        "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
        "requestTime": "09/Apr/2015:12:34:56 +0000",
        "requestTimeEpoch": 1428582896000,
        "path": "/prod/path/to/resource",
        "resourcePath": "/{proxy+}",
        "httpMethod": "POST",
        "apiId": "1234567890",
        "protocol": "HTTP/1.1",
        "authorizer": {},
        "identity": {
          apiKey: "", 
          apiKeyId: "123", 
          clientCert: null, 
          principalOrgId: "",
          "cognitoIdentityPoolId": null,
          "accountId": null,
          "cognitoIdentityId": null,
          "caller": null,
          "accessKey": null,
          "sourceIp": "127.0.0.1",
          "cognitoAuthenticationType": null,
          "cognitoAuthenticationProvider": null,
          "userArn": null,
          "userAgent": "Custom User Agent String",
          "user": null
        },
      }
    });
  });
});
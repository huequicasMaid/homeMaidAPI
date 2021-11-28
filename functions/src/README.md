# API Documents

## `[GET] /hello`

Should use API working, authentication test.

### Request Query

|QueryName|Require?|Description|
|---|---|---|
|token|true| Generated token|


### Response

if token and user exist, return this.

```json
{
  "statusCode": 200,
  "message": "hello, ${yourUserName}"
}
```


## `[POST] /exec`

execute scene Request to switchBotAPI. 

### Request Parameter

> Note: This parameter is contain on HTTP Body's JSON.

|QueryName|Require?|Description|
|---|---|---|
|token|true|Generated token|
|isTurnOn|false|To turnOn Entrance light, set `true`.|
|withRoom|false|To Enable huequica's Air Conditioner and etc, set `true`.|


### Response

if token and user exist, return this.  

```json
{
  "statusCode": 200,
  "message": "success",
  "data": {}
}
```

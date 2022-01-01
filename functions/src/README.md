# API Documents

# ALL ENDPOINTS

For use this API, contain token in `header`.

|Parameter|Type|Location|Required|Description|
|---|---|---|---|---|
|authorization|string|header| `true` | API Token(see [`/admin/README.md`](https://github.com/huequicasMaid/homeMaidAPI/blob/main/admin/README.md).)|

## `[GET] /hello`

Should use API working, authentication test.

### Request Query

nobody queries required this.

### Response

if token and user exist, return this.

```json
{
  "statusCode": 200,
  "message": "hello, ${yourUserName}"
}
```


## `[POST] /exec`

execute scene request to switchBotAPI. 

### Request Parameter

> Note: This parameter is contain on HTTP Body's JSON.

|QueryName|Require?|Description|
|---|---|---|
|isTurnOn|false|To turnOn entrance light, set `true`.|
|withRoom|false|To enable huequica's air conditioner and etc, set `true`.|


### Response

if token and user exist, return this.  

```json
{
  "statusCode": 200,
  "message": "success",
  "data": {}
}
```

# dcm-registry

[![Build status](https://heymrcarter.visualstudio.com/Destiny%20Clan%20Manager/_apis/build/status/DCM-Registry)](https://heymrcarter.visualstudio.com/Destiny%20Clan%20Manager/_build/latest?definitionId=20)
![Release status](https://vsrm.dev.azure.com/heymrcarter/_apis/public/Release/badge/7e5f3784-dda9-4bf0-9c99-7bde292990b9/6/17)

> Registry microservice for Destiny Clan Manager

## Endpoints

### `registerClan`

```{bash}
POST /registry
```

Request body:

```{json}
{
  "clanId": "{clanId}"
}
```

Register the clan with the given ID with Destiny Clan Manager

### `getRegisteredClans`

```{bash}
GET /registry
```

Returns an array of clan IDs

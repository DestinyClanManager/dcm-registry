# dcm-registry

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

# The Zach Noise API

Zach makes a lot of noises, they should be reported and saved.

## Usage

### Api Key

All requests must include an api key to be processed.

| Name      | Required  | Example           |
| --------- | --------- | ----------------- |
| api_key   | yes       | ?api_key=API_KEY  |


### Routes

```GET /api/noises```

Returns _all_ noises

-----

```GET /api/noise/:id```

| Name  | Required  | Description   |
| ----- | --------- | ------------- |
| id    | yes       | Number        |

Returns a single noise

-----

```GET /api/types```

Returns _all_ types

-----

```GET /api/type/:type```

| Name  | Required  | Description   |
| ----- | --------- | ------------- |
| type  | yes       | Number        |

Returns a single type

-----

```GET /api/search/:type```

| Name  | Required  | Description   |
| ----- | --------- | ------------- |   
| type  | yes       | String        |

Returns _all_ noises of that type

-----

```POST /api/noise```

coming.

-----

```POST /api/type```

coming.

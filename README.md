# The Zach Noise API

Zach makes a lot of noises, they should be reported and saved.

## Usage

### Where

https://zach-noise-api.herokuapp.com/api/

### Api Key

All requests must include an ```api_key``` to be processed.

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

Coming soon. more_than, less_than

-----

```POST /api/noise```

###### Body

| Name      | Required  | Description           |
| --------- | --------- | --------------------- |   
| type      | yes       | Number (type id)      |
| severity  | yes       | Float (min:1, max:6)  |
| reporter  | No        | Number (reporter id)  |

Saves a noise to the database

-----

```POST /api/type```

###### Body

| Name      | Required  | Description   |
| --------- | --------- | ------------- |   
| name      | yes       | String        |

Saves a noise type to the database

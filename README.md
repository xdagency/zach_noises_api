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

```POST /api/noise```

###### Body

| Name      | Required  | Description           |
| --------- | --------- | --------------------- |   
| type      | yes       | Number (type id)      |
| severity  | yes       | Float (min:1, max:6)  |
| reporter  | No        | Number (reporter id)  |

Saves a noise to the database

-----

```PATCH /api/noise/:id```

###### Body

| Name      | Required  | Description   |
| --------- | --------- | ------------- |   
| ID        | yes       | Number        |
| Severity  | No        | Number (ID)   |
| Reporter  | No        | Number (ID)   |
| Type      | No        | Number (ID)   |

Updates a noise at a specific ID

-----

```DELETE /api/noise/:id```

| Name      | Required  | Description   |
| --------- | --------- | ------------- |   
| id        | yes       | Number        |

Deletes a noise from the database

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

```POST /api/type```

###### Body

| Name      | Required  | Description   |
| --------- | --------- | ------------- |   
| name      | yes       | String        |

Saves a noise type to the database

-----

```GET /api/search/:type?more_than=2&less_than=5```

| Name       | Required  | Description   |
| ---------- | --------- | ------------- |   
| type       | yes       | String        |
| more_than  | no        | Number        |
| less_than  | no        | Number        |

Returns _all_ noises of that type
Returns _all_ noises of that type _more than_ x
Returns _all_ noises of that type _less than_ x

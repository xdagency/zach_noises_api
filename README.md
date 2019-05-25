# The Zach Noise API

Zach makes a lot of noises, they should be reported and saved.

## Usage

### Routes

```GET /noises```

##### Params

| Name      | Required  |
| --------- | --------- |
| api_key   | yes       |

Returns _all_ noises

-----

```GET /noise/:id```

##### Params

| Name      | Required  |
| --------- | --------- |
| api_key   | yes       |

##### Body

| Name  | Required  | Description   |
| ----- | --------- | ------------- |   
| id    | yes       | Number        |

Returns a single noise

-----

```GET /types```

-----

coming.

-----

```GET /type/:type```

coming.

-----

```GET /search```

coming.

-----

```POST /noise```

coming.

-----

```POST /type```

coming.

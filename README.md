# Hermit Purple

GraphQL APIs for [Muta][muta] framework.

## Environment Variables

| Key           | Type   | Description                                                  |
| ------------- | ------ | ------------------------------------------------------------ |
| MUTA_ENDPOINT | String | The Mute framework GraphQL RPC endpoint, e.g. *http://127.0.0.1:8000/graphql* |
| MUTA_CHAINID  | String | The ChainID                                                  |
| POSTGRESQL_URL| String | The PostgreSQL URL for connect the database for syncing or fetching data  |

## Deployment

```shell script
git clone https://github.com/homura/hermit-purple-server.git
cd hermit-purple-server
export MUTA_ENDPOINT=http://127.0.0.1:8000/graphql
yarn
yarn build
# recommend pm2 here
yarn start
```

## Development

```shell script
git clone https://github.com/homura/hermit-purple-server.git
cd hermit-purple-server
yarn
yarn dev
```

[muta]: https://github.com/nervosnetwork/muta

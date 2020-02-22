# Environment Variables

## MUTA_ENDPOINT:

- type: String
- default: http://127.0.0.1:8000/graphql
- description: The Muta framework GraphQL RPC endpoint

## MUTA_CHAINID:

- type: String
- default: 0xb6a4d7da21443f5e816e8700eea87610e6d769657d6b8ec73028457bf2ca4036
- description: The Muta ChainID

## POSTGRESQL_URL:

- type: String
- default: postgresql://postgres@localhost:5432/muta?schema=public
- description: The PostgreSQL [connection URI](https://www.postgresql.org/docs/9.2/libpq-connect.html#LIBPQ-CONNSTRING)

### HERMIT_PORT:

- type: Number
- default: 4040
- description: The GraphQL API cache server listening port.

## HERMIT_FETCH_CONCURRENCY:

- type: Number
- default: 50
- description: The concurrency when sync block data from a Muta instance

## HERMIT_MAX_COMPLEXITY:

- type: Number
- default: 100
- description: A large query would be baned when complexity over this value

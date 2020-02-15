# Hermit Purple

GraphQL APIs for [Muta][muta] framework.

## Environment Variables

| Key                      | Type   | DEFAULT                                                            | Description                             |
| ------------------------ | ------ | ------------------------------------------------------------------ | --------------------------------------- |
| MUTA_ENDPOINT            | String | http://127.0.0.1:8000/graphql                                      | The Mute framework GraphQL RPC endpoint |
| MUTA_CHAINID             | String | 0xb6a4d7da21443f5e816e8700eea87610e6d769657d6b8ec73028457bf2ca4036 | The ChainID                             |
| POSTGRESQL_URL           | String | postgresql://postgres@localhost:5432/muta?schema=public            | Teh PostgreSQL URL                      |
| HERMIT_PORT              | Number | 4040                                                               | The cache server listen port            |
| HERMIT_FETCH_CONCURRENCY | Number | 500                                                                | The concurrency of RPC                  |

## How does it work?

```
                                   block
                  +-----------+    tx        +-----------+
                  |   sync    |    receipt   |   Muta    |
                  |           <--------------+           |
                  +-----+-----+              +-----^-----+
                        |                          |
                        |                          |
+-----------+        +--v---+                      |
|  GraphQL  <--------+      |                      |
|    API    |        |  DB  |                      |
+-----+-----+        |      |                      |
      |              +------+                      |
      |                                            |
      |                                            |
      |                                            |
      +--------------------------------------------+
                     sendTransaction


```

## References

- [deploy](./docs/deploy.md)


[muta]: https://github.com/nervosnetwork/muta

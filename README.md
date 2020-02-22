# Hermit Purple

A GraphQL API server for [Muta][muta] framework.

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

- [config](./docs/env.md)
- [deploy](./docs/deploy.md)

[muta]: https://github.com/nervosnetwork/muta

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.0.1 (2020-02-19)


### Features

* add Balance into SQL schema ([a1ae43c](https://github.com/homura/hermit-purple-server/commit/a1ae43c2c8bb895eeec8b343fd9dade01332a978))
* make 1:1 table into one table for performance ([22609b6](https://github.com/homura/hermit-purple-server/commit/22609b67a27f44ff00797613830dbe7b70adaab1))
* make 1:1 table into one table for performance ([2ee6494](https://github.com/homura/hermit-purple-server/commit/2ee64943fce1e4de37a374f3f59dbf153999b5c7))
* skip duplicate tx when sync ([f7718f9](https://github.com/homura/hermit-purple-server/commit/f7718f98f0ddb72da264abdc92361f962689bf8c))
* supported `proposer` in Block and `cyclesUsed` in Transaction ([725bb54](https://github.com/homura/hermit-purple-server/commit/725bb549b984cf65ccae8be02a785a5b044b0943))
* supported Account ([aae77dd](https://github.com/homura/hermit-purple-server/commit/aae77dd66ef116bb6cb89efcf4778fd0658052c3))
* supported Asset and Transfer in prisma ([9c299a1](https://github.com/homura/hermit-purple-server/commit/9c299a1fdba275922cff08d96a7b8c1e4aa4d983))
* supported asset in API and sync ([023cdac](https://github.com/homura/hermit-purple-server/commit/023cdac7b1dff4f786ecdf396eeb226a7e85ad22))
* supported balance ([9364e5b](https://github.com/homura/hermit-purple-server/commit/9364e5b8296568f89c388138ed2bb4a8e3b78336))
* supported calc complexity with variables in query body ([746192f](https://github.com/homura/hermit-purple-server/commit/746192f4efee1080ed8d1ddf28c42e2240d25b98))
* supported calc complexity with variables in query body ([b78e0a6](https://github.com/homura/hermit-purple-server/commit/b78e0a6c040cb9e99863262104d40584706c5aaa))
* supported config MUTA_CHAIN by env ([ace6b0a](https://github.com/homura/hermit-purple-server/commit/ace6b0a4a313a4a99d8efd40c98eabaadf4899ea))
* supported load `.env` when sync ([9102db9](https://github.com/homura/hermit-purple-server/commit/9102db9518b4b9042d5a79434665cd5e7253cf29))
* supported max_complexity to avoid resource exhaustion ([0be84a3](https://github.com/homura/hermit-purple-server/commit/0be84a3780a5047a52512623d2d0982b90c7640b))
* supported receipt ([93ba796](https://github.com/homura/hermit-purple-server/commit/93ba79692b32cbf9d956567f39ef4f12f0aa8974))
* supported sync tx and epoch ([f0d47b5](https://github.com/homura/hermit-purple-server/commit/f0d47b5ecb4de31d89a8f032a6606e71dc06acb2))
* update sync to new table schema ([be8d9c6](https://github.com/homura/hermit-purple-server/commit/be8d9c633e16ca1a2b0adb5e55d34b7802abc0dc))
* upgrade sdk to 0.7.0 ([7697489](https://github.com/homura/hermit-purple-server/commit/7697489980cdbc3c418dbd49999a71fefbcb8a9a))


### Bug Fixes

* fix complexity calc fail on accounts ([4acebea](https://github.com/homura/hermit-purple-server/commit/4acebead67ec84f211df138bd545ccb440891e48))
* fix waitForNextBlock error when sync ([fb89b95](https://github.com/homura/hermit-purple-server/commit/fb89b95506fc20cb0e440b15f9720e0bec143bb0))

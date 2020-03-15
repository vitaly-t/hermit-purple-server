# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0-alpha.0](https://github.com/homura/hermit-purple-server/compare/v0.1.1-alpha.0...v0.2.0-alpha.0) (2020-03-15)


### Features

* available amount in transfer ([0d59a4c](https://github.com/homura/hermit-purple-server/commit/0d59a4c41c1ddcd7a79ec71609dab35de969f2d4))
* chain proxy filter ([#2](https://github.com/homura/hermit-purple-server/issues/2)) ([7402fcc](https://github.com/homura/hermit-purple-server/commit/7402fcc90694b15023d8e2581e1747c61ea2cc08))
* impl the DAO and new version GraphQL ([cd27a04](https://github.com/homura/hermit-purple-server/commit/cd27a041d60a2f45737327ebe22d039f2665350b))
* link asset to transfer ([e10b530](https://github.com/homura/hermit-purple-server/commit/e10b5304f12301933837f424e2c3c4b6fdd18a5d))
* migrate sync to MySQL ([e2aba54](https://github.com/homura/hermit-purple-server/commit/e2aba5473bb8f88e5ea2d14a0a0650c39b08f699))
* remove prisma dependency ([62fed1a](https://github.com/homura/hermit-purple-server/commit/62fed1a0b42cf71499ea616f844e9deeb5ab456f))
* supported custom HERMIT_MAX_SKIP_SIZE ([e1b2ce0](https://github.com/homura/hermit-purple-server/commit/e1b2ce0d448d6461e9e669312f253be3110bd9f0))
* supported genesis and native asset ([91a8441](https://github.com/homura/hermit-purple-server/commit/91a8441945960c6c0bd149d212ee79076de1cfc4))

### [0.1.1-alpha.0](https://github.com/homura/hermit-purple-server/compare/v0.0.2-alpha.5...v0.1.1-alpha.0) (2020-03-03)


### Features

* add Dockerfile ([a129dea](https://github.com/homura/hermit-purple-server/commit/a129deae29b6dcf9d0b4f30aed66dd857f913975))
* supported `orderBy` for `TransferHistories` defaults `orderBy` to  desc ([#1](https://github.com/homura/hermit-purple-server/issues/1)) ([ec2a337](https://github.com/homura/hermit-purple-server/commit/ec2a3376f923a5497cccfca686f7eb36ba2fcb37))

## [0.1.0](https://github.com/homura/hermit-purple-server/compare/v0.0.2-alpha.5...v0.1.0) (2020-02-29)


### Features

* change `TransferHistories` arguments as an inputObject with a where clause ([890beee](https://github.com/homura/hermit-purple-server/commit/890beee322cb9479a0de6ba8644cbe12b45c8749))
* disabled CORS default ([6f211d7](https://github.com/homura/hermit-purple-server/commit/6f211d77d4d708278a6c0440bf9c1927e1b5f621))

### [0.0.2-alpha.5](https://github.com/homura/hermit-purple-server/compare/v0.0.2-alpha.4...v0.0.2-alpha.5) (2020-02-29)

### [0.0.2-alpha.4](https://github.com/homura/hermit-purple-server/compare/v0.0.2-alpha.3...v0.0.2-alpha.4) (2020-02-28)


### Features

* allow `timestamp` query from `TransferHistory` ([2e1de21](https://github.com/homura/hermit-purple-server/commit/2e1de21866b7ef17163407958ca44d83cdf6a6cf))
* redundant `TransferHistories` to improve query performance ([a98f376](https://github.com/homura/hermit-purple-server/commit/a98f3769a2b2ecf787134b66718574dad6239535))

### [0.0.2-alpha.3](https://github.com/homura/hermit-purple-server/compare/v0.0.2-alpha.2...v0.0.2-alpha.3) (2020-02-28)


### Features

* add index to schema for performance ([ec7f927](https://github.com/homura/hermit-purple-server/commit/ec7f927e87413f4bac9f94dcc0ad54c6d5a0fba8))


### Bug Fixes

* fix format DateTime string with UTC string ([20ed1ee](https://github.com/homura/hermit-purple-server/commit/20ed1ee6daae203508f301aca1c4a67a933ea05a))

### [0.0.2-alpha.2](https://github.com/homura/hermit-purple-server/compare/v0.0.2-alpha.1...v0.0.2-alpha.2) (2020-02-27)


### Features

* hide error when non development environment ([03f0726](https://github.com/homura/hermit-purple-server/commit/03f07266e4e6c26d3963d68c05e31c5f00f358db))
* remove `FOREIGN KEY` for performance ([51d203a](https://github.com/homura/hermit-purple-server/commit/51d203a448ba7044d589550d1b8fc0aaf5e27588))
* supported custom `CORS_ORIGIN` and `BYPASS_CHAIN` ([5e109a0](https://github.com/homura/hermit-purple-server/commit/5e109a00c46a8d8fa4a017ebf494e73be530b71d))
* supported query `blockHash` in `Block` ([92aed46](https://github.com/homura/hermit-purple-server/commit/92aed463756b4a1af49792d590bbdacd6befbed3))
* supported save the receipt events to database ([c8910b0](https://github.com/homura/hermit-purple-server/commit/c8910b0dbdce624da899d78cfa1d4eb0ae1278c0))


### Bug Fixes

* fix the import path error ([b322386](https://github.com/homura/hermit-purple-server/commit/b3223861cd60c8abc5147cf2507153594b213917))

### [0.0.2-alpha.1](https://github.com/homura/hermit-purple-server/compare/v0.0.2-alpha.0...v0.0.2-alpha.1) (2020-02-25)


### Bug Fixes

* fix dirty data caused by inconsistent hex format ([fbab8be](https://github.com/homura/hermit-purple-server/commit/fbab8be7d08b51f3f1c8f51ab970084040606399))

### [0.0.2-alpha.0](https://github.com/homura/hermit-purple-server/compare/v0.0.1...v0.0.2-alpha.0) (2020-02-24)


### Features

* available access transfer from transaction directly ([38b8904](https://github.com/homura/hermit-purple-server/commit/38b89041480ac0e72275c3745c54359d3a899809))
* disable query all balances and events in a query block ([5e9e42f](https://github.com/homura/hermit-purple-server/commit/5e9e42f6b6b406829c8745bb79508b8042a7fbd9))
* logs for current progress of sync ([0de0d1f](https://github.com/homura/hermit-purple-server/commit/0de0d1f836594413a809c2740c9f4ee4fae10b7d))
* supported field description ([8f2b19a](https://github.com/homura/hermit-purple-server/commit/8f2b19a93d63e18e0f27cbb22d02c72285ccd759))
* supported linking to Asset from AssetTransfer ([5afb0d9](https://github.com/homura/hermit-purple-server/commit/5afb0d975c1e6dcad4d1830098e2d48247ddeffd))


### Bug Fixes

* skip the error receipt ([08b2bc4](https://github.com/homura/hermit-purple-server/commit/08b2bc4b1b3b1abb9c433f1785e04e4d18183b2d))
* unified into hex string without 0x before save to database ([f1aeea0](https://github.com/homura/hermit-purple-server/commit/f1aeea04e010bc889d4ef692453538ef85822166))
* uniform hexadecimal format before storing in database ([6a228f9](https://github.com/homura/hermit-purple-server/commit/6a228f956a436bce51c5e1bd741e6c44187cfee2))

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

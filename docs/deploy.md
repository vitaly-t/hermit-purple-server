# Deployment

## Requirement

- PostgreSQL >= 9.x
- NodeJS >= 12

## Quick start with Ubuntu

### Install PostgreSQL

```shell script
# Start with the import of the GPG key for PostgreSQL packages.
sudo apt-get install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Now add the repository to your system.
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'

# Install PostgreSQL
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Create Database
su - postgres
createdb muta
```

Learn more about how to [config PostgreSQL](https://help.ubuntu.com/stable/serverguide/postgresql.html)

## Create table

Creating tables from the [schema](../prisma/schema.sql)

## Install NodeJS

https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages

## Clone this project

```
git clone https://github.com/homura/hermit-purple-server.git
cd hermit-purple-server
```

## Define environment variables

### (Recommend) Create an `.env` file in the directory of this project

this is an example `.env` file

```
# the Muta GraphQL RPC endpoint
# note: /graphql is an endpoint
# /graphiql is an IDE of GraphQL
# we should use "x.x.x.x/graphql" here
MUTA_ENDPOINT=http://127.0.0.1:8000/graphql

# PostgreSQL uri
POSTGRESQL_URL=postgresql://user:password@localhost:5432/muta?schema=public

# ChainID of the running Muta instance
MUTA_CHAINID=0xb6a4d7da21443f5e816e8700eea87610e6d769657d6b8ec73028457bf2ca4036

# maximum concurrency when sync
# note: a large number may make Muta slower
HERMIT_FETCH_CONCURRENCY=500

# server listening port
# after start the server, we can open http://127.0.0.1:4040
# to a GraphQL playground
HERMIT_PORT=4040

# maximum cost each query task
HERMIT_MAX_COMPLEXITY=100
```

### Or just use `export` before we run `npm xxx`

```
export POSTGRESQL_URL=postgresql://user:password@localhost:5432/muta?schema=public
export MUTA_ENDPOINT=http://127.0.0.1:8000/graphql
export MUTA_CHAINID=0xb6a4d7da21443f5e816e8700eea87610e6d769657d6b8ec73028457bf2ca4036
export HERMIT_PORT=4040
export HERMIT_MAX_COMPLEXITY=100
```

## Build this project

```
npm run build
```

## Sync remote block to database

```
# Open the log on console
export DEBUG=sync:*
# recommend pm2
npm run sync
```

## Run the API server

```
# recommend pm2
npm run start

# try the API in browser directly
open http://127.0.0.1:4040
```

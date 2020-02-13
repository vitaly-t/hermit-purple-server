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

## Download and build this project

```
git clone https://github.com/homura/hermit-purple-server.git
cd hermit-purple-server
export POSTGRESQL_URL=postgresql://postgres@localhost:5432/muta?schema=public
npm run build
```

## Sync remote block to database

```
export POSTGRESQL_URL=postgresql://postgres@localhost:5432/muta?schema=public
export MUTA_ENDPOINT=http://127.0.0.1:8000/graphql

# Open the log
export DEBUG=sync:*
# recommend pm2
npm run sync
```

## Run the API server

```
export POSTGRESQL_URL=postgresql://postgres@localhost:5432/muta?schema=public
export MUTA_ENDPOINT=http://127.0.0.1:8000/graphql
export HERMIT_PORT=4040
# recommend pm2
npm run start

# try the API in browser directly
open http://127.0.0.1:4040
```

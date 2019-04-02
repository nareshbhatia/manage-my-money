# Manage My Money Database

This sub-project is used to create a docker image for the Manage My Money
database. This image is available on Docker Hub. You will normally not do
anything here.

## Creating the schema

1. Run `node create-schema.js`
2. Manually format the output and save it in `create-schema.sql`

## Build a Docker image

```bash
docker build -t nareshbhatia/manage-my-money-db:1.0.0 .
```

## Run the Docker image

```bash
# Run the image
# -d: run in detached mode
# --rm: automatically remove the container when it exits
# --name: assign a name to the container
# -p 5432:5432: map machine port 5432 to container port 5432
#
# This results in:
#   1. Creation of the default user 'postgres' with password 'docker'
#   2. Creation of the default database 'postgres'
#   3. Running of the initdb script, which creates the mmm schema and populates it
docker run -d --rm --name mmm-db -p 5432:5432 nareshbhatia/manage-my-money-db:1.0.0

# Now you can interact with the database using a local instance of psql
psql -h localhost -U postgres
```

Note that the above process creates a temporary volume to store data. This
volume will be deleted when the container is deleted. To create a permanent
volume, first create a local directory, e.g.

    mkdir -p $HOME/docker/volumes/postgres

Then give the following option to docker run to mount the host volume to the
postgresql data directory in the container:

    -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data

## Push the Docker image to Docker Hub

```bash
docker push nareshbhatia/manage-my-money-db:1.0.0
```

# Manage My Money Server

The server implements a RESTful API for Manage My Money. To keep things simple,
you don't have to go through an extensive build process. Simply deploy using
Docker Compose and initialize the database:

```bash
cd mmm-server

# Deploy the server using docker-compose
docker-compose up -d

# Create the database schema and load data.
# Before running these steps, you can change the start and end dates for
# transactions by editing db/config.js
npm install
npm run create-schema
npm run load-data

# Now you can interact with the database using a local instance of psql
# Password is 'docker'
psql -h localhost -U postgres
```

At this point, you should have a running server. Point your browser to
[http://localhost:8080/api-docs/](http://localhost:8080/api-docs/) to see the
REST API definition. The interface also allows you to make REST requests and see
server responses.

To stop the server:

    docker-compose down

## Dev Build

Make sure that you have a Postgres database running and initialized with data

```bash
docker run -d --rm --name mmm-db -p 5432:5432 -e POSTGRES_PASSWORD='docker' postgres:11-alpine
npm install
npm run create-schema
npm run load-data
```

Now run the server

```bash
npm start
```

The dev build starts the application in watch mode. If you make any changes to
the source files, the application will recompile and restart.

To debug the application in Chrome, point the browser to chrome://inspect and
click on "Open dedicated DevTools for Node".

## Production Build

```bash
npm run build
npm run serve
```

## Creating a permanent volume to store data

Note that the current docker-compose configuration creates a temporary volume to
store data. This volume will be deleted when the container is deleted. To create
a permanent volume, first create a local directory, e.g.

    mkdir -p $HOME/docker/volumes/postgres

Then add the following volume mapping to docker-compose.yml. This will mount the
host volume to the postgresql data directory in the container:

    $HOME/docker/volumes/postgres:/var/lib/postgresql/data

## Build a Docker image

```bash
docker build -t nareshbhatia/manage-my-money-server:1.0.0 .
```

## Run the Docker image

```bash
# Run the image
# -d: run in detached mode
# --rm: automatically remove the container when it exits
# --name: assign a name to the container
# -p 8080:8080: map machine port 8080 to container port 8080
docker run -d --rm --name mmm-server -p 8080:8080 --env-file .env nareshbhatia/manage-my-money-server:1.0.0
```

## Push the Docker image to Docker Hub

```bash
docker push nareshbhatia/manage-my-money-server:1.0.0
```

## Folder Structure

```
/src
    /routes
    /services
    /repositories
    /utils
```

The source folder contains sub-folders that arrange the application into logical
layers as suggested by the
[Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal+architecture)
(a.k.a. the
[Onion Architecture](http://jeffreypalermo.com/blog/the-onion-architecture-part-1/)):

-   `routes:` This is the adapter layer of the Hexagonal Architecture. It adapts
    the HTTP requests from the external world to the service layer and
    transforms the objects returned by the service layer to HTTP responses.

-   `services`: The service layer coordinates high-level activities such as
    creation of domain objects and asking them to perform tasks requested by the
    external world. It interacts with the repository layer to save and restore
    objects.

-   `repositories`: The repository layer is responsible for persisting domain
    objects and performing CRUD operations on them. This layer interacts
    directly with PostgreSQL to save and restore data.

-   The `utils` folder contains useful utilities and helpers.

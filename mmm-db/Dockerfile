FROM postgres:11-alpine
EXPOSE 5432
ENV POSTGRES_PASSWORD docker
COPY ./sql /home/app/sql
COPY ./initdb.sh /docker-entrypoint-initdb.d/

#!/usr/bin/env bash
psql -f /home/app/sql/create-schema.sql
psql -f /home/app/sql/load-data.sql

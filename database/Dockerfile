FROM --platform=linux/x86_64 mysql:8.0

COPY ./init/* /docker-entrypoint-initdb.d/
COPY ./procedures/* /docker-entrypoint-initdb.d/
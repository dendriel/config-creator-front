# Config Creator Front

Provider the front-end for the Config Creator solution.

Config Creator is a software that allows to draw customized templates of configuration and create
configuration based on these templates.

## Features

- CRUD for templates that can include base types (text, textArea, number, toggle and list) and other templates;
- Create projects that includes resources. Resources can be Items or Collections of items;
- Items can be base types and/or templates;
- Collections are lists of base types or templates.


## Run with Docker

Build the image:
```shell
docker build -t dendriel/config-creator-front .
```

Start config-creator-front using port mapping:
```shell
docker run --name config-creator-front -p 80:80 dendriel/config-creator-front
```

*Before starting config-creator-front, update nginx.conf (nginx/nginx.conf) proxying rules to point to the correct
addresses of auth, rest and storage services.

Start config-creator-front using host network:
```shell
docker run --name config-creator-front --network host dendriel/config-creator-front
```

*Before starting config-creator-front, update nginx.conf (nginx/nginx.conf) proxying rules to point to the correct
addresses of auth, rest and storage services (keep localhost address if running everything locally).

## Run required backend services with docker-compose

Start the infrastructure using:
```shell
docker-compose up
```

*Mysql and MongoDB aren't included.

Stop and remove the infrastructure using:
```shell
docker-compose stop && docker-compose rm
```


## TODO

- Add key and default key options to data fields;
- Improve list border formatting when inside templates;
- Add mailbox feature (to receive export notifications)
- Add admin panel to allow CRUD over users
  - Add permissions in the backend.
- Add image component
- Add binary component
- Add dropdown component
- Disallow template loop
- Disallow removing templates that are included in other templates
- Use skeleton to wait for data loading
- Add option to "inline" templates that only contains a list
  - inlining a template will add its value without a key when exporting
  - This way, we can create a list of an inline template resulting in a list of lists (a matrix)


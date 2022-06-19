# Hackathon Barcelona Tech - CSV Converter to JSON

This repository contains a little endpoint that allows converting CSV files to JSON format. It has been developed in the context of 
[Hackathon Barcelona 2022](https://nuwe.io/challenge/hackathon-bcn-inclusive-coding-backend)


## Solution scope

1. Files with 1 or more columns.
1. Delimiter can be passed by request.
2. CSV file without headers.
3. Parser string numbers to respective format.
4. Testing with Jest/SuperTest and Postman.
5. OWASP Dependency Check bash scripting.

## Usage

`delimiter`: indicates separator of columns.

`header`: indicates if the file has header (true/false)

`columns`: optional, in case of header is false.

```bash
# CSV with headers:
curl --location --request POST 'https://localhost:8181/upload' \
--form 'file=@FILENAME.csv"' \
--form 'delimiter=";"' \
--form 'header="true"'

#CSV without headers:
curl --location --request POST 'https://localhost:8181/upload' \
--form 'file=@"test.csv"' \
--form 'delimiter=";"' \
--form 'header="true"' \
--form 'columns="col1;col2;col3;col4"'
```
!["Postman REQ"](/doc/postman.png)
## Installation

Create `.env` file based on `.env-example`. Make sure that folder `upload` exists and has writer permissions.

```bash
    npm install
```

```bash
    npm run test
    npm run start # You can use npm run dev to debug.
```

Note: If you want to enable SSL, please add SSL certificates in `ssl` folder and make sure that change value in .env by "ENABLE_SSL=true".

## Extras

### Unit testing with Jest:
```bash
    npm run test
```

### Dependency Check OWASP
```bash
    bash dependency-check.sh
```

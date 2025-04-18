# Development

## Copy .env.example to .env

```bash
cp .env.example .env
```

## Run development server

```bash
docker compose up --build
```

## Seed initial data

```bash
docker exec -it nest-app-dev pnpm run seed
```

## Visit Swagger UI at http://localhost:1337/docs

## Modules

- doctor
- booking

## Endpoints

doctor
POST    /api/v1/doctor
GET     /api/v1/doctor

booking
GET     /api/v1/booking/{doctorId}/slots
POST    /api/v1/booking/{doctorId}/prebook
POST    /api/v1/booking/{doctorId}/book


## Missing:
- implement init timeslots for {doctorId}
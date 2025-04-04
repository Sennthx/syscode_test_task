# Student Profile & Address Microservices

Two Dockerized Node.js microservices for managing student profiles and addresses, built with PostgreSQL, TypeORM, and REST APIs. The frontend written in Angular is containerized aswell.
To view the openapi.yaml you can just paste the content of the file into the website https://editor.swagger.io/ 

---

## 📋 Overview

- **Profile Service**: CRUD operations for `Student` entities (UUID, name, validated email) with PostgreSQL and Liquibase migrations.
- **Address Service**: REST endpoint to fetch `Address` (UUID, address) with Basic Authentication.
- **Features**: 
  - Dockerized deployment
  - Load testing (10,000+ requests)

---

## Tech Stack

| Component              | Technology                                                                 |
|------------------------|----------------------------------------------------------------------------|
| **Framework**          | Node.js + Express.js                                                       |
| **Database**           | PostgreSQL (Profile Service)                                               |
| **ORM**                | TypeORM (with Liquibase migrations)                                        |
| **Authentication**     | Passport.js (Basic Auth for Address Service)                               |
| **Validation**         | `class-validator` + `class-transformer`                                    |
| **Testing**            | Jest (unit/integration) + Supertest                                        |
| **Logging**            | Winston                                                                    |
| **Containerization**   | Docker + Docker Compose                                                    |
| **Load Testing**       | Axios script                                                                  |
| **API Documentation**  | OpenAPI 3.0/Swagger                                                        |

---

## Prerequisites

- Node.js v18+
- Docker & Docker Compose
- PostgreSQL
- Git

---

## Setup

## Managing Services

### Start All Services
```bash
docker-compose up --build -d
```
### Start a Specific Service
```bash
docker-compose up -d <service-name>
```

### Stop All Services
```bash
docker-compose down
```
### Stop a Specific Service
```bash
docker-compose stop <service-name>
```

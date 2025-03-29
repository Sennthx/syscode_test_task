# Student Profile & Address Microservices

Two Dockerized Node.js microservices for managing student profiles and addresses, built with PostgreSQL, TypeORM, and REST APIs. Includes testing, logging, and load-testing support.

---

## 📋 Overview

- **Profile Service**: CRUD operations for `Student` entities (UUID, name, validated email) with PostgreSQL and Liquibase migrations.
- **Address Service**: REST endpoint to fetch `Address` (UUID, address) with Basic Authentication.
- **Features**: 
  - OpenAPI 3.0 documentation
  - Unit/Integration Tests (80%+ coverage)
  - Dockerized deployment
  - Load testing (10,000+ requests)

---

## 🛠 Tech Stack

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
| **Load Testing**       | Artillery                                                                  |
| **API Documentation**  | OpenAPI 3.0/Swagger                                                        |

---

## ⚙️ Prerequisites

- Node.js v18+
- Docker & Docker Compose
- PostgreSQL
- Git

---

## 🚀 Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/syscode-tesztfeladat.git
cd syscode-tesztfeladat
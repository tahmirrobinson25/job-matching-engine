# Job Matching Engine — MVP Implementation Roadmap

**Project:** Job Matching Engine  
**Start date:** November 29, 2026  
**Stack:** React, TypeScript, Node.js, Express, PostgreSQL, Prisma, JWT  
**Objective:** Improve the existing application into a functional, secure, tested, and deployable full-stack MVP without rebuilding it.  
**Estimated duration:** 4–8 focused weeks, subject to the initial audit and implementation findings.

Use the checkboxes to track work. Update each milestone status as **Not Started**, **In Progress**, **Blocked**, or **Complete**. Reassess the timeline after the baseline audit.

## MVP scope

The MVP helps job seekers discover relevant opportunities by searching a job catalog, filtering listings, viewing explainable match scores, and saving jobs.

### Included

- User registration, login, logout, and account management.
- PostgreSQL-backed job catalog and job details.
- Search, filtering, and reliable pagination.
- Persisted user matching preferences.
- Deterministic job-matching algorithm with explanations.
- Saved jobs with user-specific authorization.
- API validation, error handling, and security.
- Automated backend testing.
- Basic CI/CD, deployment verification, and documentation.

### Deferred

Live job-board integrations, web scraping, AI matching, resume parsing, automated applications, employer dashboards, notifications, advanced analytics, and managed authentication migration.

The goal is a credible full-stack portfolio project, not a commercial job-board platform.

## Milestones

### 1. Baseline audit and product decisions

**Estimated effort:** 2–3 days  
**Status:** Not Started

- [ ] Run the frontend, backend, and PostgreSQL database locally.
- [ ] Verify Prisma migrations, database connectivity, and seed data.
- [ ] Test existing registration, login, protected routes, and profile functionality.
- [ ] Test job search, filters, pagination, job details, and saved jobs.
- [ ] Verify existing job creation, editing, deletion, and ownership restrictions.
- [ ] Run existing tests and build commands; record results and runtime issues.
- [ ] Decide who can publish jobs, which preferences matter, salary semantics, and how unsupported features will be handled.

**Deliverable:** Verified application audit, outstanding issue list, and confirmed MVP decisions.

### 2. API foundation and job search reliability

**Estimated effort:** 3–5 days  
**Status:** Not Started

- [ ] Establish consistent API request and response expectations.
- [ ] Add reusable server-side validation for request bodies, query parameters, IDs, and pagination.
- [ ] Standardize client-safe API errors and handle expected Prisma errors.
- [ ] Correct job catalog visibility and listing permissions.
- [ ] Verify and improve job seed data and optional fields.
- [ ] Fix search filtering and pagination behavior.
- [ ] Add deterministic ordering and accurate result counts.
- [ ] Ensure the frontend handles loading, empty, and error states.
- [ ] Introduce a small typed API helper if it reduces duplicated fetch and authentication logic.

**Deliverable:** Reliable, validated job catalog, search, filtering, and pagination.

### 3. Explainable job matching engine

**Estimated effort:** 3–5 days  
**Status:** Not Started

- [ ] Extract matching logic from the Express route into a testable module.
- [ ] Define matching criteria, scoring weights, and normalization rules.
- [ ] Separate hard filters from ranking preferences.
- [ ] Support approved criteria such as job titles, location, employment type, salary, and skills.
- [ ] Handle missing or optional information without automatically assigning zero.
- [ ] Return a score between 0–100 and matched criteria/reasons.
- [ ] Apply the correct processing order: filter → score → sort → paginate.
- [ ] Apply stable tie-breaking.
- [ ] Cover excellent, partial, poor, missing-data, and hard-filter scenarios with unit tests.

**Deliverable:** Deterministic matching engine with explainable results and automated unit tests.

### 4. User preferences and saved jobs

**Estimated effort:** 5–9 days  
**Status:** Not Started

- [ ] Design a minimal persisted preference profile.
- [ ] Add the necessary Prisma schema changes and migration.
- [ ] Implement authenticated preference retrieval and update endpoints.
- [ ] Validate preference data and enforce user ownership.
- [ ] Build a frontend preference editor.
- [ ] Connect saved preferences to the matching engine.
- [ ] Verify that changing preferences changes results.
- [ ] Complete saved-job save, unsave, and retrieval workflows.
- [ ] Verify persistence after refresh and re-login.
- [ ] Test that users cannot access another user's saved jobs.

**Deliverable:** Personalized job matching and reliable saved-job functionality.

### 5. Security and automated testing

**Estimated effort:** 3–5 days  
**Status:** Not Started

- [ ] Retain and harden the existing JWT/bcrypt authentication.
- [ ] Verify token expiration and invalid-token behavior.
- [ ] Require secure production secrets and prevent sensitive information from appearing in logs.
- [ ] Add registration/login rate limiting.
- [ ] Enforce server-side authentication, ownership, and role authorization.
- [ ] Validate all user-controlled input and restrict mutable fields.
- [ ] Configure exact CORS origins and appropriate security headers.
- [ ] Write backend unit tests for matching, validation, and authentication.
- [ ] Write API integration tests for authentication, search, authorization, and saved jobs.
- [ ] Use a dedicated test database, never production.
- [ ] Add basic frontend or end-to-end tests for critical workflows where practical.

**Deliverable:** Verified authentication and authorization, plus repeatable automated tests covering critical application behavior.

### 6. CI/CD and release readiness

**Estimated effort:** 4–6 days  
**Status:** Not Started

- [ ] Create GitHub Actions workflows for dependency installation, backend builds/tests, and frontend builds/linting.
- [ ] Add basic dependency and secret scanning.
- [ ] Review Docker configuration, including non-root execution and runtime environment variables.
- [ ] Verify Render, Vercel, and Neon configuration.
- [ ] Confirm migrations run correctly before deployment.
- [ ] Verify liveness and database readiness endpoints.
- [ ] Document environment variables, local setup, database migrations, seeding, tests, and deployment.
- [ ] Perform a complete deployed user journey: register → configure preferences → search → view match explanations → save → revisit saved jobs.
- [ ] Verify CI passes and critical security checks work.

**Deliverable:** Documented, tested, and verified deployed MVP.

## Recommended starting decisions

Confirm these during milestone 1 because they affect database design and API behavior.

| Area | Recommended approach |
|---|---|
| Product direction | Job-seeker-focused application |
| Job listings | Seeded/admin-managed catalog; ordinary users cannot publish public jobs |
| Authentication | Retain existing custom JWT and bcrypt implementation |
| Preferences | Minimal profile containing target roles, location/remote preference, employment types, and a short skills list |
| Salary | Annual USD only if included in matching |
| Matching | Deterministic, explainable scoring with hard filters applied first |
| Pagination | Rank eligible results before pagination |
| Job applications | Remove placeholder Apply Now behavior; defer application tracking |
| Deployment | Retain Vercel, Render, Neon, and existing Docker setup |

## Priorities

- **P0 — Required for MVP:** Authentication and authorization; reliable job catalog and search; correct filtering and pagination; explainable matching engine; persisted user preferences; saved jobs and ownership enforcement; API validation and error handling; backend unit and integration tests.
- **P1 — Release quality:** GitHub Actions CI; deployment and database documentation; health/readiness verification; Docker review and basic hardening; frontend error states and accessibility improvements; deployment smoke testing and basic security checks.
- **P2 — Future enhancements:** External job feeds and automated updates; AI matching and resume parsing; application tracking and notifications; employer dashboards; advanced geographic and salary search; managed authentication migration.

## Definition of done

- [ ] Users can register, authenticate, and manage preferences.
- [ ] Jobs are retrieved from PostgreSQL and can be searched and filtered.
- [ ] Matching produces consistent, explainable scores.
- [ ] Hard filters are applied before ranking, and ranking occurs before pagination.
- [ ] Users can save and revisit jobs.
- [ ] Server-side authorization protects private user data.
- [ ] Critical backend functionality has automated test coverage.
- [ ] CI successfully runs required builds and tests.
- [ ] A clean database can be initialized using documented instructions.
- [ ] The deployed application passes the complete critical user journey.

Verify completion through actual tests and runtime behavior, not merely because code or UI exists.

## Development approach

For each task:

1. Inspect the existing implementation.
2. Explain the problem and relevant engineering concepts.
3. Identify the smallest necessary change.
4. Attempt the implementation before receiving a complete solution.
5. Review, debug, and test the code.
6. Verify behavior and explain technical decisions.
7. Update milestone progress and identify the next task.

**Scope principle:** Improve the existing application, prioritize the core product, and avoid unnecessary architectural changes or feature expansion. Reassess the timeline after the baseline audit.

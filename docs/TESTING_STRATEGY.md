# Testing Strategy

## BDD

BDD is a product and QA agreement, not an app runtime dependency. Keep feature
scenarios in plain language and link them to tickets or acceptance criteria. Do
not add a BDD framework to production code unless the company decides to fund
and maintain that workflow.

## TDD

Use TDD for unit-level behavior:

- write or update a failing Jest test for the rule,
- implement the smallest code change,
- keep tests close to the unit being changed.

## Jest Coverage

- Unit tests cover slices, utilities, hooks, and request helpers.
- Snapshot tests are allowed for stable UI atoms/molecules only.
- Snapshot updates must be intentional and reviewed.
- Paid/company-funded expansion can add device-level E2E coverage and full BDD
  automation later.

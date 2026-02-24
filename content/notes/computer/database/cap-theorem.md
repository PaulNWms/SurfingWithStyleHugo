---
title: CAP Theorem
date: 2023-08-26T13:55:00-08:00
draft: false
tags:
  - "#database"
---
In a distributed database, we can simultaneously have at most 2 of the 3 CAP properties.

- Consistency - Every read receives the most recent write or error.
- Availability - Every request gets a (non-error) response.
- Partition tolerance - The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.

---
# References

- [CAP theorem - Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)

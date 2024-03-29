---
title: SQL
date: 2023-10-27T08:26
description: 
keywords: 
draft: false
tags:
---
```lang-none
Query steps:
1. FROM: Cartesian product (cross join)
2. ON: apply the ON filter (inner join)
3. OUTER JOIN: add back outer rows
4. WHERE
5. GROUP BY
6. CUBE or ROLLUP
7. HAVING
8. SELECT
9. DISTINCT
10. ORDER BY
11. TOP

Put all that together and it spells FOOWGRHSDOT.

Three-valued logic in SQL means values can be TRUE, FALSE, or UNKNOWN (e.g. NULL > 0).  

UNKNOWN is treated as FALSE in ON, WHERE and HAVING filters.
UNKNOWN is treated as TRUE in in check constraints.

A GROUP BY clause groups all NULLs in one group.
An ORDER BY clause sorts all NULLs together.

You can't use aggregate filters in a WHERE condition because the data hasn't been grouped yet.

If a GROUP BY clause is specified in a query, all following steps (HAVING, SELECT) can specify
only expressions that result in a scalar value for the group.

The only clause that can refer to column aliases defined in the SELECT list is ORDER BY.

Each step hands a logical "virtual tables" to the subsequent step until ORDER BY, which returns
a cursor.

A query with an ORDER BY clause can therefore not be used as a table expression - view, inline
table-valued function, subquery or CTE.

TOP is non-standard SQL and can use the cursor created by ORDER BY.  That is mainly how it is
used.

UNION removes duplicate records, UNION ALL does not.

APPLY is similar to JOIN.  APPLY (logically) evaluates the left table, and then the right table
is evaluated once for each row of the left table.
- CROSS APPLY only returns matching rows
- OUTER APPLY includes rows from the left table that didn't match (similar to LEFT OUTER JOIN)
- Use case: get the 2 most recent orders from each customer

PIVOT converts categorical data to columns.
UNPIVOT converts columns to categorical data.
```


---
# References

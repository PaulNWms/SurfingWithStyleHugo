---
title: Regex
description:
date: 2025-10-25T17:04
keywords:
draft: false
tags:
---
| Symbol           | Category              | Meaning / Description                                          |
| ---------------- | --------------------- | -------------------------------------------------------------- |
| `.`              | Wildcard              | Matches any single character except newline                    |
| `\d`             | Character class       | Matches any digit (same as `[0-9]`)                            |
| `\D`             | Character class       | Matches any non-digit                                          |
| `\w`             | Character class       | Matches any word character (letters, digits, underscore)       |
| `\W`             | Character class       | Matches any non-word character                                 |
| `\s`             | Character class       | Matches any whitespace (space, tab, newline)                   |
| `\S`             | Character class       | Matches any non-whitespace character                           |
| `[...]`          | Character set         | Matches any one character inside brackets                      |
| `[^...]`         | Negated set           | Matches any character not inside brackets                      |
| `                | `                     | Alternation                                                    |
| `()`             | Grouping              | Groups expressions, enables capturing or combining parts       |
| `(?:...)`        | Non-capturing group   | Groups pattern but doesn't capture it                          |
| `(?P<name>...)`  | Named group           | Captures a group with a name                                   |
| `\b`             | Anchor                | Word boundary (between word and non-word character)            |
| `\B`             | Anchor                | Not a word boundary                                            |
| `^`              | Anchor                | Matches the start of the string (or line with multiline flag)  |
| `$`              | Anchor                | Matches the end of the string (or line with multiline flag)    |
| `*`              | Quantifier            | Matches 0 or more repetitions                                  |
| `+`              | Quantifier            | Matches 1 or more repetitions                                  |
| `?`              | Quantifier            | Matches 0 or 1 (makes preceding token optional)                |
| `{n}`            | Quantifier            | Matches exactly n repetitions                                  |
| `{n,}`           | Quantifier            | Matches n or more repetitions                                  |
| `{n,m}`          | Quantifier            | Matches between n and m repetitions                            |
| `?` after quant. | Lazy modifier         | Makes quantifier non-greedy (match as little as possible)      |
| `(?=...)`        | Lookahead (positive)  | Match if followed by pattern (doesn't include it in result)    |
| `(?!...)`        | Lookahead (negative)  | Match if not followed by pattern                               |
| `(?<=...)`       | Lookbehind (positive) | Match if preceded by pattern                                   |
| `(?<!...)`       | Lookbehind (negative) | Match if not preceded by pattern                               |
| `\\`             | Escape                | Escapes a special character (e.g., `\.` matches a literal dot) |
## Python re module

|Method|Purpose|Parameters|Returns|Notes|
|---|---|---|---|---|
|`match()`|Match pattern at the start of string|`pattern`, `string`, `flags=0`|Match object or `None`|Good for "does this string start with..."|
|`search()`|Search anywhere in string|`pattern`, `string`, `flags=0`|Match object or `None`|Finds first occurrence|
|`fullmatch()`|Match the entire string|`pattern`, `string`, `flags=0`|Match object or `None`|Use for strict validation|
|`findall()`|Find all non-overlapping matches|`pattern`, `string`, `flags=0`|List of strings or tuples|Use `finditer()` for match objects instead|
|`finditer()`|Iterate over all matches as objects|`pattern`, `string`, `flags=0`|Iterator of Match objects|Useful for position info, grouping, etc.|
|`sub()`|Replace pattern with replacement string|`pattern`, `repl`, `string`, `count=0`|New string|Use for find-and-replace|
|`subn()`|Like `sub()`, but also returns count|`pattern`, `repl`, `string`, `count=0`|Tuple: (string, count)|Great for auditing replacements|
|`split()`|Split string by pattern|`pattern`, `string`, `maxsplit=0`|List of strings|Smarter than `str.split()`|
|`compile()`|Compile pattern for reuse|`pattern`, `flags=0`|Compiled pattern object|Improves performance with repeated use|
|`escape()`|Escape special regex chars in input|`string`|

| Property / Method | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `.group()`        | Returns the entire match (or a specific group if passed an index)  |
| `.groups()`       | Returns a tuple of all captured groups (excluding named groups)    |
| `.groupdict()`    | Returns a dictionary of all named capturing groups                 |
| `.start()`        | Returns the start index of the match                               |
| `.end()`          | Returns the end index (1 past the last character) of the match     |
| `.span()`         | Returns a tuple `(start, end)` representing the range of the match |
| `.pos`            | The starting position of the search within the string              |
| `.endpos`         | The ending position (limit) of the search                          |
| `.re`             | The regular expression object used for the match                   |
| `.string`         | The original string passed to `re.search()` or similar             |
| `.lastgroup`      | The name of the last matched capturing group                       |
| `.lastindex`      | The index of the last matched capturing group (by number)          |


---
# References

---
title: Go Template Language
description: 
date: 2023-10-26T06:03
keywords: 
draft: false
tags:
  - Hugo
---
The Go template language uses double brackets `{{ ... }}` to insert variables or code snippets into HTML or Markdown. 

- `$` represents the top-level component, for us that usually means page
- `site` accesses variables for the whole site
- `hugo` accesses compiler variables

In order to access things, you need to know where Hugo stores them.  To get the page title, you'd use `<h1>{{$.Title}}</h1>` but to get the subtitle it's `<h2>{{$.Params.Subtitle}}</h2>`.

---
# References

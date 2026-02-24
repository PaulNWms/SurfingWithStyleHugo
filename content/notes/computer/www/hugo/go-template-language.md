---
title: Go Template Language
description: 
date: 2023-10-26T06:03:00Z
keywords: 
draft: false
tags:
  - Hugo
---
The Go template language uses double brackets `{{ ... }}` to insert variables or code snippets into HTML or Markdown. 

- `$` represents the top-level component, for us that usually means page
- `site` accesses variables for the whole site
- `hugo` accesses compiler variables

<p>In order to access things, you need to know where Hugo stores them. To get the page title, you'd use `</p> <h1 id="title">{{$.Title}}</h1> <p>` but to get the subtitle it's `</p> <h2 id="params.subtitle">{{$.Params.Subtitle}}</h2> <p>`.</p>

---
# References

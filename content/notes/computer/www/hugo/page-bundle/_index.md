---
title: Hugo Page Bundle
description: 
date: 2023-10-25T20:45
keywords: 
draft: false
tags:
  - "#Hugo"
---
Hugo has [Leaf Bundle](/notes/computer/www/hugo/page-bundle/leaf-bundle)s, [Branch Bundle](/notes/computer/www/hugo/page-bundle/branch-bundle)s and [Headless Bundle](/notes/computer/www/hugo/page-bundle/headless-bundle)s.

A directory will generally have have an `_index.md` or `index.md` file, depending on context.
- If the page has assets that you want stored locally, it's a [Leaf Bundle](/notes/computer/www/hugo/page-bundle/leaf-bundle) and will have `index.md` for that page, along with the assets.
- If there are multiple pages at that URL folder level it will have `_index.md`.
- If there are subfolders, it's a [branch bundle](/notes/computer/www/hugo/page-bundle/branch-bundle) and will have `_index.md`.
- A [headless bundle](/notes/computer/www/hugo/page-bundle/headless-bundle) is a page that exists as a place for shared assets.

---
# References

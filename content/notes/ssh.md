---
title: SSH
description: 
date: 2024-07-18T21:15
keywords: 
draft: false
tags:
---
Create public/private keys
`ssh-keygen -t ed25519 -C "your_email@example.com"`

The keys are stored in
`~/.ssh/id_ed25519`

Then you add the key to your agent
`ssh-add ~/.ssh/id_ed25519`



---
# References

---
title: ROS roscore
description: 
date: 2023-12-04T20:50
keywords: 
draft: false
tags:
  - ROS
---
ROS1 has a master node.  `roscore` starts this node.  It expects its process to have an environment variable defined

`ROS_MASTER_URI=http://hostname:11311`

A node interacts with it using `rosparam`.

---
# References

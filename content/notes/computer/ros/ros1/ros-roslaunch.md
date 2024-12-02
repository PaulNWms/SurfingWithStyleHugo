---
title: ROS roslaunch
description: 
date: 2023-12-04T23:07
keywords: 
draft: false
tags:
  - ROS
---
Starting a bunch of nodes with `rosrun` can be tedious, so it can be automated with `roslaunch`.  The robot configuration is stored in a `.launch` file.

```bash
$ roslaunch rospy_tutorials talker_listener.launch
```

`roslaunch` automatically starts `roscore`.

---
# References

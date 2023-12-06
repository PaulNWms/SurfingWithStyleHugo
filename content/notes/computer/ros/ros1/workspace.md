---
title: workspace
description: 
date: 2023-12-04T20:58
keywords: 
draft: false
tags:
  - ROS
---
A workspace is a set of directories in which a related set of ROS code lives.  To set up a workspace:

```bash
$ source /opt/ros/indigo/setup.bash
$ mkdir -p ~/catkin_ws/src
$ cd ~/catkin_ws/src
$ catkin_init_workspace
$ cd ~/catkin_ws
$ catkin_make
$ source devel/setup.bash
```

---
# References

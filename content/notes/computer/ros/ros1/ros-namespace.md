---
title: ROS namespace
description: 
date: 2023-12-04T22:54
keywords: 
draft: false
tags:
  - ROS
---
ROS supports namespaces with the '/' separator.

Names often need to be remapped at runtime.  Remapping is often done by changing the namespace.  Suppose the robot has a right and a left camera, and you want `image_view` to subscribe to the output from the right camera.

You can remap the image `image` topic to `right/image`

```bash
$ ./image_view image:=right/image
```

and then start the camera in the `right` namespace

```bash
$ ./camera __ns:=right
```

You can also rename nodes at runtime.

```bash
$ ./talker __name:=talker1
```

---
# References

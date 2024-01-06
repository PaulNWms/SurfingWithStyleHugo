---
title: Redundancy
date: 2023-05-31T06:29-0800
draft: false
tags:
  - "#Azure"
---
- single region
    - locally redundant storage (LRS)
      copies on 3 different racks within the same availability zone
    - zone-redundant storage (ZRS)
      copies in 3 different availability zones
- multiple region
    - geo-redundant storage (GRS)
      copies on 3 different racks in the primary region (LRS) &
      copies on 3 different racks in the paired region (LRS)
    - geo-zone-redundant storage (GZRS)
      copies in 3 different availability zones in the primary region (ZRS) &
      copies on 3 different racks in the paired region (LRS) <== asymmetric

---
# References

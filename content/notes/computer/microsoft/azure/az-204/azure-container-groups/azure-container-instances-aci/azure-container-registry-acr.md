---
title: "Azure Container Registry (ACR)"
date: 2023-05-11T05:38-0800
draft: false
tags: 
  - "#Azure"
---
- Keep track of current valid container images
- Manages files and artifacts for containers
- Feeds container images to ACI and AKS
- Use Azure identity and security features
- Three tiers: Basic, Standard, and Premium.
    - Basic : Cost optimized, developer focused tier.
      Programmatically the same as other tiers.
    - Standard : Same as Basic, but with more storage and throughput;
      the default for production
    - Premium : Higher throughput and storage, geo replication, content trust, and compatibility with Private Link
- Lock to avoid unauthorized updates or deletes.
- Restrict access and authorization

To publish an image, you first need a _registry_.
```CMD
az acr create \
--resource-group my-rg-today \
--name my-uni-acr \
--sku Basic
```

Log in to the registry.
```CMD
az acr login --name my-uni-acr
```

Name a pre-built Docker image
```CMD
docker tag c:\me\204image my-uni-acr.azurecr.io/204image:v1
```

Pull, name and push a Docker container
```CMD
docker pull mcr.Microsoft.com/hello-world
docker tag mcr.Microsoft.com/hello-world my-uni-acr.azurecr.io/hello-world:v1
docker push hello-world:v1
```

Use the quick task feature in ACR Tasks to build and push a Docker image to the registry
```CMD
version: v1.1.0
steps:
- build: -t <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>R</mi><mi>e</mi><mi>g</mi><mi>i</mi><mi>s</mi><mi>t</mi><mi>r</mi><mi>y</mi><mi>/</mi><mi>h</mi><mi>e</mi><mi>l</mi><mi>l</mi><mi>o</mi><mo>−</mo><mi>w</mi><mi>o</mi><mi>r</mi><mi>l</mi><mi>d</mi><mo>:</mo></mrow><annotation encoding="application/x-tex">Registry/hello-world:</annotation></semantics></math>ID -f hello-world.dockerfile .
  - push: 
- <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>R</mi><mi>e</mi><mi>g</mi><mi>i</mi><mi>s</mi><mi>t</mi><mi>r</mi><mi>y</mi><mi>/</mi><mi>h</mi><mi>e</mi><mi>l</mi><mi>l</mi><mi>o</mi><mo>−</mo><mi>w</mi><mi>o</mi><mi>r</mi><mi>l</mi><mi>d</mi><mo>:</mo></mrow><annotation encoding="application/x-tex">Registry/hello-world:</annotation></semantics></math>ID
```

View all Container images in the registry
```CMD
az acr repository list --name my-uni-acr --output table
```

---
# References

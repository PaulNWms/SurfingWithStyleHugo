---
title: "Functions"
date: 2023-05-11T05:42:00-08:00
draft: false
tags: 
  - "#Azure"
---
- No maintenance
- No processes
- Nothing VM related

Bindings are defined in function.json

```JSON
"bindings": [
  { 
	"name": "fanMail",
	"type": "queueTrigger",
	"queueName": "fanMailQueue",
	"connection": "fanMailRoom"
  },
  {
    "name": "fanMailRepo",
	"type": "blob",
	"path": "samples-workitems/{queueTrigger}",
	"direction": "in",
	"connection": "fanMailRoom"
   }
]
```
### Developer Responsibilities
- The code that does the work
- Trigger
- Input and output bindings
### Hosting
- Consumption
- Premium
- Also available in not-quite-serverless hosting options
	- [Azure App Service](/notes/computer/microsoft/azure/az-204/azure-app-service)
	- Dedicated
	- Kubernetes
### Consumption vs. Premium Hosting
| Consumption Plan                                          | Premium Plan                                                         |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| Pay only when functions are running                       | More predictable pricing                                             |
| Scale out automatically, even during periods of high load | Premium instance sizes of one, two, or four cores and faster scaling |
| Times out after a configurable period; up to 10 minutes   | Unlimited execution duration, with 60 minutes guaranteed             |
| Idle function apps must “cold start” on next request      | Continuously running instances to avoid any cold start               |
| Less complex architecture                                 | VNet connectivity                                                    |
 
---
# References

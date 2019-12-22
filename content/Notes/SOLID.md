---
title: "SOLID and DRY Principles"
date: 2019-12-15T05:26:37-08:00
---

Links:

[DevIQ SOLID Principles of Object Oriented Design](https://deviq.com/solid/)

[Atomiq - Code Similarity Finder](http://www.getatomiq.com/)

```lang-none
Single Responsibility Principle
- Every object should have a single responsibility, and that responsibility should be entirely
  encapsulated by the class. 
- There should never be more than one reason for a class to change.

Open / Closed Principle
- Software entities (classes, modules, functions, etc.) should be open for extension, but
  closed for modification.
- Achieved with interfaces, abstract base classes and parameters
- Dont apply OCP at first
- If the module changes once, accept it.
- If it changes a second time, refactor to achieve OCP
- OCP adds complexity to design
- No design can be closed against all changes

Liskov Substitution Principle
- Subtypes must be substitutable for their base types.
- Client code expects child classes to work in place of their base classes
- LSP violation smells
  - conditional based on object type (especially inside a loop)
  - partially implemented interfaces/base classes

Interface Segregation Principle
- Clients should not be forced to depend on methods they do not use.
- Keep interfaces lean and focused.
- Refactor large interfaces so they inherit smaller interfaces.

Dependency Inversion Principle
- High-level modules should not depend on low-level modules.  Both should depend on
  abstractions. 
- Abstractions should not depend on details.  Details should depend on abstractions
- Common dependencies
  - Framework
  - Third Party Libraries
  - Database
  - File System
  - Email
  - Web Services
  - System Resources (Clock)
  - Configuration
  - The new Keyword
  - Static methods
  - Thread.Sleep
  - Random 
- The Hollywood Principle - "Dont call us; well call you"
- Three Primary Techniques
  - Constructor Injection (Strategy pattern)
  - Property Injection
  - Parameter Injection
- Design smells
  - new keyword
  - static methods & properties (DateTime.Now)
  - No way to change implementation details without recompile (OCP violation)

Don't Repeat Yourself
- Magic strings & values
- Duplicate logic
- Repeated if-then logic
- Conditional instead of polymorphism
- Static Methods 
  - Tightly coupled 
  - Difficult to test 
  - Difficult to change behavior (violates OCP) 
  - Cannot use object oriented design techniques (inheritance, polymorphism)
- Related patterns:
  - Template Method Pattern
  - Command Pattern
  - Dependency Inversion Principle
- Repetition in Process 
  - Performing { testing, builds, deployments } by hand is tedious and wasteful
```

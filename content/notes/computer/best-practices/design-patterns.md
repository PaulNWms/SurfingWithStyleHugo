---
title: Design Patterns
date: 2023-10-27
description: 
keywords: 
draft: false
tags:
---
```lang-none
Abstract Factory
- A Factory represents a "family" of objects that it can create
- Everyday usage: DbProviderFactory is an abstract base class for SqlClientFactory
- Everyday usage: SqlClientFactory.CreateCommand() creates instances of DbCommand
- Creational

Active Record
- A database table or view is wrapped into a class.
- Typically, foreign key relationships will be exposed as an object instance of the appropriate
  type via a property. 
- Everyday usage: Entity Framework or any other ORM, object persistence tools

Adapter
- Resolves incompatible interfaces
- Everyday usage: Entity Framework
- Structural

Bridge
- Abstraction -> Abstraction -> Implementation
- Everyday usage: .NET provider model, e.g. IFormatProvider
- Structural

Builder
- Useful when you have a constructor with lots of parameters
- Example: Jimmy John's (order from a menu) vs. Subway (specify all the ingredients)
- Has a Director base class, which defines the assembly steps
- Has 2 or more Concrete Builder child classes, which actually create objects
- Similar to Template Method, but for constructors
- Creational

Chain of Responsibility
- Everyday usage: exception handling
- Message handling
- Behavioral

Command
- Represent an action as an object
- Everyday usage: ICommand (in MVVM or just generally)
- ICommand may include additional methods like Validate(), Undo(), Compensate(), etc.
- Behavioral

Composite (Tree)
- Treats leaves and branches the same (nodes)
- Everyday usage: Email can send to individuals or groups
- Structural

Decorator (wrapper)
- Attach additional responsibilities to an object (but use the same interface)
- Example: caching repository
- Even sealed classes can be wrapped
- Structural

Event Aggregator
- Subscibers subscribe only to the event aggregator instead of all the subscribers
- The event aggregator typically uses weak references to minimize memory leaks
- Use when: there are many publishers and subscribers

Façade
- Hides complexity
- Everyday usage: foreach
- Structural

Factory Method
- A base class or interface defines the creation method
- Subclasses implement the creation method in different ways 
- "Everyday" usage: IDbCommand.CreateParameter(),
  System.Windows.Forms.Control.CreateControlsInstance()
- Creational

Flyweight
- Instead of each instance containing all the data, shared objects are passed in
- Everyday usage: Graphics context in drawing, string interning
- Structural

Identity Map
- Everyday usage: Database table has a unique primary key

IIFE (Immediately-Invoked Function Expression) (JavaScript ES5)
- Anonymous function that's invoked at the time it's declared
- Provides encapsulation
- Reduces global scope pollution
- (function() { ... })();

Interpreter
- The interpreter builds objects based on a grammar expressed in EBNF
- Related to composite pattern
- Example: a laser scanner interprets a UPC bar code
- Behavioral

Iterator
- Everyday usage: foreach and IEnumerable&lt;T&gt;
- MoveNext() and Current
- yield return
- Behavioral

Lazy Load (several variations)
- lazy initialization
  - Every property checks to see if its backing field has been initialized 
  - Requires all access to the value to go through the property 
  - .NET provides the Lazy&lt;T&gt; type to enforce this
- virtual proxy
  - Can introduce identity problems 
    - Proxy isn’t really the object – different object identities and states
    - Override the equality method (Equals()) 
  - Most useful for collections
- value holder
  - Provides lazy load functionality without encapsulation 
  - Calling code knows it is working with a Value Holder type
  - You're probably better off using Lazy&lt;T&gt;
- ghosts
  - A ghost is a real object in a partial state.
  - Initially, the ghost only contains its id. 
  - Whenever any property is accessed, the ghost class loads all of its state from the
    persistence 
  - Essentially, the object is its own virtual proxy
    - Note that this violates the Single Responsibility Principle
  - Avoids identity concerns of virtual proxy technique 

Mediator
- Mediator provides a centralized location for communication between many instances of like
  classes 
- Use when: There are many objects of a similar type that need to communicate with each other.
- Colleagues: Individual components that need to communicate with each other
  - Implement the same base type (abstract class or interface)
  - Have knowledge of the Mediator component
- Mediator: The centralized component that managed communication between the colleague
  components
- Behavioral

Memento
- Operations are placed on an Undo stack, undone operations are placed on a Redo stack
- The <em>originator</em> is the object whose state is being tracked.
- The <em>caretaker</em> performs operations on the originator.
- The <em>memento</em> holds the state of the originator.
- Use when: undo/redo
- Behavioral

MVC

MVVM

Null Object
- Provide a non-functional object in place of a null reference
- Often implemented as a static inner class of a base class

Observer
- Uses events to notify changes automatically
- Publish/Subscribe relationship
- Synchronous; the observable notifies the observers immediately (either directly or through
  an Event Aggregator)
- Risk of memory leaks, see Event Aggregator
- Everyday usage: Event Handlers
- Everyday usage: IObservable&lt;T&gt; and IObserver&lt;T&gt;
- Behavioral

Prototype
- Creational

Proxy
- Placeholder / Stand-in for actual object
- Everyday usage: SOAP Service Proxies
- Structural

Publish/Subscribe
- Uses events to notify changes explicitly
- Publish/Subscribe relationship
- Asynchronous, generally uses a message queue

Repository
- Links:
  - [Generic Data Manager](https://www.nuget.org/packages/OakIdeas.GenericRepository/0.0.5-alpha)

Revealing Module (JavaScript ES5)
- Function scoping provides encapsulation
- 2 flavors: Singleton or Constructor Function

Rules
- Separate the logic of each individual rule and its effects into its own class
- Separate the selection and processing of rules into a separate Evaluator class
- Use when you have a growing amount of conditional complexity
- Special case of the Command pattern
- Links:
  - [Soft Coding](http://thedailywtf.com/articles/soft_coding.aspx)
  - [Should You Use a Rules Engine?](http://www.jessrules.com/guidelines.shtml)
  - [Simple .NET Rules Engine Discussion (StackOverflow)](http://bit.ly/fDH8r)
  - [Business Rules Engines](http://en.wikipedia.org/wiki/Business_rules_engine)
  - [Intro to WF Rules Engine](http://bit.ly/aetfj0)

Service Locator
- Identify a service through configuration
- Example: Domain Name Service, IoC container
- Createional

Simple Factory
- Decides which concrete type to return
- Everyday usage: System.Threading.Tasks.TaskFactory.Run() creates instances of Task
- Creational

Singleton
- Example: return (instance == null) ? new MyClass() : instance;
- Everyday usage: static
- Breaks Single Responsibility Principle
- Difficult to test
- Anti-pattern, better to use IoC container
- Creational

Specification
- Defines a predicate that matches qualifying objects
- Predicates in LINQ look like Expression&lt;Func&lt;T, bool&gt;&gt; to play nicely with ORMs
- Part of domain-driven design (DDD)

State
- Implement an FSM with state objects derived from a base class
- Use when: the behavior changes at runtime
- Code smell: switch statements based on state
- Behavioral

Strategy
- A class behavior or its algorithm can be changed at run time.
- Everyday usage: delegate parameter in method call
- Everyday usage: delegate parameter in constructor
- Behavioral

Template Method
- Base class defines the (sealed) template method, subclasses override steps
- Clients depend on base class
- Everyday usage: ASP.NET
- Use when:
  - 2 or more classes follow the same workflow
  - The workflow is invariant
  - Some workflow steps may be encapsulated in the base class
- Behavioral

Unit of Work
- Track changes in persistent objects and commit them in a batch
- Everyday usage: ADO.NET SqlDataAdapter, Entity Framework
  - Efficient data access
  - Reduces concurrency problems
  - Manages transactions

Visitor
- Puts all the logic for all of the classes in a single Visitor class
- Implement interface IBlah { void Accept(IVisitor visitor); } in each of the classes (double
  dispatch)
- Implement interface IVisitor, which has a method for each type to be visited
- Use when: looping over a collection of unrelated objects and performing an operation on each,
  without modifying them
- Behavioral
```

---
# References

[Design patterns (and anti-patterns) site](https://sourcemaking.com/design_patterns)  
[Design patterns in Java tutorial](http://www.tutorialspoint.com/design_pattern)  

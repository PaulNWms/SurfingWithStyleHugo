---
title: Threads
date: 2023-09-21T07:04:00Z
draft: false
tags:
  - Win32
---
Native [Processes and Threads](https://learn.microsoft.com/en-us/windows/win32/procthread/processes-and-threads) is a deep subject that's well-documented on the Microsoft site.  Knock yourself out.  The workhorse functions are below in the references.

Win32 provides several atomic functions through the [Interlocked API](https://learn.microsoft.com/en-us/windows/win32/sync/interlocked-variable-access), the highlights of which are [InterlockedIncrement](https://learn.microsoft.com/en-us/windows/win32/api/winnt/nf-winnt-interlockedincrement) and [InterlockedDecrement](https://learn.microsoft.com/en-us/windows/win32/api/winnt/nf-winnt-interlockeddecrement).

There are several [Synchronization Objects](https://learn.microsoft.com/en-us/windows/win32/sync/synchronization-objects) - 'events', mutexes, critical sections, semaphores, and waitable timers.  Of these, events seem to crop up the most often.  A critical section is like a mutex but scoped to a single process.

Use a counting semaphore to implement throttling, one use case would be to limit the number of concurrent network requests.  The other synchronization objects all have a capacity of one.

Win32 also has [Fibers](https://learn.microsoft.com/en-us/windows/win32/procthread/fibers).  This is a niche API for specific use cases.

---
# References

- [CreateThread function (processthreadsapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createthread)
- [SuspendThread function (processthreadsapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-suspendthread)
- [ResumeThread function (processthreadsapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-resumethread)
- [ExitThread function (processthreadsapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-exitthread)
- [GetExitCodeThread function (processthreadsapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getexitcodethread)
- [CloseHandle function (handleapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/handleapi/nf-handleapi-closehandle)
- [GetCurrentThreadId function (processthreadsapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getcurrentthreadid)
- [Sleep function (synchapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/synchapi/nf-synchapi-sleep)
- [Interlocked Variable Access - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/sync/interlocked-variable-access)
- [InterlockedIncrement function (winnt.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winnt/nf-winnt-interlockedincrement)
- [InterlockedDecrement function (winnt.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winnt/nf-winnt-interlockeddecrement)
- [Synchronization Objects - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/sync/synchronization-objects)
- [SetEvent function (synchapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/synchapi/nf-synchapi-setevent)
- [ResetEvent function (synchapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/synchapi/nf-synchapi-resetevent)
- [WaitForSingleObject function (synchapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/synchapi/nf-synchapi-waitforsingleobject)
- [WaitForMultipleObjects function (synchapi.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/synchapi/nf-synchapi-waitformultipleobjects)

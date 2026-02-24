---
title: Registry
date: 2023-08-05T08:40:00-08:00
draft: false
tags:
  - "#COM"
  - "#NET"
parent: COM
---
Registering a COM server is complicated, but the essential parts are
- ProgID, a human-readable name
    - `HKEY_CLASSES_ROOT\<name>` is the ProgID
    - `HKEY_CLASSES_ROOT\<name>\CLSID` points to the corresponding CLSID
- CLSID, a GUID
    - `HKEY_CLASSES_ROOT\CLSID\<GUID>` is the CLSID
    - `HKEY_CLASSES_ROOT\CLSID\<GUID>\InprocServer32` points to the server's filename (InProc)
    - `HKEY_CLASSES_ROOT\CLSID\<GUID>\LocalServer32` points to the server's filename (OutProc)
    - `HKEY_CLASSES_ROOT\CLSID\<GUID>\ProgID` points back to the ProgID
    - `HKEY_CLASSES_ROOT\CLSID\<GUID>\Implemented Categories` lists the implemented CATIDs
    - `HKEY_CLASSES_ROOT\CLSID\<GUID>\Required Categories` lists the required CATIDs
    - `HKEY_CLASSES_ROOT\CLSID\<GUID>\TreatAs` maps a CLSID to newer, compatible CLSID
- IIDs, one or more GUIDs
    - `HKEY_CLASSES_ROOT\Interface\<GUID>` is an IID
    - `HKEY_CLASSES_ROOT\Interface\<GUID>\TypeLib` points to the type library
    - `HKEY_CLASSES_ROOT\Interface\<GUID>\ProxyStubClsid32` points to marshaler (oleaut32.dll)
- LIBID, a type library
    - `HKEY_CLASSES_ROOT\TypeLib\<GUID>` is a LIBID
    - `HKEY_CLASSES_ROOT\TypeLib\<GUID>\<version>\0\win32` points to the .tlb file
- CATID, category ID
    - `HKEY_CLASSES_ROOT\Component Categories\<GUID>` is a CATID
    - `HKEY_CLASSES_ROOT\CLSID\<GUID>\TreatAs` maps a CATID to a default CLSID (not a typo)

The IIDs are associated with the class through `QueryInterface()` and other API calls.

CoCreateInstance() can take a CATID instead of a CLSID, if there is a TreatAs entry specifying a default.

If a COM DLL implements `DllRegisterServer()` and `DllUnregisterServer()`, it can be registered/unregistered with `regsvr32.exe`.

```C#
using System;
using Microsoft.Win32;

class Program
{
    static void Main()
    {
        try
        {
            Console.WriteLine("List of COM interfaces on the system:");

            using (RegistryKey interfaceKey = Registry.ClassesRoot.OpenSubKey("Interface"))
            {
                if (interfaceKey != null)
                {
                    foreach (string subKeyName in interfaceKey.GetSubKeyNames())
                    {
                        using (RegistryKey subKey = interfaceKey.OpenSubKey(subKeyName))
                        {
                            if (subKey != null)
                            {
                                string interfaceName = (string)subKey.GetValue(null);
                                if (!string.IsNullOrEmpty(interfaceName))
                                {
                                    // Get the IID (Interface Identifier) from the subkey name
                                    Guid iid = Guid.ParseExact(subKeyName, "B");

                                    Console.WriteLine("IID: " + iid.ToString());
                                    Console.WriteLine("Interface Name: " + interfaceName);
                                    Console.WriteLine();
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
    }
}
```

```C++
#include <Windows.h>
#include <Objbase.h>
#include <string>
#include <iostream>

#pragma comment(lib, "Ole32.lib")

int main() {
    HRESULT hr = CoInitialize(nullptr);
    if (FAILED(hr)) {
        std::cout << "Failed to initialize COM. Error code: " << hr << std::endl;
        return 1;
    }

    HKEY hKey;
    LONG result = RegOpenKeyEx(HKEY_CLASSES_ROOT, L"Interface", 0, KEY_READ, &hKey);
    if (result != ERROR_SUCCESS) {
        std::cout << "Failed to open the Interface key in the registry. Error code: " << result << std::endl;
        CoUninitialize();
        return 1;
    }

    std::cout << "List of COM interfaces on the system:" << std::endl;

    WCHAR subKeyName[256];
    DWORD subKeyNameSize = 256;
    DWORD index = 0;

    while (RegEnumKeyEx(hKey, index++, subKeyName, &subKeyNameSize, nullptr, nullptr, nullptr, nullptr) == ERROR_SUCCESS) {
        HKEY interfaceKey;
        std::wstring interfacePath = L"Interface\\";
        interfacePath += subKeyName;

        result = RegOpenKeyEx(HKEY_CLASSES_ROOT, interfacePath.c_str(), 0, KEY_READ, &interfaceKey);
        if (result == ERROR_SUCCESS) {
            DWORD bufferSize = 1024;
            WCHAR interfaceName[1024];
            DWORD valueType;

            // Read the Interface Name
            result = RegQueryValueEx(interfaceKey, nullptr, nullptr, &valueType, (LPBYTE)interfaceName, &bufferSize);

            if (result == ERROR_SUCCESS && valueType == REG_SZ) {
                // Get the IID (Interface Identifier) from the subkey name
                std::wstring iidString = subKeyName;

                std::wcout << "IID: " << iidString << std::endl;
                std::wcout << "Interface Name: " << interfaceName << std::endl;
                std::wcout << std::endl;
            }

            RegCloseKey(interfaceKey);
        }

        subKeyNameSize = 256;
    }

    RegCloseKey(hKey);
    CoUninitialize();
    return 0;
}
```

---
# References

- [Registering COM Applications - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/com/registering-com-applications)
- [COM Registry Keys - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/com/com-registry-keys)

- [RegistryKey Class (Microsoft.Win32) | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/api/microsoft.win32.registrykey?view=net-7.0)

- [RegOpenKeyExW function (winreg.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winreg/nf-winreg-regopenkeyexw)
- [RegEnumKeyExW function (winreg.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winreg/nf-winreg-regenumkeyexw)
- [RegQueryValueExW function (winreg.h) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/api/winreg/nf-winreg-regqueryvalueexw)

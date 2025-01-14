---
title: Windows 10 Programming Environment Setup
date: 2018-08-13 19:14:00
mathjax: true
tags: [Windows 10]
---

In this article, the setup of the Windows 10 programming environment on my computer is presented.The setup is designed to meet my needs so they might not be suitable for others. 

<!-- more -->

### Enable WSL 2
Install the Linux kernel update package from Microsoft: [WSL2 Linux kernel update package for x64 machines](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
Then run the following commands in Powershell as Administrator:
````powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
wsl --set-default-version 2
````


### Enable GUI for WSL 1
To enable GUI applications install a X server for Windows, for example Xming, and add the following line in ~/.bashrc if you use bash or ~/.zshrc if you use zsh:
```shell
export DISPLAY=:0
```


### Enable GUI for WSL 2
The method is similar to settings for WSL 1. The difference is that the following command shall be used and the argument `-ac` shall be added to Xming
```shell
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0
```



### Use MSYS2 with Visual Studio Code

First install the [Shell Launcher extension by Tyriar](https://marketplace.visualstudio.com/items?itemName=Tyriar.shell-launcher). Then edit the `settings.json` to something like:

```json
"terminal.integrated.profiles.windows": {
    "PowerShell": {
        "source": "PowerShell",
        "icon": "terminal-powershell"
    },
    "Command Prompt": {
        "path": [
        "${env:windir}\Sysnative\cmd.exe",
        "${env:windir}\System32\cmd.exe"
        ],
        "args": [],
        "icon": "terminal-cmd"
    },
    "MSYS2": {
        "path": "C:\msys64\usr\bin\bash.exe",
        "label": "MSYS2",
        "args": ["--login", "-i"],
        "env": {
            "MSYSTEM": "MINGW64",
            "CHERE_INVOKING": "1",
        	"MSYS2_PATH_TYPE": "inherit"
	    }
    },
    "FISH": {
        "path": "C:\msys64\usr\bin\fish.exe",
        "label": "MSYS2",
        "args": ["--login", "-i"],
        "env": {
            "MSYSTEM": "MINGW64",
            "CHERE_INVOKING": "1",
            "MSYS2_PATH_TYPE": "inherit"
	    }
	}
}
```



The `MSYS2_PATH_TYPE=inherit` is required to find Windows programs after adding them to the PATH. 



### Change DPI of Xming

The default DPI of the Xming windows is too small for me. I changed it by adding '-dpi 80' to the Xming shortcut.

### Change keyboard layout of Xming
The default keyboard layout used in Xming is the American English keyboard but I need Swedish keyboard layout. To change this, you shall add '-xkbmodel pc105 -xkblayout fi' to the Xming shortcut. It seems that '-xkblayout se' does not work and the Finnish keyboard 'fi' works as the Swedish one. 

### Location of the files in the WSL 1
If you need to access the files within WSL, they are under the following directory. To access files in WSL from Windows 10 is NOT recommanded. It might lead to losing of file attributes.
```
C:\Users\%USERNAME%\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs\
```


### Change keyboard layout for the Microsoft pinyin input method
I use the Microsoft Pinyin Input Method but the default keyboard layout used by it is the American English layout. To change it into the Swedish keyboard layout, you shall change the following value to 'KBDSW.DLL'
```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layouts\00000804\Layout File
```


### Change the DPI of Windows 10
The default DPI of Windows 10 is too small for me. It can be changed by the following way: Change the following DWORD (32-bit) Value to the DPI you want which for me is 128 in decimal:
```
HKEY_CURRENT_USER\Control Panel\Desktop\LogPixels
```

And change the following DWORD (32-bit) Value to 1:
```
HKEY_CURRENT_USER\Control Panel\Desktop\Win8DpiScaling
```


### Disable automatic dimming
The automatic dimming feature is very annoying for me. To disable it, the following shall be done:
Change the following keys of Regedit:

Navigate to the following location and change ProcAmpBrightness to 0.
```
HKEY_LOCAL_MACHINE\Software\Intel\Display\igfxcui\profiles\media\Brighten Movie
```

Navigate to this location and change ProcAmpBrightness to 0.
```
HKEY_LOCAL_MACHINE\Software\Intel\Display\igfxcui\profiles\media\Darken Movie
```

This method does NOT always work. Some systems will just persist their behaviour. I haven't found a way to fix those systems. 


### Disable Win + L shortcut key
Sometimes you want to disable the `Win + L` shortcut. It can be done by add a `System` key under the following key:
```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies
```
_
Then add a `DWORD (32-bit) Value` under `System`, and change it to 1.

### Change MAC address
To change the computers MAC address, natigate to the following location in Regedit: 
```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4D36E972-E325-11CE-BFC1-08002BE10318}
```
And choose the network adapter which its MAC shall be changed. Change the value of the key `NetworkAddress` to the one you want the MAC to be, for example "2A1B4C3D6E5F".


### Fix permission problem with transfering music to Sony Walkman (NW-E403)
Navigate to the following location and change EnableLUA to 0. 
```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
```

### Fix some privacy issues
You can use [O&O ShutUp10++](https://www.oo-software.com/en/shutup10), a free antispy tool for Windows 10 and 11, to fix some privacy issues of Windows 10 and 11. 


#### To be continued
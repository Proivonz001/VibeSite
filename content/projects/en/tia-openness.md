---
title: TIA Openness Engine
summary: Let Claude operate Siemens TIA Portal V21 through the Openness API. Describe the hardware in plain language and the engine creates CPUs, remote I/O, PROFINET networks, blocks and HMI screens.
date: 2026-08-14
kind: mcp
tags: [mcp, plc, siemens, automation, csharp]
status: beta
engine: C# / .NET
cover: /images/projects/tia-openness.svg
featured: true
sale:
  mode: contact
requirements:
  - Windows with Siemens TIA Portal V21 and an Openness license
  - The Windows user in the "Siemens TIA Openness" group
  - Claude Code (the engine ships as an installable plugin)
  - Python 3 for the offline analysis tools
tools:
  - name: create-project / close-project
    description: Create a new empty project or close the open one.
  - name: list / snapshot
    description: List devices, PLCs and blocks, or dump the whole project context as compact JSON.
  - name: add-cpu / add-device
    description: Add a CPU, an ET200 station, an HMI, a drive or any GSD device from the catalog.
  - name: set-ip / connect-pn / connect-io
    description: Configure PROFINET addresses, subnets and IO systems.
  - name: add-io-module / set-io-addr / set-module-attr
    description: Plug in I/O modules, set their addresses, tune module attributes such as ET200SP base units.
  - name: catalog / dev-info
    description: Search the installed hardware catalog and inspect a device's rack and slots.
  - name: cross-ref / delete-orphans
    description: Find where a symbol is used, list unreferenced blocks, and remove them safely.
  - name: export-all / import / diff-block
    description: Export and import blocks and HMI in SimaticML or source form, and diff a live block against a committed file.
  - name: compile
    description: Compile hardware and software and report errors.
  - name: sim-*
    description: Drive a virtual S7-1500 in PLCSIM Advanced for headless simulation, when installed.
install:
  - label: Claude Code plugin
    command: |
      /plugin marketplace add Proivonz001/tia-openness-engine
      /plugin install tia-openness@tia-openness-engine
---

## What it is

TIA Portal is the Siemens engineering tool for PLC and HMI projects. Its Openness API lets external programs drive it, but using that API is slow and full of traps. This engine wraps it into a command catalog and exposes the catalog both as a CLI and as an MCP server, so an AI assistant can build and modify a project the way an engineer would describe it.

## How it works

- **No persistent server.** The runner attaches to the TIA Portal instance you already have open, performs the operation, and returns. Write operations run inside an exclusive-access transaction, so a failed command rolls back everything it touched.
- **Command-based.** Every operation is a named command with typed options. New commands are added in code; everything else is data.
- **Profiles keep company knowledge out of the engine.** Naming rules, code style, generators and examples live in a separate profile supplied as data. The engine ships with a neutral built-in profile and runs without any of it.
- **Offline tools.** Block and tag analysis, an SCL linter, code generators and a schematic reader work on exported files without TIA open.

## What is included

The generic engine: the C# runner, the MCP server, the command reference, the technical notes on Openness pitfalls, and the offline tools. It ships as a Claude Code plugin with a prebuilt executable that works on any machine with TIA Portal V21 and Openness installed.

## How it was built

Every command was developed and tested against real projects with Claude Code, one hardware family at a time. The technical notes document each Openness trap as it was found, which is most of the value of the project.

## Status

In use on real projects. Licensing is available on request; get in touch for a demo.

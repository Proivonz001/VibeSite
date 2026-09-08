---
title: Feishu MCP
summary: An MCP server and real-time bot that let Claude work inside Feishu (Lark). Messages, group chats, docs with Markdown, Bitable databases, spreadsheets, Drive folders, tasks and calendar, 35 tools in all.
date: 2026-08-29
kind: mcp
tags: [mcp, feishu, lark, typescript, bot]
status: released
engine: TypeScript / Node
cover: /images/projects/feishu-mcp.svg
featured: true
sale:
  mode: contact
requirements:
  - Node.js 18 or newer
  - A Feishu or Lark tenant where you can create a custom app with a bot capability
  - The app published with the needed permission scopes (the README lists the exact set)
  - Claude Code or Claude Desktop
tools:
  - name: feishu_send_message / feishu_reply_message / feishu_send_image
    description: Send text, Markdown cards and images to a user or a group, or reply in a thread.
  - name: feishu_list_chats / feishu_list_messages / feishu_get_message
    description: See the chats the bot belongs to and read their history.
  - name: feishu_chat_create / feishu_chat_add_members
    description: Create group chats and manage their members.
  - name: feishu_doc_read / feishu_doc_create / feishu_doc_append / feishu_doc_edit_section
    description: Read and write Feishu docs with Markdown support, including editing a single section by heading.
  - name: feishu_bitable_*
    description: List tables, fields and records of a Bitable base; create, update and delete records; create a complete base with predefined tables, select options and sharing in one call.
  - name: feishu_sheet_list_sheets / feishu_sheet_read_range / feishu_sheet_write_range
    description: Read and write ranges in spreadsheets.
  - name: feishu_drive_list_folder / feishu_file_upload / feishu_file_copy / feishu_file_move
    description: Browse Drive folders, upload local files, copy and move documents, with a guard against phantom duplicates.
  - name: feishu_task_create / feishu_task_get / feishu_task_update
    description: Create, inspect and complete Feishu tasks.
  - name: feishu_find_user / feishu_get_user
    description: Look up people by email or phone and read their profile.
  - name: feishu_my_calendar / feishu_calendar_create_event / feishu_my_tasks / feishu_doc_search
    description: Act as the signed-in user through OAuth, for the calendar, personal tasks and document search.
install:
  - label: Build
    command: |
      git clone <repository you receive with the license> feishu-mcp
      cd feishu-mcp
      npm install
      npm run build
  - label: Claude Code (after filling .env with the app credentials)
    command: claude mcp add --scope user feishu -- node C:\path\to\feishu-mcp\dist\index.js
---

## What it is

Feishu (Lark outside China) is the collaboration suite used by many Chinese companies: chat, docs, multidimensional tables, spreadsheets, tasks and drive in one place. This project gives Claude a full set of tools for all of it, so a request like "read this document, summarise it and post the summary in the client's group" becomes a single conversation.

## Two ways to use it

- **MCP server** over stdio, for Claude Code and Claude Desktop. Thirty-five tools grouped by domain, each with a plain-language error hint: when a call fails, the message says which permission scope or sharing step is missing, instead of a bare error code.
- **Real-time bot** connected over a persistent WebSocket, so people in a group can mention the bot and get an answer without leaving Feishu. The decision module is a single swappable file, designed to be replaced by a headless Claude Code session.

## Built for real work

The server grew inside a consultancy workflow that manages several clients, each with its own folder, profile document and tracking tables. That shaped the design: files are created directly in the right folder, new bases get the right sharing automatically, record-type work goes into documents and only ledgers become tables, and every deliverable is announced in the group chat. Those conventions live outside the code, in the project instructions, so the server itself stays generic.

## How it was built

Written with Claude Code in TypeScript on top of the official Feishu SDK. The hard-won platform quirks, such as scopes that only apply after publishing a new app version, are documented in the README so the next person does not rediscover them.

## Status

In daily use. Licensing is available on request; get in touch for a demo on your own tenant.

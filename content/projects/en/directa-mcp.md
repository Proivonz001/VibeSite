---
title: Directa MCP
summary: An MCP server that puts your Directa brokerage account inside Claude. Balances, positions, orders, quotes and candles, read-only by default.
date: 2026-09-04
kind: mcp
tags: [mcp, trading, finance, python]
repo: Proivonz001/directa-mcp
status: beta
engine: Python
cover: /images/projects/directa-mcp.svg
featured: true
sale:
  mode: free
requirements:
  - Windows with Python 3.11 or newer
  - A Directa account with the Trading API enabled (free)
  - The Darwin platform open and logged in, which exposes the local API sockets
  - Claude Code or Claude Desktop
tools:
  - name: darwin_status
    description: Whether Darwin is running, logged in, and which channels are available.
  - name: account_info
    description: Account overview and liquidity.
  - name: availability
    description: Cash available for trading.
  - name: positions
    description: Open positions with quantity, average price and P&L.
  - name: orders
    description: Order list, filterable by state or ticker.
  - name: stock_info
    description: Instrument card, including market, lot size and ISIN.
  - name: quote
    description: Latest price for a ticker.
  - name: book
    description: Order book depth for a ticker.
  - name: candles
    description: OHLC candles for a ticker and timeframe.
  - name: ticks
    description: Intraday tick history.
  - name: portfolio_report
    description: Full portfolio report as returned by Darwin.
  - name: instrument_search
    description: Search instruments by name, ticker or ISIN.
  - name: ftse_mib_components
    description: Constituents of the FTSE MIB index.
  - name: trading_limits
    description: The hard-coded safety limits the server enforces on orders.
  - name: place_order
    description: Prepare a limit or market order. Disabled unless trading is explicitly enabled, and always requires a preview and a second confirmation call.
  - name: modify_order
    description: Change the price of an open order. Same safeguards as place_order.
  - name: cancel_order
    description: Cancel one order. Same safeguards as place_order.
install:
  - label: Claude Code
    command: claude mcp add --scope user directa -e DIRECTA_ENABLE_TRADING=false -- python C:\path\to\directa-mcp\server.py
  - label: Claude Desktop (claude_desktop_config.json)
    command: |
      {
        "mcpServers": {
          "directa": {
            "command": "python",
            "args": ["C:\\path\\to\\directa-mcp\\server.py"],
            "env": { "DIRECTA_ENABLE_TRADING": "false" }
          }
        }
      }
---

## What it is

Directa is an Italian online broker whose Darwin platform exposes a local text protocol for trading and market data. This MCP server speaks that protocol and turns it into tools that Claude can call, so you can ask things like "what is my exposure to energy stocks" or "show me the last month of candles for ENI" in plain language.

## Safety first

The server is **read-only by default**. Every tool that could send an order is disabled unless you start the server with trading explicitly enabled. Even then, an order is never sent in one step: the first call returns a preview, and only a second call with an explicit confirmation flag transmits it. Hard-coded limits on quantity and notional value are checked on every write, and cannot be changed from the conversation.

Market prices come from a free delayed feed with about fifteen minutes of lag, because the paid Directa data feed is not required for the trading channel to work.

## How it was built

The protocol was reverse-checked against real traffic recorded from Darwin, and those recordings are the fixtures for the test suite. The whole server, the parser and the safety layer were written with Claude Code, then validated with a real order cycle on a live account: place, modify, cancel, with liquidity unchanged at the end.

## Status

Working and in daily use. Open source under the MIT license.

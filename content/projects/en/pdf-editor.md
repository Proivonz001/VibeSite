---
title: PDF Editor
summary: A PDF editor that runs entirely in your browser. Edit text in place, highlight, erase, draw, add images, and OCR scanned pages. Nothing is uploaded anywhere.
date: 2026-07-01
kind: tool
tags: [tool, pdf, wasm, ocr, privacy]
repo: Proivonz001/pdf-editor
demo: /tools/pdf-edit/index.html
status: released
engine: Vanilla JS + WebAssembly
cover: /images/projects/pdf-editor.svg
featured: true
sale:
  mode: free
requirements:
  - A modern desktop browser. Everything runs locally, so no account and no upload.
---

## What it is

Most "free" online PDF editors upload your document to a server. This one does not. It is a single page that loads a PDF engine compiled to WebAssembly and does all the work on your machine: the file never leaves the browser tab.

You can use it right here, from the "Live demo" button, or clone the repository and run it offline with the included one-click launcher.

## What it can do

- **Edit text in place.** Click a word or a line and it becomes editable, on the original page, keeping the original crisp. A second mode makes all the text on the page editable at once, grouping boxes by line so they move together.
- **Rebuild a page.** Copy a page into a new one where the background keeps photos, tables and shapes while the text becomes fully editable objects.
- **Annotate.** Highlight, erase, free-hand pen, text boxes and images.
- **OCR.** Scanned pages get a text layer thanks to Tesseract running in the browser, so they become searchable and editable too.

## How it works

Three engines cooperate: MuPDF (via WebAssembly) for rendering and text extraction, pdf-lib for writing the modified document, and Tesseract for OCR. The interface is plain JavaScript, no framework, in a single HTML file. The libraries are bundled next to it, which is why the whole thing also works without an internet connection.

## How it was built

Written with Claude Code as a favour for someone who needed to fix a few documents without installing software or trusting a website with them. The in-place text editing went through several iterations before the rebuilt text matched the original closely enough.

## Status

Released. The hosted version has an English interface; OCR recognises English and Italian, alone or together.

---
title: Local Request MCP
slug: local-request-mcp
summary: 专为本地网络请求设计的 MCP 工具，让 AI 助手能够安全地向本地网络地址发送 HTTP 请求，打通 AI 与本地服务的通信桥梁。
tags:
  - TypeScript
  - MCP
  - AI
  - 网络自动化
status: 已发布
date: 2025-09-29
repo: https://github.com/Await-d/local-request-mcp
---

## 项目背景

AI 助手通常无法访问本地网络地址（如 `192.168.x.x`、`localhost`），导致无法与本地部署的服务交互。Local Request MCP 通过 Model Context Protocol 解决了这一限制。

## 核心功能

- **本地网络访问** — 允许 AI 助手向局域网地址和 localhost 发送 HTTP 请求
- **安全控制** — 支持白名单配置，限制可访问的地址和端口范围
- **完整 HTTP 支持** — 支持 GET、POST、PUT、DELETE 等方法，自定义 Headers 和 Body
- **响应解析** — 自动解析 JSON 响应，便于 AI 处理结构化数据
- **MCP 标准** — 完全遵循 Model Context Protocol 规范，兼容所有支持 MCP 的 AI 客户端

## 使用场景

适合让 AI 助手控制本地智能家居设备、访问本地 API 服务、调试本地 Web 应用等场景。

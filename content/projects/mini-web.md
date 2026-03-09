---
title: Mini Web
slug: mini-web
summary: 基于 Web 的远程连接平台，支持 RDP、SSH、VNC 和 Telnet 等多种协议，无需安装客户端即可通过浏览器管理远程服务器和设备。
tags:
  - TypeScript
  - 远程连接
  - SSH
  - RDP
  - 自托管
status: 活跃维护
date: 2025-10-02
repo: https://github.com/Await-d/mini-web
---

## 项目背景

Mini Web 解决了传统远程连接工具需要安装客户端的痛点，通过浏览器直接访问和管理远程服务器、设备和系统，特别适合自托管运维场景。

## 核心功能

- **多协议支持** — 支持 RDP、SSH、VNC、Telnet 等主流远程连接协议
- **零客户端** — 纯 Web 访问，无需在本地安装任何客户端软件
- **会话管理** — 统一管理所有远程连接会话，支持连接复用
- **权限控制** — 多用户访问控制，支持按连接分配权限
- **连接记录** — 完整的连接历史记录和审计日志

## 技术栈

TypeScript 全栈实现，前端通过 WebSocket 与后端通信，后端负责协议转换与会话维持，支持容器化部署。

---
title: DNS Resolver
slug: dns-resolver
summary: 多运营商 DNS 解析管理面板，支持 23 个域名服务商和 DDNS 动态解析，基于 .NET + React 构建的全栈管理工具。
tags:
  - C#
  - .NET
  - React
  - TypeScript
  - DNS
  - DDNS
status: 活跃维护
date: 2026-01-16
repo: https://github.com/Await-d/dns-resolver
---

## 项目背景

在多运营商环境下管理 DNS 解析规则繁琐且分散，DNS Resolver 提供统一的管理面板，整合 23 个主流域名服务商的 API，支持 DDNS 动态解析，简化 DNS 管理工作流。

## 核心功能

- **多服务商整合** — 统一管理 23 个域名服务商（阿里云、腾讯云、Cloudflare 等）
- **DDNS 动态解析** — 自动检测 IP 变化并更新 DNS 记录，适合家庭宽带场景
- **可视化管理** — 现代化 Web 界面，直观查看和操作所有 DNS 记录
- **批量操作** — 支持跨服务商批量创建、修改、删除 DNS 记录
- **变更日志** — 完整记录所有 DNS 变更历史，支持快速回滚

## 技术栈

后端基于 ASP.NET Core（C#），前端使用 React + TypeScript，容器化部署，支持 Docker Compose 一键启动。

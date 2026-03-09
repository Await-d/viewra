---
title: Docker Auto
slug: docker-auto
summary: Docker 自动更新管理系统，提供自动镜像更新检测、智能更新调度、回滚功能，以及现代化 Web 界面的全面监控能力。
tags:
  - Go
  - Docker
  - DevOps
  - 自动化
  - 自托管
status: 活跃维护
date: 2025-10-02
repo: https://github.com/Await-d/docker-auto
---

## 项目背景

在生产环境中管理大量 Docker 容器时，手动跟踪和更新镜像既费时又容易出错。Docker Auto 提供了一套完整的容器生命周期自动化管理方案。

## 核心功能

- **自动更新检测** — 定时检查 Docker Hub 及私有镜像仓库的镜像更新
- **智能调度** — 支持维护窗口配置，在低流量时段自动执行更新
- **安全回滚** — 更新失败时自动回滚到上一个稳定版本
- **Web 监控** — 现代化 Web 界面实时展示容器状态与更新历史
- **通知集成** — 支持 Telegram、Webhook 等多种更新通知渠道

## 技术栈

Go 语言构建，高效轻量，与 Docker Engine API 直接交互，支持单机与集群部署场景。

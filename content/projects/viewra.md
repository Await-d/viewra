---
title: Viewra
slug: viewra
summary: Markdown 驱动的个人展示型网站，基于 Next.js App Router 构建，内置在线编辑器支持表单与原始 Markdown 双模式，GitHub README 自动拉取，Docker 一键部署。
cover: /images/viewra-cover.svg
tags:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - React
status: 活跃维护
date: 2026-03-08
repo: https://github.com/Await-d/viewra
---

`viewra` 就是当前这个站点本身，也是围绕 Await-d 公开身份构建的个人展示站。它的目标不是把 GitHub 仓库简单列出来，而是把个人资料、项目说明和详情页组织成一个更适合阅读、理解与持续维护的公开界面。

## 项目亮点

- 使用 Markdown 维护资料与项目内容，方便持续编辑
- 支持项目列表自动读取与详情页动态路由生成
- 将当前 GitHub 公开身份与公开仓库纳入同一套展示结构中

## 当前用途

这个仓库目前主要承担两个作用：

- 作为个人展示站的代码基础
- 作为公开项目、工程方向和资料表达方式的统一入口

## 部署说明

项目已经补齐了 Docker 构建与部署文件，默认容器端口为 `3000`，可以直接用于本地容器化测试或后续部署。

## 设计取向

这个站点的界面会持续往“技术档案 / 公开作品集”方向优化，而不是做成营销化 landing page。重点在于把项目、能力与工作方式清晰呈现出来，让信息层级比视觉噱头更重要。

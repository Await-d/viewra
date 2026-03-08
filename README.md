# Markdown-driven Personal Showcase Website

这是一个基于 **Next.js + TypeScript + Tailwind CSS** 构建的个人展示型网站，使用 **Markdown 文件** 维护个人资料、技术栈和项目内容。

## 功能概览

- 个人资料 / 技术栈展示
- 项目列表自动读取 `content/projects/*.md`
- 项目详情页通过 `slug` 动态生成
- 所有核心内容都由 Markdown 驱动
- 新增项目时，只需要新增一个 Markdown 文件即可自动出现在网站中

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- gray-matter
- react-markdown
- remark-gfm

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run start
```

## 目录结构

```bash
public/
  avatars/
  images/

content/
  profile.md
  projects/
    atlas-design-system.md
    observability-workbench.md

src/
  app/
    page.tsx
    profile/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
  components/
    MarkdownRenderer.tsx
    Navbar.tsx
    ProfileHero.tsx
    ProjectCard.tsx
    Tag.tsx
    TechStackGrid.tsx
  lib/
    markdown.ts
    profile.ts
    projects.ts
  types/
    content.ts
```

## 如何修改个人资料

编辑文件：

```bash
content/profile.md
```

当前示例使用 `frontmatter + markdown 正文`：

```md
---
name: Alex Chen
title: Full-Stack Engineer · Product Builder · DX Advocate
avatar: /avatars/profile-avatar.svg
email: hello@example.dev
location: Shanghai, China
socials:
  - label: GitHub
    href: https://github.com/your-handle
techStack:
  Frontend:
    - Next.js
    - TypeScript
---

这里写你的个人介绍正文。
```

### frontmatter 字段说明

- `name`: 姓名 / 昵称
- `title`: 职业定位或个人标题
- `avatar`: 头像路径（可选）
- `email`: 联系邮箱（可选）
- `location`: 所在地（可选）
- `socials`: 社交链接数组（可选）
- `techStack`: 技术栈分类对象（可选），默认建议使用 `Frontend`、`Backend`、`Database`、`Tools`、`DevOps`、`Others`，也支持你自定义新的分类名称

## 如何新增项目

在以下目录新增一个 Markdown 文件：

```bash
content/projects/your-project.md
```

项目 frontmatter 需要包含以下字段：

```md
---
title: Your Project
slug: your-project
summary: Short summary for the project card.
tags:
  - Next.js
  - TypeScript
cover: /images/your-project-cover.svg
status: Live
date: 2026-03-01
repo: https://github.com/your-handle/your-project
demo: https://your-project.example.com
---

这里写项目的详细介绍正文。
```

### frontmatter 字段说明

- `title`: 项目名称
- `slug`: 项目标识，用于详情页路由
- `summary`: 项目列表页展示的简介
- `tags`: 技术标签数组
- `cover`: 封面图路径（可选）
- `status`: 项目状态（可选）
- `date`: 日期，建议使用 `YYYY-MM-DD`
- `repo`: 仓库地址（可选）
- `demo`: 在线演示地址（可选）

## 内容排序逻辑

项目列表会自动按 `date` 倒序排列。

- 日期越新，越靠前
- 如果日期缺失或格式无效，会自动排在后面

## 维护建议

1. `slug` 保持唯一，避免详情页冲突
2. `date` 建议统一使用 ISO 格式，例如 `2026-03-07`
3. `cover`、`repo`、`demo` 这些可选字段可以省略，页面会自动优雅降级
4. 项目正文推荐使用标准 Markdown 语法，代码块、引用、列表、链接等样式已经处理

## 设计说明

- 默认浅色主题
- 简洁、技术感、偏专业展示风格
- 页面留白充足，适合个人品牌展示与项目介绍

你可以直接替换示例内容，把它作为正式个人网站继续维护。

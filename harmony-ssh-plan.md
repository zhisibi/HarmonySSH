# 鸿蒙6 SSH 客户端项目计划书

**项目名称**：HarmonySSH  
**版本**：v1.0.0  
**创建日期**：2026-03-18

---

## 1. 项目概述

### 1.1 目标

开发一款运行在鸿蒙 6 系统上的原生 SSH 客户端 App，界面风格参考现有 WebSSH 项目，数据通过 RESTful API + WebSocket 与后端交互。

### 1.2 技术架构

| 层级 | 技术选型 |
|------|----------|
| 前端 | ArkTS + ArkUI（原装鸿蒙） |
| 通信 | HTTP API + WebSocket |
| 后端 | 复用现有 WebSSH (Node.js) |

---

## 2. 功能规划

### 2.1 核心功能（v1.0）

| 功能 | 优先级 | 说明 |
|------|--------|------|
| 账号登录 | P0 | 对接后端 `/api/login` |
| 服务器列表 | P0 | 对接 `/api/servers`，展示服务器卡片 |
| 添加/编辑/删除服务器 | P0 | 对接后端 CRUD API |
| SSH 终端 | P0 | WebSocket 实时交互，终端模拟 |
| SFTP 文件管理 | P1 | 浏览、上传、下载、删除 |
| 账号设置 | P2 | 修改密码、数据备份/恢复 |

### 2.2 后续功能（v1.1+）

- 多会话支持（同时多个 SSH 连接）
- 服务器分组/标签
- 终端多标签页
- 密钥管理（云端同步）

---

## 3. 界面设计（参考 WebSSH）

### 3.1 页面结构

```
├── 登录页 (login)
│   └── 用户名 + 密码登录
├── 主页/控制面板 (home)
│   ├── 服务器列表（卡片式）
│   ├── 顶部：标题 + 设置按钮
│   └── 底部：添加服务器 FAB
├── 服务器详情/编辑弹窗 (server-form)
│   └── 主机、端口、用户名、认证方式、密钥
├── SSH 终端页 (terminal)
│   ├── 顶部：服务器信息 + 断开按钮
│   └── 主体：xterm.js 或自定义终端组件
├── SFTP 文件浏览器 (sftp)
│   ├── 顶部：面包屑路径 + 操作按钮
│   └── 主体：文件列表（网格/列表切换）
└── 设置页 (settings)
    ├── 修改密码
    ├── 数据备份
    └── 数据恢复
```

### 3.2 风格参考（沿用 WebSSH）

- **配色**：深色主题为主 (#111827)，强调色 #667eea（紫蓝渐变）
- **卡片**：圆角 14px，轻阴影
- **按钮**：圆角 10px，主色按钮
- **列表**：清晰的文件图标 + 名称 + 详情

---

## 4. API 对接

### 4.1 认证

```typescript
POST /api/login
Body: { username, password }
Response: { success, token }
```

### 4.2 服务器管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/servers | 获取服务器列表 |
| POST | /api/servers | 新增服务器 |
| PUT | /api/servers/:id | 编辑服务器 |
| DELETE | /api/servers/:id | 删除服务器 |

### 4.3 SSH 连接

- **WebSocket**: `ws://<host>/ssh?server=<id>&token=<token>`
- 终端输入通过 WebSocket 发送，输出通过 WebSocket 接收

### 4.4 SFTP

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/sftp/list?path=... | 列出目录 |
| POST | /api/sftp/upload | 上传文件 |
| GET | /api/sftp/download | 下载文件 |
| POST | /api/sftp/mkdir | 新建文件夹 |
| POST | /api/sftp/delete | 删除 |

---

## 5. 开发计划

### 5.1 阶段划分

| 阶段 | 周期 | 内容 |
|------|------|------|
| **Phase 1 基础** | Day 1-2 | 项目搭建、登录页、API 封装 |
| **Phase 2 核心** | Day 3-4 | 服务器列表、添加/编辑服务器 |
| **Phase 3 终端** | Day 5-7 | SSH 终端页面、WebSocket 连接 |
| **Phase 4 文件** | Day 8-9 | SFTP 文件浏览器 |
| **Phase 5 完善** | Day 10 | 设置页、适配、测试 |

### 5.2 里程碑

- **M1** (Day 2): 登录 + 服务器列表可展示
- **M2** (Day 5): 可以添加服务器 + SSH 终端可用
- **M3** (Day 9): SFTP 功能完整
- **M4** (Day 10): 整体测试通过

---

## 6. 技术难点

1. **终端渲染**：鸿蒙暂无直接可用的 xterm.js，需自研终端组件或使用开源库
2. **WebSocket 长连接**：鸿蒙网络库支持 WebSocket，需做好断线重连
3. **文件上传/下载**：鸿蒙文件选择器 + 流式传输
4. **密钥管理**：私钥安全存储（鸿蒙 Keychain）

---

## 7. 验收标准

- [ ] 可登录后端账号
- [ ] 服务器列表正常展示，支持增删改
- [ ] SSH 终端可执行命令、查看输出
- [ ] SFTP 可浏览目录、上传/下载文件
- [ ] 适配鸿蒙 6 平板/手机
- [ ] 无崩溃、ANR

---

## 8. 相关文档

- 后端项目：`/root/.openclaw/workspace/webssh`
- 后端 API 说明：见 WebSSH README.md
- 界面参考：dashboard.html、xterm-terminal.html、sftp-browser.html

---

**项目经理**：大龙虾 🦞  

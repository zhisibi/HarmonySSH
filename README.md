# HarmonySSH - 鸿蒙6 SSH 客户端

基于 ArkTS + ArkUI 开发的原生鸿蒙 SSH 客户端，对接现有 WebSSH 后端。

## 功能特性

- 🔐 **账号登录** - 对接后端认证
- 🖥️ **服务器管理** - 添加、编辑、删除服务器
- 💻 **SSH 终端** - WebSocket 实时交互
- 📁 **SFTP 文件管理** - 浏览、上传、下载、删除
- ⚙️ **设置** - 修改密码、数据备份/恢复

## 项目结构

```
HarmonySSH/
├── ets/
│   ├── entry/
│   │   └── EntryAbility.ts     # 应用入口
│   ├── pages/
│   │   ├── Login.ets           # 登录页
│   │   ├── Home.ets            # 控制面板/服务器列表
│   │   ├── ServerForm.ets      # 服务器添加/编辑
│   │   ├── Terminal.ets        # SSH 终端
│   │   ├── Sftp.ets            # SFTP 文件管理
│   │   └── Settings.ets        # 设置页
│   ├── services/
│   │   └── ApiService.ts       # API 服务
│   └── utils/
│       └── CommonUtils.ts      # 工具函数
├── src/main/
│   ├── module.json5            # 模块配置
│   └── resources/
│       └── base/profile/
│           └── main_pages.json # 页面路由
├── package.json
├── build-profile.json5
└── README.md
```

## 配置

编辑 `src/main/ets/services/ApiService.ts` 中的后端地址：

```typescript
const BASE_URL = 'http://your-server:3000';
const WS_URL = 'ws://your-server:3000';
```

## 运行

1. 打开 DevEco Studio
2. 导入项目
3. 配置签名
4. 运行到设备/模拟器

## 技术栈

- **语言**: ArkTS
- **UI框架**: ArkUI
- **通信**: HTTP + WebSocket
- **后端**: Node.js + Express + SSH2

---

**开发**: 大龙虾 🦞  
**日期**: 2026-03-18
# HarmonySSH

# HarmonySSH Bug 修复记录

## 修复的问题

### 1. API 参数名称错误
- **问题**: SFTP 接口使用 `server` 参数，但 API 要求 `serverId`
- **修复**: 将所有 `server` 参数改为 `serverId`
- **影响文件**: `ApiService.ts`

### 2. SFTP 列表返回数据结构不匹配
- **问题**: API 返回 `{ files: [...] }` 但代码直接返回数组
- **修复**: 从响应中提取 `files` 字段
- **影响文件**: `ApiService.ts`

### 3. WebSocket 消息格式错误
- **问题**: 发送命令时缺少 `type` 字段
- **修复**: 添加 `type: 'data'` 字段
- **影响文件**: `Terminal.ets`

### 4. SftpFile 类型定义不完整
- **问题**: 缺少 `type`, `mtime`, `mode` 字段，多了 `path`, `isDirectory` 等字段
- **修复**: 按照 API 文档重新定义接口
- **影响文件**: `ApiService.ts`, `Sftp.ets`

### 5. SFTP 操作参数错误
- **问题**: 删除操作使用 `isDirectory` 而不是 `type`
- **修复**: 使用正确的参数名称和值
- **影响文件**: `Sftp.ets`

## 修复的文件

1. `src/main/ets/services/ApiService.ts`
   - 修复所有 SFTP API 调用参数
   - 更新 SftpFile 类型定义
   - 添加正确的 WebSocket URL 生成方法

2. `src/main/ets/pages/Terminal.ets`
   - 修复 WebSocket 连接 URL
   - 修复命令发送格式

3. `src/main/ets/pages/Sftp.ets`
   - 修复目录导航逻辑
   - 修复文件类型判断
   - 修复删除操作参数

## 待解决的问题

1. **登录凭据问题**: 默认 `admin/admin123` 可能已被修改，需要确认正确的凭据
2. **SFTP 路径处理**: 需要正确处理相对路径和绝对路径
3. **文件上传功能**: 需要实现完整的文件上传逻辑
4. **错误处理**: 需要添加更完善的错误处理和用户提示

## 测试建议

1. 确认 WebSSH 后端的正确登录凭据
2. 测试 SSH 终端连接功能
3. 测试 SFTP 文件浏览功能
4. 测试服务器管理功能

---

**修复时间**: 2026-03-19
**修复者**: 大龙虾 🦞
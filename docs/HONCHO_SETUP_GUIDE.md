# Honcho 本地部署指南

> 适用于 Hermes Agent 记忆系统扩展

---

## 一、当前限制说明

### 内置记忆 (Built-in Memory)
- **容量**: 2,200 字符（硬限制）
- **用途**: 跨会话持久事实，注入 system prompt
- **状态**: 当前已启用

### Honcho 记忆 (外部服务)
- **容量**: 无硬限制
- **用途**: 长期用户建模、语义搜索、多 peers
- **状态**: 插件已安装，未配置

---

## 二、本地部署步骤

### 步骤 1：创建 Honcho 项目目录

```bash
# 在项目目录外创建 honcho 服务
mkdir -p H:/project/honcho-local
cd H:/project/honcho-local
```

### 步骤 2：复制配置文件

```bash
# 从克隆的源码复制
cp /tmp/honcho/docker-compose.yml.example docker-compose.yml
cp /tmp/honcho/.env.template .env
```

### 步骤 3：编辑 .env 文件

必须配置的变量：

```env
# 数据库连接（使用 Docker 内部网络）
DB_CONNECTION_URI=postgresql+psycopg://postgres:postgres@database:5432/postgres

# LLM API Keys（至少配置一个）
LLM_GEMINI_API_KEY=your_gemini_key
LLM_ANTHROPIC_API_KEY=your_anthropic_key
LLM_OPENAI_API_KEY=your_openai_key

# 禁用认证（本地开发）
AUTH_USE_AUTH=false
SENTRY_ENABLED=false
```

### 步骤 4：启动服务

```bash
# 启动数据库和 Redis（先启动基础设施）
docker compose up -d database redis

# 等待数据库就绪
sleep 10

# 启动完整服务
docker compose up -d
```

### 步骤 5：验证服务

```bash
# 检查所有服务状态
docker compose ps

# 测试 API 健康检查
curl http://localhost:8000/health
```

---

## 三、配置 Hermes 连接 Honcho

### 方法 A：使用 CLI 向导

```bash
hermes memory setup honcho
# 选择 "local"
# 输入 base URL: http://localhost:8000
# API Key: 留空（因为 AUTH_USE_AUTH=false）
```

### 方法 B：手动创建配置文件

创建 `$HERMES_HOME/honcho.json`：

```json
{
  "apiKey": "",
  "baseUrl": "http://localhost:8000",
  "peerName": "user",
  "aiPeer": "default",
  "workspace": "hermes-default",
  "recallMode": "hybrid",
  "observation": {
    "user": { "observeMe": true, "observeOthers": true },
    "ai": { "observeMe": true, "observeOthers": true }
  },
  "dialecticDepth": 1,
  "dialecticReasoningLevel": "low"
}
```

### 方法 C：更新 config.yaml

```bash
hermes config set memory.provider honcho
```

---

## 四、验证配置

```bash
# 检查记忆提供商状态
hermes memory status

# 应该显示：
# Provider: honcho
# Base URL: http://localhost:8000
```

---

## 五、测试记忆功能

### 保存事实

在对话中说：
```
记住：用户偏好中文回复，喜欢可爱风格
```

### 查询记忆

```python
from honcho import Honcho

honcho = Honcho(
    workspace_id="hermes-default",
    base_url="http://localhost:8000"
)

# 查询用户表示
peer = honcho.peer("user")
representation = peer.representation()
print(representation)
```

---

## 六、常用命令

| 命令 | 用途 |
|------|------|
| `docker compose up -d` | 启动所有服务 |
| `docker compose down` | 停止所有服务 |
| `docker compose logs -f` | 查看日志 |
| `hermes honcho status` | 检查连接状态 |
| `hermes memory status` | 查看记忆提供商 |
| `hermes honcho sync` | 同步所有 profile |

---

## 七、故障排查

### 问题：数据库连接失败

**解决**: 确保 PostgreSQL 服务已启动
```bash
docker compose ps database
docker compose logs database
```

### 问题：API 健康检查失败

**解决**: 等待服务完全启动
```bash
# 查看 API 日志
docker compose logs api

# 确认端口绑定
netstat -an | grep 8000
```

### 问题：Hermes 无法连接 Honcho

**解决**: 检查防火墙和绑定地址
```bash
# Honcho 默认绑定 127.0.0.1:8000
# 确保 Hermes 在同一台机器上运行
```

---

## 八、数据持久化

Docker Compose 已配置数据卷：
- `pgdata`: PostgreSQL 数据
- `redis-data`: Redis 数据
- `lancedb-data`: 向量数据（可选）

数据位于 Docker 管理的位置，不受容器重启影响。

---

## 九、清理和重置

```bash
# 停止并删除容器
docker compose down

# 删除数据卷（警告：会清除所有数据）
docker compose down -v

# 重新启动
docker compose up -d
```

---

*文档生成完毕，等待执行下一步指令。*

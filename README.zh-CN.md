# Agentic Loop Playground - 自动化代码清理工作流

一个展示 Claude Code 子代理（Subagents）和自定义命令（Custom Commands）的演示项目，用于自动化代码清理工作流。

## 项目介绍

这个项目演示了如何使用 Claude Code 的高级功能来自动处理代码中的 TODO 和 FIXME 注释。通过智能的子代理协作系统，可以自动评估、排序和执行代码清理任务。

### 核心特性

- **智能评估**: 自动分析 TODO/FIXME 的依赖关系和执行顺序
- **自动执行**: 按正确顺序执行代码修复和改进
- **验证机制**: 每个修改都会经过验证确保正确性
- **代理协作**: 评估器和执行器子代理协同工作

## 📁 项目结构

```
agentic-loop-playground/
├── README.md                 # 英文文档
├── README.zh-CN.md          # 中文文档（本文件）
├── agents/                   # Claude Code 子代理
│   ├── cleanup-evaluator.md  # 评估器：分析和排序任务
│   └── cleanup-executor.md   # 执行器：执行清理操作
├── bin/
│   └── deploy               # 部署脚本
├── commands/
│   └── cleanup.md            # 自定义清理命令
└── example/                  # 示例项目
    ├── package.json
    ├── README.md
    └── src/
        ├── index.js          # 包含 TODO/FIXME 的示例代码
        └── utils.js          # 工具函数示例
```

## 工作原理

### 1. 清理命令 (`/cleanup`)

主命令协调整个清理工作流：

1. **发现阶段**: 使用 grep 查找代码中的 TODO 和 FIXME（最多10个）
2. **评估阶段**: 启动 `cleanup-evaluator` 子代理分析任务
3. **执行阶段**: 启动 `cleanup-executor` 子代理执行修复
4. **循环迭代**: 评估器和执行器循环协作直到所有任务完成

### 2. 评估器子代理 (`cleanup-evaluator`)

负责智能任务管理：

- 分析代码上下文理解每个 TODO/FIXME
- 识别任务之间的依赖关系
- 按正确顺序排序任务
- 识别可以跳过或推迟的任务
- 决定下一步行动（执行任务或完成任务）

### 3. 执行器子代理 (`cleanup-executor`)

负责实际的代码修改：

- 从任务列表中取第一个任务
- 收集足够的上下文信息
- 设计验证程序
- 执行修改
- 验证修改正确性
- 更新任务状态
- 从代码中移除已完成的 TODO/FIXME 注释

## 快速开始

### 安装

使用部署脚本将代理和命令安装到 Claude Code 配置目录：

```bash
# 部署到默认位置 (~/.claude)
./bin/deploy

# 部署到指定目录
./bin/deploy -d /path/to/claude/config

# 强制覆盖已存在的文件
./bin/deploy --force

# 预览部署（不实际部署）
./bin/deploy --dry-run

# 通过环境变量设置目标目录
CLAUDE_CONFIG_DIR=/custom/path ./bin/deploy
```

### 使用示例项目测试

1. **进入示例项目目录**:
   ```bash
   cd example
   ```

2. **在 Claude Code 中使用清理命令**:
   ```bash
   /cleanup
   ```

3. **观察工作流程**:
   - 命令会找到所有 TODO 和 FIXME
   - 评估器会分析和排序
   - 执行器会逐个修复
   - 完成后会移除注释

## 示例代码

示例项目包含以下类型的 TODO/FIXME：

### 输入验证 (TODO)
```javascript
// TODO: Add input validation for user data
function processUser(user) {
    // FIXME: This doesn't handle null/undefined users
    return user.name.toUpperCase();
}
```

### 错误处理 (TODO/FIXME)
```javascript
// TODO: Implement proper error handling with try-catch
function calculateTotal(items) {
    // FIXME: Need to validate item.price is a number
    total += item.price;
}
```

### 文档和测试 (TODO)
```javascript
// TODO: Add JSDoc comments for all functions
// TODO: Add unit tests for validation functions
function validateEmail(email) {
    // FIXME: Regex is too simple
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}
```

## 技术细节

### 子代理通信协议

代理之间使用 JSON 格式通信：

```json
{
  "incomplete_items": [
    {
      "type": "todo|fixme",
      "id": "TODO_1",
      "file": "src/index.js",
      "line": 5,
      "content": "Add input validation"
    }
  ],
  "completed_items": [...],
  "postponed_items": [...],
  "next_action": "spawn(cleanup-executor)|spawn(cleanup-evaluator)|mission_complete"
}
```

### 任务状态

- **incomplete**: 待处理的任务
- **completed**: 已完成的任务
- **postponed**: 推迟的任务（包含推迟原因）

### 执行流程

```
/cleanup 命令
    ↓
发现 TODO/FIXME
    ↓
启动评估器 → 分析依赖 → 排序任务
    ↓
启动执行器 → 执行第一个任务 → 验证
    ↓
返回评估器 → 检查剩余任务
    ↓
循环直到完成
```

## 自定义和扩展

### 修改任务数量限制

编辑 `commands/cleanup.md` 中的 grep 命令：

```bash
# 从 10 个改为 20 个
grep -r -n -E "TODO|FIXME" . | head -n 20
```

### 添加新的清理类型

可以扩展支持其他注释类型：

```bash
grep -r -n -E "TODO|FIXME|HACK|XXX" .
```

### 自定义验证程序

在 `cleanup-executor.md` 中修改验证逻辑，例如：
- 运行单元测试
- 执行 linter
- 运行类型检查
- 构建项目

## 最佳实践

1. **小批量处理**: 每次处理 10 个左右的 TODO/FIXME
2. **验证每步**: 确保每个修改都经过验证
3. **保持上下文**: 评估器会分析完整的代码上下文
4. **依赖排序**: 让评估器处理任务顺序
5. **记录原因**: 推迟的任务会记录原因

## 使用场景

- **技术债务清理**: 系统性地处理积累的 TODO
- **代码重构**: 按正确顺序执行重构任务
- **bug 修复**: 处理标记为 FIXME 的问题
- **文档完善**: 补充缺失的文档
- **测试覆盖**: 添加标记的测试用例

## 调试和故障排除

### 查看子代理日志

子代理的输出会显示在 Claude Code 中，包括：
- 评估决策
- 执行步骤
- 验证结果
- 错误信息

### 常见问题

**Q: 部署失败怎么办？**
A: 检查目标目录权限，使用 `--dry-run` 预览

**Q: 任务被推迟了怎么办？**
A: 查看 `postpone_reasons` 字段了解原因

**Q: 如何跳过某些文件？**
A: 修改 grep 命令添加排除规则：`grep --exclude-dir=node_modules`

## 贡献

欢迎贡献！可以改进的方向：

1. 添加更多示例项目
2. 支持更多编程语言
3. 增强验证机制
4. 改进错误处理
5. 添加进度报告

### 贡献步骤

1. Fork 本仓库
2. 创建特性分支
3. 测试你的修改
4. 提交 Pull Request

## 许可证

MIT License - 详见 LICENSE 文件

## 相关资源

### 官方文档

- [Claude Code 自定义命令](https://docs.claude.com/en/docs/claude-code/slash-commands)
- [Claude Code 常见工作流](https://docs.claude.com/en/docs/claude-code/common-workflows)
- [Claude Code 子代理](https://docs.claude.com/en/docs/claude-code/agents)

### 学习资源

- Claude Code 最佳实践
- 子代理设计模式
- 自动化代码重构技巧

## 致谢

本项目展示了 Claude Code 的强大能力，感谢 Anthropic 团队开发了这个优秀的工具。

---

**注意**: 这是一个演示项目，用于展示 Claude Code 的功能。在生产环境中使用前，请根据实际需求调整配置。

# Agentic Loop Playground

A demonstration project showcasing Claude Code's subagents and custom commands for automated code cleanup workflows.

## 📁 Project Structure

```ascii
agentic-loop-playground/
├── README.md                 # This documentation
├── agents/                   # Claude Code subagents
│   ├── cleanup-evaluator.md  # Evaluates cleanup opportunities
│   └── cleanup-executor.md   # Executes cleanup operations
├── bin/
│   └── deploy               # Deployment script for agents and commands
└── commands/
    └── cleanup.md            # Custom cleanup command
```

## About This Project

This project contains:

- **Subagents** in the `agents/` directory - specialized AI assistants for Claude Code
- **Custom commands** in the `commands/` directory - reusable prompts for common workflows
- **Deploy script** in `bin/deploy` - tool to install agents and commands to your Claude Code configuration

## Deployment

Use the deploy script to install the agents and commands to your Claude Code configuration:

```bash
# Deploy to default location (~/.claude)
./bin/deploy

# Deploy to specific directory
./bin/deploy /path/to/claude/config

# Force overwrite existing files
./bin/deploy --force

# Dry run (preview what would be deployed)
./bin/deploy --dry-run

# Set destination via environment variable
CLAUDE_CONFIG_DIR=/custom/path ./bin/deploy
```

## Usage

After deployment, you can use the agents and commands in Claude Code:

```bash
# Use the cleanup command
/cleanup

# Interact with agents directly
/agents cleanup-evaluator
/agents cleanup-executor
```

## Documentation

For detailed information about Claude Code subagents and custom commands, refer to the official Anthropic documentation:

- **Subagents**: Learn about creating and using specialized AI assistants in Claude Code
- **Custom Commands**: Understand how to create reusable slash commands for common workflows

### Official Documentation Links

- [Claude Code Slash Commands](https://docs.claude.com/en/docs/claude-code/slash-commands) - Complete guide to custom commands
- [Claude Code Common Workflows](https://docs.claude.com/en/docs/claude-code/common-workflows) - Best practices and examples
- [Claude Code Subagents](https://docs.claude.com/en/docs/claude-code/agents) - Specialized AI assistant documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Test your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

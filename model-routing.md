# Model Routing

When to use which model:

## Local Models (Ollama)
| Task | Model | Command |
|------|-------|---------|
| General conversation | llama3.3 | `ollama run llama3.3` |
| Coding | qwen2.5-coder | `ollama run qwen2.5-coder` |
| Quick/simple tasks | qwen2.5-coder | `ollama run qwen2.5-coder` |

## Cloud Models
| Task | Model | When |
|------|-------|------|
| Complex reasoning | minimax-m2.5 | When local models struggle |
| Large context | minimax-m2.5 | Files > 100KB |
| Heavy coding | codex | Complex refactoring |
| Quick lookup | kimi-k2.5 | Fast answers |

## Decision Tree
1. Simple question → local llama3.3
2. Coding task → local qwen2.5-coder
3. Complex/large context → minimax-m2.5 cloud
4. Very heavy coding → Codex

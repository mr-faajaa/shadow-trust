---
name: agent-lightning
description: Microsoft Research agent training framework for RL, automatic prompt optimization, and supervised fine-tuning of AI agents
metadata: {"openclaw": {"requires": {"bins": ["pip", "python"]}, "install": [{"id": "pip", "kind": "pip", "package": "agentlightning"}]}}
---

# Agent Lightning ⚡

Microsoft Research framework for training and optimizing AI agents with reinforcement learning.

## What It Does

- **Reinforcement Learning (RL)** - Train agents to improve through experience
- **Automatic Prompt Optimization** - Refine prompts automatically
- **Supervised Fine-Tuning (SFT)** - Train on labeled data
- **Multi-Agent Optimization** - Optimize individual agents in multi-agent systems
- **Zero Code Changes** - Drop into existing agents with minimal modifications

## Installation

```bash
# Standard install
pip install agentlightning

# Latest nightly (cutting-edge)
pip install --upgrade \
  --index-url https://test.pypi.org/simple/ \
  --extra-index-url https://pypi.org/simple/ \
  --pre agentlightning
```

## Quick Start

```python
import agentlightning as agl

# Wrap your existing agent
agent = MyAgent()  # Your agent (LangChain, OpenAI, etc.)
agent = agl.wrap(agent)  # Add tracing

# Or use tracer manually
from agentlightning import tracer

with tracer.start_span("agent_run") as span:
    response = agent.run(user_input)
    span.emit(
        prompt=user_input,
        response=response,
        reward=calculate_reward(response)
    )
```

## Usage Patterns

### 1. Basic Agent Training

```python
from agentlightning import LightningTrainer

trainer = LightningTrainer(
    agent=my_agent,
    algorithm="ppo",  # or "grpo", "dpo", "sft"
    dataset=training_data,
    reward_function=reward_fn
)

trainer.train(num_episodes=1000)
```

### 2. Automatic Prompt Optimization

```python
from agentlightning import AutoPromptOptimizer

optimizer = AutoPromptOptimizer(
    agent=my_agent,
    eval_dataset=eval_data,
    metric="accuracy"
)

best_prompt = optimizer.optimize(initial_prompt, num_iterations=50)
```

### 3. Multi-Agent Optimization

```python
from agentlightning import MultiAgentTrainer

trainer = MultiAgentTrainer(
    agents={
        "planner": planner_agent,
        "executor": executor_agent,
        "verifier": verifier_agent
    },
    selective=["planner"],  # Only optimize planner
    algorithm="grpo"
)

trainer.train()
```

## Supported Frameworks

| Framework | Integration |
|-----------|-------------|
| LangChain | `agl.wrap(langchain_agent)` |
| OpenAI Agent SDK | `agl.wrap(openai_agent)` |
| AutoGen | `agl.wrap(autogen_agent)` |
| CrewAI | `agl.wrap(crewai_agent)` |
| Microsoft Agent Framework | `agl.wrap(msft_agent)` |
| Plain Python/OpenAI | `agl.wrap(python_agent)` |

## Algorithms Available

| Algorithm | Use Case |
|-----------|----------|
| PPO | Proximal Policy Optimization |
| GRPO | Group Relative Policy Optimization |
| DPO | Direct Preference Optimization |
| SFT | Supervised Fine-Tuning |
| APO | Automatic Prompt Optimization |

## Project Structure

```
final-year-project/
├── agents/
│   ├── planner.py
│   ├── executor.py
│   └── verifier.py
├── training/
│   ├── dataset.py
│   ├── rewards.py
│   └── config.yaml
├── scripts/
│   ├── train.py
│   ├── evaluate.py
│   └── optimize.py
└── requirements.txt
```

## Example: Training Script

```python
# scripts/train.py
import agentlightning as agl
from agents import planner, executor
from training.dataset import load_data
from training.rewards import calculate_reward

def main():
    # Load dataset
    train_data = load_data("data/train.jsonl")
    eval_data = load_data("data/eval.jsonl")
    
    # Create trainer
    trainer = agl.LightningTrainer(
        agent=planner,
        algorithm="grpo",
        dataset=train_data,
        reward_function=calculate_reward,
        eval_dataset=eval_data,
        metrics=["accuracy", "completion_rate"]
    )
    
    # Train
    trainer.train(
        num_episodes=1000,
        batch_size=32,
        learning_rate=1e-4
    )
    
    # Save
    trainer.save("checkpoints/planner_final")

if __name__ == "__main__":
    main()
```

## Evaluation

```python
from agentlightning import Evaluator

evaluator = Evaluator(
    agent=trained_agent,
    eval_dataset=eval_data,
    metrics=["accuracy", "f1", "bleu"]
)

results = evaluator.evaluate()
print(results)
```

## Tips for Final Year Project

### 1. Start Simple
```python
# Begin with SFT before moving to RL
trainer = agl.LightningTrainer(
    agent=agent,
    algorithm="sft",  # Easier to debug
    dataset=data
)
```

### 2. Track Everything
```python
from agentlightning import LightningStore

store = LightningStore(
    experiment_name="final_year_experiment",
    artifacts_dir="./experiments"
)

# Log everything
store.log_metrics(epoch=1, loss=0.5, accuracy=0.8)
store.save_agent(agent, checkpoint_name="epoch_1")
```

### 3. Compare Approaches
```python
# Compare different algorithms
for algo in ["sft", "dpo", "grpo"]:
    trainer = agl.LightTrainer(agent, algo, data)
    trainer.train()
    results = evaluator.evaluate(trained_agent)
    print(f"{algo}: {results['accuracy']}")
```

### 4. Use Provided Datasets
- Use standard benchmarks (GSM8K, HumanEval)
- Or create your own with annotation

## Common Issues

### ModuleNotFoundError
```bash
pip install agentlightning
# or for dev
pip install -e /path/to/agent-lightning
```

### CUDA Out of Memory
```python
trainer = LightningTrainer(
    agent=agent,
    batch_size=8,  # Reduce batch size
    gradient_accumulation_steps=4  # Accumulate gradients
)
```

### Slow Training
```python
trainer = LightningTrainer(
    agent=agent,
    num_workers=4,  # Parallel data loading
    prefetch_factor=2
)
```

## References

- **Documentation:** https://microsoft.github.io/agent-lightning/
- **GitHub:** https://github.com/microsoft/agent-lightning
- **Paper:** https://arxiv.org/abs/2508.03680
- **Discord:** https://discord.gg/RYk7CdvDR7

## Related Skills

- `agent-development` - Building agents
- `brainstorm-ideas` - Project ideation
- `logical-guard` - Adversarial validation
- `data-exploration` - Dataset analysis

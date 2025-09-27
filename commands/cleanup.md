---
description: Cleanup at most 10 documented TODOs and FIXMEs in the repository.
---

# Cleanup At Most 10 Documented TODOs and FIXMEs

## MANDATORY: 1. FIND DOCUMENTED TODOs and FIXMEs

You SHALL use the `grep` tool piped with `head` to find the first `10` documented TODOs and FIXMEs in the repository.

Command: grep -r -n -E "TODO|FIXME" . | head -n 10

The outputs are in the following format.

```shell
[file]:[line]:[content]
```

You SHALL READ round each [line] in [file] and EXTRACT the [content] from all the found TODOs and FIXMEs, filtering out the ones can cannot apply with the restrictions of the platform, operating system, and required tools, then convert into a JSON object of the following format, using [incomplete_item_list] as the mnemonic:

```json
[
  {
    "type": "todo",
    "id": "TODO_1",
    "file": [todo_1_file],
    "line": [todo_1_line],
    "content": [todo_1_content]
  },
  {
    "type": "todo",
    "id": "TODO_2",
    "file": [todo_2_file],
    "line": [todo_2_line],
    "content": [todo_2_content]
  },
  {
    "type": "fixme",
    "id": "FIXME_1",
    "file": [fixme_1_file],
    "line": [fixme_1_line],
    "content": [fixme_1_content]
  },
  {
    "type": "fixme",
    "id": "FIXME_2",
    "file": [fixme_2_file],
    "line": [fixme_2_line],
    "content": [fixme_2_content]
  }
]
```

You SHALL NOTE a JSON object with and empty "items" array as [completed_item_list]:

```json
[]
```

You SHALL NOTE a JSON object with and empty "items" array as [postponed_item_list]:

```json
[]
```

## MANDATORY: 2. SPAWN AN CLEANUP-EVALUATOR TO EVALUATE INCOMPLETE TODOs and FIXMEs

You MUST spawn an cleanup-evaluator subagent to evaluate the gap between the incomplete TODOs and FIXMEs and the existing situation.

You SHALL ALWAYS send the cleanup-evaluator with a JSON object of the following format:

```json
{
  "incomplete_items": [incomplete_item_list],
  "completed_items": [completed_item_list],
  "postponed_items": [postponed_item_list]
}
```

## MANDATORY: 3. UNDERSTANDS THE CLEANUP-EVALUATOR'S RESPONSE

The cleanup-evaluator always response with a JSON object of the following format:

```json
{
  "incomplete_items": [incomplete_item_list],
  "completed_items": [completed_item_list],
  "postponed_items": [postponed_item_list],
  "next_action": "spawn(cleanup-executor)|mission_complete"
}
```

### MANDATORY: ALWAYS OBEY THE CLEANUP-EVALUATOR'S DESCISION IN [next_action]

The cleanup-evaluator subagent ALWAYS is the core of the workflow.

YOU MUST OBEY THE DESCISION OF THE CLEANUP-EVALUATOR IN [next_action].
You SHALL NEVER CHANGE THE DESCISION OF THE CLEANUP-EVALUATOR in [next_action].

The [next_action] COULD BE: `spawn(cleanup-executor)` | `mission_complete`:

The [next_action_details] COULD BE:

```json
{
  "type": "todo|fixme",
  "id": [next_item_id],
  "file": [next_item_file],
  "line": [next_item_line],
  "content": [next_item_content]
}
```

OR

```json
{
  "type": "mission_complete"
}
```

The cleanup-evaluator subagent SHALL NEVER know if it is the last time to evaluate until the [next_action] of a spawned cleanup-evaluator turns out to be `mission_complete`.

### MANDATORY: ALWAYS TRANSFER [incomplete_items], [completed_items], [postponed_items] FROM THE CLEANUP-EVALUATOR'S RESPONSE TO THE NEXT SUBAGENT

YOU MUST transfer the [incomplete_items], [completed_items], [postponed_items] from the cleanup-evaluator's response to the next subagent with the JSON object of the following format:

```json
{
  "incomplete_items": [incomplete_item_list],
  "completed_items": [completed_item_list],
  "postponed_items": [postponed_item_list],
}
```

## MANDATORY: 4. UNDERSTAND THE RESPONSE FROM OTHER SUBAGENTS

All the subagents other than the cleanup-evaluator subagent SHALL ALWAYS response with a JSON object of the following format:

```json
{
  "incomplete_items": [next_incomplete_item_list],
  "completed_items": [next_completed_item_list],
  "postponed_items": [next_postponed_item_list],
  "next_action": "spawn(cleanup-evaluator)",
}
```

### MANDATORY: ALWAYS READ Subagent's Response to Decide Next Action

The [next_action] is ALWAYS to spawn an cleanup-evaluator subagent.

You MUST SEND the cleanup-evaluator with the JSON object of the following format:

```json
{
  "incomplete_items": [next_incomplete_item_list],
  "completed_items": [next_completed_item_list],
  "postponed_items": [next_postponed_item_list],
}
```

## MANDATORY: 5. HANDLING MISSION COMPLETE

If `next_action` in the response from the cleanup-evaluator subagent is `mission_complete`, then the mission is completed.

You SHALL STOP ALL THE SUBAGENTS AND EXIT THE WORKFLOW.

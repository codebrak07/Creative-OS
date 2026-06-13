# Creative OS MCP Server v3 — Production Version

Decoupled Creative Intelligence Orchestrator inside any MCP-compatible AI IDE (Claude Code, Cursor, Windsurf).

## Install

```bash
cd creative-os/creative-os-mcp
npm install
npm run build
```

## IDE Configuration

### Claude Code
```json
// ~/.claude/claude_desktop_config.json
{
  "mcpServers": {
    "creative-os": {
      "command": "node",
      "args": ["/absolute/path/to/creative-os/creative-os-mcp/dist/index.js"]
    }
  }
}
```

### Cursor
```json
// .cursor/mcp.json (project root)
{
  "mcpServers": {
    "creative-os": {
      "command": "node",
      "args": ["/absolute/path/to/creative-os/creative-os-mcp/dist/index.js"]
    }
  }
}
```

### Windsurf
```json
// windsurf.config.json
{
  "mcp": {
    "servers": {
      "creative-os": {
        "command": "node",
        "args": ["/absolute/path/to/creative-os/creative-os-mcp/dist/index.js"]
      }
    }
  }
}
```

## Complete Tool Suite

1. `cos_activate`: Activates senior creative technologist mode.
2. `cos_project_init`: Initializes project context variables.
3. `cos_tokens`: Retrieves design tokens by category.
4. `cos_pattern`: Retrieves production-ready animation and interaction code.
5. `cos_benchmark`: Retrieves JSON profiles of SOTD studios.
6. `cos_benchmark_compare`: Compares design stack/principles between two studios.
7. `cos_concept`: Pressure-tests a brief against the Bruno Simon model.
8. `cos_signature`: Generates custom signature interactions for brand briefs.
9. `cos_stack`: Returns the recommended creative tech stack and rationale.
10. `cos_audit`: Audits code snippets for hardcoded px sizes, hex colors, and accessibility.
11. `cos_fix`: Automatically patches code violations.
12. `cos_score`: Grades a project brief against Awwwards criteria.
13. `cos_launch_check`: Analyzes repository structure for preloads and accessibility.
14. `cos_case_study`: Generates a structured FWA/Awwwards case study.
15. `cos_awwwards`: Returns Awwwards evaluation guidelines.
16. `cos_recommend_modules`: Orchestrates Creative OS manuals based on project type and goals.

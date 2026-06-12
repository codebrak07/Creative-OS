import os
import re
import json
import sys

base_dir = "/Users/brak/Desktop/help ide/creative-os"

ALLOWED_TAGS = {"[DIRECT]", "[INFERRED]", "[SECONDARY]", "[ASSUMED]"}

def run_validation():
    print("====================================================")
    print("RUNNING TRACEABILITY VALIDATION")
    print("====================================================")
    
    # Find all markdown files
    md_files = []
    for root, dirs, files in os.walk(base_dir):
        for f in files:
            if f.endswith(".md"):
                rel_path = os.path.relpath(os.path.join(root, f), base_dir)
                md_files.append(rel_path)
    md_files.sort()
    
    total_md_files = len(md_files)
    files_with_traceability = []
    files_missing_traceability = []
    files_missing_tags = []
    
    tag_counts = {tag: 0 for tag in ALLOWED_TAGS}
    tag_counts["[OTHER]"] = 0
    
    errors = []
    
    for rel_path in md_files:
        abs_path = os.path.join(base_dir, rel_path)
        with open(abs_path, "r", encoding="utf-8") as f:
            content = f.read()
            lines = content.splitlines()
            
        # 1. Structural Check
        has_traceability_heading = False
        traceability_start_idx = -1
        for idx, line in enumerate(lines):
            if "##" in line and "benchmark traceability" in line.lower():
                has_traceability_heading = True
                traceability_start_idx = idx
                break
                
        if not has_traceability_heading:
            files_missing_traceability.append(rel_path)
            errors.append(f"Structure Error: `{rel_path}` is missing `## Benchmark Traceability` heading.")
            continue
            
        files_with_traceability.append(rel_path)
        
        # Check if it has "No direct benchmark dependencies"
        trace_section = "\\n".join(lines[traceability_start_idx:])
        is_independent = "no direct benchmark dependencies" in trace_section.lower()
        
        if is_independent:
            continue
            
        # Parse rules and tag check
        # We find all lines starting with '-' inside the traceability section
        rule_lines = []
        for line in lines[traceability_start_idx:]:
            if line.strip().startswith("-"):
                rule_lines.append(line.strip())
                
        if not rule_lines:
            files_missing_tags.append(rel_path)
            errors.append(f"Structure Error: `{rel_path}` traceability section contains no rules.")
            continue
            
        for rule in rule_lines:
            # Check for evidence tags
            # Rule must contain exactly one evidence tag
            found_tags = []
            for tag in ALLOWED_TAGS:
                if tag in rule:
                    found_tags.append(tag)
                    
            # Check for non-allowed bracketed tags
            other_tags = re.findall(r'\[([A-Z]+)\]', rule)
            for ot in other_tags:
                bracket_ot = f"[{ot}]"
                if bracket_ot not in ALLOWED_TAGS:
                    tag_counts["[OTHER]"] += 1
                    errors.append(f"Evidence Error in `{rel_path}`: Invalid tag `{bracket_ot}` used in rule: \"{rule}\"")
            
            if len(found_tags) == 0:
                errors.append(f"Evidence Error in `{rel_path}`: Missing evidence tag in rule: \"{rule}\"")
            elif len(found_tags) > 1:
                errors.append(f"Evidence Error in `{rel_path}`: Multiple evidence tags {found_tags} found in rule: \"{rule}\"")
            else:
                tag_counts[found_tags[0]] += 1
                
            # 2. Bureau Borsche Governance Check
            if "bureau borsche" in rule.lower() or "borsche" in rule.lower():
                # Verify that only [SECONDARY] is used
                if "[SECONDARY]" not in rule:
                    errors.append(f"Governance Error in `{rel_path}`: Bureau Borsche reference must strictly use [SECONDARY]. Rule: \"{rule}\"")
                for tag in ALLOWED_TAGS:
                    if tag != "[SECONDARY]" and tag in rule:
                        errors.append(f"Governance Error in `{rel_path}`: Bureau Borsche contains forbidden tag `{tag}` in rule: \"{rule}\"")
                        
    # 3. Knowledge Graph Validation
    kg_path = os.path.join(base_dir, "knowledge_graph.json")
    if not os.path.exists(kg_path):
        errors.append("Knowledge Graph Error: `knowledge_graph.json` not found in workspace root.")
    else:
        try:
            with open(kg_path, "r", encoding="utf-8") as f:
                kg = json.load(f)
                
            if "benchmarks" not in kg:
                errors.append("Knowledge Graph Error: Root key `benchmarks` is missing.")
            else:
                benchmarks_node = kg["benchmarks"]
                required_nodes = [
                    "active_theory", "buttermax", "resn", "locomotive", "instrument",
                    "basic_agency", "fantasy_interactive", "dogstudio", "mediamonks", "bureau_borsche"
                ]
                
                for node in required_nodes:
                    if node not in benchmarks_node:
                        errors.append(f"Knowledge Graph Error: Benchmark node `{node}` is missing.")
                    else:
                        node_data = benchmarks_node[node]
                        required_keys = ["confidence", "sources", "principles", "conflicts", "recommended_for", "avoid_for", "influences"]
                        for key in required_keys:
                            if key not in node_data:
                                errors.append(f"Knowledge Graph Error: Key `{key}` is missing in benchmark `{node}`.")
        except json.JSONDecodeError as je:
            errors.append(f"Knowledge Graph Error: Failed to parse JSON. {str(je)}")
            
    # 4. Coverage Validation
    coverage_percentage = (len(files_with_traceability) / total_md_files) * 100
    
    print("\n----------------------------------------------------")
    print("VALIDATION SUMMARY REPORT")
    print("----------------------------------------------------")
    print(f"Total Markdown Files: {total_md_files}")
    print(f"Files With Traceability: {len(files_with_traceability)}")
    print(f"Files Missing Traceability: {len(files_missing_traceability)}")
    print(f"Coverage Percentage: {coverage_percentage:.1f}%")
    print("\nEvidence Tag Distribution:")
    for tag, cnt in tag_counts.items():
        print(f"  {tag}: {cnt}")
    print("----------------------------------------------------")
    
    if errors:
        print("\n!!! VALIDATION FAILED !!!")
        print(f"Total Errors Found: {len(errors)}")
        for err in errors[:20]:
            print(f" - {err}")
        if len(errors) > 20:
            print(f" ... and {len(errors) - 20} more errors.")
        sys.exit(1)
    elif coverage_percentage < 100.0:
        print("\n!!! VALIDATION FAILED !!!")
        print("Coverage is less than 100%.")
        sys.exit(1)
    else:
        print("\n*** VALIDATION SUCCESS: 100% COMPLIANT ***")
        sys.exit(0)

if __name__ == "__main__":
    run_validation()

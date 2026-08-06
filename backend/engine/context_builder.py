# backend/engine/context_builder.py
from unicodedata import category

from .extractor import extract_entities


def build_context_note(current_message: str, history: list[dict]) -> str:
    """
    Main engine entry point. Called on every request.
    Returns a context note string (Type A/B/C/D/E) or empty string.

    Decision table (evaluated top-to-bottom):
      D: No number found                              → "" (LLM uses KB)
      B: rank/score + no department                  → ask for percentile
      B: rank/score + department (non-BARCH marks)   → ask for percentile
      E: ambiguous number + department               → ask percentile or rank?
      B: ambiguous number + no department            → ask both
      C: percentile/marks + no department            → ask for department
      C: percentile/marks + department + no category → ask for category (NEVER default Open)
      A: percentile/marks + department + category    → compute verdict
    """
    entities = extract_entities(current_message, history)

    number        = entities["number"]
    number_type   = entities["number_type"]
    departments   = entities["departments"]
    person_intent = entities["person_intent"]
    category      = entities["category"]
    number_source = entities["number_source"]
     # ── Person / Faculty / HOD Intent ──────────────────────────────
    if person_intent and departments:
        return (
            f"Deterministic intent detected: {person_intent} "
            f"for department {', '.join(departments)}. "
            f"This is a faculty/person query. "
            f"Retrieve the correct profile from the knowledge base and "
            f"respond using show_media_card. "
            f"Do NOT answer about admissions, CAP rounds, fees, or cutoffs."
        )

    # ── Person Intent without department ───────────────────────────
    if person_intent and not departments:
        return (
            f"Deterministic intent detected: {person_intent}. "
            f"The student did not specify a department. "
            f"Ask which department they mean."
        )

    text = current_message.lower()

    cutoff_words = [
        "cutoff",
        "cut off",
        "closing rank",
        "closing percentile",
    ]

    if any(word in text for word in cutoff_words) and departments:
        from .verdict import get_cutoff_history

        rows = get_cutoff_history(departments[0])

        if rows:
            table = "\n".join(
                f"{r['year']} | {r['category']} | {r['cutoff']}"
                for r in rows
            )

            return f"""
The user is asking for historical cutoff details.

Department:
{departments[0]}

Use ONLY these cutoff rows.

{table}

Respond using show_table.
"""

    # ── Type D: No number found ────────────────────────────────────
    if number is None:
        return ""  # LLM answers from KB

    dept_str = ", ".join(departments) if departments else "none"

    # ── Rank without department ────────────────────────────────────

    dept_str = ", ".join(departments) if departments else "none"

    
    # ── Type A removed ─────────────────────────────────────────────
    if number_type in ("percentile", "marks") and departments and category:
        return ""

    return""

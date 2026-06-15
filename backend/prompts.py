# backend/prompts.py
# These prompts are sent to Groq for each analysis type.
# Structured outputs make frontend parsing easier and more reliable.


def build_explain_prompt(code: str, language: str) -> str:
    """
    Prompt for line-by-line code explanation.
    Structured format:
    LINE X: explanation

    Frontend parses LINE X labels and highlights them.
    """
    return f"""You are analyzing {language} code.

Explain it line by line for a developer who understands programming
but has never seen this code before.

STRICT RULES:
- For each meaningful line or logical block write exactly:
  LINE X: <explanation>
- Keep explanations short (1-2 sentences)
- Group related lines when appropriate
- No introduction
- No preamble
- No markdown
- Start immediately with LINE 1:
- After all explanations write:

SUMMARY: <what this code does overall>

CODE ({language}):

{code}

Begin:
"""


def build_complexity_prompt(code: str, language: str) -> str:
    """
    Prompt for Big-O complexity analysis.
    Output must remain machine-readable.
    """
    return f"""Analyze the time and space complexity of this {language} code.

OUTPUT FORMAT (follow exactly):

TIME COMPLEXITY: O(?)
REASON: <one sentence>

SPACE COMPLEXITY: O(?)
REASON: <one sentence>

DOMINANT OPERATION: <operation responsible for complexity>

OPTIMIZATION TIP: <one concrete improvement>

RULES:
- No markdown
- No extra commentary
- Follow format exactly

CODE ({language}):

{code}
"""


def build_security_prompt(code: str, language: str) -> str:
    """
    Prompt for OWASP-style security scanning.
    Frontend parses HIGH/MEDIUM/LOW severity tags.
    """
    return f"""You are a security code reviewer.

Scan this {language} code for vulnerabilities.

CHECK FOR:
- SQL Injection
- Command Injection
- Hardcoded secrets
- API keys
- Password exposure
- Insecure use of eval()
- Insecure use of exec()
- Missing input validation
- Path traversal
- Sensitive data exposure
- Deprecated or insecure functions
- Missing authentication checks
- Missing authorization checks
- XML Injection
- JSON Injection

OUTPUT FORMAT:

HIGH | LINE X | <vulnerability> | <attacker impact> | FIX: <solution>

MEDIUM | LINE X | <vulnerability> | <risk> | FIX: <solution>

LOW | LINE X | <vulnerability> | <minor risk> | FIX: <solution>

RULES:
- Only report real vulnerabilities
- Avoid false positives
- Report each vulnerable line separately
- No markdown
- No extra commentary

If no vulnerabilities exist, output exactly:

SECURE: No vulnerabilities detected.

CODE ({language}):

{code}

Security scan results:
"""


def build_bug_prompt(code: str, language: str) -> str:
    """
    Prompt for likely runtime and logic bug detection.
    Each finding stays on one line so the frontend can parse it.
    """
    return f"""You are a senior software engineer performing a focused bug review.

Analyze this {language} code for defects that can cause incorrect behavior.

CHECK FOR:
- Runtime errors and unhandled exceptions
- Incorrect conditions, calculations, or return values
- Off-by-one, index, boundary, and empty-input mistakes
- Null, undefined, type, and state handling errors
- Infinite loops, unreachable code, and broken control flow
- Resource leaks, race conditions, and unsafe async behavior
- Incorrect API or standard-library usage
- Edge cases that produce wrong results

OUTPUT FORMAT:

BUG | HIGH | LINE X | <category> | <short bug title> | WHY: <failure scenario> | FIX: <specific correction>

BUG | MEDIUM | LINE X | <category> | <short bug title> | WHY: <failure scenario> | FIX: <specific correction>

BUG | LOW | LINE X | <category> | <short bug title> | WHY: <failure scenario> | FIX: <specific correction>

RULES:
- Put every finding on exactly one line
- Use HIGH when the code can crash, corrupt data, or consistently return a seriously wrong result
- Use MEDIUM for defects triggered by realistic inputs or states
- Use LOW for limited edge-case defects
- Use the exact source line number when possible; use LINE N/A only for a whole-program issue
- Report likely functional bugs, not style preferences or security vulnerabilities
- Do not invent missing requirements
- Do not repeat the same root cause
- No markdown
- No introduction or extra commentary

If no likely bugs exist, output exactly:

NO_BUGS | No likely functional bugs detected.

CODE ({language}):

{code}

Bug review results:
"""


def build_detect_language_prompt(code: str) -> str:
    """
    Auto-detect programming language.
    Must return only one lowercase word.
    """

    return f"""Detect the programming language of this code.

Reply with ONLY one word in lowercase.

Valid replies:
java
python
javascript
typescript
go
rust
cpp
sql
csharp
kotlin
swift

No punctuation.
No explanation.
No markdown.

CODE:

{code}
"""

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
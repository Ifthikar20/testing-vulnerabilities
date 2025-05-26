# Test Bank Flags - Treasure Hunt

Welcome to the Test Bank Security Challenge! Six security flags are hidden throughout this application. Each flag reveals a different vulnerability. Can you find them all?

## Flag Hints

### Flag 1 - "The Invisible Ink"
**Hint:** Not everything you see is visible to the naked eye. Some secrets are hidden in plain sight, invisible until you look at the source.
**Vulnerability Type:** Information Disclosure
**Difficulty:** Easy
**Clue:** View the login page's true face to discover what it's hiding beneath the surface.

### Flag 2 - "The Phantom Element"
**Hint:** Some elements exist but prefer to remain unseen, hiding in the shadows of the DOM.
**Vulnerability Type:** Hidden Data in DOM
**Difficulty:** Easy
**Clue:** On the dashboard, there's more than meets the eye. What's hiding in the document's structure?

### Flag 3 - "The Secret Messenger"
**Hint:** Communication isn't always visible in the conversation. Sometimes messages travel in secret headers.
**Vulnerability Type:** Information Disclosure in HTTP Headers
**Difficulty:** Medium
**Clue:** When you authenticate, examine how the server responds. Look beyond the body of the message.

### Flag 4 - "The Privileged Account"
**Hint:** Some data only reveals itself to those with the right privileges. What you see depends on who you are.
**Vulnerability Type:** Authorization Vulnerability
**Difficulty:** Medium
**Clue:** Admin accounts have special access to sensitive information. Can you see what they see?

### Flag 5 - "The Transaction Tracer"
**Hint:** Financial transactions leave traces. Every operation carries information, sometimes more than intended.
**Vulnerability Type:** Data Leakage in API Response
**Difficulty:** Medium
**Clue:** When money moves, examine the details carefully. Sometimes valuable information is sent back with the confirmation.

### Flag 6 - "The Gatekeeper's Secret"
**Hint:** The gatekeeper guards the admin realm, but whispers a secret password for those who know where to look.
**Vulnerability Type:** Authentication Bypass
**Difficulty:** Hard
**Clue:** In the shadows of the admin interface lies a hidden message. Find the right passphrase and the gate will open.

## Flag Format
All flags follow the format: `flag_no_X_XXXXXXXX` where X is a number or alphanumeric string.

## Happy Hunting!
Remember, ethical hacking involves identifying vulnerabilities without causing harm. This exercise is designed to help you understand common web security issues.
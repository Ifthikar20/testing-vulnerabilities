# Test Bank Application

This is a simple banking application with intentional security vulnerabilities for educational purposes. It simulates a banking website with various security flaws that can be discovered and exploited in a controlled environment.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Login Credentials

- Admin User: `admin` / `password123`
- Regular User: `user` / `user123`

## Security Vulnerabilities

This application intentionally contains security vulnerabilities for educational purposes, including:

1. Insecure JWT handling
2. Cross-Site Scripting (XSS)
3. Information disclosure in HTTP headers
4. Insecure storage of sensitive data
5. Missing CSRF protection
6. Client-side validation bypasses
7. Hardcoded credentials
8. Insecure authentication mechanisms

## Capture the Flag

The application contains several "flags" hidden throughout the codebase and application. Can you find them all?

**Note**: This application is for educational purposes only. Do not use any of the code patterns demonstrated in real applications.
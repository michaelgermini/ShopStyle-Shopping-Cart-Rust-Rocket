# Contributing to ShopStyle

Thank you for your interest in contributing to ShopStyle! We welcome contributions from the community.

## How to Contribute

### 1. Fork the Repository
- Fork the project on GitHub
- Clone your fork locally: `git clone https://github.com/your-username/shopstyle.git`

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# For Rust backend development
cargo build

# Start development server
npm start
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add your feature description"
```

### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

## Development Guidelines

### Code Style
- Use meaningful variable and function names
- Follow existing indentation and formatting
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages
Follow the conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for test additions/updates

### Testing
- Test your changes thoroughly
- Ensure existing functionality still works
- Add tests for new features when possible

## Project Structure
```
├── static/                 # Frontend files
│   ├── index.html         # Main page with mega menu
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   ├── products/         # Product pages
│   └── categories/       # Category pages
├── src/                  # Rust backend source
├── server.js             # Node.js server
├── package.json          # Node.js dependencies
└── Cargo.toml           # Rust dependencies
```

## Reporting Issues

### Bug Reports
Please include:
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Browser/OS information
- Screenshots if applicable

### Feature Requests
Please include:
- Description of the feature
- Use case or problem it solves
- Any mockups or examples

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

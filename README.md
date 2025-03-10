# InMinutes Admin API

## Overview

This repository contains the API server-side code for the InMinutes Admin Service. The API provides the backend functionality for managing and administering the InMinutes application.

[API Documentation](https://documenter.getpostman.com/view/17261000/2sAYdimpBZ)


## Technologies Used

*   Backend Framework: NestJS with Node.js
*   Programming Language: TypeScript
*   Database: MongoDB
*   Real-time Communication: Socket.IO
*   Testing Framework: Jest
*   Linting Tool: Eslint
*   Code formatting: prettier

## Getting Started


### Installation

1.  Clone the repository:

    ```
    git clone [repository URL]
    cd [repository directory]
    ```
2.  Install dependencies:

    ```
    pnpm install
    ```
3.  Configure the application:

    *   Create a `.env` file based on the `.env.example` file.
    *   Set the necessary environment variables (database connection, API keys, etc.).
4.  Start the application:

    ```
    pnpm start:dev
    ```

## Useful Commands

*   **`pnpm start:prod`**: Starts the application in production mode.
*   **`pnpm start:dev`**: Starts the application in development mode with hot-reloading.
*   **`pnpm test`**: Runs the test suite.
*   **`pnpm lint`**: Lints the code for style issues.
*   **`pnpm format`**: Formats the code using styles from prettier.

## Environment Variables

Refer to .env.example for required environment variables. When adding new variables as part of a pull request or code change, update .env.example with placeholders. Include a brief description of the variable's purpose in the commit message if necessary.

## API Endpoints

Refer to the [API Documentation](https://documenter.getpostman.com/view/17261000/2sAYdimpBZ) for a comprehensive list of available API endpoints and their usage.

## Contributing

To ensure that your contributions are efficiently integrated into the project, please follow these guidelines:

### Pull Requests

- **Relevance:** Ensure that each pull request only includes commits related to a specific branch, feature, bug fix, etc. Avoid mixing unrelated changes.
- **Branching:** Create a new branch for each feature or bug fix. Use descriptive branch names that indicate the purpose of the branch.
- **PR Description:** Provide a clear description of the changes in your pull request. Include any relevant details such as bug fixes or new features.

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for commit messages. This helps maintain a consistent and readable commit history.


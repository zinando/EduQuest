# EduQuest - Educational Dashboard

![EduQuest Logo](/Frontend/src/assets/Group%201.png)

EduQuest is an advanced educational platform designed to streamline the examination process for teachers, reviewers, and students. With EduQuest, you can create, manage, review, and take examinations with ease.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Setting Up](#setting-up)
2. [Features](#features)
   - [User Roles](#user-roles)
   - [Question Bank](#question-bank)
   - [Exam Creation](#exam-creation)
   - [Exam Review](#exam-review)
   - [Analytics and Reporting](#analytics-and-reporting)
   - [Communication](#communication)
3. [Security](#security)
4. [Contributing](#contributing)
5. [License](#license)

## Getting Started

### Installation

To get started with EduQuest, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eduquest.git
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables as described in [Setting Up](#setting-up).

4. Start the application:
   ```bash
   npm start
   ```

### Setting Up

EduQuest relies on several environment variables for configuration. Create a `.env` file in the project root and configure the following variables:

```dotenv
PORT=3000
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

## Features

### User Roles

EduQuest supports three user roles:

1. **Teacher**: Teachers can create and manage exams, as well as access exam results.
2. **Reviewer**: Reviewers are responsible for grading student responses and providing feedback.
3. **Student**: Students can take exams and view their results.

### Question Bank

EduQuest provides a user-friendly question bank where teachers can:

- Create and store questions categorized by subject and topic.
- Organize questions into folders for easy access.
- Search for questions based on keywords and filters.

### Exam Creation

Teachers can create exams effortlessly:

- Select questions from the question bank.
- Set exam parameters such as time limits and question types.
- Preview exams before publishing.

### Exam Review

Reviewers play a crucial role in the educational process:

- Access exams that require review.
- Evaluate student responses using rubrics and comments.
- Collaborate with teachers for a thorough assessment.

### Analytics and Reporting

EduQuest offers in-depth analytics and reporting:

- Track student performance and progress over time.
- Identify areas for improvement through detailed insights.
- Generate reports for stakeholders.

### Communication

The platform fosters communication among users:

- Teachers can communicate with reviewers and students.
- Students can seek clarification on exam questions.
- Reviewers can provide feedback and engage in discussions.

## Security

EduQuest takes security seriously:

- User data is encrypted and stored securely.
- Robust authentication and authorization mechanisms.
- Regular security audits and updates to mitigate vulnerabilities.

## Contributing

We welcome contributions from the community. If you'd like to contribute to EduQuest, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

EduQuest is licensed under the [MIT License](LICENSE).

---

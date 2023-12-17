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
   git clone https://github.com/zinando/eduquest.git
   ```

   2. Install the required dependencies:
   
      For the Frontend:
      ```bash
      cd EduQuest/Frontend
      npm install
      ```
      For the Backend, install python 3.10 or newer version. You get access to pip commands afterward. Then run the commands below:
      ```bash
      cd EduQuest/Backend #to enter backend directory
      pip install virtualenv #install a module to help you create virtual environment
      python -m venv virtual #create a virtual environment called 'virtual'
      virtual\Scripts\activate #activate virtual environment on windows machine
      source virtual/bin/activate #activate virtual environment on linux machine
      pip install -r requirements.txt #install backend dependencies from a file called 'requirements.txt'
      ```
3. Start the application:

   Frontend:
   ```bash
   cd EduQuest/Frontend
   npm run dev
   ```
   Backend:
   ```bash
   cd EduQuest/Backend
   virtual\Scripts\activate #activate virtual environment on windows machine
   source virtual/bin/activate #activate virtual environment on linux machine
   flask run #run the backend application
   ```

## Features

### User Roles

EduQuest supports four user roles:
1. **Super Admin**: The super admin is the only one that can signup using the signup button. Super admin creates every other user. He/she creates exam instance, and publishes results of every exam taken.
2. **Teacher**: Teachers can create and manage exams, as well as access exam results.
3. **Reviewer**: Reviewers are responsible for grading student responses and providing feedback.
4. **Student**: Students can take exams and view their results.

### Exam Creation
Super admin creates exam instances:

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

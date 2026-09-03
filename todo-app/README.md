# Jenkins Fundamentals Project

## Project Overview

This project demonstrates a **Jenkins Continuous Integration (CI) pipeline** using a Todo Application.

Jenkins is integrated with GitHub to automate:

**Clone → Install Dependencies → Build → Test → Package → Deliver Artifact**

## Technologies Used

* Jenkins
* Git & GitHub
* Ubuntu Linux
* Node.js & npm
* React + Vite
* Node.js + Express
* AWS EC2

## Project Structure

```text
jenkins-Fundamentals-Project/
├── Jenkinsfile
├── pipeline-report.txt
├── README.md
├── scripts/
├── screenshots/
├── documentation/
└── todo-app/
    ├── backend/
    └── frontend/
```

## Run Application Locally

### Backend

```bash
cd todo-app/backend
npm install
npm start
```

### Frontend

Open another terminal:

```bash
cd todo-app/frontend
npm install
npm run dev
```

## Jenkins Pipeline

The `Jenkinsfile` contains these stages:

1. Clone Source Code
2. Install Dependencies
3. Build Application
4. Run Tests
5. Package Application
6. Deliver Artifact

## GitHub Webhook

GitHub Webhook is configured to automatically trigger the Jenkins pipeline whenever new code is pushed to the repository.

## Jenkins Agent

A separate Ubuntu EC2 instance is configured as a Jenkins Agent using SSH for distributed build execution.

## Artifact

After a successful pipeline execution, Jenkins generates:

```text
todo-app-package.tar.gz
```

The artifact is archived in Jenkins.

## Repository

GitHub:
https://github.com/devaghanekar23/jenkins-Fundamentals-Project.git

## Project Status

**Jenkins CI Pipeline implemented successfully.**

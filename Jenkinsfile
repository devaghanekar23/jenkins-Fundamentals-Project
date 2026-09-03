pipeline {
    agent any

    stages {
        stage('Clone Source Code') {
            steps {
                git branch: 'main', url: 'https://github.com/devaghanekar23/jenkins-Fundamentals-Project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('todo-app/backend') {
                    sh 'npm install'
                }
                dir('todo-app/frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Application') {
            steps {
                dir('todo-app/frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('todo-app/backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Package Application') {
            steps {
                sh 'tar -czf todo-app-package.tar.gz todo-app/'
            }
        }

        stage('Deliver Artifact') {
            steps {
                archiveArtifacts artifacts: 'todo-app-package.tar.gz',
                    fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}
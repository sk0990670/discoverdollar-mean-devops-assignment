pipeline {
    agent any
    
    environment {
        // Docker Images's name
        BACKEND_IMAGE = 'solosahej/discoverdollar-backend'
        FRONTEND_IMAGE = 'solosahej/discoverdollar-frontend'
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sk0990670/discoverdollar-mean-devops-assignment.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred') {
                        sh "docker build -t ${BACKEND_IMAGE}:latest ./backend"
                        sh "docker build -t ${FRONTEND_IMAGE}:latest ./frontend"
                    }
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred') {
                        sh "docker push ${BACKEND_IMAGE}:latest"
                        sh "docker push ${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }
        stage('Docker Deploy') {
            steps {
                script {
                    sh 'docker-compose pull' // Pull latest images
                    sh 'docker-compose up -d --build' // Restart containers with Nginx on port 80
                }
            }
        }
    }
    
    post {
        always {
            // for Workspace clean 
            cleanWs()
        }
    }
}
pipeline {
    agent any
    options {
        timeout(time: 15, unit: 'MINUTES')
    }
    environment {
        DOCKER_IMAGE_BACKEND = 'himashachinthani/plant_store_backend'
        DOCKER_IMAGE_FRONTEND = 'himashachinthani/plant_store_frontend'
    
        EC2_USER = 'ubuntu'
        EC2_IP = '54.85.27.252'
        EC2_PROJECT_PATH = '/home/ubuntu/plant_store'
    }
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', credentialsId: 'HimashaChinthani', url: 'https://github.com/HimashaChinthani/plant_store.git'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                bat "docker build -t %DOCKER_IMAGE_BACKEND%:%BUILD_NUMBER% -t %DOCKER_IMAGE_BACKEND%:latest ./server"
                bat "docker build -t %DOCKER_IMAGE_FRONTEND%:%BUILD_NUMBER% -t %DOCKER_IMAGE_FRONTEND%:latest ./client"
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-credentials', 
                    usernameVariable: 'DOCKER_USER', 
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                }
            }
        }
        stage('Push Images') {
            steps {
                bat "docker push %DOCKER_IMAGE_BACKEND%:%BUILD_NUMBER%"
                bat "docker push %DOCKER_IMAGE_BACKEND%:latest"
                
                bat "docker push %DOCKER_IMAGE_FRONTEND%:%BUILD_NUMBER%"
                bat "docker push %DOCKER_IMAGE_FRONTEND%:latest"
            }
        }
        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    bat """
                    ssh -i "%SSH_KEY%" -o StrictHostKeyChecking=no %EC2_USER%@%EC2_IP% "if [ ! -d %EC2_PROJECT_PATH% ]; then git clone https://github.com/HimashaChinthani/plant_store.git %EC2_PROJECT_PATH%; fi && cd %EC2_PROJECT_PATH% && git fetch --all && git reset --hard origin/main && docker pull %DOCKER_IMAGE_BACKEND%:latest && docker pull %DOCKER_IMAGE_FRONTEND%:latest && docker compose down && docker compose up -d"
                    """
                }
            }
        }
    }
}

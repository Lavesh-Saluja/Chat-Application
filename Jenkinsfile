pipeline {
    agent any

    stages {
        stage('Pull Code') {
            steps {
                echo 'cloning the code'
                git url:"https://github.com/Lavesh-Saluja/Chat-Application.git", branch: "master"
            }
        }
         stage('build') {
            steps {
                echo 'building the code'
                sh "docker build -t chat-application ."
            }
        }
         stage('Push to docker hub') {
            steps {
                echo 'Pushing the image to docker hub'
                withCredentials([usernamePassword(credentialsId:"docker_Hub",passwordVariable:"dockerhubPass",usernameVariable:"dockerhubuser")]){
                    sh "docker tag chat-application ${env.dockerhubuser}/chat-application:latest"
                    sh "docker login -u ${env.dockerhubuser} -p ${env.dockerhubPass}"
                    sh "docker push ${env.dockerhubuser}/chat-application:latest"
                }
                
            }
        }
         stage('Deploy') {
            steps {
                echo 'Deploying the code'
                sh "docker-compose down && docker-compose up -d"
            }
        }
    }
}

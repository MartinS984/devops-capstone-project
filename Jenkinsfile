pipeline {
    agent any

    environment {
        // Reference the ID you created in Jenkins Credentials
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials')
        // Your Docker Hub username and image name
        IMAGE_NAME = "martins984/capstone-backend" 
    }

    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building Docker Image...'
                    // Navigate to backend folder and build
                    dir('backend') {
                        sh "docker build -t $IMAGE_NAME:$BUILD_NUMBER ."
                    }
                }
            }
        }

        stage('Login & Push') {
            steps {
                script {
                    echo 'Pushing to Docker Hub...'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    sh "docker push $IMAGE_NAME:$BUILD_NUMBER"
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                script {
                    echo 'Deploying to Minikube...'
                    // We need to edit the YAML to use the new image tag ($BUILD_NUMBER)
                    // We use "sed" to find the image line and replace it
                    sh "sed -i 's|image: .*|image: $IMAGE_NAME:$BUILD_NUMBER|' k8s/backend.yaml"
                    
                    // Apply the changes
                    sh 'kubectl apply -f k8s/backend.yaml'
                    
                    // Force rollout so we see changes immediately
                    sh 'kubectl rollout restart deployment/backend-deployment'
                }
            }
        }
    }
}
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

        stage('Update Manifest') {
            steps {
                // Inject the GitHub credentials so we can use them in the script
                withCredentials([usernamePassword(credentialsId: 'github-credentials', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    script {
                        echo 'Updating manifest in Git...'
                        
                        // Configure Git Identity
                        sh "git config user.email 'jenkins@example.com'"
                        sh "git config user.name 'Jenkins Bot'"
                        
                        // Update the YAML file using sed (just like before, but on the file, not the cluster)
                        sh "sed -i 's|image: .*|image: $IMAGE_NAME:$BUILD_NUMBER|' k8s/backend.yaml"
                        
                        // Commit and Push the change back to the repo
                        // We use the variables to authenticate the URL
                        sh "git add k8s/backend.yaml"
                        sh "git commit -m 'Update backend image to version $BUILD_NUMBER [skip ci]'"
                        sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/MartinS984/devops-capstone-project.git HEAD:main"
                    }
                }
            }
        }
    }
}
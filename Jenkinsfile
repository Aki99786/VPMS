pipeline {
    agent any

    environment {
        HOME = '/var/lib/jenkins'
        NVM_DIR = "$HOME/.nvm"
    }

    stages {
        stage('Setup Node.js') {
            steps {
                script {
                    // Using bash explicitly for the script block
                    sh '''
                    #!/bin/bash
                    source $NVM_DIR/nvm.sh
                    nvm install node  # Install the latest version of Node.js
                    nvm use node
                    node --version
                    npm --version
                    '''
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    if (fileExists('build.sh')) {
                        sh 'chmod +x build.sh'
                        sh './build.sh'
                    } else {
                        error "build.sh not found"
                    }
                }
            }
        }

        // Other stages like Test, Deploy can be added here

    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
        success {
            echo 'Build completed successfully.'
        }
        failure {
            echo 'Build failed.'
        }
    }
}

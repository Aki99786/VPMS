pipeline {
    agent any

    environment {
        HOME = '/home/ubuntu'
        NVM_DIR = '$HOME/.nvm'
    }

    stages {
        stage('Setup Node.js') {
            steps {
                script {
                    // Load NVM and install/use Node.js
                    sh '''
                    source $NVM_DIR/nvm.sh
                    nvm install node # Install the latest version of Node.js
                    nvm use node
                    node --version
                    npm --version
                    '''
                }
            }
        }

        // Other stages...
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

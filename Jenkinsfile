pipeline {
    agent any

    environment {
        HOME = '/var/lib/jenkins' // Set HOME environment variable if not already set appropriately
    }

    stages {
        stage('Setup Node.js') {
            steps {
                script {
                    // Checks if NVM is installed and install Node.js if needed
                    if (sh(script: '[ -s "$HOME/.nvm/nvm.sh" ] && echo "true"', returnStdout: true).trim() != 'true') {
                        echo 'Installing NVM...'
                        sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash'
                        sh 'source $HOME/.nvm/nvm.sh && nvm install node' // Install Node.js using NVM
                    }
                    echo 'Using Node.js installed via NVM...'
                    sh 'source $HOME/.nvm/nvm.sh && nvm use node'
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm // Check out the source code from Git repository
            }
        }

        stage('Build') {
            steps {
                script {
                    if (fileExists('build.sh')) {
                        sh 'chmod +x build.sh' // Ensure the build script is executable
                        sh './build.sh' // Execute the build script
                    } else {
                        error "build.sh not found"
                    }
                }
            }
        }

        stage('Test') {
            // Optional: Define a stage for running tests if applicable
            steps {
                echo 'Running tests...'
                // sh 'npm test' // Uncomment and modify according to your project's test command
            }
        }

        stage('Deploy') {
            // Optional: Define a stage for deployment if applicable
            steps {
                echo 'Deploying application...'
                // Add deployment scripts or commands here
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs() // Cleanup workspace after build process
        }
        success {
            echo 'Build completed successfully.'
        }
        failure {
            echo 'Build failed.'
        }
    }
}

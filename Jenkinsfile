pipeline {
    agent any

    stages {
        stage('Setup Node.js') {
            steps {
                echo 'Checking Node.js and npm versions...'
                sh 'node --version'
                sh 'npm --version'
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
                        sh './build.sh'
                    } else {
                        error "build.sh not found"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}

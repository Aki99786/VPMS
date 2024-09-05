pipeline {
    agent any

    stages {
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

        // Remove the Install dependencies and Start Application stages if they are handled in build.sh
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

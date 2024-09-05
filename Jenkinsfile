pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checks out the source code from Git
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                // Installs npm dependencies
                sh 'npm install'
            }
        }

        stage('Start Application') {
            steps {
                // This step starts your server
                sh 'npm start'
            }
        }
    }

    post {
        // Actions to take after pipeline execution
        always {
            echo 'Cleaning up...'
            // Add any cleanup steps if required
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}

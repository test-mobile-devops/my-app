pipeline {
    agent any
    
    // Define environment variables
    environment {
        APP_NAME = 'demo-mobile-app'
        BUILD_NUMBER = "${env.BUILD_NUMBER}"
        DEPLOY_PATH = '/var/jenkins_home/deployed-app'  // Change this to your web server path
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git repository...'
                // Git checkout happens automatically in Jenkins
                // This stage is just for clarity
                sh 'echo "Current directory: $(pwd)"'
                sh 'ls -la'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the application...'
                
                // Update build number in JavaScript file
                script {
                    sh """
                        sed -i 's/buildNumber: "001"/buildNumber: "${BUILD_NUMBER}"/g' app.js
                        echo "Updated build number to: ${BUILD_NUMBER}"
                    """
                }
                
                // Create a simple build artifact
                sh 'echo "Build completed at: $(date)" > build-info.txt'
                sh 'echo "Build Number: ${BUILD_NUMBER}" >> build-info.txt'
                
                // Archive the files
                archiveArtifacts artifacts: '*.html,*.js,*.css,build-info.txt', fingerprint: true
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                
                // Simple file validation tests
                sh '''
                    echo "Checking if required files exist..."
                    
                    if [ ! -f "index.html" ]; then
                        echo "ERROR: index.html not found!"
                        exit 1
                    fi
                    
                    if [ ! -f "app.js" ]; then
                        echo "ERROR: app.js not found!"
                        exit 1
                    fi
                    
                    if [ ! -f "style.css" ]; then
                        echo "ERROR: style.css not found!"
                        exit 1
                    fi
                    
                    echo "All required files found!"
                '''
                
                // Basic syntax check for JavaScript (if node is available)
                sh '''
                    if command -v node >/dev/null 2>&1; then
                        echo "Checking JavaScript syntax..."
                        node -c app.js
                        echo "JavaScript syntax is valid!"
                    else
                        echo "Node.js not available, skipping JS syntax check"
                    fi
                '''
                
                echo 'All tests passed!'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                
                script {
                    // Create deployment directory if it doesn't exist
                    sh """
                        echo "Creating deployment directory..."
                        mkdir -p ${DEPLOY_PATH}
                        
                        echo "Copying files to deployment directory..."
                        cp index.html ${DEPLOY_PATH}/
                        cp app.js ${DEPLOY_PATH}/
                        cp style.css ${DEPLOY_PATH}/
                        cp build-info.txt ${DEPLOY_PATH}/
                        
                        echo "Setting file permissions..."
                        chmod 644 ${DEPLOY_PATH}/*
                        
                        echo "Deployment completed!"
                        echo "Application available at: http://localhost${DEPLOY_PATH}"
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            echo "Build #${BUILD_NUMBER} has been deployed"
            
            // You can add email notifications here
            // emailext (
            //     subject: "Build Success: ${APP_NAME} #${BUILD_NUMBER}",
            //     body: "The build was successful!",
            //     to: "your-email@example.com"
            // )
        }
        
        failure {
            echo 'Pipeline failed!'
            echo "Build #${BUILD_NUMBER} failed. Please check the logs."
            
            // You can add failure notifications here
        }
        
        always {
            echo 'Cleaning up...'
            // Clean up temporary files if needed
            sh 'echo "Pipeline finished at: $(date)"'
        }
    }
}

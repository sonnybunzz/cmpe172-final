pipeline {
  agent any
  stages {
    stage('Build') {
      steps { 
        bat 'yarn' 
      }
    }
  }
  post {
    always {
      steps {
        bat 'npm stop'
        bat 'npm start'
      }
      failure {
        bat 'echo Stopped!'
      }
    }
  }
}
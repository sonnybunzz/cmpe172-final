pipeline {
  agent any
  stages {
    stage('Build') {
      steps { 
        bat 'yarn' 
      }
    }
    stage('Start'){
      steps{
        bat 'npm start'
      }
    }
  }
}
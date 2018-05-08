pipeline {
  agent any
  stages {
    stage('Build') {
      steps { 
        bat 'yarn' 
      }
    }
    stage('Stop'){
      steps{
        bat 'npm stop'
      }
    }
    stage('Start'){
      steps{
        bat 'npm start'
      }
    }
  }
}
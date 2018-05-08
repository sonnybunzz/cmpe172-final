pipeline {
  agent any
  stages {
    stage('Build') {
      steps { 
        bat 'cd C:\Users\bryan\Documents\Projects\cmpe172-final'
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
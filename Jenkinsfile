pipeline {
  agent any
  stages {
    stage('myStage'){
      steps {
        bat 'yarn' 
      }
    }
    stage('Build') {
      steps { 
        bat 'yarn start' 
      }
    }
  }
}
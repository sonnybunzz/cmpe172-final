pipeline {
  agent any
  stages {
    stage('kill'){
      steps{
        bat 'taskkill /im node.exe'
      }
    }  
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
// Set these variables if needed.
def SERVICE_NAME="nest-datum-ui-admin" // name of service or project.
def AGENT_NODE="happ3" // node/slave name where to run this job.

// DO NOT CHANGE!
def TARGET_USER="jenkins"

script {
    if ("$AGENT_NODE" != "master") {
        TARGET_USER="$JOB_NAME"
    }
}

pipeline {
    agent { label "$AGENT_NODE" }

    stages {
        stage('Init & Build project') {
            steps {
                sh "chown -R $JOB_NAME:$JOB_NAME ./*"
                sh "sudo -u $TARGET_USER npm install"
                sh "sudo -u $TARGET_USER npm run build"
            }
        }
    }
}
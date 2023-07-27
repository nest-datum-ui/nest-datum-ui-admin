// Set these variables if needed.
def SERVICE_NAME="nest-datum-ui-admin" // name of service or project.
def AGENT_NODE="happ3" // node/slave name where to run this job.

// DO NOT CHANGE!
def WORKSPACE_PATH="$JENKINS_HOME/workspace/workspace/$JOB_NAME"
def SERVICE_HOME="/home/$JOB_NAME"
def SERVICE_ROOT="$SERVICE_HOME/$SERVICE_NAME"
def TARGET_DIST_DEPLOY_PATH="$SERVICE_ROOT/build"
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
                sh "sudo chmod o+rw $SERVICE_HOME/$SERVICE_NAME/.env"
                sh "sudo cp $SERVICE_HOME/$SERVICE_NAME/.env $WORKSPACE_PATH"
                sh "echo 'current path' ${pwd}"
                sh "npm install"
                sh "npm run build"
            }
        }

        stage('Deploy') {
            steps {
                sh "sudo chmod -R o+rw $TARGET_DIST_DEPLOY_PATH"
                sh "rm -r $TARGET_DIST_DEPLOY_PATH/* || true"

                sh "cp -r ./build/* $TARGET_DIST_DEPLOY_PATH"
                sh "sudo chown -R $JOB_NAME:$JOB_NAME $TARGET_DIST_DEPLOY_PATH/*"
            }
        }
    }
}

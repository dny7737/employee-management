try {
            timeout(time: 20, unit: 'MINUTES') {
               def appName="${APP_NAME}"
               def project=""
               node {
                 stage("Initialize") {
                   project = env.PROJECT_NAME
                 }
               }
               node("nodejs") {
                 stage("Checkout") {
                   git url: "${GIT_SOURCE_URL}", branch: "${GIT_SOURCE_REF}"
                 }
               }
               node {
                 stage("Build Image") {
                   def status = sh(returnStdout: true, script: "npx nodeshift --strictSSL=false --dockerImage=bucharestgold/centos7-s2i-web-app --imageTag=10.x --build.env OUTPUT_DIR=dist/employee-management --expose")
                   def result = status.split("\n").find{ it.matches("^build.*started")
                 }
                 stage("Deploy") {
                   openshift.withCluster() {
                     openshift.withProject() {
                       def dc = openshift.selector('dc', "${appName}")
                       dc.rollout().status()
                     }
                   }
                 }
               }
               
            }
         } catch (err) {
            echo "in catch block"
            echo "Caught: ${err}"
            currentBuild.result = 'FAILURE'
            throw err
         }

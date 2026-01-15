# Start from the official Jenkins LTS image
FROM jenkins/jenkins:lts

# Switch to root to install tools
USER root

# 1. Install Docker CLI
# We need this so Jenkins can run 'docker build' commands
RUN apt-get update && \
    apt-get -y install apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/debian \
      $(lsb_release -cs) \
      stable" && \
    apt-get update && \
    apt-get -y install docker-ce-cli

# 2. Install Kubectl
# We need this so Jenkins can run 'kubectl apply' commands
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    chmod +x kubectl && \
    mv kubectl /usr/local/bin/kubectl

# Switch back to the Jenkins user for security
USER jenkins
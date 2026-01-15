# Start from the official Jenkins LTS image
FROM jenkins/jenkins:lts

# Switch to root to install tools
USER root

# 1. Install Docker CLI (Direct Download Method - Failsafe)
# We download the static binary and put it in the bin folder
RUN curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-24.0.5.tgz -o docker.tgz && \
    tar xzvf docker.tgz --strip 1 -C /usr/local/bin docker/docker && \
    rm docker.tgz

# 2. Install Kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    chmod +x kubectl && \
    mv kubectl /usr/local/bin/kubectl

# Switch back to the Jenkins user
USER jenkins
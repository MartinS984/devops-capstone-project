# DevOps Capstone Project

## Project Overview
This project is an end-to-end DevOps implementation based on the "TechWorld with Nana" bootcamp. 
It demonstrates a complete CI/CD workflow for a microservices application.

## Technology Stack
- **OS:** Windows 11 (WSL2 Ubuntu)
- **Containerization:** Docker
- **Orchestration:** Kubernetes (Minikube)
- **CI/CD:** Jenkins
- **Scripting:** Groovy (Jenkinsfile), Bash

## Project Roadmap
1. [X] **Application Development:** Create a simple Node.js web application.
2. [X] **Containerization:** Dockerize the application and push to Docker Hub.
3. [X] **Orchestration:** Create Kubernetes manifests (Deployment & Service) and deploy to Minikube.
4. [X] **CI/CD:** Set up Jenkins pipeline to automate the build and deploy process.
5. [X] **Monitoring:** (Optional) Configure Prometheus and Grafana.

## 🔧 Troubleshooting & Lessons Learned

During the implementation of this local DevOps pipeline, several challenges were encountered and resolved.

### 1. Docker-in-Docker Permission Denied
* **Issue:** The Jenkins container failed to run `docker build` with `permission denied` on `/var/run/docker.sock`.
* **Root Cause:** The Jenkins user inside the container did not have permissions to access the host's Docker socket mounted via volume.
* **Fix:** Adjusted permissions on the socket within the container:
    ```bash
    docker exec -u root jenkins-server chmod 666 /var/run/docker.sock
    ```

### 2. Docker Client/Server Version Mismatch
* **Issue:** Pipeline failed with `client version 1.43 is too old`.
* **Root Cause:** The Docker CLI installed in the Jenkins image (v24) was incompatible with the newer Docker Desktop host (v27+).
* **Fix:** Updated the Jenkins `Dockerfile` to download the latest static Docker binary (v27.3.1) instead of installing via `apt-get`.

### 3. Minikube Connection Refused (Port Mismatch)
* **Issue:** Jenkins failed to deploy to K8s with `dial tcp 192.168.49.2:5xxxx: connect: connection refused`.
* **Root Cause:** The `kubeconfig` generated on the host pointed to a random high port (forwarded by Docker Desktop), but Jenkins (running on the same Docker network) needed to access Minikube directly on its internal port (8443).
* **Fix:** Updated the kubeconfig inside Jenkins to force port 8443:
    ```bash
    docker exec jenkins-server sed -i 's|:5[0-9]*|:8443|g' /var/jenkins_home/.kube/config
    ```

### 4. Security Incident: Exposed Credentials
* **Issue:** GitGuardian alerted that `kubeconfig_jenkins` (containing private keys) was pushed to GitHub.
* **Root Cause:** The file was created in the root directory and not ignored before pushing.
* **Fix:**
    1. Removed file from Git tracking: `git rm --cached kubeconfig_jenkins`
    2. Added file to `.gitignore`.
    3. (Note: In a production environment, this would require rotating all cluster credentials).

## 📊 Monitoring & Verification

The project includes a full observability stack using **Prometheus** and **Grafana**.

### Accessing Dashboards
1. **ArgoCD:** `kubectl port-forward svc/argocd-server -n argocd 8081:443` (Access at https://localhost:8081)
2. **Grafana:** `kubectl port-forward svc/monitoring-stack-grafana -n monitoring 3000:80` (Access at http://localhost:3000)

### How to Stress Test
To visualize data in Grafana, generate load on the application:

```bash
# 1. Ensure Minikube tunnel is running
minikube tunnel

# 2. Run a loop to curl the frontend
while true; do curl -s http://localhost > /dev/null; done
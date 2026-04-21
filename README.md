# GraphQL K8s Blueprint

A production-ready reference architecture for deploying GraphQL services on Kubernetes. This blueprint moves beyond "best-effort" setups to implement **Infrastructure as Code (IaC)** patterns tailored for GraphQL.

## 🚀 The "Golden Path" Features
* **Deep Health Checks:** Custom `/health/ready` probes ensuring the GraphQL runtime, schema, and dependencies are fully initialized before traffic is routed.
* **Production Resource Constraints:** CPU and Memory limits to prevent node-level resource starvation.
* **Namespace Isolation:** Structured deployment patterns using dedicated namespaces for staging/production.
* **High Availability:** Multi-replica configuration ready for load balancing.

---

## 🛠 Prerequisites
Ensure you have the following installed in your environment:
* [Docker](https://www.docker.com/)
* [Kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker)
* [kubectl](https://kubernetes.io/docs/tasks/tools/)

---

## 📦 Deployment Instructions (Step-by-Step)

### 1. Build and Containerize
Build the GraphQL server image from the project root:
```bash
# Build the image
docker build -t <your-docker-username>/graphql-k8s:v1 .

# Push to your Docker Hub registry
docker push <your-docker-username>/graphql-k8s:v1
```

### 2. Initialize the Kubernetes Cluster
Spin up a local development cluster:
```bash
kind create cluster --name graphql-prod
```

### 3. Deploy Infrastructure
Apply the production namespace and resource manifests:
```bash
# Create the isolated namespace
kubectl apply -f k8s/namespace.yaml

# Deploy the application
kubectl apply -f k8s/deployment.yaml -n graphql-prod

# Expose the service
kubectl apply -f k8s/service.yaml -n graphql-prod
```

### 4. Verify Deployment
Check the status of your pods and service:
```bash
# Wait for 1/1 status
kubectl get pods -n graphql-prod -w

# Check service details
kubectl get svc -n graphql-prod
```

### 5. Test the Connection
Port-forward the service to your local machine to interact with the GraphQL playground:
```bash
kubectl port-forward svc/graphql-service 4000:80 -n graphql-prod
```
*Access the GraphQL IDE at `http://localhost:4000`*

---

## 💡 Why this matters
Most GraphQL deployments on Kubernetes fail at the "Traffic Routing" phase because standard probes do not verify application-level readiness. This blueprint standardizes the **Kubernetes-GraphQL handshake**, allowing developers to ship stable, observable graphs.

***

### **Crucial Final Step:**
Before you commit and push this:
1. Replace `<your-docker-username>` in the README with your actual username (`ayush12141`).
2. Make sure you also update the `image:` line in your `k8s/deployment.yaml` file to use `ayush12141/graphql-k8s:v1`.


# GraphQL K8s Blueprint

This repo is my attempt to stop the "it works on my machine" problem when running GraphQL on Kubernetes.
If you’ve ever deployed a GraphQL app to a cluster, you know the pain pods that report as ready before they’re actually ready, resource spikes that kill your nodes, or just not knowing how to properly isolate your dev and prod environments.

### What is this repo about?
This is a no-nonsense, production-ready blueprint. It’s the setup I use to make sure my GraphQL services are actually stable, observable, and ready for real traffic.

### What you'll learn (and what we're doing here):
* **No more fake ready pods:** We’re using custom health checks so Kubernetes actually knows when your app is ready to serve queries, not just when the process started.
* **Keeping your cluster happy:** I’ve set up resource limits so your app doesn’t accidentally eat up all the memory on your nodes.
* **Keeping things organized:** You’ll see how to use namespaces to keep your development and production traffic from bumping into each other.
* **Scaling out of the box:** We’re deploying with multiple replicas, so your graph stays up even if one pod goes down.

### Why does this matter?
GraphQL is special. You can’t treat it like a simple static website. This repo is the Golden Path it’s the basic, solid foundation you need so you can stop fighting with infrastructure and get back to building the actual graph.


##  Prerequisites
Ensure you have the following installed in your environment:
* [Docker](https://www.docker.com/)
* [Kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker)
* [kubectl](https://kubernetes.io/docs/tasks/tools/)

---

## Deployment Instructions (Step-by-Step)

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


### **Crucial Final Step:**
Before you commit and push this:
1. Replace `<your-docker-username>` in the README with your actual username (`ayush12141`).
2. Make sure you also update the `image:` line in your `k8s/deployment.yaml` file to use `ayush12141/graphql-k8s:v1`.
   
This repository is an official contribution by a GraphQL Foundation Ambassador. Its purpose is to provide the community with a Golden Path for infrastructure, ensuring that as more developers bring GraphQL to Kubernetes, they do so with production-grade reliability and performance.

If you’d like to contribute, improve the manifests, or add observability hooks, feel free to open a PR! Do drop a STAR if you liked it!!

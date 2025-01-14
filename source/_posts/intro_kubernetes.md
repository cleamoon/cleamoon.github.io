---
title: Kubernetes Tutorial for Beginners
date: 2022-01-10
mathjax: true
tags: [Programming, DevOps]
---


Kubernetes is a widely used open-source container orchestration system. This tutorial shows the basics of Kubernetes for beginners. 

<!-- more -->

## Intro to K8s

### What is kubernetes?

#### Official Definition 

* Open source container orchestration tool
* Developed by Google
* Helps you manage containerized applications in difference deployment environments
  * Physical
  * Virtual 
  * Cloud



#### What are the tasks of an orchestration tool?

* Trend from monolith to microservices
* Increased usage of containers
* Demand for a proper way of managing those hundreds of containers



#### What features do orchestration tools offer?

* High availability or no downtime
* Scalability or high performance
* Disaster recovery - backup and restore





### Main K8s components

* Pod
  * Smallest unit of K8s
  * Abstraction over container
  * Usually 1 application per Pod
  * Each Pod gets its own IP address
  * New IP address on re-creation
* Service
  * Permanent IP address
  * Life-cycle of Pod and Service NOT connected
  * Service is also a load balancer
* Ingress
  * Outside communicates with Service via Ingress

* ConfigMap

  * External configuration of your application

  * Don't put credentials into ConfigMap

* Secret
  * Used to store secret data
  * `base64` encoded
  * The built-in security mechanism is not enabled by default
* Volumes 
  * K8s doesn't manage data persistence
  * Storage on local machine
  * Or storage remote, outside of the K8s cluster
* Deployment
  * Blueprint for pods
  * Abstraction of Pods
  * You create Deployments for stateless apps
  * Convenient to duplicate Pods
* StatefulSet
  * For STATEFUL apps or Databases
  * Deploying StatefulSet not easy
  * DB are often hosted outside of K8s cluster



### Kubernetes Architecture

* Worker machine in K8s cluster
  * Each Node has multiple Pods on it
  * 3 processes must be installed on every Node
    * Container runtime
    * Kubelet
      * Kubelet interacts with both the container and node
      * Kubelet starts the pod with a container inside
      * Kobe proxy
  * Worker Nodes do the actual work
    * How do you interact with this cluster?
      * How to:
        * Schedule pod?
        * Monitor?
        * Re-schedule / restart pod?
        * Join a new node?
      * Master node

* Master node

  * Each master node has 4 processes running
    * Api server
      * Cluster gateway
      * Acts as a gatekeeper for authentication
      * Api server is load balanced
    * Scheduler
      * Scheduler just decides on which Node new Pod should be scheduled
    * Controller manager
      * Detect cluster state changes
    * etcd
      * etcd is the cluster brain
      * Distributed storage across all clusters
      * Cluster changes get stored in the key value store
      * Application data is not stored in etcd

  

#### Layers of abstraction

1. Deployment manages a ..
   * Everything below Deployment is handled by Kubernetes
2. ReplicaSet manages a ..
3. Pod is an abstraction of ..
4. Container



### Minikube and Kubectl - Local setup

#### Production cluster setup

* Multiple Master and Worker nodes
* Separate virtual or physical machines
  * Test on local machine with Minikube



#### Minikube

* Both the Master processes and the Worker processes run on one Node
* Docker pre-installed on this Node
* Creates Virtual Box on your laptop
* Node runs in that Virtual Box
* 1 Node K8s cluster
* For testing purposes



#### Kubectl

* Command line tools for Kubernetes cluster
* Enables interaction with cluster



### Main Kubectl commands - K8s cli

```shell
$ kubectl get pod
No resources found in default namespace.
$ Kubectl get services
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   1.2.3.4      <none>        443/TCP   21m
$ kubectl create deployment nginx-depl --image=nginx                                                         deployment.apps/nginx-depl created
$ kubectl get deployment
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
nginx-depl   1/1     1            1           25s
$ kubectl get pod
NAME                          READY   STATUS    RESTARTS   AGE
nginx-depl-5c8bf76b5b-hc42t   1/1     Running   0          99s
$ kubectl get replicaset
NAME                    DESIRED   CURRENT   READY   AGE
nginx-depl-5c8bf76b5b   1         1         1       2m51s
$ kubectl edit deployment nginx-depl
... Change version of nginx
deployment.apps/nginx-depl edited
$ kubectl get pod
NAME                          READY   STATUS    RESTARTS   AGE
nginx-depl-7fc44fc5d4-fftcf   1/1     Running   0          36s
$ kubectl get replicaset
NAME                    DESIRED   CURRENT   READY   AGE
nginx-depl-5c8bf76b5b   0         0         0       9m25s
nginx-depl-7fc44fc5d4   1         1         1       2m14s
$ kubectl create deployment mongo-depl --image=mongo                                                         deployment.apps/mongo-depl created
$ kubectl get pod                                                                                           NAME                          READY   STATUS              RESTARTS   AGE
mongo-depl-5fd6b7d4b4-mnz4f   0/1     ContainerCreating   0          32s
nginx-depl-7fc44fc5d4-fftcf   1/1     Running             0          25m
$ kubectl logs mongo-depl-5fd6b7d4b4-mnz4f
{"t":{"$date":"2022-01-07T01:57:07.322+00:00"},"s":"I",  "c":"CONTROL",  "id":23285,   "ctx":"-","msg":"Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'"}
...
...
$ kubectl describe pod mongo-depl-5fd6b7d4b4-mnz4f
Name:         mongo-depl-5fd6b7d4b4-mnz4f
...
...
$ kubectl exec -it mongo-depl-5fd6b7d4b4-mnz4f -- bin/bash                                                   root@mongo-depl-5fd6b7d4b4-mnz4f:/# exit
exit
$ kubectl delete deployment mongo-depl                                                                       deployment.apps "mongo-depl" deleted
$ kubectl delete deployment nginx-depl 
deployment.apps "nginx-depl" deleted
$ kubectl apply -f config-file.yaml
deployment.apps/nginx-deployment created
$ kubectl apply -f nginx-deployment.yaml
deployment.apps/nginx-deployment unchanged
$ kubectl get deployment nginx-deployment -o yaml
apiVersion: apps/v1
kind: Deployment
...
...
```





### K8s YAML configuration file

#### The 3 parts of configuration file

1. Metadata
2. Specification
   * Attributes of "spec" are specific to the kind
3. Status
   * Automatically generated and added by Kubernetes
   * To compare with the desired
   * K8s update the status continuously



#### Connecting deployments to Service to Pods

* Pods get the label through the template blueprint
* This label is matched by the selector



#### Connecting Services to Deployments

* Services selector makes a connection between the Pod's template and itself through the label

* Ports in Service and Pod



#### Demo

* `nginx-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    apps: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.16
        ports:
        - containerPort: 80
```

* `nginx-service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports: 
    - protocol: TCP
      port: 80
      targetPort: 8080
```

* Validate

```shell
$ kubectl apply -f nginx-deployment.yaml
deployment.apps/nginx-deployment created
$ kubectl get pod
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-644599b9c9-pq6lv   1/1     Running   0          38m
$ kubectl apply -f nginx-service.yaml
service/nginx-service created
$ kubectl get service
NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
kubernetes      ClusterIP   10.96.0.1      <none>        443/TCP   112m
nginx-service   ClusterIP   10.99.193.36   <none>        80/TCP    114s
$ kubectl describe service nginx-service
Name:              nginx-service
Namespace:         default
Labels:            <none>
...
...
$ kubectl delete -f nginx-deployment.yaml
deployment.apps "nginx-deployment" deleted
$ kubectl delete -f nginx-service.yaml
service "nginx-service" deleted
```



### Complete Application Setup with Kubernetes Components

* `mongo.yaml`

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: mongodb-deployment
    labels:
      app: mongodb
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: mongodb
    template:
      metadata:
        labels:
          app: mongodb
      spec:
        containers:
        - name: mongodb
          image: mongo
          ports:
          - containerPort: 27017
          env:
          - name: MONGO_INITDB_ROOT_USERNAME
            valueFrom:
              secretKeyRef:
                name: mongodb-secret
                key: mongo-root-username
          - name: MONGO_INITDB_ROOT_PASSWORD
            valueFrom:
              secretKeyRef:
                name: mongodb-secret
                key: mongo-root-password
  ```

* `mongo-secret.yaml`: for username and password

  ```yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: mongodb-secret
  type: Opaque
  data:
    mongo-root-username: dXNlcm5hbWU=
    mongo-root-password: cGFzc3dvcmQ=
  ```

* Creates secret and deployment

  ```shell
  $ kubectl apply -f mongo-secret.yaml
  secret/mongodb-secret created
  $ kubectl get secret
  NAME                  TYPE                                  DATA   AGE
  default-token-7h9vx   kubernetes.io/service-account-token   3      12h
  mongodb-secret        Opaque                                2      17m
  $ kubectl apply -f mongo.yaml 
  deployment.apps/mongodb-deployment created
  service/mongodb-service created
  $ kubectl get all
  NAME                                     READY   STATUS    RESTARTS   AGE
  pod/mongodb-deployment-8f6675bc5-6bkpq   1/1     Running   0          17m
  
  NAME                      TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)     AGE
  service/kubernetes        ClusterIP   10.96.0.1      <none>        443/TCP     12h
  service/mongodb-service   ClusterIP   10.98.250.66   <none>        27017/TCP   57s
  
  NAME                                 READY   UP-TO-DATE   AVAILABLE   AGE
  deployment.apps/mongodb-deployment   1/1     1            1           17m
  
  NAME                                           DESIRED   CURRENT   READY   AGE
  replicaset.apps/mongodb-deployment-8f6675bc5   1         1         1       17m
  ```

* Add `mongo-express` deployment and service

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: mongo-express
    labels:
      app: mongo-express
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: mongo-express
    template:
      metadata:
        labels:
          app: mongo-express
      spec:
        containers:
        - name: mongo-express
          image: mongo-express
          ports:
          - containerPort: 8081
          env:
          - name: ME_CONFIG_MONGODB_ADMINUSERNAME
            valueFrom:
              secretKeyRef:
                name: mongodb-secret
                key: mongo-root-username
          - name: ME_CONFIG_MONGODB_ADMINPASSWORD
            valueFrom:
              secretKeyRef:
                name: mongodb-secret
                key: mongo-root-password
          - name: ME_CONFIG_MONGODB_SERVER
            valueFrom:
              configMapKeyRef:
                name: mongodb-configmap
                key: database_url
  ---
  apiVersion: v1
  kind: Service
  metadata:
    name: mongo-express-service
  spec: 
    selector:
      app: mongo-express
    ports:
      - protocol: TCP
        port: 8081
        targetPort: 8081
  ```

  And the corresponding ConfigMap

  ```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: mongodb-configmap
  data:
    database_url: mongodb-service
  ```

* Then deploy them

  ```shell
  $ kubectl apply -f mongo-configmap.yaml 
  configmap/mongodb-configmap created
  $ kubectl apply -f mongo-express.yaml 
  deployment.apps/mongo-express created
  service/mongo-express-service created
  $ kubectl get pod
  NAME                                 READY   STATUS    RESTARTS   AGE
  mongo-express-78fcf796b8-nfrfk       1/1     Running   0          35s
  mongodb-deployment-8f6675bc5-6bkpq   1/1     Running   0          97m
  $ kubectl get service
  NAME                    TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
  kubernetes              ClusterIP      10.96.0.1       <none>        443/TCP          14h
  mongo-express-service   LoadBalancer   10.97.225.240   <pending>     8081:30000/TCP   25s
  mongodb-service         ClusterIP      10.98.250.66    <none>        27017/TCP        103m
  $ minikube service mongo-express-service
  |-----------|-----------------------|-------------|---------------------------|
  | NAMESPACE |         NAME          | TARGET PORT |            URL            |
  |-----------|-----------------------|-------------|---------------------------|
  | default   | mongo-express-service |        8081 | http://192.168.49.2:30000 |
  |-----------|-----------------------|-------------|---------------------------|
  🎉  Opening service default/mongo-express-service in default browser...
  ```

  



## Advanced concepts



### K8s namespaces - organize your components

#### What is a Namespace?

* Organise resources in namespace
* Virtual cluster inside a cluster
* 4 namespaces per Default
  * `kubernetes-dashboard` only with minikube
  * `kube-system` 
    * Do NOT create or modify in `kube-system`
    * Contains system processes
      * Master and Kubectl processes
  * `kube-public`
    * Publicly accessible data
    * A ConfigMap, which contains cluster information
  * `kube-node-lease`
    * Heartbeats of nodes
    * Each node has associated lease object in namespace
    * Determines the availability of a node
  * `default`
    * Resources you create are located here 



#### Create a Namespace

```shell
$ kubectl create namespace my-namespace
```



#### What are the use cases?

1. Resources grouped in Namespace

   * Everything in one namespace only for tiny project

   * Officially: Should not use for smaller projects

2. Conflicts: Many teams, same application

3. Resource sharing: 

   * Staging and development
   * Blue/green deployment

4. Access and resource limits on namespace

   * Limit: CPU, RAM, storage per namespace



#### Characteristics of namespaces

* You can't access most resources from another namespace
  * Each namespace must define own ConfigMap
* You can access Service in another namepsace
  * With namespaces' names in Service's urls
* Components, which can't be created within a namespace
  * Live globally in a cluster
  * You can't isolate them
  * Example: volume, node



#### How Namespaces work and how to use it? 

* Create components in namespaces

  * By default, components are created in a default namespace

  * Using `kubectl`

    ```shell
    $ kubectl apply -f mysql-configmap.yaml --namespace=my-namespace
    configmap/mysql-configmap created
    $ kubectl get configmap -n my-namespace
    NAME				DATA 	AGE
    mysql-configmap		1		20s
    ```

  * Using configuration files

    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
    	name: mysql-configmap
    	namespace: my-namespace
    data:
    	db_url: mysql-service.database
    ```

  * Recommend to use configuration file over `kubectl`

    * Better documented
    * More convenient

* Change active namespace with `kubens`

  ```shell
  $ kubens my-namespace
  Context "minikube" modified.
  Active namespace is "my-namespace".
  ```

  



### K8s Ingress

#### What is Ingress?

External Service vs. Ingress

* Example YAML file

  * External Service:

    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
    	name: myapp-external-service
    spec:
    	selector:
    		app: myapp
    	type: LoadBalancer
    	ports:
    		- protocol: TCP
    		  port: 8080
    		  targetPort: 8080
    		  nodePort: 35010
    ```

  * Ingress

    ```yaml
    apiVersion: networking.k8s.io/v1beta1
    kind: Ingress
    metadata: 
    	name: myapp-ingress
    spec:
    	rules:
    	- host: myapp.com
    	  http:
    	  	paths:
    	  	- backend:
    	  		serviceName: myapp-internal-service
    	  		servicePort: 8080
    ```

    * The host should be a valid domain address
    * The host maps domain name to Node's IP address, which is the entrypoint



#### How to configure Ingress in your K8s cluster?

* You need an implementation for Ingress which is Ingress Controller
  * Which is basically another Pod
  * Evaluates and processes Ingress rules
  * Manages redirections
  * Entrypoint to cluster
  * Many third-party implementations
    * Some cloud service providers have
      * Out-of-the-box K8s solutions
      * Own virtualized load balancer
      * You don't have to implement load balancer by yourself
    * Bare metal
      * You need to configure some kind of entrypoint
      * Either inside of cluster or outside as a separate server
        * For example a proxy server
        * Can be software or hardware solution 
      * With public IP address and open port
      * Will be entrypoint to cluster

* Install Ingress on Minikube

  ```shell
  $ minikube addons enable ingress
  ```

  * Configure dashboard for ingress

    ```yaml
    apiVersion: networking.k8s.io/v1beta1
    kind: Ingress
    metadata:
    	name: dashboard-ingress
    	namespace: kubernetes-dashboard
    spec:
    	rules:
    	- host: dashboard.com
    	  http:
    	  	paths:
    	  	- backend:
    	  		serviceName: kubernetes-dashboard
    	  		servicePort: 80
    ```

  * Then apply:

    ```shell
    $ kubectl apply -f dashboard-ingress.yaml
    ingress.networking.k8s.io/dashboard-ingress created
    $ kubectl get ingress -n kubernetes-dashboard
    NAME				HOSTS			ADDRESS			PORTS	AGE
    dashboard-ingress	dashboard.com	192.168.64.5	80		50s
    $ sudo vim /etc/hosts
    # Add the following line here
    192.168.64.5	dashboard.com
    ```

* Create default backend in Ingress

  ```yaml
  apiVersion: v1
  kind: Service
  metadata: 
  	name: default-http-backend
  spec:
  	selector:
  		app: default-response-app
  	ports:
  	  - protocol: TCP
  	    port: 80
  	    targetPort: 8080
  ```



#### Some use cases

* Multiple paths for same host

  ```yaml
  apiVersion: networking.k8s.io/v1beta1
  kind: Ingress
  metadata: 
  	name: simple-fanout-example
  	annotations:
  		nginx.ingress.kubernetes.io/rewrite-target: /
  spec:
  	rules:
  	- host: myapp.com
  	  http:
  	  	paths:
  	  	- path: /analytics
  	  	  backend:
  	  	  	serviceName: analytics-service
  	  	  	servicePort: 3000
  	  	- path: /shopping
  	  	  backend:
  	  	  	serviceName: shopping-service
  	  	  	servicePort: 8080
  ```

* Multiple sub-domains or domains

  ```yaml
  apiVersion: networking.k8s.io/v1beta1
  kind: Ingress
  metadata: 
  	name: name-virtual-host-ingress
  spec:
  	rules:
  	- host: analytics.myapp.com
  	  http:
  	  	paths:
  	  	  backend:
  	  	  	serviceName: analytics-service
  	  	  	servicePort: 3000
  	- host: shopping.myapp.com
  	  http:
  	  	paths:
  	  	  backend:
  	  	  	serviceName: shopping-service
  	  	  	servicePort: 8080
  ```

  * Instead of 1 host and multiple path, you have now multiple hosts with 1 path. Each host represents a subdomain.

* Configuring TLS certificate 

  ```yaml
  apiVersion: networking.k8s.io/v1beta1
  kind: Ingress
  metadata: 
  	name: tls-example-ingress
  spec:
  	tls:
  	- hosts:
  	  - myapp.com
  	  secretName: myapp-secret-tls
  	rules:
  	- host: myapp.com
  	  http:
  	  	paths:
  	  	- path: /
  	  	  backend:
  	  	  	serviceName: myapp-internal-service
  	  	  	servicePort: 8080
  ```

  And in the secret:

  ```yaml
  apiVersion: v1
  kind: Secret
  metadata:
  	name: myapp-secret-tls
  	namespace: default
  data:
  	tls.crt: base64 encoded cert
  	tls.key: base64 encoded key
  type: kubernetes.io/tls
  ```

  The data keys need to be `tls.crt` and `tls.key`. Their values are file contents, not file paths/location. The secret component must be in the same namespace as the Ingress component. 



### Helm - Package manager

#### What is Helm?

* Package manager for Kubernetes
* To package YAML files and distribute them in public and private repositories



#### What are Helm charts? 

* Bundle of YAML files
  * You can create your own Helm Charts with Helm
  * For example, charts for database apps and monitoring apps are already available so you can reuse that configuration
  * You can also share charts
    * Via public repositories or private ones

* Helm is also a templating engine

  * When you try to make many Deployment and Service configurations which are almost the same. 

  * An example of template YAML configuration file

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
    	name: {{ .Values.name }}
    spec:
    	containers:
    	- name: {{ .Values.container.name }}
    	  image: {{ .Values.container.image }}
    	  port: {{ .Values.container.port s}}
    ```

    You then can you a file `values.yaml` to create pod:

    ```yaml
    name: my-app
    container:
    	name: my-app-container
    	image: my-app-image
    	port: 9001
    ```

    * The `.Value` is
      * object, which is created based on the values defined either via yaml file or with `--set` flag in command line. 

  * Practical for CI/CD

    * In your build you can replace the value on the fly

* Another use case for Helm features
  * Same applications across different environments



#### Helm chart strucutre

* Directory structure
  * Top level folder name is the name of chart
  * `Chart.yaml` contains meta info about chart
  * `values.yaml` contains values for the template files
    * Template files will be filled with the values from `values.yaml`. 
  * `charts` folder contains chart dependencies
  * `template` folder contains the actual template files
  * Optionally other files like `Readme` or license file
* Values injection into template files
  * With default `values.yaml` file
  * Or with your own `my-values.yaml` file
  * Or on command line



#### What is Tiller?

* Release management
  * Whenever you create or change deployment. The Tiller will store a copy of the configuration.
  * Thus keeping track of all chart executions.
* Downsides of Tiller
  * Tiller has too much power inside of K8s cluster
  * Security issue
  * In Helm 3 Tiller got removed. It solves the security concern. 



### Volumnes - Persisting data in K8s

* No data persistence out of the box for K8s. You need to configure that.

  

#### Storage requirement

* You need a storage that doesn't depend on the pod lifecycle. 
* Storage must be available on all nodes.
* Storage needs to survive even if cluster crashes.



#### How to persist data in Kubernetes using volumes

* Persistent volume

  * A cluster resource

  * Created via YAML file

    * `kind: PersistentVolume`
    * `spec`: e.g. how much storage

  * Needs actual physical storage, like nfs server, cloud-storage.

    * Where does this storage come from and who makes it available to the cluster?
      * It is an external plugin to your cluster
      * You need to create and manage them by yourself

  * Persistent volume YAML example with NFS storage

    ```yaml
    apiVersioin: v1
    kind: PersistentVolume
    metadata:
    	name: pv-name
    spec:
    	capacity:
    		storage: 5Gi
    	volumeMode: Filesystem
    	accessModes:
    	  - ReadWriteOnce
    	persistentVolumeReclaimPolicy: Recycle
    	storageClassName: slow
    	mountOptions:
    	  - hard
    	  - nfsvers=4.0
    	nfs:
    	  path: /dir/path/on/nfs/server
    	  server: nfs-server-ip-address
    ```

  * Persistent volume YAML example with local storage

    ```yaml
    apiVersion: v1
    kind: PersistentVolume
    metadata:
    	name: example-pv
    spec:
    	capacity:
    		storage: 100Gi
    	volumeMode: Filesystem
    	accessmodes:
    	- ReadWriteOnce
    	persistentVolumeReclaimPolicy: Delete
    	storageClassName: local-storage
    	local: 
    		path: /mnt/disks/ssd1
    	nodeAffinity:
    		required:
    			nodeSelectorTerms:
    			- matchExpressions:
    			  - key: kubernetes.io/hostname
    			    operator: In
    			    values: 
    			    - example-node
    ```

  * Depending on storage type, spec attributes differ. 

  * Persistent volumes are NOT namespaced.

    * Accessible to the whole cluster. 

  * Local vs. Remote volume types

    * Each volume type has it's own use case
      * Local volme type violate 2. and 3. requirement for data persistence
        * Being tied to 1 specific node
        * Surviving cluster crashes
      * For DB persistence use remote storage

* Storage class



#### Who creates the Persistent Volumes and when?

* PV are resources that need to be there BEFORE the Pod that depends on it is created. 

* K8s admin sets up and maintains the cluster.

  * Storage resource is provisioned by Admin.
  * Admin creates the PV components from some storage backends

* K8s user deploys applications in cluster.

  * Application has to claim the PV with Persistent Volume Claim (pvc)

  * Claims must be in the same namespace as the Pod using it.

  * An example of PVC

    ```yaml
    kind: PersistentVolumeClaim
    apiVersion: v1
    metadata:
    	name: pvc-name
    spec:
    	storageClassName: manual
    	volumeMode: Filesystem
    	accessModes:
    	  - ReadWriteOnce
    	resources:
    	  requests:
    	    storage: 10Gi
    ```

    Use that PVC in Pods configuration

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata: 
    	name: mypod
    spec:
    	containers:
    	  - name: myfrontend
    	    image: nginx
    	    volumeMounts:
    	    - mountPath: "/var/www/html"
    	      name: mypd
    	volumes: 
    	  - name: mypd
    	    persistentVolumeClaim:
    	      claimName: pvc-name
    ```

* Levels of Volume abstractions

  * Pod requests the volume through the PV claim
  * Claim tries to find a volume in cluster
  * Volume has the actual storage backend
    * Volume is mounted into Container
    * Volume is mounted into the Pod



#### Storage class

* Storage class provisions Persistent Volumes dynamically whenever PersistentVolumeClaim claims it. 

* For example:

  ```yaml
  apiVersion: storage.k8s.io/v1
  kind: StorageClass
  metadata: 
  	name: storage-class-name
  provisioner: kubernetes.io/aws-ebs
  parameters:
  	type: io1
  	iopsPerGb: "10"
  	fsType: ext4
  ```

  * StorageBackend is defined in the Storage class component
    * Via `provisioner` attribute
    * Each storage backend has own provisioner
    * Internal provisioner - `kubernetes.io`

* Another abstraction level

  * Abstracts underlying storage provider
  * Abstracts parameters for that storage

* Usage:

  * Requested by PVC. For example in PVC config:

    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
    	name: mypvc
    spec: 
    	accessModes:
    	- ReadWriteOnce
    	resources:
    		requests:
    			storage: 100Gi
        storageClassName: storage-class-name
    ```

    



### K8s StatefulSet - Deploying stateful apps

#### StatefulSet for stateful applications

* Stateful applications
  * For example, databases
  * Applications that stores data
  * Update data based on previous state
  * Query data 
  * Depends on most up-to-date data/state
* Stateless applications
  * Don't keep record of state
  * Each request is completely new
  * Pass-through for data query/update



#### Deployment of stateful and stateless applications

* Stateless applications are deployed using Deployment component
  * Replicated pods are identical and interchangable
  * Created in random order with random hashes
  * One Service that load balances to any Pod
* Stateful applications are deployed using StatefulSet component 
  * Replicating stateful applications is more difficult and having other requirements
  * Can't be created/deleted at same time
  * Can't be randomly addressed
  * Replica Pods are not identical
    * Requires Pod identity
      * Sticky identity for each pod
      * Created from same specification, but not interchangeable
      * Persistent identifier across any re-scheduling
      * Identities are required because in a large scale database applications, each Pod may have their own database. But the data needs to be synchronized. 
        * Better to have persistent volume not tied to specific node than one common storage
    * StatefulSet pods get fixed orderedd names
  * For example, a StatefulSet with 3 replica. Next Pod is only created, if previous is up and running. Deletion happens in reverse order, starting from the last Pod. 
  * 2 Pod endpoints
    * Each Pod gets its own DNS endpoint from Service
    * 2 characteristics: a predictable pod name and fixed individual DNS name
      * When Pod restarts, its IP address changes, but name and endpoint stays same
  * It is complex to replicate stateful apps. Kubernetes helps you. You still need to do a lot.
    * Configuring the cloning and data synchronization
    * Make remote storage available
    * Managing and back-up
  * Stateful applications not perfect for containerized environments





### K8s Services

#### What is a Service and when we need it?

* Each Pod has its own IP address
  * Pods are ephemeral - they are destroyed frequently
* Service:
  * Stable IP address
  * Load balancing
  * Loose coupling
  * Within & outside cluster



#### `ClusterIP` Services

* Default type
* It is not a process, just an abstraction of a IP address
* Which Pods to forward the request to? 
  * Pods are identified via `selector`
  * Key value pairs
  * Labels of pods
* Which port to forward request to?
  * Ports are identified via `targetPort` 
  * Service port is arbitrary
  * `taretPort` must match the port the container is listening at
* K8s creates Endpoint object
  * Same name as Service
  * Keeps track of, which Pods are the members/endpoints of the Service

* Headless Services

  * When client wants to communicate with 1 specific Pod directly

  * Or Pods want to talk directly with specific Pod

  * So, not randomly selected

    * Use case: Stateful applications
      * Pod replicas are not identical

    * Client needs to figure out IP addresses of each Pod
      * Option 1 - API call to K9s API server
        * Makes app too tied to K8s API
        * Inefficient
      * Option 2 - DNS Lookup
        * DNS Lookup for Service - returns single IP address (ClusterIP)

  * No cluster IP address is assigned



#### 3 Service type attributes

* `ClusterIP`
  * Default, type not needed
  * Internal service, only accessible within cluster
* `NodePort`
  * External traffic has access to fixed port on each Worker Node 
  * The port of `NodePort` is defined with `nodePort` attribute
    * Within the range 30000 - 32767
  * When we create a `NodePort` service, a `ClusterIP` service is automatically created
    * `NodePort` service is an extension of `ClusterIP` service
  * `NodePort` services is not secure
    * Configure Ingress or LoadBalancer for production environments
* `LoadBalancer`
  * Becomes accessible externally through cloud providers load balancer
  * `NodePort` and `ClusterIP` services are created automatically when we create a `LoadBalancer` service
    * `LoadBalancer` service is an extension of `NodePort` service


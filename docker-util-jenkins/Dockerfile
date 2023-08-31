FROM jenkins/jenkins:lts
USER root

# Inside the new Jenkins container, allow any user (a) to execute (+s) docker 
RUN mkdir -p /tmp/download && \
 curl -L https://download.docker.com/linux/static/stable/x86_64/docker-18.03.1-ce.tgz | tar -xz -C /tmp/download && \
 rm -rf /tmp/download/docker/dockerd && \
 mv /tmp/download/docker/docker* /usr/local/bin/ && \
 rm -rf /tmp/download && \
 groupadd -g 999 docker && \
 usermod -aG staff,docker,daemon jenkins \
 chmod -v a+s /usr/local/bin/docker

USER jenkins

FROM node

USER 0
RUN mkdir "/.npm"


RUN chgrp -R 0 "/.npm" && \
    chmod -R g=u "/.npm"

WORKDIR /kryptochain
ADD . /kryptochain
RUN npm install

ENV HTTP_PORT=3001
ENV P2P_PORT=5001
ENV PEERS=

EXPOSE $HTTP_PORT

# EXPOSE $P2P_PORT


CMD HTTP_PORT=$HTTP_PORT P2P_PORT=$P2P_PORT PEERS=$PEERS npm start
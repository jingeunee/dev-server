FROM node:14-buster-slim

RUN apt-get update && apt-get install -y libaio1 wget unzip

WORKDIR /opt/oracle

RUN wget https://download.oracle.com/otn_software/linux/instantclient/1915000/instantclient-basiclite-linux.x64-19.15.0.0.0dbru.zip && \
    unzip instantclient-basiclite-linux.x64-19.15.0.0.0dbru.zip && rm -f instantclient-basiclite-linux.x64-19.15.0.0.0dbru.zip && \
    cd /opt/oracle/instantclient* && rm -f *jdbc* *occi* *mysql* *mql1* *ipc1* *jar uidrvci genezi adrci && \
    echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

COPY ./wellet /opt/oracle/instantclient_19_15/network/admin

WORKDIR /app

# `/app/node_modules/.bin`을 $PATH 에 추가
ENV PATH /app/node_modules/.bin:$PATH

COPY ./dist ./dist
COPY ./package.json ./package.json
COPY .env /app/.env

RUN npm install --silent

EXPOSE 8080

CMD ["node", "dist/main.js"]

FROM node:12.4.0

RUN openssl version -v
RUN uname -a
RUN echo $POSTGRESQL_URL

ADD ./ /opt/app
WORKDIR /opt/app

USER root

RUN rm -rf node_modules \
  && npm install \
  && npm run build

USER node

ENV HOME_DIR=/opt/app \
  DEBUG=*

EXPOSE 4040

CMD ["npm", "run", "start"]
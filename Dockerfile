#base image
FROM node:16-alpine

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

#copy from to
COPY ./ ./

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
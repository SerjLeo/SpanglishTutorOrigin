FROM node:14-alpine3.14 AS front-builder

ENV NODE_ENV production

WORKDIR /front
COPY ./front/package.json ./

RUN npm install

COPY ./front ./
RUN npm run build

FROM golang:1.17.3-alpine3.14 AS back-builder

COPY . /github.com/SerjLeo/SpanglishTutorOrigin/
WORKDIR /github.com/SerjLeo/SpanglishTutorOrigin/

RUN go mod download && go get -u ./...
RUN go build -o bin/main cmd/main.go

FROM alpine:latest

WORKDIR /root/

COPY --from=0 /front/dist ./static
COPY --from=1 /github.com/SerjLeo/SpanglishTutorOrigin/bin/main .
COPY --from=1 /github.com/SerjLeo/SpanglishTutorOrigin/config.yml .

EXPOSE 80

CMD ["./main"]
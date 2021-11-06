FROM golang:1.17.3-alpine3.14 AS builder

COPY . /github.com/SerjLeo/SpanglishTutorOrigin/
WORKDIR /github.com/SerjLeo/SpanglishTutorOrigin/

RUN go mod download
RUN go build -o bin/main cmd/main.go

FROM alpine:latest

WORKDIR /root/

COPY --from=0 /github.com/SerjLeo/SpanglishTutorOrigin/bin/main .
COPY --from=0 /github.com/SerjLeo/SpanglishTutorOrigin/static/ ./static

EXPOSE 80

CMD ["./main"]
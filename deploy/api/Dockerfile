FROM golang:1.14-buster AS builder
ARG GO_PACKAGE_URL="gitlab.com/zephinzer/codepr.ac"
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y make upx
WORKDIR /go/${GO_PACKAGE_URL}/
COPY . /go/${GO_PACKAGE_URL}/
RUN pwd
RUN make api_deps
RUN make api_production
RUN make compress

FROM gcr.io/distroless/base-debian10 AS executable
ARG GO_PACKAGE_URL="gitlab.com/zephinzer/codepr.ac"
ARG GIT_COMMIT="unknown_commit"
ARG GIT_REPO_URL="https://gitlab.com/zephinzer/codepr.ac"
ARG GIT_TAG="unknown_tag"
ARG TIMESTAMP="unknown_timestamp"
ARG MAINTAINER="unknown_maintainer"
ARG CMD_NAME="example"
LABEL go_package_url "${GO_PACKAGE_URL}"
LABEL git_commit "${GIT_COMMIT}"
LABEL git_repo_url "${GIT_REPO_URL}"
LABEL git_tag "${GIT_TAG}"
LABEL timestamp "${TIMESTAMP}"
LABEL maintainer "${MAINTAINER}"
COPY --from=builder /go/${GO_PACKAGE_URL}/bin/${CMD_NAME}_linux_amd64 /entrypoint
COPY --from=builder /go/${GO_PACKAGE_URL}/bin/${CMD_NAME}_linux_amd64.sha256 /entrypoint.sha256
WORKDIR /
ENTRYPOINT ["/entrypoint", "start"]

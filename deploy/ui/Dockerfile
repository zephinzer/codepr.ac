FROM node:12-alpine AS builder
ARG REACT_APP_API_URL_BASE=http://localhost:30000
RUN apk update --no-cache
RUN apk upgrade --no-cache
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build

FROM nginx:1.19-alpine AS executable
RUN apk update --no-cache
RUN apk upgrade --no-cache
ARG GIT_COMMIT="unknown_commit"
ARG GIT_REPO_URL="https://gitlab.com/zephinzer/codepr.ac"
ARG GIT_TAG="unknown_tag"
ARG TIMESTAMP="unknown_timestamp"
ARG MAINTAINER="unknown_maintainer"
LABEL git_commit "${GIT_COMMIT}"
LABEL git_repo_url "${GIT_REPO_URL}"
LABEL git_tag "${GIT_TAG}"
LABEL timestamp "${TIMESTAMP}"
LABEL maintainer "${MAINTAINER}"
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/config/ui/nginx/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]

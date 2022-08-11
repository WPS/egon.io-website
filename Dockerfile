FROM ruby:3-alpine

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /srv/jekyll

RUN apk add --no-cache \
  g++ \
  make \
  libc6-compat

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

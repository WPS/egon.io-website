FROM ruby:3

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /srv/jekyll

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

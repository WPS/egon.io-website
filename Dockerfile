FROM jekyll/jekyll:4.0

WORKDIR /srv/jekyll

COPY docs/Gemfile .
COPY docs/Gemfile.lock .

RUN bundle install

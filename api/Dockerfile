FROM ruby:3.1.2
RUN apt-get update && apt-get install -y nodejs npm && npm i -g yarn
WORKDIR /app
COPY . .
RUN bundle install
CMD ["rails", "s", "-b", "0.0.0.0"]
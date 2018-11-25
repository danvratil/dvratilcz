FROM alpine:3.7

RUN apk add --update \
    python3 \
    libffi \
    uwsgi-python3

RUN apk add --update \
    --virtual build-dependencies \
    python3-dev \
    py3-pip \
    build-base \
    libffi-dev

RUN pip3 install isso

RUN apk del build-dependencies && rm -rf /var/cache/apk/*

EXPOSE 3032

COPY isso.cfg /etc/isso.cfg

CMD [ "uwsgi", "--socket", "0.0.0.0:3032", \
               "--uid", "uwsgi", \
               "--plugins", "python3", \
               "--protocol", "uwsgi", \
               "--env", "ISSO_SETTINGS=/etc/isso.cfg", \
               "--wsgi", "isso.run" ]

FROM alpine:3.7

RUN apk add --update \
    python3 \
    libffi \
    uwsgi-python3 \
    uwsgi-spooler

RUN apk add --update \
    --virtual build-dependencies \
    python3-dev \
    py3-pip \
    build-base \
    libffi-dev

RUN pip3 install flask==1 werkzeug==0.16.1 isso

RUN apk del build-dependencies && rm -rf /var/cache/apk/*

EXPOSE 3032

COPY isso.conf /etc/isso.conf

# Hack: disable use of uwsgi spooler to send email notifications from Isso,
# because the current version of uwsgi that we have doesn't work. Instead,
# force Isso to behave as if used in some other way than through uwsgi
COPY disable-spooler.patch /root/disable-spooler.patch
WORKDIR /usr/lib/python3.6/site-packages/isso/ext/
RUN patch -p1 -i /root/disable-spooler.patch

WORKDIR /root

RUN mkdir -p /var/spool/uwsgi

CMD [ "uwsgi", "--socket", "0.0.0.0:3032", \
               "--uid", "uwsgi", \
               "--plugins", "python3", \
               "--protocol", "uwsgi", \
               "--spooler", "/var/spool/uwsgi", \
	       "--logto", "/var/log/isso/uwsgi.log", \
               "--env", "ISSO_SETTINGS=/etc/isso.conf", \
               "--module", "isso.run" ]

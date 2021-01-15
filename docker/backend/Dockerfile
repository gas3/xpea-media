FROM python:3.8.3-alpine

WORKDIR /app
ADD ./backend/server/requirements.txt /app/backend/server/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/server/requirements.txt

ADD ./backend /app/backend
ADD ./docker /app/docker
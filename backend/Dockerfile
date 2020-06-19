FROM python:3.6.1-alpine
WORKDIR /empatica_BE
ADD . /empatica_BE
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install -r requirements.txt
CMD ["python","app.py"]
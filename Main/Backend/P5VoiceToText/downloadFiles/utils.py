from boto3.session import Session

ACCESS_KEY='AKIARH6IQHSVXUVLENNE'
SECRET_KEY='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'

session = Session(aws_access_key_id=ACCESS_KEY,
                  aws_secret_access_key=SECRET_KEY)
s3 = session.resource('s3')
your_bucket = s3.Bucket('voicetotextsourcefile')

for s3_file in your_bucket.objects.all():
    print(s3_file.key)
# WDCproj

Initial Run:
npm install

Start:
npm start

Uploaded ZIP contains premade https certificates, if not included, run these commands from the "bin" folder:
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

"key.pem", "csr.pem" and "cert.pem" should exist in the bin folder

data folder contains SQL database as well as backup database
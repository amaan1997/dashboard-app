Clone the repo using following command 
git clone https://github.com/flirtman/biramedia.com.git

For frontend code

cd client

npm install

npm start

For backend code(Other terminal)

cd server

composer install

Please create an env file()

php artisan migrate


php artisan db:seed(This will create admin user in db)

php artisan jwt:secret

php artisan serve

Admin login credentials
email-ilia.svinin@gmail.com
password-ilia123


.env 
APP_NAME=BiraMedia
APP_ENV=local
APP_KEY=base64:WfFpdUjVgd+Qe1HNw0j2zbQ3fsfqAOXFu9nqkrFWeR0=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=biramedia
DB_USERNAME=root
DB_PASSWORD=


BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=biramediagroup@gmail.com
MAIL_PASSWORD=lrtskngkhkonaekk
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=biramediagroup@gmail.com
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

JWT_SECRET=d5FamUfgZ7B7mIVGgmOqMscCWRJux7FjphgRO6zAcWTDzsUYnpqRZbtDhmBvChC2

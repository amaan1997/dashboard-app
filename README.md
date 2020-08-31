Clone the repo using following command git clone https://github.com/flirtman/biramedia.com.git

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

Admin login credentials email-ilia.svinin@gmail.com password-ilia123

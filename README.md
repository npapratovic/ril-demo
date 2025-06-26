# ril-demo
React Inertia Laravel 12 - RIL STACK demo app

#Installation

1) `git clone https://github.com/npapratovic/ril-demo.git`
2) `cd ril-demo`
3) `composer install`
4) `cp .env.example .env`
5) change database connection in `.env` file
6) `npm install`
7) `npm run build`
8) `php artisan key:generate`
9) `php artisan migrate --seed`
10) `composer run dev`

#Tests 

- see example: https://github.com/LaravelDaily/CRUDs-Laravel-API/blob/main/tests/Feature/TasksCRUDTest.php
- - testing tips: https://github.com/OussamaMater/Laravel-Tips/blob/main/tips/testing.md
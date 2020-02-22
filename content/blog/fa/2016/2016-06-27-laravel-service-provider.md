---
title: "ساخت منوی داینامیک در لاراول با کمک service provider"
date: "2016-06-27"
description: "ایجاد service provider در لاراول"
lang: "fa"
---

یکی از راه های ساخت منو داینامیک (یا منوی ناوبری) در لاراول استفاده از View composer در Service providerهاست. آشنایی بیشتر با، به زبان فارسی **[Service Provider](http://www.tahlildadeh.com/ArticleDetails/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-Service-Providers-%D8%AF%D8%B1-%D9%84%D8%A7%D8%B1%D8%A7%D9%88%D9%84)** سایت رسمی لاراول **[Service Provider](https://laravel.com/docs/master/providers)**

برای ساخت منو ما باید اول Service provider خودمون رو با php artisan بسازیم:

php artisan make:provider ViewComposerServiceProvider

فایل جدید در مسیر app/Providers ساخته شده، که نمونه فایل ما به این شکله:

<?php

namespace App\\Providers;

use Illuminate\\Support\\ServiceProvider;

class ViewComposerServiceProvider extends ServiceProvider
{
    /\*\*
     \* Bootstrap the application services.
     \*
     \* @return void
     \*/
    public function boot()
    {   
        $this->composeMenu();
    }

    /\*\*
     \* Register the application services.
     \*
     \* @return void
     \*/
    public function register()
    {
        //
    }

حالا در متد boot دستورات زیر رو وارد می‌کنیم:

view()->composer('includes.header', function($view)
{
$view->with('menu\_items' , \\App\\Menu::all());
});

در خط اول مشخص می‌کنیم که چه فایلی رو برای ارسال پارامتر انتخاب کردیم، در خط بعدی ما متغییر menu\_items رو تعریف کردیم که فایل مدل Menu در اون قرار می گیره.

محتویات فایل header.blade.php ما به این صورت هست:

@foreach ($menu\_items as $item)
{{ $item->title }}
@endforeach

مرحله بعد اضافه کردن Service provider به فایل config/app.php هست.

'providers' => \[
…..
App\\Providers\\ViewComposerServiceProvider::class,
….
\],

حالا برای اطمینان از لود شدن Service providerمون بهتره که دستور زیر رو توی ترمینال وارد کنیم:

php artisan config:clear

با اجرای این دستور فایل کش کانفیگ دوباره ساخته میشه.

با این کار هر بار که فایل header فراخوانی بشه به طور خودکار لاراول منوی سایتمون رو به فایل header.blade.php ارسال می‌کنه و دیگه نیازی نیست که توی کنترلر خودمون هر بار متغیری به header خودمون ارسال کنیم.

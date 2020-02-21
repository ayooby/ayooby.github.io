---
title: "ساخت سایت با دامنه شخصی و میزبانی گیت‌هاب"
date: "2016-05-24"
description: "ساخت صفحه شخصی با استفاده از گیتهاب"
lang: "fa"
---

چطور می‌شه یک دامنه شخصی مثل ayooby.ir رو به صفحه گیت‌هابتون متصل کنید و یه سایت شخصی که توسط گیت‌هاب میزبانی می‌شه بسازید؟

**اول لازمه برخی از مزایای صفحات گیت‌هاب رو بدونید:**

- حجم فایل‌ها می‌تونه تا یک گیگابایت باشه.
- می‌تونید سایتتون رو با دستورات گیت آپدیت کنید.
- سایت شما متن‌باز هست و به نوعی رزومه کاری شما می‌شه.
- امکان استفاده از سیستم بلاگ‌های استاتیک مثل Jekyll که باهاشون می‌شه یه وبلاگ استاتیک رو راه‌اندازی کرد وجود داره.
- و کلی مزیت دیگه که باید خودتون استفاده کنید تا متوجهشون بشید.

خوب بریم سراغ شیوه انجام کار:

گام اول: کلون مخزنی (Repository)که با نام کاربری شما در گیت‌هاب ساخته شده با دستور زیر:

git clone https://github.com/username/username.github.io

وارد شدن به فولدری که ساختید و ایجاد یه فایل index.html جهت تست

cd username.github.io
echo "Hello World" > index.html

کامیت کردن تغییرات و پوش به گیت هاب

git add --all
git commit -m "Initial commit"
git push -u origin master

مرحله اول ساخت صفحه انجام شد. تبریک می‌گم شما می‌تونید با رفتن به آدرس http://username.github.io وارد سایت خودتون بشید.

**گام دوم: اتصال یک دامنه به این پیج هست که برای اتصال دامنه باید:**

فایلی رو ایجاد کنید که به دامین شما اشاره داره، برای اینکار از دستورات زیر استفاده کنید:

echo "ayooby.ir" > CNAME
git add --all
git commit -m "Add CNAME"
git push -u origin master

برای اطمینان از درست کار کردن دامنه متصل شده به صفحه‌تون می‌تونید از صفحه تنظیمات گیت‌هاب استفاده کنید.

 

برای دیدن دامنه اضافه شده، انتهای صفحه تنظیمات می‌تونید دامنه‌های اضافه شده رو ببینید:

![بررسی دامنه اضافه شده در گیت هاب](http://www.ayooby.ir/wp-content/uploads/2016/05/pasted-image-0-1024x465.png)

 

![بررسی دامنه اضافه شده به گیت هاب پیج](http://www.ayooby.ir/wp-content/uploads/2016/05/pasted-image-0-1-1024x385.png)

گام سوم: تنظیم DNS در سایت‌هایی مثل [NameCheap.com](http://namecheap.com) هست که خدمات رایگان ارائه می‌کنند.

بعد از ثبت‌نام و ورود به حساب کاربری خودتون از منو [Domains>>FreeDNS](https://www.namecheap.com/domains/freedns.aspx) رو انتخاب کنید و تو صفحه باز شده در فیلد مورد نظر آدرس دامنه خودتون رو وارد کنید و به سبد خرید اضافه‌اش کنید:

![name-cheap-adddns](http://www.ayooby.ir/wp-content/uploads/2016/05/pasted-image-0-2-146x300.png)

 

![اضافه کردن دامنه به سایت ](http://www.ayooby.ir/wp-content/uploads/2016/05/pasted-image-0-3-300x163.png)

**ایجاد رکورد جدید در[Domains List](https://ap.www.namecheap.com/Domains) و انتخاب دامنه اضافه شده به لیست و وارد کردن اطلاعات لازم**

بعد از اضافه شدن دامنه، روی تنظیمات دامنه مورد نظرتون کلیک کنید، تب آخر یعنی Advanced DNS رو انتخاب کنید و رکوردهای زیر رو وارد کنید:

 

TTL

Value

Host

Type

Automatic

ayooby.github.io

@

CNAME Record

30 Min

ayooby.github.io

www

CNAME Record

و در آخر باید به سایتی که دامنتون رو از اون خریداری کردید مثل nic.ir برید و آدرس‌های زیر رو وارد کنید:

freedns1.registrar-servers.com

freedns2.registrar-servers.com

freedns3.registrar-servers.com

freedns4.registrar-servers.com

همه چیز حله، فقط کافیه یک روز دیگه صبر کنید تا DNS‌های جدید رجیستر بشن.

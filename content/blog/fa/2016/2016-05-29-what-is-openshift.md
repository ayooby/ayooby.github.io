---
title: "چطور با اوپن شیفت شروع به کار کنیم"
date: "2016-05-29"
description: "اپن شیف سرویس های ابری، چطوری یک سرویس اجرا کنیم"
lang: "fa"
---
__آپدیت__
اپن شیفت تغیرات زیاد داشته و این مطلب کمی قدیمی حساب میشه

اپن شیفت چیست؟

اپن شیفت، [سرویس‌های بستر ابری](https://fa.wikipedia.org/wiki/%D8%B1%D8%A7%DB%8C%D8%A7%D9%86%D8%B4_%D8%A7%D8%A8%D8%B1%DB%8C) (PaaS) هست بر پایه ردهت (Red Hat) که به برنامه نویسان این امکان رو میده کدهاشون رو سریع‌تر و راحت‌تر بروی سیستم‌های پردازش ابری گسترش بدهند.

اوپن‌شیفت برای چه کسانی مناسب هست؟

اپن‌شیفت برای دولوپرها بهترین استفاده رو داره ولی خب چون امکان ssh هم داره برای مقاصدی بیشتر از اجرای کدها میشه داشت.

خلاصه امکاناتی که برای سرویس های رایگان قرار گرفته:

1. امکان ساخت تا سه برنامه ( ماشین یا سرور مجازی)
2. اختصاص 1GB فضا برای هر برنامه
3. قابلیت ssh به هر برنامه

برای اطلاعات بیشتر می تونید به [مشخصات سرویس ها](https://www.openshift.com/pricing/plan-comparison.html) مراجعه کنید.

چه سرویس هایی اپن‌شیفت ارایه میکنه؟

تقریبا همه چیز!

بعنوان مثال، بخشی کوچک از سرویس‌هایی که میشه با اپن شیفت راه اندازی کرد رو براتون در اینجا معرفی می کنم:

- [Laravel 5.0 ](https://hub.openshift.com/quickstarts/115-laravel-5-0)
- [Node.js 0.10](https://hub.openshift.com/quickstarts/99-node-js-0-10)
- [Django](https://hub.openshift.com/quickstarts/72-django)
- [Go Language](https://hub.openshift.com/quickstarts/29-go-language)

جهت اطلاعات بیشتر می تونیددر [اوپن شیفت هاب](https://hub.openshift.com/) همه سرویس ها رو جستجو کنید. خیلی خب تا اینجا ما کمی آشنا شدیم با اپن‌شیفت و حالا وقت اینه که یک ماشین مجازی اجرا و بعد بتونیم با دستور SSH به سرور خودمون وصل بشیم.

شروع کار با اپن شیفت:

[ثبت نام](https://openshift.redhat.com/app/account/new)  در سایت و ورود به کنسول کاربری

[![Openshift-signup](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-14.02.53-300x219.png)](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-14.02.53.png)

ساخت [اولین نرم‌افزار در کنسول](https://openshift.redhat.com/app/console/application_types)  که من Laravel 5.0 رو انتخاب کردم.

[![Openshift-services](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.22.50-300x188.png)](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.22.50.png)

در صفحه بعدی شما باید نام برنامه تون و آدرس سورس کد و در نهایت منطقه جغرافیایی برنامه تون رو مشخص کنید.

[![Openshift-setting](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.36.32-300x212.png "Openshift-signup")](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.36.32.png)

تبریک، شما اولین برنامه خودتون رو ساختید، با رفتن به [لیست برنامه ها](https://openshift.redhat.com/app/console/applications) ، همه برنامه هاتون رو مشاهده کنید.

[![Openshift-apps](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.42.30-300x179.png)](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.42.30.png)

برای اتصال از طریق ssh به برنامه تون شما باید public key خودتون رو از طریق تنظیمات کنسول سایت وارد کنید. برای ساخت یک  public key در لینوکس و مک می تونید دستورات زیر رو در ترمینال خودتون اجرا کنید:

ssh-keygen -t rsa

در خط بعدی از شما رمزی خواسته می شه که می تونید با زدن اینتر این مرحله رو رد کنید.

Your identification has been saved in /Users/myname/.ssh/id\_rsa.
Your public key has been saved in /Users/myname/.ssh/id\_rsa.pub.
The key fingerprint is:
ae:89:72:0b:85:da:5a:f4:7c:1f:c2:43:fd:c6:44:38 myname@mymac.local
The key's randomart image is:
+--\[ RSA 2048\]----+
|                 |
|         .       |
|        E .      |
|   .   . o       |
|  o . . S .      |
| + + o . +       |
|. + o = o +      |
| o...o \* o       |

حالا شما کلید public رو ساختید و حالا می تونید با دستور زیر محتویات کلیدتون مشاهده و کپی کنید.

cat .ssh/id\_rsa.pub

 

در این مرحله ما باید کلید public خودمون رو وارد اپن شیفت کنیم، برای همین کار ابتدا وارد [تنظیمات شده](https://openshift.redhat.com/app/console/settings) و سپس بروی دکمه Add a new key کلیک کنید.

[![Openshift-setting](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.39.04-300x145.png)](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.39.04.png)

در صفحه باز شده کلیدی که قبلا کپی کردید رو وارد و یک نام دلخواه وارد کنید.

[![Openshift-publickey-add](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.45.06-300x194.png)](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.45.06.png)

با انجام این کار ما مشخص میکنیم که چه کامپیوتری اجازه وصل شدن رو داشته باشه.

 

با کلیک بروی Want to log in to your application آدرس اتصال از طریق ssh برنامه تون رو مشاهده کنید.

[![Openshift-ssh-address](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.46.19-300x267.png)](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-12.46.19.png)

ssh 569284d10c1342sffx00123@laravel-ayooby.rhcloud.com

[![Openshift-ssh-sample](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-14.01.22-1024x477.png)](http://www.ayooby.ir/wp-content/uploads/2016/05/Screenshot-2016-05-27-14.01.22.png)

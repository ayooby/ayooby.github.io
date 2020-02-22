---
title: "معرفی سرویس جستجوی Aloglia"
date: "2016-07-21"
description: "چطور با algolia یک سرچ سریع درست کنیم با استفاده از لاراول"
lang: "fa"
---

جستجو هوشمند و سریع با  Aloglia

مدتی بود که محصولات جدیدی که به فروشگاه اضافه می‌شد، در جستجوی سایت نمایش داده نمی‌شد، پس در صدد بر اومدم ببینم مشکل از چی می‌تونه باشه، تا اینکه رسیدم به این که فروشگاه ما ازAlgolia استفاده می کنه و خب باعث شد از این سرویس باحال بیشتر بدونم.

روش کار Algolia:

روش کارکرد Algolia به این صورت هست که شما باید اطلاعاتی رو که مایل هستید در اون جستجو بشه باید  با استفاده از [RESTful](https://en.wikipedia.org/wiki/RESTful) [JSON](https://en.wikipedia.org/wiki/JSON) API به اکانت Algolia خودتون ارسال کنید. بعد از ارسال اطلاعات کافیه در سایت یا اپ خودتون با api ها اطلاعات رو با سرعتی بسیار عالی جستجو کنید.

> یکی از علت های سریع بودن Algolia در استفاده از CDN های مختلفی هست که در مکان های مختلف دنیا قرار داده است.

مزیت Algolia به نسبت Elastic Search:

در [وبلاگ Algolia](https://blog.algolia.com/full-text-search-in-your-database-algolia-versus-elasticsearch/)  می‌تونید مقایسه این دو سیستم جستجو رو بخونید، من چند تا از نتیجه های تست رو برای شما قرار دادم .

[![algolia-performance](http://www.ayooby.ir/wp-content/uploads/2016/07/algolia-performance-1024x584.png)](http://www.ayooby.ir/wp-content/uploads/2016/07/algolia-performance.png)

 

برای چه زبان‌هایی API Client داره:

[![algolia-apis](http://www.ayooby.ir/wp-content/uploads/2016/07/algolia-apis-1024x144.png)](http://www.ayooby.ir/wp-content/uploads/2016/07/algolia-apis.png)

 

و البته ناگفته نمونه که  پلاگین‌هایی هم برای ورد پرس، مجنتو داره!

[سایت مستندات Algolia](https://www.algolia.com/doc/)

استفاده Algolia در لاراول:

کافیه که شما پکیج رسمی رو با composer نصب کنید

composer require algolia/algoliasearch-laravel

بعد از نصب به service provider اضافه ش کنید:

AlgoliaSearch\\Laravel\\AlgoliaServiceProvider::class

و بعد دستور زیر رو با php artisan اجرا کنید که فایل های این پکیج کپی بشه در کانفیگ‌هامون:

php artisan vendor:publish 

حالا config/algolia.php رو باز کنید و تنظیمات api key رو انجام بدید.

 

تا اینجا پکیج لاراول Algolia نصب شده و آماده به کار هست کافیه که Algolia رو در مدلی که می خواهید اطلاعات اون مدل قابل جستجو باشه استفاده کنید. توی مثال زیر مدل Contact رو برای جستجوی Algolia آماده کردیم

use Illuminate\\Database\\Eloquent\\Model;
use AlgoliaSearch\\Laravel\\AlgoliaEloquentTrait;

class Contact extends Model
{
   use AlgoliaEloquentTrait;
}

 

تمامی کاری که باید انجام بدید همین دو خط اضافه کردن به مدلتون هست، حالا شما هر رکورد جدید به مدل اضافه کنید، به  Algolia  اضافه میشه، طبعا برای حذف، حذف میشه و برای ویرایش هم به روز میشه.

> این پکیج بطور خودکار اسم مدل رو به عنوان اندیس یا index در نظر می گیره و در اکانت شما، اطلاعات مدل رو ارسال میکنه.

[![algolia-index-recds](http://www.ayooby.ir/wp-content/uploads/2016/07/algolia-index-recds-1024x418.png)](http://www.ayooby.ir/wp-content/uploads/2016/07/algolia-index-recds.png)

خب تا اینجا اطلاعات ذخیره شد ولی برای جستجو در اطلاعات می تونید از [کتابخونه جاوا اسکریپتی](https://github.com/algolia/algoliasearch-client-js) رسمی هم استفاده کنید که کلی آموزش داره و هر کسی می تونه استفاده کنه.

عملکرد algolia در ۲۴ ساعت گذشته (سرویس Starter )و زمان های پاسخ :

[![algolia-data-reports](http://www.ayooby.ir/wp-content/uploads/2016/07/algolia-data-reports-1024x1000.png)](http://www.ayooby.ir/wp-content/uploads/2016/07/algolia-data-reports.png)

در این پست من سعی کردم یک آشنایی جزیی با  Algolia  داشته باشیم و خیلی مطالب بیشتری میشه گفت، چیزی که بیشتر از هر چیزی من رو مجذوب خودش کرده بود api خیلی عالی  Algolia  بود. حتما برای جنبه فان هم شده با این سرویس کار کنید.

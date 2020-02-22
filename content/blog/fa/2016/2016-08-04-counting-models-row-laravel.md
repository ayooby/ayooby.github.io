---
title: "شمارش در مدل"
date: "2016-08-04"
description: "چطوری سطرهای یک جدول رو با لاراول شمارش کنیم؟"
lang: "fa"
---

چطوری میشه تعداد سطرهای مدلمون رو شمرد؟

خب خیلی ساده با استفاده از:

Customer::all()->count()
Customer::get()->count()

خب این دستور درسته جواب میده ولی بعد از اجرای دستور زیر دقیقا این اتفاق می افته:

SELECT \* from customers;

برای تست من جدول customers رو با همین دستور اجرا کردم و زمان زیر رو بدست آوردم

76199 rows in set (0.13 sec)

شاید زمان زیادی نباشه ولی خیلی بهتر هست که دستور رو بشکل زیر استفاده کنیم:

Customer::count()

SELECT count(\*) FROM customer; //دستوری که در اصل اجرامیشه

بعد از اجرای این دستور زمان اجرا خیلی جالب میشه.

mysql> select count(\*) from customers;
+----------+
| count(\*) |
+----------+
|    76199 |
+----------+
1 row in set (0.00 sec)

[**منبع**](https://medium.com/@petehouston/laravel-fact-get-model-count-d541c8b81644#.navr5vge9)

---
title: "ترفند یا هک ساده برای برنامه ایرانسل من (گردونه شانس)"
date: "2019-10-19"
description: "چطور میشه برنامه ایرانسل من رو هک کنیم و هر روز احتمال جایزه گرفتن رو ببریم بالا"
lang: "fa"
---

ایرانسل من (اپلیکیشن ایرانسل) یه بخشی داره که با زدن دکمه اش براتون بصورت شانسی یه جایزه در نظر میگیره که تقریبا در ۹۰ درصد مواقع هیچ چیزی نصیب شما نمیشه.

برای انجام این بازی باید شما هر روز اپلیکیشن رو باز کنید و روی جایزه بزنید و منتظر باشید که شاید برنده بشید و این سیستم فقط روزی یکبار قابل انجام هست. (بیشتر خواستند که این یه تشویقی باشه برای سر زدن به برنامه ایرانسل من)

![](https://ayooby.ir/wp-content/uploads/2019/10/IMG_AD7D6DFE0D93-1-576x1024.jpeg)

ولی خب یه برنامه نویس باید کاری که اگه قراره دستی انجام بشه بیش از دو سه بار رو اتوماتیک کنه. پس توی آموزش زیر من روش اتوماتیک کردن این پروسس رو براتون میگم که از پروکسی کردن گوشی و مشاهده تمام دستورات ارسالی توسط گوشی هست که بعدا بفهمیم که روش کار این قرعه کشی چطوریه.

## نصب برنامه

برای شروع شما باید برنامه [https://mitmproxy.org](https://mitmproxy.org/) رو نصب کنید و اجرا کنید.

![](https://mitmproxy.org/screenshot.png)

## اجرای ترفند

توی تنظیمات گوشی وارد قسمت proxy بشید و ip سیستمتون رو وارد کنید. من در اینجا آدرس ip رو وارد گوشی کردم

![](https://ayooby.ir/wp-content/uploads/2019/10/IMG_855DDBD3F0DE-1-576x1024.jpeg)

مرحله بعدی اجرای برنامه ایرانسل من هست و تک تک خروجی ها رو مشاهده کنید. توی این بخش ما میبینم که بیشتر دستورات به API ایرانسل هست.

![](https://ayooby.ir/wp-content/uploads/2019/10/Screen-Shot-2019-10-19-at-21.14.34-1024x528.png)

خب آدرس گردونه شانس ما مشخص شده

[https://my.irancell.ir/myirancellapi/game/getgameoffer?language=fa](https://my.irancell.ir/myirancellapi/game/getgameoffer?language=fa)

فقط کافیه که ما یک دستور GET با HEADER مشخص شده هر روز توی یک ساعت مشخص ارسال کنیم به این آدرس. مثلا cronjob میتونی کمک کنه به ما.

برای اجرای این کار این دستور رو توی یک فایل ذخیره کنید

import requests

def get\_my\_reward():
    requests.get(
        "https://my.irancell.ir/myirancellapi/game/getgameoffer",
        headers={
            "Authorization": "JWT {YOUR\_TOKEN}"
        }
    )

if \_\_name\_\_ == "\_\_main\_\_":
    get\_my\_reward()

و بعد توی crontab میتونید این فایل رو روزی یکبار فراخوانی کنید:

0 1 \* \* \* /usr/bin/python3 /home/user/irancell-reward.py >> ~/cron.log 2>&1
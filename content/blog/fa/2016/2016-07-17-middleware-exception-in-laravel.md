---
title: "استثنا در middleware لاراول"
date: "2016-07-17"
description: "استثنا (exception) در لاراول و middleware"
lang: "fa"
---

استثنا در middleware لاراول:

این هفته در حال توسعه یک پکیج جدید لاراول بودم، به مشکلی برخوردم که هر چند راه حل خیلی ساده داشت ولی خب همین راه حل ساده چند ساعتی ذهنم رو مشغول کرده بود. برای همین تصمیم گرفتم توی یک پست کوتاه مشکل و راه حل رو بنویسم.

کاری که قرار بود انجام بشه این بود که، یک بخش از سایت رو برای کاربران مهمان نمایش باز باشه و نیازی به لاگین بشه، به زبان ساده تر، من باید کاری کنم که وقتی متد 'showToGuest' اجرا شد بتونه middleware auth رو دور بزنه و مجوز عبور داشته باشه.

برای ایجاد این چنین استثناهایی کافیه شما در کنترلرتون از روش زیر، در construct استفاده کنید:

class UserController extends Controller {
public function \_\_construct()
{

$this->middleware('auth', \['except' => 'showToGuest'\] );

}

public function showToGuest ()
{
Return 'Hello Guest!';
}

در این مثال ما توی تابع construct مشخص می کنیم که یک استثنا در این کنترلر داریم متد middleware دو تا ورودی گرفته، که اولین ورودی مربوط به نام middleware هست که قرار ما از اون عبور کنیم و ورودی دوم متدهایی هست که مجوز عبور دارند، که می تونه بیش از یک متد باشه، توجه داشته باشید که باید نام متد وارد بشه نه URL \[ کاری که من در ابتدا کرده بودم :| \].

حالا هربار showToGuest فراخوانی بشه بدون هیچ مشکلی از middleware عبور می کنه.

 

![you_shall_not_pass_by_entroz-d5gjs4j](http://www.ayooby.ir/wp-content/uploads/2016/07/you_shall_not_pass_by_entroz-d5gjs4j.png)

---
title: "بهترین پکیج لاراول برای برنامه نویس های تنبل!"
date: "2016-06-17"
description: "ساخت یک پروژه CRUD با کتابخانه rapyd و لاراول"
lang: "fa"
---

اگر شما مایل به استفاده از (CRUD (Create/Read/Update/Delete در پروژه خودتون هستید، پکیج rapyd می تونه بهترین گزینه برای شما باشه.

**هشدار:** استفاده از این پکیج سرعت کار پروژه شما را چند برابر می کنه و شما را بسیار تنبل تر از قبل می کنه!

نصب Rapyd از طریق Composer :

composer require zofe/rapyd

بعد از نصب باید شما در فایل config/app.php به providers این خط رو اضافه کنید:

 

Zofe\\Rapyd\\RapydServiceProvider::class,

 

برای لاراول ورژن پایین تر از5.1

 

'Zofe\\Rapyd\\RapydServiceProvider',

 

برای ساخت فایل های view پکیج دستور زیر را وارد کنید:

php artisan vendor:publish

تا اینجا پکیج rapyd برای لاراول نصب شد، حالا بریم سراغ چند مثال از چگونگی استفاده از rapyd .

پکیج rapyd برای نمایش دیتاها از DataGrid استفاده می کنه که برای نمونه، کدهای زیر قرار گرفته:

class DemoController extends Controller

....

    public function getGrid()
    {

        $grid = \\DataGrid::source(Article::with('author', 'categories'));

        $grid->add('id','ID', true)->style("width:100px");
        $grid->add('title','Title');
        $grid->add('{!! str\_limit($body,4) !!}','Body');
        $grid->add('{{ $author->fullname }}','Author', 'author\_id');
        $grid->add('{{ implode(", ", $categories->lists("name")->all()) }}','Categories');

        $grid->edit('/rapyd-demo/edit', 'Edit','show|modify');
        $grid->link('/rapyd-demo/edit',"New Article", "TR");
        $grid->orderBy('id','desc');
        $grid->paginate(10);

        $grid->row(function ($row) {
           if ($row->cell('id')->value == 20) {
               $row->style("background-color:#CCFF66");
           } elseif ($row->cell('id')->value > 15) {
               $row->cell('title')->style("font-weight:bold");
               $row->style("color:#f00");
           }
        });

        return  view('rapyd::demo.grid', compact('grid'));
    }

نمونه فایل show-grid.blade.php برای نمایش اطلاعات:

{!! Rapyd::styles() !!}

{!! $grid !!}

{!! Rapyd::scripts() !!}

در نهایت خروجی کدهای ما به این صورت میشه:

![DataGrid-ouput](http://www.ayooby.ir/wp-content/uploads/2016/06/Screenshot-2016-06-17-13.11.41-1024x577.png)

همان‌ طور که مشاهده کردید برای نمایش یک لیست از فایل ها کافیه سه خط به فایل view خودتون اضافه کنید و بقیه کارها توسط پکیج Rapyd انجام میشه.

جهت ایجاد، ویرایش و حذف اطلاعات هم می‌شه از DataEdit استفاده کرد:

class DemoController extends Controller

....

    public function anyForm()
    {
        $form = \\DataForm::source(Article::find(1));

        $form->add('title','Title', 'text')->rule('required|min:5');
        $form->add('body','Body', 'redactor');

        //belongs to
        $form->add('author\_id','Author','select')->options(Author::lists('firstname', 'id')->all());

        //belongs to many (field name must be the relation name)
        $form->add('categories','Categories','checkboxgroup')->options(Category::lists('name', 'id')->all());
        $form->add('photo','Photo', 'image')->move('uploads/demo/')->fit(240, 160)->preview(120,80);
        $form->add('color','Color','colorpicker');
        $form->add('public','Public','checkbox');

        $form->submit('Save');

        $form->saved(function () use ($form) {
            $form->message("ok record saved");
            $form->link("/rapyd-demo/form","back to the form");
        });

        return view('rapyd::demo.form', compact('form'));
    }

 

فایل view جهت نمایش فرم ویرایش:

{!! Rapyd::styles() !!}

  
      {!! $form !!}

{!! Rapyd::scripts() !!}

در نهایت نتیجه کار:

![DataForm-output](http://www.ayooby.ir/wp-content/uploads/2016/06/Screenshot-2016-06-17-15.09.11-1024x620.png)

این پست فقط جهت آشنایی مختصر با rapyd نوشته شده، برای دیدن تمامی متد های این پکیج شما می تونید به سایت دمو مراجعه و تمامی نمونه کدهای این پیکج رو مشاهده کنید.

**سایت دمو پکیج : [rapyd.com/rapyd-demo](http://www.rapyd.com/rapyd-demo/)** **گیت هاب : [github.com/zofe/rapyd-laravel](http://github.com/zofe/rapyd-laravel)**

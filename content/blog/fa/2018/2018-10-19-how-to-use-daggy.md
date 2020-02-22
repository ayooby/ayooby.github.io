---
title: "الگوی تطابقی با استفاده از daggy"
date: "2018-10-19"
description: "معماری الگو تطبیقی در ریعکت و ریعکت نیتیو"
lang: "fa"
---

\*\* بروز رسانی \*\*

جهت تکمیل این بخش ویدیویی درست کردم که میتونید از لینک های زیر مشاهده کنید یوتیوب:[ https://www.youtube.com/watch?v=3RjCiSnSN0s](https://www.youtube.com/watch?v=3RjCiSnSN0s)

آپارات: [https://www.aparat.com/v/tncIU](https://www.aparat.com/v/tncIU)

 

 

توی این پست قراره در مورد استفاده از pattern match و کتابخونه [daggy](https://github.com/fantasyland/daggy) رو یاد بگیریم و چطور میشه توی پروژه‌ هایی مثل react و react-native از اون استفاده کرد.

**مشکل if ها**

این تیکه کد خب همه ما قبلا باهاش مواجه شدیم:

render() {
if (this.state.isLoading) {
    return ...
}

if (this.state.isError) {
    return ...
}

if (this.state.isListEmpty) {
    return ...
}

return this.state.list.map(item => ...)
}

این همه دستور تو یه رندر اصلا جالب نیست.

 

**راه حل: pattern matching**

توی جاوا اسکریپ بصورت استاندارد چیزی تعریف نشده و خب ما مجبور هستیم از کتابخونه هایی مثل daggy استفاده کنیم.

**نمونه کد استفاده از daggy**

const Item = daggy.tagged('Item', \['title'\])

const List = daggy.taggedSum('List', {
  Empty: \[\],
  Items: \[Item\],
})

const list = List.Empty

list.cata({
  Empty: () => console.log(‘empty…’),
  Items: items => items.map(item => console.log(item.title)),
})

با این روش ما چند تا چیز جدید رو بدست آوردیم:

1. کدی کم باگ تری داریم
2. استفاده مجدد ساده تر از کدها
3. خوانایی راحت تر کد و ساده کردن زندگی دیگران

**روش استفاده در مثالی از دنیای واقعی**

خب فرض کنیم که شما پروژه خودتون رو با با دستور create-react-app ساختید و کتابخونه daggy رو با دستور yarn add daggy نصب کردید.

src
  index.js
  App.js
  App.css
  types.js

خب قرار ما یک لیستی رو از api دریافت کنیم و خب باید این لیست از دیتا رو با type تعریف کنیم.

فرض کنید که لیستی که از api ارسال میشه این شکلیه:

const LIST = \[
  { title: 'Butter' },
  { title: 'Bread' },
  { title: 'Eggs' },
  { title: 'Fish' },
  { title: 'Cake :3' },
\]

const petFetch = () =>
  Promise
    .resolve(LIST)
    .then(list => ({ list }))

برای تعریف type ما باید اول بخش بندی کنیم لیستمون رو.

مثلا آبجکت اول این آرایه رو یک Item در نظر میگیرم و بعد مجموعه همه این item ها رو یک page در نظر میگیریم.

const Item = daggy.tagged('Item', \['title'\])

const List = daggy.taggedSum('Page', {
  Empty: \[\],
  Initial: \[\],
  Items: \[Item\],
  NotFound: \['searchMessage'\],
  FetchError: \[\],
})

نکته بعد این هست که توی taggedSum ما باید حالت های مختلف type رو تعریف کنیم. مثلا اگه حالت اولیه بود و هنوز دستوری ارسال نشده، یاموقعی که خروجی از api داشتیم و غیره رو تعریف میکنیم.

**مرحله بعد استفاده از این تایپ های تعریف شده است**

class App extends Component {
  state = {
    list: List.Initial,
    searchString: '',
  }

  render() {
    return (
      <div className="container">
        <ul>
          {this.state.list.cata({
            Empty: () => <li>This list is empty =(</li>,
            Initial: () => <li>Loading...</li>,
            Items: items => items.map(({ title }) => <li>{title}</li>),
            NotFound: seacrhMessage => <li>There is nothing on your request: ’{seacrhMessage}’</li>,
            FetchError: () => <li>Oooooops...</li>,
          })}
        </ul>
      </div>
    );
  }
}

نیاز به توضیح نداره که کد ما چقدر قشنگ تر شده و از شر اون همه شرط راحت شدیم.

حالا وقته شبیه سازی اینه که ما مثلا دستور رو به api ارسال کردیم و منتظر نتیجه ای هستیم

componentWillMount() {
    setTimeout(this.fetchList, 2000)
  }

  fetchList = () =>
    petFetch()
      .then(res => this.wrapList(res.list))
      .catch(() => this.setState({ list: List.FetchError }))

  wrapList = (list) => {
    const wrapperList = list.length === 0
      ? List.Empty
      : List.Items(list)

    this.setState({ list: wrapperList })
  }

حالا اگه از redux استفاده میکنید کافیه این رو توی ریداکستون قرار بدید.

کدهای این پست رو توی [گیتهاب](https://github.com/ayooby/react-daggy-tutorial) میتونید مشاهده کنید.

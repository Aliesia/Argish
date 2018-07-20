## Як комітити:

1. Відкрити в папці "in terminal"
2. Написати в терміналі: git status 
ентер
3. Перевірити чи правильно/ok?
4. Додати файли яких не вистачає: git add файл(и) ентер (якщо всі то просто . ентер)
5. Зробити коміт: git commit -m "message" ентер(в лапках написати коміт)
6. Відправити  зміни: git push origin шляхГілки (шляхГілки на віддаленому сервері, наприклад master)ентер

## Порівняння:

1. **assert.equal**
```js
.then(_ => driver.findElement(By.css('.time-1')).getText())
   .then(tempDateOfOrder =>{
        expectedDateOfOrder = tempDateOfOrder;
        })
   .then(_ => driver.findElement(By.css('.time-2')).getText())
   .then(tempDateOfOrder =>{
        assert.equal(tempDateOfOrder, expectedDateOfOrder, 'Dates on single order page is not the same')
        })
```
2. **includes**
```js
.then(referenceOrderName => {
        expectedOrderName = referenceOrderName;
        driver.findElement(By.css('.title-11  a')).click()
        })
.then(referenceOrderName => {
        if (!expectedOrderName. includes (referenceOrderName))
        assert.fail(referenceOrderName, expectedOrderName)
        })
```
3. **.getAttribute('value')....trim()**
```js
.then(_ => driver.findElement(By.css('.tablelist tr:nth-child(2) a')).getText())
.then(referenceProductName => {
    expectedProductName = referenceProductName;
    displayResult(referenceProductName);
    driver.findElement(By.css('.tablelist tr:nth-child(2) a')).click()
    })
.then(_ => driver.findElement(By.css('.textinfo .u-full-width')).getAttribute('value'))
.then(ProductName => {
   displayResult(ProductName);
   assert.equal(ProductName.trim(), expectedProductName.trim(), 'not that value, bitch')
   })
```
4. **wait(until.elementLocated**
```js
then(_ => driver.wait(until.elementLocated(By.css('.title-2'))))
```
5. **wait(until.titleIs**
```js
then(_ => driver.wait(until.titleIs(expectedTitle)))
```
6. findElement and catch errors
```js
.then(_ => driver.findElement(By.css('._button-1')).click())
.catch(function () {
    assert.fail('expected that element a button is clicked', 'but there is no element on this page') // text fields
});
```


## Операції над елементами:
1. then(_ => driver.findElement(By.css('._button-1')).click())
2. then(_ => driver.findElement(By.className('li-16')).getText())
3. then(_ => driver.findElement(By.css('.act')).getCssValue('border-left'))
4. then(_ => driver.findElement(By.css('.textinfo .u-full-width')).getAttribute('value'))
5. then(_ => driver.findElement(By.css('[type="submit"]')).click())
6. then(_ => driver.findElement(By.css('.tablelist tr:nth-child(2) a')).click())

## Результат
1.then(orders => displayResult(orders.length))



Admin can use a PL site with Chrome124
Admin can log in
Admin can visit his profile and orders history page
Admin can create and delete new product in CMS
Admin can log out

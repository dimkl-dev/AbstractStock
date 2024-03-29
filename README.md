# AbstractStock
Данный пакет реализует концепцию абстрактного полиморфного класса с виртуальными методами и свойствами. <br>Полиморфиз - одна из концепций ООП.<br>
Виртуальные методы и свойства - т.е методы свойства которые определяются в момент выполнения.<br><br>
Данныц класс позволяет организовать код, опираясь только на общее поведение и возрощаемое значение вызываемых методов, и сигнатуры их параметров.

## Обзор
- <a href="#Установка">Установка</a>
- <a href="#diff">Отличие от предыдущей версии</a>
- <a href="#Документация">Документация</a>
- <a href="#Использование">Использование</a>
- <a href="#Зачем">Зачем</a>
- <a href="#термины">Терминология</a>
- <a href="#vnp">Внутренние перменные</a>
    - <a href="#AS_stock">AS_stock</a>
    - <a href="#ASlist">ASlist</a>
- <a href="#API">API</a>
    - <a href="#initStock">initStock</a>
    - <a href="#abstractProp">abstractProp</a>
    - <a href="#getASlist">getASlist</a>
    - <a href="#getStock">getStock</a>
    - <a href="#validStock">AbstractStock.prototype.validStock</a>
    - <a href="#deleteAbstractProp">deleteAbstractProp</a>
    - <a href="#deleteStock">deleteStock</a>

## <span id="Установка">Установка</span> 

Так пакет **abstractstock** является пакетом nodejs - то вам для установки понадобится менеджер пакетов, к примеру **npm**.<br>

Для установки пакета в качестве зависимомти другого пакета.

    npm install abstractstock

Что бы скачать git репозиторий пакета - вам так же понадобится   **git**. Выполните в терминалн следующий код 

    git clone https://github.com/dimkl-dev/AbstractStock.git && cd ./AbstractStock && npm install  

## Отличие от предыдущей версии <span id='diff'></span>
Версии 1.1 появилась возможность контроля присвоения и возврата значений <a href="#Абстрактное-свойство">**абстрактных свойств**</a> и <a href="#Накопитель">**накпителя**</a>,
так же при их определение добавлен опцианальный параметр **debug** выводящий отладочную информациию.
Более подропный спсиок изменений:
- в функции <a href="#abstractProp">**abstractProp**</a> и <a href="#initStock">**initStock**</a> 
добавлены следующие опциональные параметры:

    - **verrifF**(desc)<span id='verrifF'></span> - опциональный парметр определяющий, при определение <a href="#Абстрактное-свойство">**абстрактного свойства**</a> и <a href="#Накопитель">**накпителя**</a>,  функцию обратного вызова, которая вызывается перед присвоение, и возвратом значения. Чтобы значения возвращались и записывались - функция обязана возвращать значение. При вызове - в функцию передаётся в виде параметра, объект **desc** представляющий собой дескриптор свойства, и который имеет следующие свойства:
        - **name** - **String**: имя свойства(<a href="#Абстрактное-свойство">**абстрактного свойства**</a> или <a href="#Накопитель">**накпителя**</a>,)
        - **val** - **any**: значение свойства
        - **context** - контекст <a href="#Абстрактное-свойство">**абстрактного свойства**</a> или <a href="#Накопитель">**накпителя**</a>(т.е сам <a href="#Абстрактный-накопитель">**абстрактный накопитель**</a>)
        - **stock** - **true** если свойство является <a href="#Накопитель">**накопителем**</a>. **false** - во всех остальных случаях.
        - **prop** - **true** если свойство является <a href="#Абстрактное-свойство">**абстрактным**</a>. **false** - во всех остальных случаях.
        - **get** - **true** если значение возврощается свойством. **false** - во всех остальных случаях.
        - **set** - **true** если значение записывается свойством. **false** - во всех остальных случаях.
    - **debug** - опциональный параметр функций <a href="#abstractProp">**abstractProp**</a> и <a href="#initStock">**initStock**</a>. Если **true** - то будет выводится дополнительная отладочная информация. Подробности смотри в описании функций ниже.

    - **[deleteAbstractProp](#deleteAbstractProp)**(abstractname) -  удаляет [абстрактное свойство](#Абстрактное-свойство)
    - **[deleteStock](#deleteStock)**(pname) - удаляет [накопитель](#Накопитель)


## <span id="Документация">Документация</span>
Подробная документация представлена ниже. Так же доступна документация в формате ***JSDoc***. 

Для её просмотра можно использовать пакет [JSDocLive](https://www.npmjs.com/package/jsdoclive)

Для просмотра ***JSDoc*** документации у пакета установленного как зависимость -  в каталоге пакета наберите команду 

    cd ./node_modules/poolcall/ && jsdoclive ./

Если вы скачали git-репозиторий пакета наберите 

    jsdoclive ./ 

## <span id="Использование">Использование</span> 
<pre><code>
//Можно использовать любой объект. Это абстрактный пример.
let obj1 = {};
obj1.name = "Boris";
obj1.say = function(){console.log(`hello ${this.name}`)};
//----------------

let {AbstractStock} = require("abstractstock");
let obj2 = new AbstractStock();
obj2.initStock("obj1", obj1);

obj2.abstractProp("_name_", "name");
obj2.abstractProp("say", "say");
//----------------------
</code></pre>
## <span id="Зачем">Зачем</span>
Очень хороший вопрос зачем. JavaScript очень гибкий язык, но попробуйте взять ссылку на метод объекта и вызвать его в другом объекте
### example
<pre><code>
obj1 = {};
obj1.name = "Boris";
obj1.say = function(){console.log(`hello ${this.name}`)};
obj1.say()//выведет 'hello Boris'
</code></pre>
порпробуем взять у объекта obj1 метод say и вызвать его из объекта obj2

<code><pre>
obj2={};
obj2.say = obj1.say;
obj2.say(); // выведет 'hello undefined'
</code></pre>

Если мы хотим одолжить один метод и вызвать его в контексте другого - тогда всё хорошо. Но если нам не нужно изменять контекст выполнения функции? Тогда пример выше примет следующий вид.

<code><pre>
obj2={};
obj2.speak = ()=>{obj1.say;};
obj2.speak(); // выведет 'hello boris'
</code></pre>

Этот метод тоже можно использовать. Он работает пока работаем с объектами(в JavaScript функции тоже объекты)
Но этот приём не сработает если мы захоти с эмитировать взятие адреса у свойства имющий значение примитивного типа(строка или числа). Это можно с эмитировать при помощи свойств аксесоров(get и set свойства).

<pre><code>
obj2 = {
    say: ()=>{obj1.say()},
    get _name_(){return obj1.name},
    set _name_(pval){obj1.name = pval}
    /* если потребно определять акссесоры на
    существующем методе - то потребно использовать 
    Object.defineProperty*/
}


console.log(obj2.name); // выведет Boris
obj1.name = 'Ivan';
obj1.say();// выведет Ivan
obj2.say();// выведет Ivan

obj2._name_ = 'Peter';
obj1.say();// выведет Peter
obj2.say();// выведет Peter


</code></pre>

Как видитие, имитировать указатели и ссылки в Javascript можно. Но использую только встроенные возможности языка - это громоздко, и потребно учитывать на какие типы данных потребно ссылка

### Реализация ссылок при помощи AbstacktStock
Для на гляднасти я прпроведу ниже полный код реализации ссылок как на нативном JavaScript, так и использованием пакета AbstractStock.
#### Нативный JavaScript
<pre><code>
obj1 = {};
obj1.name = "Boris";
obj1.say = function(){console.log(`hello ${this.name}`)};

obj2 = {
say: ()=>{obj1.say()},
get _name_(){return obj1.name},
set _name_(pval){obj1.name = pval}
}
</code></pre>

#### с использованием AbstractStock
<pre><code>
let obj1 = {};
obj1.name = "Boris";
obj1.say = function(){console.log(`hello ${this.name}`)};

//---блок инициализации
let {AbstractStock} = require("abstractstock");
let obj2 = new AbstractStock();
obj2.initStock("obj1", obj1);

//----Определение ссылок
obj2.abstractProp("_name_", "name");
obj2.abstractProp("say", "say");
//----------------------
</code></pre>

Как можно видеть из примеров выше - при использование AbstractStock, потребно определить блок инициализации, но определение самих ссыллок - проще и нагляднее. На демонстрационном примере разница не велика, но с ростом числа ссылок - код определения ссыллок уменьшается до половины. И становится гораздо наглядней.

Всех кого заинтересовал данный подход - прошу проследовать дальше.

## <p id="термины">Терминология</p>
Для реализация задумки был введён ряд понятий:

 -  **<a id="Абстрактный-накопитель">Абстрактный накопитель</a>** - экземпляр AbstractStock. До вызова функции [initStock](#initStock) абстрактный накопитель является не инициализированным и содержит лишь базовые методы. После вызова [initStock](#initStock) становится возможно создовать [абстрактные свойства](#Абстрактное-свойство) при помощи метода [abstractProp](#abstractProp)

 -  **<a id="Накопитель">Накопитель</a>** - [внешний объект](#Внешний-объект) 
 асоциированный с [абстрактным накопителем](#Абстрактный-накопитель). Ссылка на который хранится во 
 внутренний переменной [AS_stock](#AS_stock).
 Все [абстрактные свойства](#Абстрактное-свойство) разрешаются в контексте [накопителя](#Накопитель).
 У [абстрактного накопителя](#Абстрактный-накопитель) может быть только
 один [накопитель](#Накопитель) который можно получит через свойство создоваемое в 
 результате вызова функции [initStock](#initstock). Если в это свойство происходит 
 запись значения - то происходит повторная привязка [внешнего объекта](#Внешний-объект), 
 при этом свойство созданое при вызове функции [initStock](#initstock) сохраняется прежним.
 Приэтом также изменяется контекст резрешения [абстрактных свойств](#Абстрактное-свойство).
 Если же в новом контексте какое либо [абстрактное свойство](#Абстрактное-свойство) 
 невозможно разрешить - то генерируется ошибка которая дополнена следующими свойствами:
    - oldStock - прежний [накопитель](#Накопитель)
    - newStock - новый [накопитель](#Накопитель)
    - stockValidRes - объект валидации [абстрактных свойств](#Абстрактное-свойство) (см. функцию [validStock](#validStock)) 


 -  **<a id="Внешний-объект">Внешний объект</a>** - любой объект не осоцеированный с [абстрактным накопителем](#Абстрактный-накопитель)

 -  **<a id="Абстрактное-свойство">Абстрактное свойство</a>** - метод или свойство
  [абстрактного накопителя](#Абстрактный-накопитель) созданное при помощи метода 
  [abstractProp](#abstractProp). [Абстрактное-свойство](#Абстрактное-свойство) 
  связано со свойством или методом [накопителя](#Накопитель). Эта связь определена
  во внутренней переменной [ASlist](#ASlist). Обращатся с 
  [абстрактным-свойством](#Абстрактное-свойство) возможно двумя способами:
    - **как с методом** - если связано с методом(т.е вункцией)
    - **как с свойством** - если связано со свойством(имеет объектный или примитивный тип данных)

 -  **<a id="Свойство-объекта">Свойство объекта</a>** - свойство или метод любого объекта



Термины не упомянутые в списке выше расматриваются в обще принятом смысле

## <span id="vnp">Внутренние переменные</span>
Здесь описаны перменные на которых держится работа класса. Прямого досту к ним нет, но можно получить ккопию их значений или ссылку на них. Этот раздел введён в описани, так как приего наличии легче объяснить работу некоторых функций и некоторые термины

### <a id="AS_stock">AS_stock</a>
Хранит ссылку на [внешний объект](#Внешний-объект). Является частью [накопителя](#Накопитель) 
который инициализируется функцией [initStock](#initstock). Именно в контексте этой переменной и разрешаются 
все [Абстрактные-свойства](#Абстрактное-свойство).  

### <a id="ASlist">ASlist</a>
Внутренняя перменная экземпляра объекта AbstractStock. Является картой сопастовление [абстрактных свойств](#Абстрактное-свойство). Перменная имеет тип объкта, значение свойств которой задаются внутри функции  [abstractProp](#abstractProp).

Сама переменная имеет следуюй вид 

<pre><code>
 {
     ....
     <b>abstractProp</b>: <b>stockProp</b>,
     ....
 }
</code></pre>

где: <br>
- abstractProp(string) - имя [абстрактного свойства](#Абстрактное-свойство)(параметр *abstractname*) 
- stockProp(string) - имя свойства у [внешнего объекта](#Внешний-объект)(параметр *stockname*)

Другими словами переменная является объектом, свойствами которого являются имена 
[абстрактных свойств](#Абстрактное-свойство), а значениями имена свойств или методов
 [накопителя](#Накопитель)




## <span id="API">API</span>

### <a id="initStock">initStock(pname, pstock, [verrifF], [debug])</a>
Инициализирует [Накопитель](#Накопитель) и свойство(имя свойства указывается в параметре ***pname***) у [абстрактного накопителя](#Абстрактный-накопитель) через которое [накопитель](#Накопитель) можно получить или же сделать [накопителем](#Накопитель) другой [внешний объект](#Внешний-объект). Контроль над этими процессами можно расширить через **callback** функцию определяемую в параметре ***verrifF***. Подробности смотри ниже.


#### парметры
| name| type | Description |
|---  |----  | --- |
| pname  | String  | имя [накопителя](#Накопитель) (а также имя сойства, через которе будет даступен [накопитель](#Накопитель))|
| pstock |Object   | [накопитель](#Накопитель)|
|[verrifF] | undefined | NaN | null | Function | опциональный параметр определяющий **callback** функцию. Значение по умолчанию **undefined**. Позволяет расширять контроль присвоения и возврата [накопителя](#Накопитель) при опращение к нему через свойство опрделенным в параметре ***pname***. Подробности смотри ниже. |
|[debug]   | Boolean| Опциональный параметр. Значение по умолчанию **false**. Если устанавливается значение в **true** - то будет выводится дополнительная отладочная информация. Подробности смотри ниже. |

К одному экземпляру AbstractStock может быть привязан
только один [внешний объект](#Внешний-объект), а повторный вызов метода [initStock](#initStock) 
преведёт к следующим действиям:
 - переопределяет [накопитель](#Накопитель) (параметр pname)
 - для доступа к [накопителю](#Накопитель) создаёт новоё свойство у экземпляра класса AbstractStock
 - изменит контекст выполнение всех [абстрактных свойств](#Абстрактное-свойство) 
определённых  ранее. 
- Привязка свойства для доступа к [накопителю](#Накопитель), определённое ранее, 
также будет изменена(будет возврощать объект указанный в параметре pstock) 

Пример кода смотри [ниже](#пример_asap)

**подробное описание оциональных параметров**:<br>
Функция сосздаёт [свойство-аксессор](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Property_accessors) т.е сосоздаёт *get* и *set* функции, которые при чтение и записи свойства и выполняют всю логику работы. callback функция, передаваемая в параметре **virrifF**,  позволяет расширить их поведение путём её вызова, и получения значение, как перед возвратом, так и перед записью значения. В процесс вызова, в качестве параметра, передаётся объект дескриптор - который полностю описывает детали вызова. Полный список свойств дескриптора смотри [выше](#verrifF)
- **verriF**(desc) - её определение дополняет поведение свойства следующим образом:
    - при чтение - вызывается перед возвратом значения, и  возвращённый результат используется как результат чтения свойства. При вызове передаётся объект **desc** со следующими свойствами:
        - name - (*String*) имя свойства. Т.е имя свойства [абстрактного накопителя](#Абстрактный-накопитель) через которое осуществляется доступ к [накопителю](#Накопитель).
        - val - (*any*) значение свойства. То самое значение которое должно возврощатся если функция **verrifF** не определена.
        - context - (*Object*) контекст [абстрактного свойства](#Абстрактное-свойство).  т.е сам [абстрактный накопитель](#Абстрактный-накопитель)
        - stock - (*Boolean*) **true** 
        - get - (*Boolean*) **true**
    - при записи - вызывается перед записью значения, и  возвращённый результат используется как значение саписи свойства. При вызове передаётся объект **desc** со следующими свойствами:
        - name - (*String*) имя свойства. Т.е имя свойства [абстрактного накопителя](#Абстрактный-накопитель) через которое осуществляется доступ к [накопителю](#Накопитель).
        - val - (*any*) значение свойства. То самое значение которое должно быть сохранено если **verrifF** не определена.
        - context - (*Object*) контекст [абстрактного свойства](#Абстрактное-свойство).  т.е сам [абстрактный накопитель](#Абстрактный-накопитель)
        - stock - (*Boolean*) **true** 
        - set - (*Boolean*) **true**
        
    Если вкачестве значения параметра **verrifF** передано примитивное значение или объект отличный от объекта функции - то будет сгенерирована ошибка  со следуещем содержанием<br> 
    'TypeError: verrifF is not function'
- **debug** - (*Boolean*) по умолчанию значение **false**. Если передать значения **true** - то будет выведена дополнительная отладочная информация содержание которой зависит  от значения параметра **verrifF** :
    - если параметр **verrifF** имеет неопределённое значение(*undefined*, *null*, *NaN*:) - то  при определение [абстрактного накопителя](#Абстрактный-накопитель) будет выведен блок сообщениё между строками *'---start debug massage---'* и *'---end debug massage---\n'*. Так же в режиме *console.info* будет выведена следующая информация:
    
        - имя конструктора [абстрактного накопителя](#Абстрактный-накопитель)
        - имя [накопителя](#Накопитель) (параметр *pname*)
        - содержимое [накопителя](#Накопитель) (параметр *pstock*)
        - содержимо контекста определения [накопителя](#Накопитель)(содержимо объекта *this*)
        - cтэк вызова(вызывается функция *console.trace()* )

    - если значением параметра **verrifF** имеет значение *примитивного типа* или объект отличный от объекта **Function** - то  при определение [абстрактного накопителя](#Абстрактный-накопитель)  перед генерацией ошибки через *console.error()* будет выведена следующая информация:
    
        - имя конструктора [абстрактного накопителя](#Абстрактный-накопитель)
        - имя [накопителя](#Накопитель) (параметр *pname*)
        - содержимое [накопителя](#Накопитель) (параметр *pstock*)
        - значение параметра **verrifF**
        - содержимо контекста определения [накопителя](#Накопитель)(содержимо объекта *this*)
        



### <a id="abstractProp">abstractProp(abstractname, stockname, [verrifF], [debug])</a>

Определяет или переопределяет уже существующее [абстрактное свойство](#Абстрактное-свойство). Контроль над этими процессами можно расширить через **callback** функцию определяемую в параметре ***verrifF***. Подробности смотри ниже.

#### парметры
| name| type | Description |
|---  |----  | --- |
| abstractname  | String  | имя [абстрактного свойства](#Абстрактное-свойство) |
| stockname |  string   | имя [свойства](#Свойство-объекта) в [накопителе](#Накопитель)|
|[verrifF] | undefined | NaN | null | Function | опциональный параметр определяющий **callback** функцию. Значение по умолчанию **undefined**. Позволяет расширять контроль присвоения и возврата [накопителя](#Накопитель) при опращение к нему через свойство опрделенным в параметре ***pname***. Подробности смотри ниже. |
|[debug]   | Boolean| Опциональный параметр. Значение по умолчанию **false**. Если устанавливается значение в **true** - то будет выводится дополнительная отладочная информация. Подробности смотри ниже. |

Имя [абстрактного свойства](#Абстрактное-свойство) задоное в параметре abstractname
становится доступным как свойство экземпляра класс AbstractStock

**подробное описание оциональных параметров**:<br>
Функция сосздаёт [свойство-аксессор](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Property_accessors) т.е сосоздаёт *get* и *set* функции, которые при чтение и записи свойства и выполняют всю логику работы. callback функция, передаваемая в параметре **virrifF**,  позволяет расширить их поведение путём её вызова, и получения значение, как перед возвратом, так и перед записью значения. В процесс вызова, в качестве параметра, передаётся объект дескриптор - который полностю описывает детали вызова. Полный список свойств дескриптора смотри [выше](#verrifF)
- **verriF**(desc) - её определение дополняет поведение свойства следующим образом:
    - при чтение - вызывается перед возвратом значения, и  возвращённый результат используется как результат чтения свойства. При вызове передаётся объект **desc** со следующими свойствами:
        - name - (*String*) имя [абстрактного свойства](#Абстрактное-свойство) 
        - val - (*any*) значение [абстрактного свойства](#Абстрактное-свойство). То самое значение которое должно возврощатся если функция **verrifF** не определена.
        - context - (*Object*) контекст [абстрактного свойства](#Абстрактное-свойство).  т.е  [абстрактный накопитель](#Абстрактный-накопитель)
        - prop - (*Boolean*) **true** 
        - get - (*Boolean*) **true**
    - при записи - вызывается перед записью значения, и  возвращённый результат используется как значение саписи свойства. При вызове передаётся объект **desc** со следующими свойствами:
        - name - (*String*) имя [абстрактного свойства](#Абстрактное-свойство) 
        - val - (*any*) значение [абстрактного свойства](#Абстрактное-свойство). То самое значение которое должно быть сохранено если **verrifF** не определена.
        - context - (*Object*) контекст [абстрактного свойства](#Абстрактное-свойство).  т.е  [абстрактный накопитель](#Абстрактный-накопитель)
        - prop - (*Boolean*) **true** 
        - set - (*Boolean*) **true**
        
    Если вкачестве значения параметра **verrifF** передано примитивное значение или объект отличный от объекта функции - то будет сгенерирована ошибка  со следуещем содержанием<br> 
    'TypeError: verrifF is not function'

- **debug** - (*Boolean*) по умолчанию значение **false**. Если передать значения **true** - то будет выведена дополнительная отладочная информация содержание которой зависит  от значения параметра **verrifF** :
    - если параметр **verrifF** имеет неопределённое значение(*undefined*, *null*, *NaN*:) - то  при определение [абстрактного свойства](#Абстрактное-свойство) будет выведен блок сообщениё между строками *'---start debug massage---'* и *'---end debug massage---\n'*. Так же в режиме *console.info* будет выведена следующая информация:
    
        - имя конструктора [абстрактного накопителя](#Абстрактный-накопитель)
        - имя [абстрактного свойства](#Абстрактное-свойство) (параметр *abstractname*)
        - имя свойства [накопителе](#Накопитель) (параметр *stockname*)
        - содержимо контекста определения [накопителя](#Накопитель)(содержимо объекта *this*)
        - cтэк вызова(вызывается функция *console.trace()* )

    - если значением параметра **verrifF** имеет значение *примитивного типа* или объект отличный от объекта **Function** - то  при определение [абстрактного свойства](#Абстрактное-свойство) перед генерацией ошибки через *console.error()* будет выведена следующая информация:
    
        - имя конструктора [абстрактного накопителя](#Абстрактный-накопитель)
        - имя [абстрактного свойства](#Абстрактное-свойство) (параметр *abstractname*)
        - имя свойства [накопителе](#Накопитель) (параметр *stockname*)
        - значение параметра **verrifF**
        - содержимо контекста определения [накопителя](#Накопитель)(содержимо объекта *this*)
        

#### <a id="пример_asap">пример</a>

```
    let arr = new Array(5,7,8)// это внешний объект(массив)
    let as = new AbstractStock // экземпляр класса AbstractStock

    //свяжем экземпляр класса AbstractStock с внешним объектом arr

    let pname = "as_array"; // свойствоо с этим именем и будет накопителем
    let pstock = arr;  // ссылка на внешний объект.
    as.initStock(pname, pstock);
    //arr теперь доступен также под именем as.as_array , или as[pname]
    console.log(arr === as[pname]);//true
    console.log(arr === as.as_array);//true

    // опрделелим as.in псевдонимом для метода arr.push
    let abstractname = "in";
    let stockname = "push";

    as.abstractProp(abstractname, stockname);

    //Обращаемся к определённому свойству
    as[abstractname](11); // as.in(11) - будет тотже результат

    console.log(arr);
    //[ 5,7,8,11 ]

    console.log(as[pname]); //или console.lof(as.as_array)
    //[ 5,7,8,11 ]

    // опрделелим as.count псевдонимом для свойства arr.length
    let abstractname2 = "count";
    let stockname2 = "length";
    as.abstractProp(abstractname, stockname);

    console.log(as.count) // или as[abstractname2]
    //3
```
При переопределение [абстрактного свойства](#Абстрактное-свойство)  в консоль 
выводится предупреждение в которое добавлены следующие свойства:
- **oldval** - пряжнее имя [свойства](#Свойство-объекта)  в [накопителе](#Накопитель)
- **newVal** - новое имя [свойства](#Свойство-объекта) в [накопителе](#Накопитель)
- **status** - принимает значение true или false в зависимости от того, есть ли
     новое имя [свойства](#Свойство-объекта) в [накопителе](#Накопитель)
- **CALLSTACK** - стэк вызова на моментнт определения [абстрактного свойства](#Абстрактное-свойство)

Если при определение нового [абстрактное свойство](#Абстрактное-свойство),  
 в [накопителе](#Накопитель) не найдено [свойство](#Свойство-объекта) с именем
 указаным в пармететре stockname - в консоль будет выведено  предупреждение, в которое 
 добавлены следующие свойства:
- **stockname** - имя [свойства](#Свойство-объекта)  в [накопителе](#Накопитель)
- **status** - иммет значение false
- **CALLSTACK** - стэк вызова на моментнт определения [абстрактного свойства](#Абстрактное-свойство)

### <a id="getASlist">getASlist</a>
Метод возращает копию карты абстрактных свойств(копию значений переменной [ASlist](#ASlist)) 
### <a id="getStock">getStock</a>
Возврощает ссылку на внутреннию переменную [AS_stock](@AS_stock), 
тем самым давая прямой доступ к [накопителю](#Накопитель). Данная возможность является экспериментальной.
Её наличие и поведение могут быть изменены в следующих версиях. 
### <a id="validStock">AbstractStock.prototype.validStock</a>


#### парметры
| name| type | Description |
|---  |----  | --- |
| [pstock = this.getStock()]<BR> *optiona*  | String  | [Внешний объект](#Внешний-объект) для валидации с [абстрактным накопителем](#Абстрактный-накопитель).  По умолчанию, в качестве [Внешнего объекта](#Внешний-объект) используется [накопитель](#Накопитель). Т.е проверяет сам себя.|


Проверят возможность разрешения [абстрактных свойств](#Абстрактное-свойство) отнсительно [внешнего объекта](#Внешний-объект) 
передоваемого через параметр *pstock*. В исходном коде(в коментариях указоно что эта функция проводит валидацию абстрактного накопителя. 
Это объясняется тем - что используется значение по умолчанию, и функция применяется для проверки коректности [абстрактных свойст](#Абстрактное-свойство) )

Возврощает объект с резултатами провкерки  и имеет следующую структуру:

    {
        status,
        abstractProps{
            abstractProp{
                stockProp,
                statusProp
            }
        }
    }

где:
- **status** (*boolean*: true|false) - общий статус провекрки. *true* - всё хорошо, 
*false*  - одно или более из  [Абстрактных свойств](#Абстрактное-свойство) не прошло проверки.

- **abstractProps** - предстовляет собой хеш таблицу, Ключами которой являются имена
[Абстрактных свойств](#Абстрактное-свойство)(*abstractProp*), а значением каждого из клчей является
объект содержащий следующие данные

    - **stockProp** - имя свойства в объекте переданным через параметр *pstock*
    - **statusProp** (*boolean*: true|false) - статус проверки [Абстрактных свойствj](#Абстрактное-свойство)<br>
    *true* - имя свойства, переданного через **stockProp** есть в параметре *pstock*
    *false* - свойство, переданное через **stockProp** в параметре *pstock* не найдено.

### deleteAbstractProp <span id="deleteAbstractProp"></span>
Удаляет [абстрактное свойство](#Абстрактное-свойство)
#### парметры
| name| type | Description |
|---  |----  | --- |
| abstractname| String  | Имя [абстрактного свойства](#Абстрактное-свойство) |

**Returns**: *Boolean*<br><br><br>

Если [абстрактное свойство](#Абстрактное-свойство) с именем указаным в параметре *abstractname* найдено и его успешно удалось удалить - то функцией будет возвращено значение **true**. Так же будет удалена ссответсвующая запись из внутренней переменной [ASlist](#ASlist)<br><br>

Если [абстрактное свойство](#Абстрактное-свойство) с именем указаным в параметре *abstractname* не найдено - 
то функцией будет возвращено значение **false**. Также в собщениях *console.warn()* будет выведена следующая информация: 

- Имя конструктора [абстрактного накопителя](#Абстрактный-накопитель)
- имя [абстрактного свойства](#Абстрактное-свойство) указанного в параметре ***abstractname***
- все свойства [абстрактного накопителя](#Абстрактный-накопитель)
- Содержимое карты [абстрактных свойств](#Абстрактное-свойство) (содержимое переменной [ASlist](#ASlist))
- cтэк вызова(вызывается функция *console.trace()* )




### deleteStock <span id="deleteStock"></span>
Удаляет [накопитель](#Накопитель)
#### парметры
| name| type | Description |
|---  |----  | --- |
| pname| String  | имя [накопителя](#Накопитель)|

**Returns**: *Boolean*<br><br><br>

Если [накопитель](#Накопитель) с именем указаным в параметре *abstractname* найден - то функция вернёт значение **true**. Таже произойдут следующие действия:

- Из [абстрактного накопителя](#Абстрактный-накопитель) удаляются все [абстрактные свойств](#Абстрактное-свойство).
- Очищается переменная [ASlist](#ASlist)
- Очищается переменная [AS_stock](#AS_stock)
- Из [абстрактного накопителя](#Абстрактный-накопитель) удаляется свойство соответсвующие [накопителю](#Накопитель) (подробности этого свойства смотри в функции [initStock](#initStock))


Если [накопитель](#Накопитель) с именем указаным в параметре *abstractname* не найден - то функция вернёт значение **false**. Таже *console.warn()* будет выведена следующая информация:

- Имя конструктора [абстрактного накопителя](#Абстрактный-накопитель)
- имя [абстрактного накопителя](#Абстрактный-накопитель) указанного в параметре ***pname***
- все свойства [абстрактного накопителя](#Абстрактный-накопитель)
- cтэк вызова(вызывается функция *console.trace()* )
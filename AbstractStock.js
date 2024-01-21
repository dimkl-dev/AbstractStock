/**
 * @function AbstractStock.prototype.validStock
 * @description проводит валидацию абстрактного накопителя. 
 * Возврощает объект. Свойство status==true 
 * озночает - что все привязки абстрактных свойств 
 * в абстрактном накопите коректны 
 * по отношению привязанного реального объекта
 * @param {AbstractStock#stockT} [pstock={@link AbstractStock#getStock}()] <readonly>  - внешний объект для валидации с абстрактным накопителем. 
 * По умолчанию используется привязанный объект. Смотри {@link AbstractStock#initStock}. 
 * @throws Если параметр не передан, и функция вызвана до привязки объекта - будет сгенирирована ошибка.
 * @returns {AbstractStock#validStockT}
 */
AbstractStock.prototype.validStock = function(pstock = this.getStock()){
    //pstock - ссылка на реальный объект 
   // console.info('valid stock massage:', pstock);
    let status = true;
    /* общая схема выходного объекта
    ret{
        status,
        abstractProps{
            abstractProp{
                stockProp,
                statusProp
            }
        }
    }
    */
   let ret ={}; //возврощаемый объект
   ret.status = true;// общий статутс валидации
   ret.abstractProps = {}; //Абстрактные свойства

   let listStock = this.getASlist(); //карта абстрактных свойств(связь абстрактного свойства со свойством внешнего объекта)

   for(let asprop in listStock){ // перебираем абстрактные свойства
    let props = ret.abstractProps; //ссылка на список валидируемых абстрактных свойств
    props[asprop] = {}; //сосздаём валидируемое абстрактное свойство. asprop - имя абстрактного свойства
    let _asprop = props[asprop]; // ссылка на валидируемое абстрактное свойство
    _asprop.stockProp = listStock[asprop]; // имя свойства на которое указывает абстрактное свойство 

    //валидация абстрактного свойства
    if(listStock[asprop] in pstock){
        _asprop.statusProp = true;
    }else{
        _asprop.statusProp = false;       
        ret.status = false; //общий статус проверки
    };

   };
   //----end for in---
   return ret;
};
/**
 * @class AbstractStock
 *  Класс является фабрикой абстрактного класса который позволяет создовать  виртуальные методы и свойства. Это реализовано путём 
 * создания абстрактного накопителя(который нужно связать с реальным объектом) 
 * и абстрактных свойств (которые связываются реальными свойствам привязонного реального объекта)
 * Конструктор возвращает объекта типа AbstractStock. Для далнейше работы потребно вызвать 
 * метотод {@link AbstractStock#initStock}
 * для пояснения терминов и понятий смотри {@link ./README.md}*/
function AbstractStock(){



    /** 
    * Внутренний накопитель определяется при вызове функции  {@link AbstractStock#initStock}
    * @type {Object}
    */
    var AS_stock = {};
    
    

    /**
     * Карта сопастовление абстрактных свойств экземпляра объекта {@link AbstractStock}
     * со свойствами объекта {@link AbstractStock~AS_stock}
     * @type {AbstractStock#ASMapT}
     */
    var ASlist = {}; 
    /**
    * Метод возращает привязанный объект к абстрактному накопителю
    * @name getStock
    * @instance
    * @memberof AbstractStock
    * @kind function    
    */ 
    Object.defineProperty(this, 'getStock', {value: ()=>{
  
        return AS_stock},
        writable: false,
    }
);

/**Метод возращает копию карты абстрактных свойств
* @name getASlist
* @instance
* @memberof AbstractStock
* @kind function
* @returns {AbstractStock#ASMapT}
*/
    Object.defineProperty(this, 'getASlist', {value: ()=>{
                                                /*let ret = {};
                                                for (let _prop in ASlist){
                                                    ret[_prop] = ASlist[_prop].name;
                                                }
                                            return ret*/ return Object.assign({}, ASlist)},
                                                writable: false,
                                            }
    );


    /**
     * Инициализирует накопитель. Задаёт взаимосвязь между вертуальным и внешним объектом.
     *  Привязанный объект стновится доступным как свойство экзампляра AbstractStock, 
     * имя которого задаётся параметром pname.
     * К одному экземпляру AbstractStock может быть привязан только один внешний объект. 
     * Повторный вызов метода изменит ссылку накопителя всех переменных созданных ранее. 
     * Другими словами - повторный вызов создаст несколько переменных на один и тот же объект.
     * 
     * 
     * {@link initStock~pname}
     * @param {String} pname - имя накопителя
     * @param {Object} pstock -  накопитель
     * @example let _as = new AbstractStock();
     * let arr = new Array(5,7);
     * _as.initStock('ars', arr);
     * console.log(_as.ars);
     */

    this.initStock = (pname, pstock) =>{

        AS_stock = pstock;


/**
 *  @inner
 *  @memberof INI
 * kkk
 */
        var _desc = {};
        _desc.val = "";
        _desc.get = ()=>{return AS_stock}; 
        _desc.set = (pval) => {
            // TODO сделать валидацию pstock
            let stockValidRes = this.validStock(pval);

            if(stockValidRes.status){
                AS_stock = pval;}else{
                    
                    let sterr = `AbstractStock: ERROR!!!
                    Error to redefine 'Stock'`;

                    let err = new Error(sterr);
                    err.oldStock = AS_stock;
                    err.newStock = pval;
                    err.stockValidRes = stockValidRes;
                    throw err;

                    
                }
            

        };

        Object.defineProperty(this, pname, _desc);

    };

//--Определение типов данных---
    /**
     * Абстрактное свойство класса 
     * @typedef {Any} AbstractStock#abstractPropT
     * @prop {String} real_prop - имя реального свойства
     * @description служебный тип данных потребный для хранения информации об обстрактных свойствах.
     * Абстрактное свойство определяется {@link AbstractStock#abstractProp}
     * Параметры типа являются информационными, и не имют отображения в коде. Не имеют связи с данными и 
     * нужны только для напоминания того - что нужно задокументировать в коментарии jsdoc.  
     */

    /**
     * Абстракный накопитель класса
     * @typedef {Object} AbstractStock#abstractStockT
     * @prop {Object} real_Stock - ссылка на реальнsq объект
     * @description служебный тип данных потребный для хранения информации об обстрактном накопителе. 
     * Детали и создание обстрактного накопителя смотри в описание метода  {@link AbstractStock#initStock}
     * Параметры типа являются информационными, и не имют отображения в коде. Не имеют связи с данными и 
     * нужны только для напоминания того - что нужно задокументировать в коментарии jsdoc.     
     */

    /**
     * Реальный накопитель класса
     * @typedef {Object} AbstractStock#stockT
     * @description объект привязанный к экземляру объекта {@link AbstractStock} 
     * при помощи метода [initStock]{@link AbstractStock#initStock}
     * 
     * 
     */
    
    /**
     * @typedef {Object} AbstractStock#ASMapT
     * Объект представляющицй собой асоциативный список. Соотносящий абстрактные свойства, со свойствами внешнего объекта.
     * Сам список имеет следующий вид <br>
     * <pre><code>
     *  {
     *      ....
     *      <b>abstractProp</b>: <b>stockProp</b>,
     *      ....
     *  }
     * </code></pre>
     * 
     * где: <br>
     * <pre>
     *    <b>abstractProp</b>(string) - имя абстрактного свойства 
     *    <b>stockProp</b>(string) - имя свойства у внешнего объекта
     * </pre>
     */

    /**
     * @typedef AbstractStock.prototype.validStockT
     * @description Тип данных предстовляющих результат валидации абстрактного накопителя
     * @prop {boolean} status=общий статус валидации всех привязок абстрактных свойств. 
     * Значение false указывает на то что в одном или более абстрактном свойстве привязка не коректна.
     * @prop {Object} abstractProps - объект валидации абстрактных свойств
     * @prop {Object} abstractProps.abstractProp - валидация абстрактного свойства. Именем свойства являются имена абстрактных свойств. см {@link AbstractStock#abstractProp}
     * @prop {string} abstractProps.abstractProp.stockProp - свойство в накопителе на которое ссылается абстрактное свойство см {@link AbstractStock#abstractProp}
     * @prop {boolean} abstractProps.abstractProp.statusProp - статус валидации абстрактного свойства
     */


//--Завершение определения типов данных---

/**
 * Определяет абстрактное свойство. 
 * @param {String} abstractname - имя абстрактного свойтсва
 * @param {String} stockname - имя фактического свойства
 */
    this.abstractProp = (abstractname, stockname) =>{
        /**@type {String} */
        let abstractnamest = abstractname+"";
        let stocknamest = stockname+"";
        
//----block console.warn-----
        //Ищем в карте абстрактное свойство
        if (abstractnamest in ASlist) {
    /*если абстрактное свойство существует, и происходит изменение привязки 
    абстрактного свойства к свойству внешнего объекта  */
            console.warn(
                `AbstractStock WARN:
                 Переопределяется существующие абстрактное свойство
                    ${abstractname}{
                        oldVal: ${ASlist[abstractnamest]},
                        newVal: ${stockname},
                        status: ${stocknamest in AS_stock} }
                        ${((new Error()).stack+"").replace("Error", "CALLSTACK:")}
                    `
                );
                // TODO сделать валидацию pstock

                /*
                abstractProp{oldVal,
                             newVal,
                             status}
                */

        } else {

                if ((stocknamest in AS_stock)==false){
        /*Определяется новое абстрактное свойство, 
        но в накопителе свойство не найдено */
                    console.warn(
                        `AbstractStock WARN:
                         При определение абстрактного свойства, свойство в накопителе не найдено
                            ${abstractname}{
                                stockname: ${stocknamest},
                                status: ${stocknamest in AS_stock} }
                                ${((new Error()).stack+"").replace("Error", "CALLSTACK:")}
                            `
                        );
//----end block console.warn-----
                };

//----Создаём абстрактное свойство-----

//Так как аксесоры постоянно доступны - то они порождают замыкани.    
            var _desc = {}; //дескриптор динамичски-определяемого свойства.
            _desc.retf = (...args)=>{return AS_stock[ASlist[_desc.val]](...args) };/*новодел. Эмулирует вызов метода реального объекта. 
            Обёртка для вызыва функций в контесте реального объекта */
            _desc.val = abstractnamest; //
            _desc.get = () => {  //Аксессор get
                _propstock = AS_stock[ASlist[_desc.val]];
                /* */
                let _ret = _propstock instanceof Function ? _desc.retf : _propstock;
                return _ret;
             };
            _desc.set = (pval) => {//Аксессор set
                            
                AS_stock[ASlist[_desc.val]] = pval;
            };
            /*Устанавливаем соответсвие между абстрактным и фактическим свойстве
            /* путём записи свойства ASlist*/
            

            Object.defineProperty(this, abstractnamest, _desc);

                }
        //---end if ---

        ASlist[abstractnamest] = stocknamest;
        //-------End abstractProp---
//----Абстрактное свойство создано -----
    };

//----end AbstractStock---
}

///**базовый объект типа массив 
// * @type {Array}
//*/
//
//let arr = [2];
//
///**
// * @class
// * @extends {AbstractStock}
// * 
// */
//let as = new AbstractStock();
///**
// * Абстрактное накопитель. Ссылка на {@link arr}
// * @name ars
// * @instance as
// * @memberof as
// * 
// * @type {as#abstractStockT}
// * @prop {Array} real_Stock - {@link arr}
// * 
//  * @borrows as.arr as arr
//
// * 
// *  TODO - тип для определённого абстрактного накопителя сделать
// */
//
//
//as.initStock('ars', arr);
//
///**
// * Абстрактное свойство
// * @name in
// * @instance as
// * @memberof as
// * 
// * @type {as#abstractPropT}
// * @prop {Function} real_prop - push
// * 
//  * @borrows as.arr as arr
//
// * 
// *  TODO - тип для определённого абстрактного накопителя сделать
// */
//as.abstractProp('in', 'push');
//
///**
// * Абстрактное свойство
// * @name out
// * @instance as
// * @memberof as
// * 
// * @type {as#abstractPropT}
// * @prop {Function} real_prop - shift
// * 
//  * @borrows as.arr as arr
//
// * 
// *  TODO - тип для определённого абстрактного накопителя сделать
// */
//as.abstractProp('out', 'shift');
////as.in(2); 
//
///**
// * @prop {AbstractStock.abstractProp} as.in - fff
// * 
// */
//as.in(7);
//as.in(9);
//console.dir(as.getASlist());
//
//as.abstractProp('out', 'pop');
//as.abstractProp('out', 'pop1');
//
//as.abstractProp('_out', '_pop1');
//let arr1 =[55,78,79];
//
//arr.pop1= function(...args){return this.pop(...args)};
//arr._pop1= function(...args){return this.pop(...args)};
//arr1.pop1= function(...args){return this.pop(...args)};
//arr1._pop1= function(...args){return this.pop(...args)};
//console.log(as.out());
//console.log(as._out());
//
//as.ars = arr1;
//
//console.log(as.out());
//console.log(as._out());
//
///**переменная типа абстрактного свойства
// * @type {as#abstractPropT} 
// * @prop {as#abstractPropT} res - имя переменной
//*/
//var zzzzz;
//

let obj1 = {};
obj1.name = "Boris";
obj1.say = function(){console.log(`hello ${this.name}`)};

let obj2 = new AbstractStock();
obj2.initStock("obj1", obj1);

obj2.abstractProp("_name_", "name");
obj2.abstractProp("say", "say");

console.log(obj2._name_); // выведет Boris
obj1.name = 'Ivan';
obj1.say();// выведет Ivan
obj2.say();// выведет Ivan

obj2._name_ = 'Peter';
obj1.say();// выведет Peter
obj2.say();// выведет Peter


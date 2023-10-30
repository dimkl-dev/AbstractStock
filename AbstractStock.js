AbstractStock.prototype.validStock = function(pstock){
    let status = true;
    /* 
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
   let ret ={};
   ret.status = true;
   ret.abstractProps = {};

   let listStock = this.getASlist();

   for(let asprop in listStock){
    let props = ret.abstractProps;
    props[asprop] = {};
    let _asprop = props[asprop];
    _asprop.stockProp = listStock[asprop];

    if(listStock[asprop] in pstock){
        _asprop.statusProp = true;
    }else{
        _asprop.statusProp = false;       
        ret.status = false; 
    };

   };
   //----end for in---
   return ret;
};
/**
 * @class AbstractStock
 *  Класс является фабрикой абстрактного класса с виртуальными методами. Это реализовано путём 
 * создания абстрактного накопителя(который нужно связать с реальным объектом) 
 * и абстрактных свойств (которые связываются реальными свойствам привязонного реального объекта)
 * Конструктор возвращает объекта типа AbstractStock. Для далнейше работы потребно вызвать 
 * метотод {@link AbstractStock#initStock}*/
function AbstractStock(){



    //Внутренний накопитель определяется при вызове функции  AbstractStock#initStock
    var AS_stock = {};
    
    //

    /*Карта сопастовление абстрактных свойств экземпляра объекта AbstrctStock 
    со свойствами объекта AbstractStock~_stock 
    ASlist.prop{
        name: {String},
        ret: {Clouser}
    }
    */
    var ASlist = {}; 
    //Свойство возращает копию карты абстрактных свойств
    Object.defineProperty(this, 'getStock', {value: ()=>{
  
        return AS_stock},
        writable: false,
    }
);
    Object.defineProperty(this, 'getASlist', {value: ()=>{
                                                /*let ret = {};
                                                for (let _prop in ASlist){
                                                    ret[_prop] = ASlist[_prop].name;
                                                }
                                            return ret*/ return Object.assign(ASlist)},
                                                writable: false,
                                            }
    );


    /**
     * Инициализирует накопитель. Задаёт взаимосвязь между вертуальным и реальным объектом.
     * К одному экземпляру AbstractStock может быть привязан только один реальный объект. 
     * Повторный вызов метода затрёт существующию ссылку и сделает реальныn
     * 
     * {@link initStock~pname}
     * @param {String} pname - имя накопителя
     * @param {Object} pstock -  накопитель
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
     * абстрактное свойство класса 
     * @typedef {Object} AbstractStock#abstractPropT
     * @prop {String} real_prop - имя реального свойства
     * @description служебный тип данных потребный для хранения информации об обстрактных свойствах.
     * Абстрактное свойство определяется {@link AbstractStock#abstractProp}
     */

    /**
     * абстракный накопитель класса
     * @typedef {Object} AbstractStock#abstractStockT
     * @prop {Any} real_Stock - ссылка на реальнsq объект
     * @description служебный тип данных потребный для хранения информации об обстрактном накопителе. 
     * Детали и создание обстрактного накопителя смотри в описание метода  {@link AbstractStock#initStock}     
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
        

        //Ищем в карте абстрактное свойство
        if (abstractnamest in ASlist) {
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
                    console.warn(
                        `AbstractStock WARN:
                         При определение абстрактного свойства, Свойство в накопителе не найдено
                            ${abstractname}{
                                stockname: ${stocknamest},
                                status: ${stocknamest in AS_stock} }
                                ${((new Error()).stack+"").replace("Error", "CALLSTACK:")}
                            `
                        );

                };
            var _desc = {};
            _desc.retf = (...args)=>{return AS_stock[ASlist[_desc.val]](...args) };
            _desc.val = abstractnamest;
            _desc.get = () => {  
                _propstock = AS_stock[ASlist[_desc.val]];
                let _ret = _propstock instanceof Function ? _desc.retf : _propstock;
                return _ret;
             };
            _desc.set = (pval) => {
                            
                AS_stock[ASlist[_desc.val]] = pval;
            };
            /*Устанавливаем соответсвие между абстрактным и фактическим свойстве
            /* путём записи свойства ASlist*/
            

            Object.defineProperty(this, abstractnamest, _desc);

                }
        //---end if ---

        ASlist[abstractnamest] = stocknamest;
        //-------End abstractProp---

    };

//----end AbstractStock---
}
/**базовый объект типа массив 
 * @type {Array}
*/

let arr = [2];

/**
 * @class
 * @extends {AbstractStock}
 * 
 */
let as = new AbstractStock();
/**
 * Абстрактное накопитель. Ссылка на {@link arr}
 * @name ars
 * @instance as
 * @memberof as
 * 
 * @type {as#abstractStockT}
 * @prop {Array} real_Stock - {@link arr}
 * 
  * @borrows as.arr as arr

 * 
 *  TODO - тип для определённого абстрактного накопителя сделать
 */


as.initStock('ars', arr);

/**
 * Абстрактное свойство
 * @name in
 * @instance as
 * @memberof as
 * 
 * @type {as#abstractPropT}
 * @prop {Function} real_prop - push
 * 
  * @borrows as.arr as arr

 * 
 *  TODO - тип для определённого абстрактного накопителя сделать
 */
as.abstractProp('in', 'push');

/**
 * Абстрактное свойство
 * @name out
 * @instance as
 * @memberof as
 * 
 * @type {as#abstractPropT}
 * @prop {Function} real_prop - shift
 * 
  * @borrows as.arr as arr

 * 
 *  TODO - тип для определённого абстрактного накопителя сделать
 */
as.abstractProp('out', 'shift');
//as.in(2); 

/**
 * @prop {AbstractStock.abstractProp} as.in - fff
 * 
 */
as.in(7);
as.in(9);
console.dir(as.getASlist());

as.abstractProp('out', 'pop');
as.abstractProp('out', 'pop1');

as.abstractProp('_out', '_pop1');
let arr1 =[55,78,79];

arr.pop1= function(...args){return this.pop(...args)};
arr._pop1= function(...args){return this.pop(...args)};
arr1.pop1= function(...args){return this.pop(...args)};
arr1._pop1= function(...args){return this.pop(...args)};
console.log(as.out());
console.log(as._out());

as.ars = arr1;
console.log(as.out());
console.log(as._out());

/**переменная типа абстрактного свойства
 * @type {as#abstractPropT} 
 * @prop {as#abstractPropT} res - имя переменной
*/
var zzzzz;

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
     * @param {AbstractStock#verrifFunc} [verrifF] - функция обратного вызова для
     * @param {Boolean} [debug] - **true** - будут вывводится отладочные сообщения
     * проврки и изменения значения
     * @example let _as = new AbstractStock();
     * let arr = new Array(5,7);
     * _as.initStock('ars', arr);
     * console.log(_as.ars);
     */

    this.initStock = (pname, pstock, verrifF, debug) =>{

        AS_stock = pstock;

//---блок обнаружения веррификации        
        //var callstack = ((new Error()).stack+"").replace("Error", "CALLSTACK:");
        var cb = verrifF instanceof Function;
        //var ud =  typeof verrifF == 'undefined'; // если функция феррификации не определена
        //var ud = verrifF ? false : true;
        var ud = !verrifF//true - если не определена, false - если определена        
        var _this = this;
        //var debug = ((debug === undefined)||(debug === false)) ? false : true;

        if (!cb){
            if (ud) {
                //если функция феррификации не определена
                /*console.info(`${this.__proto__.constructor.name}#initStock - 
                функция феррификации не определена;
                pname = ${pname},
                pstock = ${pstock},
                this = ${JSON.stringify(_this).replaceAll(',', ',\n\t\t')},
                ${((new Error()).stack+"").replace("Error", "CALLSTACK:")}
                `);*/
//-----Ooops-------
                if (debug){
                console.info('\n---start debug massage---'); 
                    console.info(this.__proto__.constructor.name + '#initStock - \
                    \n\tфункция феррификации не определена');
                    console.info('\tpname = ', pname);
                    console.info('\tpstock = ', pstock);
                    console.info('\tthis = ',  _this);
                    console.trace();
                console.info('---end debug massage---\n');
                }


            } else {
              if(debug){
               console.error('\n--debug information--')
                //если функция феррификации не является функцией  
                console.error(this.__proto__.constructor.name +'#initStock - \
                \n\tв параметре verrifF передана не функция');
                console.error('\tpname = ', pname, '\t---debug--');
                console.error('\tpstock = ', pstock, '\t---debug--');
                console.error('\tverrifF = ', verrifF, '\t---debug--');
                console.error('\tthis = ', _this, '\t---debug--');
              }
                throw (new TypeError('\tverrifF is not function'))

     //----end else-----                
                
            }//end ud
        }//end cb
//---конец блока обнаружения веррификации        


        var _desc = {};
        _desc.val = "";
        _desc.configurable=true;
        _desc.get = ()=>{
            var ret = AS_stock;
            if (cb){//если функция веррификации передана
          //дескрипто свойства
            let desc = {
                name: pname,
                val: ret,
                context: _this,
                stock: true,
                prop: false,
                get: true,
                set: false
                };
                ret = verrifF(desc)};
                

            return ret;
//-----end get--------        
        }; 
        _desc.set = (pval) => {
            // TODO сделать валидацию pstock
            let stock = pval;

            if (cb){//если функция веррификации передана
                //дескрипто свойства
                  let desc = {
                      name: pname,
                      val: stock,
                      context: _this,
                      stock: true,
                      prop: false,
                      get: false,
                      set: true
                      };
                      stock = verrifF(desc)};
      

            let stockValidRes = this.validStock(stock);

            if(stockValidRes.status){
                AS_stock = stock;}else{
                    
                    let sterr = `AbstractStock: ERROR!!!
                    Error to redefine 'Stock'`;

                    let err = new Error(sterr);
                    err.oldStock = AS_stock;
                    err.passStock = pval;
                    err.newStock = stock;
                    err.stockValidRes = stockValidRes;
                    throw err;

                    
                }
            

        };

        Object.defineProperty(this, pname, _desc); 

//----------Конец определение накопителя---------

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
     * 
     * @prop {boolean} status=общий статус валидации всех привязок абстрактных свойств. 
     * Значение false указывает на то что в одном или более абстрактном свойстве привязка не коректна.
     * @prop {Object} abstractProps - объект валидации абстрактных свойств
     * @prop {Object} abstractProps.abstractProp - валидация абстрактного свойства. Именем свойства являются имена абстрактных свойств. см {@link AbstractStock#abstractProp}
     * @prop {string} abstractProps.abstractProp.stockProp - свойство в накопителе на которое ссылается абстрактное свойство см {@link AbstractStock#abstractProp}
     * @prop {boolean} abstractProps.abstractProp.statusProp - статус валидации абстрактного свойства
     */


//--Завершение определения типов данных---

//--Определение callback функций

/**
 * функции проверяющие и модифицируещие значение абстрактных свойств или объекта привязанного
 *  к абстрактному накопителю. Функции данного типа должны возврощать результат.
 * @callback AbstractStock#verrifFunc
 * @param {Object} desc - дескриптор значения свойства
 * @param {String} desc.name - имя свойства
 * @param {any} desc.val - значение свойства
 * @param {Object} desc.context - контекст свойства
 * @param {true|false} desc.stock - **true**  если свойство является накопителем. **false** - во всех 
 * остальных случаях
 * @param {true|false} desc.prop - **true** если свойста является абстрактным. **false** - во всех 
 * остальных случаях
 * @param {true|false} desc.get - **true** если значение возврощается свойством. **false** - во всех 
 * остальных случаях
 * @param {true|false} desc.set - **true** если значение записывается свойством. **false** - во всех 
 * остальных случаях
  * @returns {any} значене после всех операций
 */

//--Конец определения callback функций

/**
 * Определяет абстрактное свойство. 
 * @param {String} abstractname - имя абстрактного свойтсва
 * @param {String} stockname - имя фактического свойства
 * @param {AbstractStock#verrifFunc} [verrifF] - функция обратного вызова для
 * @param {Boolean} [debug] - **true** - будут вывводится отладочные сообщения
 * проврки и изменения значения
 */
    this.abstractProp = (abstractname, stockname, verrifF, debug) =>{
        /**@type {String} */
        let abstractnamest = abstractname+"";
        let stocknamest = stockname+"";

//---блок обнаружения веррификации
       // var callstack = ((new Error()).stack+"").replace("Error", "CALLSTACK:");
        var cb = verrifF instanceof Function;
        //var ud =  typeof verrifF == 'undefined'; // если функция феррификации не определена 
        //var ud = verrifF ? false : true;
        var ud = !verrifF//true - если не определена, false - если определена        
        var _this = this;//контекст

        if (!cb){
            if (ud) {
                if(debug){
                 console.info('\n---start debug massage---');
                    //если функция феррификации не определена
                    console.info(this.__proto__.constructor.name+'#abstractProp - \
                    \n\tфункция феррификации не определена');
                    console.info('\tabstractname = ', abstractname);
                    console.info('\tstockname = ', stockname);
                    console.info('\tthis = ', _this);
                    console.trace();
                 console.info('---end debug massage---\n')
                }
                
                
            } else {
                //если функция феррификации не является функцией  
                if (debug){
                 console.error('\n--debug information--');
                   console.error(this.__proto__.constructor.name='#abstractProp - \
                   \n\tв параметре verrifF передана не функция');
                   console.error('\tabstractname = ', abstractname, '\t---debug---');
                   console.error('\tstockname = ', stockname, '\t---debug---');
                   console.error('\tverrifF = ', verrifF, '\t---debug---');
                   console.error('\tthis = ', _this, '\t---debug---');
                }
                throw (new TypeError('\tverrifF is not function'))
                
            }
        }   
//---конец блока обнаружения веррификации             
        
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
                // TODO сделать валидацию pstock - сделано

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
                                status: ${stocknamest in AS_stock} },
                                ${((new Error()).stack+"").replace("Error", "CALLSTACK:")}
                            `
                        );
//----end block console.warn-----
                };

//----Создаём абстрактное свойство-----

//Так как аксесоры постоянно доступны - то они порождают замыкани.    
            var _desc = {}; //дескриптор динамичски-определяемого свойства.
            _desc.configurable=true
            _desc.enumerable=true
            _desc.retf = (...args)=>{return AS_stock[ASlist[_desc.val]](...args) };/*новодел. Эмулирует вызов метода реального объекта. 
            Обёртка для вызыва функций в контесте реального объекта */
            _desc.val = abstractnamest; //
            _desc.get = () => {  //Аксессор get
                _propstock = AS_stock[ASlist[_desc.val]];
                /* */
                let _ret = _propstock instanceof Function ? _desc.retf : _propstock;

//----------------веррификация--------------
            if (cb){//если функция веррификации передана
                //дескрипто свойства
                  let desc = {
                      name: abstractnamest,
                      val: _ret,
                      context: _this,
                      stock: false,
                      prop: true,
                      get: true,
                      set: false
                      };
                      _ret = verrifF(desc)};
//------------конец веррификации------------

                return _ret;//конец get
             };
            _desc.set = (pval) => {//Аксессор set
                let retval = pval;

//----------------веррификация--------------
            if (cb){//если функция веррификации передана
                //дескрипто свойства
                  let desc = {
                      name: abstractnamest,
                      val: pval,
                      context: _this,
                      stock: false,
                      prop: true,
                      get: false,
                      set: true
                      };
                      retval = verrifF(desc)};
//------------конец веррификации------------                

                AS_stock[ASlist[_desc.val]] = retval;
            };//конец set
            /*Устанавливаем соответсвие между абстрактным и фактическим свойстве
            /* путём записи свойства ASlist*/
            

            Object.defineProperty(this, abstractnamest, _desc);

                }
        //---end if ---

        ASlist[abstractnamest] = stocknamest;
        //-------End abstractProp---
//----Абстрактное свойство создано -----
    };


  //-----Начало блока удаления абстрактного свойства------

  /**
   * 
   * @param {String} abstractname имя абстрактного свойства
   * @return {Boolean} **true** - абстрактное свойство успешно удалено. 
   * **false** - во всех остальных случаях.
   * @description удаляет абстрактное свойство
   */
    this.deleteAbstractProp = (abstractname)=>{
        let abstractnamest = abstractname + "";
        let ret = true; /** статус выхода */
        
        if (abstractnamest in ASlist){
            delete ASlist[abstractnamest];
            delete this[abstractnamest];
        } else {
            console.warn(this.__proto__.constructor.name='#deleteAbstractProp \
             \n\tАбстрактное свойство с именем ' + abstractnamest +'\
             \n\tне найдено в абстрактном накопителе');
             console.warn('\t', this);
             console.warn('\tкарта абстрактных свойств:');
             console.warn('\t', ASlist);
             console.trace();
             ret = false;
                }

        return ret;

    }
  //-----Конец блока удаления абстрактного свойства------

  //----------Начало блока удаления накопителя-------

    /**
     * 
     * @param {String} pname имя накопителя
     * @return {Boolean} **true** - накопитель успешно удалёно. 
     * **false** - во всех остальных случаях.
     * @description удаляет накопитель     
     */
    this.deleteStock = (pname)=>{
        let pnamest = pname + "";
        ret = true;

        if(AS_stock === this[pnamest]){
            let asmap = this.getASlist();

            for (let asprop in asmap){
                this.deleteAbstractProp(asprop);

            };
            ASlist = {};
            AS_stock = {};            
            delete this[pnamest];
        } else {
        console.warn(this.__proto__.constructor.name+'#deleteStock \
        \n\tнакопитель с именем ' + pnamest + ' не найден');
        console.warn('\tthis - ', this);
        console.trace();
        ret = false;
            }

        return ret;
    };
  //-----------Конец блока удаления накопителя-------


//----end AbstractStock---
}

module.exports.AbstractStock = AbstractStock;

//export to window
try {Object.assign(window, module.exports)}catch(e){ 
console.groupCollapsed('%cnot defined on browser', 'color: red');
console.error(e);
console.groupEnd();}
//end export to window   
//
///**базовый объект типа массив 
// * @type {Array}
//*/
//
//let arr = [2,7];
//
////arr.t = 88;
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
//var sf = (pdesc)=>{console.dir(pdesc); return pdesc.val};
//var pf = (pdesc)=>{
//    var _pdesc = pdesc;
//    let asmap = pdesc.context.getASlist();
//    _pdesc.realname = asmap[pdesc.name];
//    console.dir(_pdesc);
//    return pdesc.val;
//};
//as.initStock('ars', arr/*, sf*/);
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
//as.abstractProp('in', 'push', undefined /*pf*/, true);
////as.abstractProp('at', 't', (desc)=>{return desc.val+2});
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
//as.at = 77;
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
//console.log(as.deleteAbstractProp('in_'));
//console.log(as.deleteStock('ars_'));
//console.log(as.out());
//console.log(as._out());
//
///**переменная типа абстрактного свойства
// * @type {as#abstractPropT} 
// * @prop {as#abstractPropT} res - имя переменной
//*/
//var zzzzz;
//

//let obj1 = {};
//obj1.name = "Boris";
//obj1.say = function(){console.log(`hello ${this.name}`)};
//
//let obj2 = new AbstractStock();
//obj2.initStock("obj1", obj1);
//
//obj2.abstractProp("_name_", "name");
//obj2.abstractProp("say", "say");
//
//console.log(obj2._name_); // выведет Boris
//obj1.name = 'Ivan';
//obj1.say();// выведет Ivan
//obj2.say();// выведет Ivan
//
//obj2._name_ = 'Peter';
//obj1.say();// выведет Peter
//obj2.say();// выведет Peter


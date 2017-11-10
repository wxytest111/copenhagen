class SKUInfo{
    constructor(){

    }
    get ID(){
        return this.id;
    }
    set ID(id){
        this.id = id;
    } 
    get Name(){
        return this.name;
    }
    set Name(name){
        this.name = name;
    }
    get Desc(){
        return this.desc;
    }
    set Desc(desc){
        this.desc = desc;
    }
    get Pic(){
        return this.pic;
    }
    set Pic(pic){
        this.pic = pic;
    }
    get Price(){
        return this.price;
    }
    set Price(price){
        this.price = price;
    }
}
module.exports = SKUInfo;


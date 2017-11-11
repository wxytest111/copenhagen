class PromotionInfo {
    constructor(){

    }
    get Id(){
        return this.id;
    }
    set Id(id){
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
    get GetSKUlist(){
        return this.SKUlist;
    }
    set SetSKUlist(SKUlist){
        this.SKUlist = SKUlist;
    }
    get PersonInfo(){
        return this.personInfo;
    }
    set PersonInfo(personInfo){
        this.personInfo = personInfo;
    }
    get UpdateTime(){
        return this.updateTime;
    }
    set UpdateTime(updateTime){
        this.updateTime = updateTime;
    }
}

module.exports=PromotionInfo;
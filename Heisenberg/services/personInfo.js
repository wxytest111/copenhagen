
class PersonInfo{
    constructor(){

    }
    get Gender(){
        return this.gender;
    }
    set Gender(gender){
        this.gender=gender;
    }
    get Age(){
        return this.age;
    }
    set Age(age){
        this.age=age;
    }
    get IsGlass(){
        return this.isGlass;
    }
    set IsGlass(isGlass){
        this.isGlassage=isGlass;
    }
    get IsHat(){
        return this.isHat;
    }
    set IsHat(isHat){
        this.isHat=isHat;
    }
    get Frequency(){
        return this.frequency;
    }
    set Frequency(frequency){
        this.frequency=frequency;
    }
    get PreferSKU(){
        return this.preferSKU;
    }
    set PreferSKU(preferSKU){
        this.preferSKU=preferSKU;
    }
    get Pic(){
        return this.pic;
    }
    set Pic(pic){
        this.pic=pic;
    }
}

module.exports=PersonInfo;
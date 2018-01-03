class StatisticsInfo{
    constructor(){

    }
    get ID(){
        return this.id;
    }
    set ID(id){
        this.id = id;
    } 
    get TransId(){
        return this.transId;
    }
    set TransId(transId){
        this.transId = transId;
    }
    get FaceId(){
        return this.faceId;
    }
    set FaceId(faceId){
        this.faceId = faceId;
    }
    get PersonId(){
        return this.personId;
    }
    set PersonId(personId){
        this.personId = personId;
    }
    get StoreNo(){
        return this.storeNo;
    }
    set StoreNo(storeNo){
        this.storeNo = storeNo;
    }
    get PosNo(){
        return this.posNo;
    }
    set PosNo(posNo){
        this.posNo = posNo;
    }
    get Gender(){
        return this.gender;
    }
    set Gender(gender){
        this.gender = gender;
    }
    get Age(){
        return this.age;
    }
    set Age(age){
        this.age = age;
    }
    get Emotion(){
        return this.emotion;
    }
    set Emotion(emotion){
        this.emotion = emotion;
    }
    get Image(){
        return this.image;
    }
    set Image(image){
        this.image = image;
    }
    get Offset(){
        return this.offset;
    }
    set Offset(offset){
        this.offset = offset;
    }
    
}
module.exports = StatisticsInfo;


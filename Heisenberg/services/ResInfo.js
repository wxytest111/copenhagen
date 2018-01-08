class ResInfo{
    constructor(){

    }
    get RetCode(){
        return this.retCode;
    }
    set RetCode(retCode){
        this.retCode = retCode;
    } 
    get RetMessage(){
        return this.retMessage;
    }
    set RetMessage(retMessage){
        this.retMessage = retMessage;
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
    get Feature(){
        return this.feature;
    }
    set Feature(feature){
        this.feature = feature;
    }
    
    
}
module.exports = ResInfo;


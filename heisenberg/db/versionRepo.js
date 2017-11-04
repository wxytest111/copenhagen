/**
 * @author Lucas
 * @desc APP version class, 
 */
class VersionRepo{
    constructor(props){
        this.connection = props.connection;
    }
    async getAll(){
        if(this.connection){
            return await this.connection.execute(
                'SELECT * FROM version')             
        }
        return [];
    }
    getNew(){

    }
    add(){

    }
    remove(){

    }
    update(){

    }
}

module.exports = VersionRepo;
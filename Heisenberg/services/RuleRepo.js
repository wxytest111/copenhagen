const db = require('../models/db');
const rule = require('../models/rule');
const SKU = require('../models/SKU');

/**
 * @author yxiuwen
 * @desc RuleRepo class, 
 */
class RuleRepo{
    constructor(props){
        
    }
    
    async add(model){
        var ruleDao = rule(db.sequelize,db.Sequelize.DataTypes);
        var sku = SKU(db.sequelize,db.Sequelize.DataTypes);
        if(!model.rule_id){
            var skuModel = {};
            skuModel.id = model.id;
            model.id=undefined;
            var t = await ruleDao.create(model);
            skuModel.rule_id=t.id;
            await sku.update(skuModel,{  
                'where':{'id':skuModel.id}
            });
        } else {
            var t = await ruleDao.update(model,{  
                'where':{'id':model.rule_id}
            });
        }
        return t;
    }
    
}

module.exports = RuleRepo;
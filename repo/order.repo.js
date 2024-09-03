const db = require("../models/index.js");
const { QueryTypes } = require("sequelize");

const order = async (id) => {
  try {
    const records = await db.sequelize.query(
      `SELECT JSON_OBJECT(
        'order_date', o.order_date,
        'total_price', o.total_price,
        'order_status', o.order_status,
        'shipping_address', o.shipping_address,
        'order_id', o.oid,
        'order_items', JSON_ARRAYAGG(
          JSON_OBJECT(
            'pid', i.pid,
            'name', p.name,  
            'quantity', i.quantity,
            'price', i.price,
            'image', p.image
          )
        )
      ) AS order_json
FROM dbtest.order AS o
INNER JOIN order_items AS i ON o.oid = i.oid
INNER JOIN product AS p ON i.pid = p.pid  
WHERE o.id = :id             
GROUP BY o.oid;`,
      {
        replacements:{id:id},
        type: QueryTypes.SELECT,
      }
    );

    // Extract the JSON result
    // if (records.length > 0) {
    //   const jsonResult = records[0].order_json;
    //   console.log('JSON Result:', jsonResult);
    //   return jsonResult;
    // } else {
    //   console.log('No records found');
    //   return null;
    // }
    
    return records.map(item=>{return item.order_json});
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const createOrder = async (order) => {
  const t = await db.sequelize.transaction();
  try {
    const resp = await db.order.create(order, { transaction: t });
    
    await Promise.all(order.order_items.map(async (item) => {
      const items = {
        oid: resp.oid,
        pid: item.pid,
        price: item.price,
        quantity: item.quantity,
      };
      console.log(items);
      await db.order_items.create(items, { transaction: t });
    }));
    
    await t.commit();
  } catch (error) {
    console.log("Create order error:", error);
    await t.rollback();
  }
};

module.exports = {
  order,
  createOrder,
};

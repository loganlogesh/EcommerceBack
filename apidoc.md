* Flipkart clon application

// Page 1 

> list of Product catagories.
* http://localhost:2829/ProductCategory

> list of brand wrt to Product.
* http://localhost:2829/productItems?brandId=6

> list of Quick Search.
* http://localhost:2829/Producttype

// Page 2

> Product wrt to Caregories
* http://localhost:2829/productCategory?productTypeId=9

> Product wrt to categories + cost
* http://localhost:2829/filter/6?Lcost=5000&Hcost=90000     

// Page 3

> Details of items
* http://localhost:2829/productItems?Product_id=50

// page 4 

> Details of menu selector (orderProductDetails)
* http://localhost:2829/orderProductDetails
{"id":[50 ,20 , 7 , 40]}

> place order
* http://localhost:2829/placeOrder

// page 5 

> Invoice of the order
* http://localhost:2829/Orders

> update order details
* http://localhost:2829/UpdateOrder

> Delete Order.
* http://localhost:2829/DeleteOrder
{ "_id" : "648b1f813d02460b8ec37f51" }
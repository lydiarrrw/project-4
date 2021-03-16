from models.order_model import Order
from models.product_model import Product

products = [
    Product(
        product_name="Mineral Water", 
        product_type="beverage", 
        in_stock=True, 
        price=4.00,
        image="https://sc04.alicdn.com/kf/Udba852d6198d492a899d7a93d74320edP.jpg"
    ),
    Product(
        product_name="Ham & Cheese Toastie",
        product_type="food",
        in_stock=True,
        price=5.00,
        image="https://assets.kraftfoods.com/recipe_images/opendeploy/119105-84c92311f55cee6977466e33fdbf0ffe0e6aeead_642x428.jpg"
    ),
    Product(
        product_name="Grilled Aubergine Toastie",
        product_type="food",
        in_stock=True,
        price=5.50,
        image="https://thezestkitchen.com/wp-content/uploads/04_front-view.jpg"
    ),
]

order_list = [
    Order(user_id=4, act_id=1, ready_to_collect=False, products=products),
    Order(user_id=4, act_id=2, ready_to_collect=True, products=products),
]
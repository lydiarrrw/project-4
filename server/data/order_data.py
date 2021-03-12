from models.order_model import Order
from models.product_model import Product

products = [
    Product(product_name="Mineral Water", product_type="beverage", in_stock=True, price=4.00),
    Product(product_name="Ham & Cheese Toastie", product_type="food", in_stock=True, price=5.00),
    Product(product_name="Grilled Aubergine Toastie", product_type="food", in_stock=True, price=5.50)
]

order_list = [
    Order(user_id = 4, act_id = 1, ready_to_collect = False, products = products),
    Order(user_id = 4, act_id = 2, ready_to_collect = True, products=products)
]
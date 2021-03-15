from app import db 

products_orders_join = db.Table("products_orders",
    db.Column("order_id", db.Integer, db.ForeignKey("orders.id"), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True)
    )

# products_orders_join = db.Table("products_orders",
#     db.Column("product_order_id", db.Integer, primary_key = True),
#     db.Column("order_id", db.Integer, db.ForeignKey("orders.id")),
#     db.Column("product_id", db.Integer, db.ForeignKey("products.id"))
#     )
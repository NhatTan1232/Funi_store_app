from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True)  
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, nullable=True)
    password = Column(String)
    age = Column(Integer, nullable=True)
    address = Column(String, nullable=True)
    profile_picture = Column(String, nullable=True)
    carts = relationship("Cart", back_populates="user")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(DECIMAL(10, 2), nullable=False)
    type = Column(String(50), nullable=True)
    detail = Column(Text, nullable=True)

    cart_items = relationship("CartItem", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")
    colors = relationship("ProductColor", back_populates="product")
    reviews = relationship("Review", back_populates="product")

class ProductColor(Base):
    __tablename__ = "product_colors"

    color_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    color_name = Column(String(50), nullable=True)
    picture_url = Column(String(255), nullable=True)

    product = relationship("Product", back_populates="colors")

class Cart(Base):
    __tablename__ = "carts"
    
    cart_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    user = relationship("User", back_populates="carts")
    cart_items = relationship("CartItem", back_populates="cart")
    orders = relationship("Order", back_populates="cart") 

class CartItem(Base):
    __tablename__ = "cart_items"

    cart_item_id = Column(Integer, primary_key=True, autoincrement=True)
    cart_id = Column(Integer, ForeignKey("carts.cart_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    color_id = Column(Integer, ForeignKey("product_colors.color_id"), nullable=True)
    quantity = Column(Integer, nullable=False, default=1)

    cart = relationship("Cart", back_populates="cart_items")
    product = relationship("Product", back_populates="cart_items")
    color = relationship("ProductColor")

class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    cart_id = Column(Integer, ForeignKey("carts.cart_id"), nullable=False)
    total_amount = Column(DECIMAL(12, 2), nullable=False) 
    payment_method = Column(String(50), nullable=True)
    name = Column(String(255), nullable=True)
    address = Column(String(255), nullable=True)

    user = relationship("User", back_populates="orders")
    cart = relationship("Cart", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    color_id = Column(Integer, ForeignKey("product_colors.color_id"), nullable=True)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(DECIMAL(10, 2), nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=False)

    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")
    color = relationship("ProductColor")

class Review(Base):
    __tablename__ = "reviews"

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    rating = Column(Integer, nullable=False)
    detail_review = Column(Text, nullable=True)

    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")


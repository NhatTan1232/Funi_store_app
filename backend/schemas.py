from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    username: str
    email: str
    phone: Optional[str] = None
    age: Optional[int] = None
    address: Optional[str] = None
    profile_picture: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    user_id: int

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

class UserLoginResponse(BaseModel):
    user_id: int
    cart_id: int
    message: str

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    product_name: str
    description: Optional[str] = None
    price: float
    type: Optional[str] = None
    detail: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    product_id: int

    class Config:
        from_attributes = True

class ProductColorBase(BaseModel):
    color_name: Optional[str] = None
    picture_url: Optional[str] = None

class ProductColorCreate(ProductColorBase):
    product_id: int

class ProductColor(ProductColorBase):
    color_id: int
    product_id: int

    class Config:
        from_attributes = True

class CartBase(BaseModel):
    user_id: int

class CartCreate(CartBase):
    pass

class Cart(CartBase):
    cart_id: int

    class Config:
        from_attributes = True

class CartItemBase(BaseModel):
    cart_id: int
    product_id: int
    quantity: int
    color_id: Optional[int] = None

class CartItemCreate(CartItemBase):
    pass

class CartItem(CartItemBase):
    cart_item_id: int

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    user_id: int
    cart_id: int
    total_amount: float
    payment_method: Optional[str] = None

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    order_id: int

    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    order_id: int
    product_id: int
    quantity: int
    unit_price: float
    total_price: float
    color_id: Optional[int] = None

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    order_item_id: int

    class Config:
        from_attributes = True

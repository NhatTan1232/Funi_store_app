import logging
from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models, schemas, crud
from typing import List

app = FastAPI()

logging.basicConfig(level=logging.DEBUG)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.info(f"Request: {request.method} {request.url} - Body: {await request.json()}")
    response = await call_next(request)
    logging.info(f"Response status: {response.status_code}")
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/login/")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    if db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    return {"message": "Login successful"}







@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email đã được sử dụng")
    return crud.create_user(db=db, username=user.username, email=user.email, phone=user.phone, password=user.password)

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Người dùng không tồn tại")
    return db_user


@app.post("/products/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db=db, **product.dict())

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product_by_id(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")
    return db_product

@app.get("/products/", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_all_products(db, skip=skip, limit=limit)
    return products


@app.post("/product_colors/", response_model=schemas.ProductColor)
def create_product_color(color: schemas.ProductColorCreate, db: Session = Depends(get_db)):
    return crud.create_product_color(db=db, **color.dict())

@app.get("/product_colors/{product_id}", response_model=List[schemas.ProductColor])
def read_product_colors(product_id: int, db: Session = Depends(get_db)):
    return crud.get_product_colors(db, product_id=product_id)


@app.post("/carts/", response_model=schemas.Cart)
def create_cart(cart: schemas.CartCreate, db: Session = Depends(get_db)):
    return crud.create_cart(db=db, user_id=cart.user_id)

@app.get("/carts/{user_id}", response_model=schemas.Cart)
def read_cart(user_id: int, db: Session = Depends(get_db)):
    db_cart = crud.get_cart_by_user_id(db, user_id=user_id)
    if db_cart is None:
        raise HTTPException(status_code=404, detail="Giỏ hàng không tồn tại")
    return db_cart


@app.post("/cart_items/", response_model=schemas.CartItem)
def create_cart_item(cart_item: schemas.CartItemCreate, db: Session = Depends(get_db)):
    return crud.create_cart_item(db=db, **cart_item.dict())

@app.get("/cart_items/{cart_id}", response_model=List[schemas.CartItem])
def read_cart_items(cart_id: int, db: Session = Depends(get_db)):
    return crud.get_cart_items(db, cart_id=cart_id)

@app.put("/cart_items/{cart_item_id}", response_model=schemas.CartItem)
def update_cart_item(cart_item_id: int, quantity: int, db: Session = Depends(get_db)):
    return crud.update_cart_item_quantity(db=db, cart_item_id=cart_item_id, quantity=quantity)

@app.delete("/cart_items/{cart_item_id}", response_model=schemas.CartItem)
def delete_cart_item(cart_item_id: int, db: Session = Depends(get_db)):
    return crud.delete_cart_item(db=db, cart_item_id=cart_item_id)


@app.post("/orders/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(db=db, user_id=order.user_id, cart_id=order.cart_id, payment_method=order.payment_method)

@app.get("/orders/{order_id}", response_model=List[schemas.OrderItem])
def read_order_items(order_id: int, db: Session = Depends(get_db)):
    return crud.get_order_items(db=db, order_id=order_id)

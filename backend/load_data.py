import json
import sys
from os import path
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

sys.path.append(path.dirname(path.abspath(__file__)))

from models import Product, ProductColor, Review, User
from database import SessionLocal

with open('storeProduct.json', 'r') as f:
    products = json.load(f)

with open('reviews.json', 'r', encoding='utf-8') as f:
    reviews = json.load(f)

with open('users.json', 'r', encoding='utf-8') as f:
    users = json.load(f)

def load_data_to_db():
    db: Session = SessionLocal()
    try:
        for product in products:
            db_product = Product(
                product_name=product['name'],
                description=product.get('detail', ''),
                price=float(product['price'].replace(',', '')),
                type=product['type'],
                detail=product.get('detail', '')
            )
            db.add(db_product)
            db.commit()
            db.refresh(db_product)

            for color in product['color']:
                db_product_color = ProductColor(
                    product_id=db_product.product_id,
                    color_id=color['color_id'],  
                    color_name=color['color_name'],
                    picture_url=color['picture']
                )
                db.add(db_product_color)
            db.commit()

        for user in users:
            db_user = User(
                username=user['username'],
                email=user['email'],
                phone=user['phone'],
                password=user['password'],
                age=user['age'],
                address=user.get('address', ''),
                profile_picture=user['profile_picture'],
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)

        for rv in reviews:
            db_review = Review(
                product_id=rv['product_id'],
                user_id=rv['user_id'],
                rating=rv['rating'],
                detail_review=rv.get('detail_review', '')
            )
            db.add(db_review)
            db.commit()
            db.refresh(db_review)

        print("Dữ liệu đã được nhập thành công!")
    except IntegrityError as e:
        print(f"Lỗi khóa ngoại hoặc khóa chính: {e.orig}")
        db.rollback()
    except Exception as e:
        print(f"Lỗi khi nhập dữ liệu: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    load_data_to_db()

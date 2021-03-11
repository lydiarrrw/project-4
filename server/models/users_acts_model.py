from app import db

users_acts_join = db.Table(
    'users_acts',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key = True),
    db.Column('act_id', db.Integer, db.ForeignKey('acts.id'), primary_key = True),
)
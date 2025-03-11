import os
from datetime import datetime, timedelta
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from sqlalchemy import func
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from apscheduler.schedulers.background import BackgroundScheduler
from pytz import timezone
import logging
from flask_sqlalchemy import SQLAlchemy
import random

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET") or "lottery-secret-key"
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

logging.basicConfig(level=logging.DEBUG)

# Import models after db initialization
from models import User, LotteryDraw, Feedback

# Initialize database tables
with app.app_context():
    db.create_all()

def create_admin_if_not_exists():
    try:
        # Delete old admin user if exists
        old_admin = User.query.filter_by(username='admin').first()
        if old_admin:
            db.session.delete(old_admin)
            db.session.commit()
            logging.info("Old admin user deleted")
        
        # Check if the new admin exists
        admin = User.query.filter_by(username='Hubali').first()
        if not admin:
            admin = User(
                username='Hubali',
                email='admin@luxury-lottery.com',
                password_hash=generate_password_hash('Khanbaba.123')
            )

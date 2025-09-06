#!/usr/bin/env python3
"""
Script to add initial categories to the database
Run this after starting the FastAPI server to populate categories
"""

import requests
import json

# Add some initial categories
categories = [
    {"name": "Clothing"},
    {"name": "Music"},
    {"name": "Books"},
    {"name": "Electronics"},
    {"name": "Furniture"},
    {"name": "Misc"}
]

def add_categories():
    base_url = "http://localhost:8000"
    
    for category in categories:
        try:
            response = requests.post(
                f"{base_url}/categories/",
                json=category,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                print(f"✅ Added category: {category['name']}")
            else:
                print(f"❌ Failed to add category {category['name']}: {response.text}")
                
        except requests.exceptions.ConnectionError:
            print("❌ Could not connect to server. Make sure FastAPI server is running on localhost:8000")
            break
        except Exception as e:
            print(f"❌ Error adding category {category['name']}: {e}")

if __name__ == "__main__":
    print("Adding initial categories to the database...")
    add_categories()
    print("Done!")

#!/usr/bin/env python3
"""
Test script to verify API endpoints are working correctly
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_categories():
    """Test categories endpoint"""
    print("Testing categories endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/categories/")
        if response.status_code == 200:
            categories = response.json()
            print(f"✅ Categories endpoint working. Found {len(categories)} categories.")
            return True
        else:
            print(f"❌ Categories endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Categories endpoint error: {e}")
        return False

def test_products():
    """Test products endpoint"""
    print("Testing products endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/products/")
        if response.status_code == 200:
            products = response.json()
            print(f"✅ Products endpoint working. Found {len(products)} products.")
            return True
        else:
            print(f"❌ Products endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Products endpoint error: {e}")
        return False

def test_root():
    """Test root endpoint"""
    print("Testing root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Root endpoint working: {data.get('message', 'No message')}")
            return True
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
        return False

def main():
    print("🧪 Testing EcoFinds API endpoints...")
    print("=" * 50)
    
    tests = [
        test_root,
        test_categories,
        test_products
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! API is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the server logs.")

if __name__ == "__main__":
    main()

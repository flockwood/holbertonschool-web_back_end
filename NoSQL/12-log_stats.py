#!/usr/bin/env python3
"""Provides some stats about Nginx logs stored in MongoDB"""
from pymongo import MongoClient


def print_nginx_stats():
    """Print statistics about nginx logs"""
    client = MongoClient('mongodb://127.0.0.1:27017')
    nginx_collection = client.logs.nginx
    
    # Total logs
    total = nginx_collection.count_documents({})
    print("{} logs".format(total))
    
    # Methods
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = nginx_collection.count_documents({"method": method})
        print("\tmethod {}: {}".format(method, count))
    
    # Status checks
    status_checks = nginx_collection.count_documents({
        "method": "GET",
        "path": "/status"
    })
    print("{} status check".format(status_checks))


if __name__ == "__main__":
    print_nginx_stats()

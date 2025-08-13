#!/usr/bin/env python3
"""
Script that provides stats about Nginx logs stored in MongoDB
"""
from pymongo import MongoClient


def log_stats():
    """
    Provides stats about Nginx logs stored in MongoDB
    """
    client = MongoClient('mongodb://127.0.0.1:27017')
    nginx_collection = client.logs.nginx

    # Total logs
    total_logs = nginx_collection.count_documents({})
    print(f"{total_logs} logs")

    # Methods
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    print("Methods:")
    for method in methods:
        count = nginx_collection.count_documents({"method": method})
        print(f"    method {method}: {count}")

    # Status check
    status_check_count = nginx_collection.count_documents(
        {"method": "GET", "path": "/status"}
    )
    print(f"{status_check_count} status check")


if __name__ == "__main__":
    log_stats()

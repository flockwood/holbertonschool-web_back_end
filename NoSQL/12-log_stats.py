#!/usr/bin/env python3
"""Script that provides stats about Nginx logs stored in MongoDB."""
from pymongo import MongoClient


def log_stats():
    """
    Display statistics about Nginx logs stored in MongoDB.
    
    Connects to the logs database and nginx collection,
    then displays counts of different HTTP methods and status checks.
    """
    # Connect to MongoDB
    client = MongoClient('mongodb://127.0.0.1:27017')
    
    # Access the logs database and nginx collection
    nginx_collection = client.logs.nginx
    
    # Get total number of logs
    total_logs = nginx_collection.count_documents({})
    print(f"{total_logs} logs")
    
    # Display methods header
    print("Methods:")
    
    # Count documents for each HTTP method
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = nginx_collection.count_documents({"method": method})
        print(f"\tmethod {method}: {count}")
    
    # Count status check (GET requests to /status)
    status_check = nginx_collection.count_documents({
        "method": "GET",
        "path": "/status"
    })
    print(f"{status_check} status check")


if __name__ == "__main__":
    log_stats()

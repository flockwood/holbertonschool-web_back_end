#!/usr/bin/env python3
"""Module that contains a function to list all documents in a collection."""


def list_all(mongo_collection):
    """
    List all documents in a MongoDB collection.

    Args:
        mongo_collection: A pymongo collection object

    Returns:
        A list of all documents in the collection, or an empty list
        if no documents are found
    """
    documents = list(mongo_collection.find())
    return documents

#!/usr/bin/env python3
"""Module that contains a function to insert a document in a collection."""


def insert_school(mongo_collection, **kwargs):
    """
    Insert a new document in a MongoDB collection based on kwargs.

    Args:
        mongo_collection: A pymongo collection object
        **kwargs: Keyword arguments representing the document fields

    Returns:
        The _id of the newly inserted document
    """
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id

#!/usr/bin/env python3
"""Module that contains a function to update topics of a school document."""


def update_topics(mongo_collection, name, topics):
    """
    Update all topics of a school document based on the school name.

    Args:
        mongo_collection: A pymongo collection object
        name: The school name to update (string)
        topics: The list of topics approached in the school (list of strings)

    Returns:
        None
    """
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )

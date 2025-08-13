#!/usr/bin/env python3
"""Module that contains a function to find schools by topic."""


def schools_by_topic(mongo_collection, topic):
    """
    Return the list of schools having a specific topic.

    Args:
        mongo_collection: A pymongo collection object
        topic: The topic to search for (string)

    Returns:
        A list of schools (documents) that have the specified topic
    """
    schools = mongo_collection.find({"topics": topic})
    return list(schools)

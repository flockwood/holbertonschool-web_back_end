#!/usr/bin/env python3
"""
This module contains a simple helper function for calculating pagination indexes.

The index_range function helps convert page-based pagination parameters into
start and end indexes that can be used for list slicing operations.
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    Calculate start and end index for pagination parameters.

    This function takes a page number and page size, then returns the
    corresponding start and end indexes that can be used to slice a list
    or query a database with limit and offset. Page numbers are 1-indexed,
    meaning the first page is page 1, not page 0.

    Args:
        page: The current page number (1-indexed), must be a positive integer
        page_size: The number of items per page, must be a positive integer

    Returns:
        A tuple containing two integers: (start_index, end_index) where
        start_index is inclusive and end_index is exclusive, suitable for
        Python's slice notation

    Example:
        >>> index_range(1, 7)
        (0, 7)
        >>> index_range(3, 15)
        (30, 45)
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)

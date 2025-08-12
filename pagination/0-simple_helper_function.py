#!/usr/bin/env python3
"""
SImple helper function for pagination
"""

def index_range(page: int, page_size: int) -> tuple:
    """
    Calculate start and end index for pagination.
    
    Args:
        page: The current page number (1-indexed)
        page_size: The number of items per page
    
    Returns:
        A tuple containing (start_index, end_index) for list slicing
    """
    start_index = (page -1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)

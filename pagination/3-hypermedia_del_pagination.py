#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Return a page of the dataset with deletion-resilient pagination.
        
        Args:
            index: The start index of the page (default: None)
            page_size: The size of the page (default: 10)
        
        Returns:
            A dictionary containing:
            - index: the current start index
            - next_index: the next index to query
            - page_size: the current page size
            - data: the actual page data
        """
        if index is None:
            index = 0
            
        dataset = self.indexed_dataset()
        
        # Assert that index is in valid range
        assert 0 <= index < len(self.dataset()), "Index out of range"
        
        data = []
        current_index = index
        collected = 0
        next_index = None
        
        # Get all available indices sorted
        available_indices = sorted(dataset.keys())
        
        # Find the starting position in available indices
        # We need to find indices >= index
        for idx in available_indices:
            if idx >= current_index and collected < page_size:
                data.append(dataset[idx])
                collected += 1
                # Track the last index we used + 1 for next_index
                next_index = idx + 1
        
        # If we didn't collect enough items, next_index should be after the last available
        if collected == 0:
            next_index = index
        elif next_index is None:
            next_index = index + page_size
            
        return {
            'index': index,
            'next_index': next_index,
            'page_size': page_size,
            'data': data
        }

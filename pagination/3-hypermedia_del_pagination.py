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
        data_length = len(self.dataset())

        # Assert that index is in valid range
        assert 0 <= index < data_length, "Index out of range"

        data = []
        current_idx = index
        items_collected = 0

        # Collect page_size items starting from index
        # Skip over deleted items (missing keys)
        while items_collected < page_size and current_idx < data_length:
            if current_idx in dataset:
                data.append(dataset[current_idx])
                items_collected += 1
            current_idx += 1

        # next_index is where we stopped searching
        next_index = current_idx

        return {
            'index': index,
            'next_index': next_index,
            'page_size': page_size,
            'data': data
        }

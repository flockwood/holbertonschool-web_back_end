#!/usr/bin/env python3
"""Module containing a type-annotated sum_mixed_list function"""
from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """Calculate the sum of a list containing integers and floats"""
    return sum(mxd_lst)

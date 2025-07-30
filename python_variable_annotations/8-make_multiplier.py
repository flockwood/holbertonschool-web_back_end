#!/usr/bin/env python3
"""Module containing a type-annotated make_multiplier function"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Return a function that multiplies a float by multiplier"""
    def multiplier_function(n: float) -> float:
        """Multiply n by the captured multiplier"""
        return n * multiplier
    return multiplier_function

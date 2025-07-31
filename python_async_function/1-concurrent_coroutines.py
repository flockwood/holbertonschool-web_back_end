#!/usr/bin/env python3
"""Module for executing multiple coroutines concurrently"""
import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Spawn wait_random n times and return list of delays in ascending order"""
    delays = []
    tasks = []
    
    # Create all tasks
    for _ in range(n):
        task = asyncio.create_task(wait_random(max_delay))
        tasks.append(task)
    
    # Collect results as they complete
    for task in asyncio.as_completed(tasks):
        delay = await task
        delays.append(delay)
    
    return delays

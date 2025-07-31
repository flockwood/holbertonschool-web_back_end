#!/usr/bin/env python3
"""Module for executing multiple tasks concurrently"""
import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """Spawn task_wait_random n times and return list of delays in order"""
    delays = []
    tasks = []
    
    # Create all tasks using task_wait_random
    for _ in range(n):
        task = task_wait_random(max_delay)
        tasks.append(task)
    
    # Collect results as they complete
    for task in asyncio.as_completed(tasks):
        delay = await task
        delays.append(delay)
    
    return delays

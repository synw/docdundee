def increment(num: int) -> int:
    """Utility function to increment a number

    Args:
        num (int): a number

    Raises:
        ValueError: if the number is not an integer

    Returns:
        int: the incremented number

    Example:
        ::

        from mylib.utils import increment

        n = increment(3)
        assert n == 4
        print(f"n value is {n}")
    """
    if not isinstance(num, int):
        raise ValueError(f"{num} is not an integer")
    return num + 1


def decrement(num: int) -> int:
    """Utility function to decrement a positive number

    .. code-block:: python

      from mylib.utils import decrement

      a = 2
      b = decrement(a)
      assert(b == 1)
      b

    :param num: a positive number
    :type num: int
    :raises ValueError: if the number is zero or negative
    :raises ValueError: if the number is not an integer
    :return: the decremented number
    :rtype: int
    """
    if num <= 0:
        raise ValueError(f"{num} is zero or negative")
    if not isinstance(num, int):
        raise ValueError(f"{num} is not an integer")
    return num - 1

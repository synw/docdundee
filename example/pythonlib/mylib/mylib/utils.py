def increment(num: int) -> int:
    """Utility function to increment a number

    .. code-block:: python

      from mylib.utils import increment

      a = 1
      b = increment(a)
      assert(b == 2)
      b

    :param num: a number
    :type num: int
    :raises ValueError: if the number is not an integer
    :return: the incremented number
    :rtype: int
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

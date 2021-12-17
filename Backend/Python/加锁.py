import threading

lock_object = threading.RLock()

loop = 100000
number = 0


def _add(count):
    # 加锁
    lock_object.acquire()
    global number
    for i in range(count):
        number += 1
    lock_object.release()  # 释放锁


def _sub(count):
    # 加锁
    lock_object.acquire()  # 申请锁
    global number
    for i in range(count):
        number -= 1
    lock_object.release()

    t1 = threading.Thread(target=_add, args=(loop,))
    t2 = threading.Thread(target=_sub, args=(loop,))

    t1.start()
    t2.start()

    t1.join()
    t2.join()
    print(number)

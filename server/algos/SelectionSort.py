def get_minimum_element(arr, i):
    """returns index of minimum element from index i to end of arr"""
    res = i
    for j in range(i + 1, len(arr)):
        if arr[j] < arr[res]:
            res = j
    return res

def swap(arr, i, j):
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp

def selection_sort(arr):
    result = {1 : [] + arr}
    count = 1
    for i in range(len(arr) - 1):
        min_index = get_minimum_element(arr, i)
        swap(arr, i, min_index) #put minimum element in sorted part of array
        count += 1
        result[count] = [] + arr + [i, min_index]
    return result